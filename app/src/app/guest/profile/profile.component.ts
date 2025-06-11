import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsService } from 'godigital-lib';
import { ServicesService, regexMobileNo, OBJECTNAME } from 'godigital-lib';
import { Router, NavigationEnd } from '@angular/router';
import { GuestService } from '../guest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, } from 'rxjs';
import firebase from 'firebase/compat/app';


declare let $: any;

const actionCodeSettings = {
  url: 'http://localhost:8100'
}

interface ChatMessage {
  role: string;
  content: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [FormsModule]
})
export class ProfileComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('businessaddress', { static: false }) businessaddress: ElementRef;
  public componentName = 'profile.component';
  public accountForm: FormGroup;
  public subscriptions = new Subscription();
  public address;

  isCollapsed: boolean = true;

  constructor(
    public guestSvc: GuestService,
    public fb: FormBuilder,
    public mainSvc: ServicesService,
    public utilsSvc: UtilsService,
    public router: Router,
  ) { }

  ngOnInit() {
    if (this.guestSvc.wnGuest) {
      this.createForm();
    } else {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.utilsSvc.autoCompleteAddress1(this.businessaddress).subscribe(
        async data => {
          if (data) {
            this.address = data;
          }
        }));
  }

  createForm() {
    this.accountForm = this.fb.group({
      email: [this.guestSvc.wnGuest ? this.guestSvc.wnGuest.email : '', [Validators.required, Validators.email]],
      companyname: [this.guestSvc.wnGuest ? this.guestSvc.wnGuest.companyname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      socialnetworklink: [this.guestSvc.wnGuest ? this.guestSvc.wnGuest.socialnetworklink : '', [Validators.required, this.utilsSvc.socialLinkValidator]],
      fullname: [this.guestSvc.wnGuest ? this.guestSvc.wnGuest.fullname : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      country: [this.guestSvc.wnGuest ? this.guestSvc.wnGuest.country : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      address: [this.guestSvc.wnGuest ? this.guestSvc.wnGuest.address : '', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      lat: this.guestSvc.wnGuest ? this.guestSvc.wnGuest.lat : 0,
      lng: this.guestSvc.wnGuest ? this.guestSvc.wnGuest.lng : 0,
      telephone: [this.guestSvc.wnGuest ? this.guestSvc.wnGuest.mobileNo : '', [Validators.required, Validators.pattern(regexMobileNo)]],
    });
  }

  async updateProfile() {
    let user = this.guestSvc.wnGuest;
    let cont = true;
    if (user.email !== this.accountForm.value.email) {
      try {
        await this.updateEmail(user.email, user.password, this.accountForm.value.email,);
      } catch (e) {
        cont = false;
        console.log('error=', e);
      }
    }
    if (cont) {
      user.email = this.accountForm.value.email;
      user.fullname = this.accountForm.value.fullname;
      user.mobileNo = this.accountForm.value.telephone;
      user.socialnetworklink = this.accountForm.value.socialnetworklink;
      user.companyname = this.accountForm.value.companyname;
      user.country = this.accountForm.value.country;
      user.mobileNo = this.accountForm.value.telephone;
      user.address = this.address ? this.address.fullText : this.accountForm.value.address;
      user.lat = this.address ? this.address.lat : this.accountForm.value.lat;
      user.lng = this.address ? this.address.lng : this.accountForm.value.lng;

      this.guestSvc.mainSvc.storeDbSvc.updateObject(this.utilsSvc.backendFBstoreId, this.utilsSvc.mdb, OBJECTNAME.wnUsers, user, user.userId).then(
        data => {
          $('#profileUpdatedModal').modal('show');
          $('#profileUpdatedModal').on('shown.bs.modal', function () {
            $('#profileUpdatedModal button.btn-primary').trigger('focus'); // or .focus()
          });
        },
        error => console.log(error)
      )
    }
  }

  updateEmail(currentEmail: string, password: string, newEmail: string) {
    return new Promise(async (resolve, reject) => {
      let cont = true;
      const user = this.utilsSvc.mauth.currentUser;
      if (user) {
        const credential = await firebase.auth.EmailAuthProvider.credential(currentEmail, password);
        if (cont) {
          try {
            await user.reauthenticateWithCredential(credential); // étape 1
          } catch (err: any) {
            console.error('❌ Erreur :', err.message);
            cont = false;
            reject(err.message);
          }
        }
        if (cont) {
          try {
            await user.updateEmail(newEmail); // étape 2
          } catch (err: any) {
            console.error('❌ Erreur :', err.message);
            cont = false;
            reject(err.message);
          }
        }
        if (cont) {
          try {
            await user.sendEmailVerification(user); // étape 3 : envoie le mail de vérification au nouvel email
          } catch (err: any) {
            console.error('❌ Erreur :', err.message);
            cont = false;
            reject(err.message);
          }
          resolve(newEmail);
        }
      }
    })
  }

}
