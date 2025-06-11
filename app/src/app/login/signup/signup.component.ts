import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Users, UtilsService } from 'godigital-lib';
import { ServicesService, regexMobileNo, OBJECTNAME } from 'godigital-lib';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../login.service';
import { Subscription, } from 'rxjs';
import { sendEmailVerification, sendSignInLinkToEmail } from 'firebase/auth';

declare let $: any;

const actionCodeSettings = {
  url: 'http://localhost:8100'
}

interface ChatMessage {
  role: string;
  content: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule]
})
export class SignupComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('businessaddress', { static: false }) businessaddress: ElementRef;
  public componentName = 'signup.component';
  public accountForm: FormGroup;
  public subscriptions = new Subscription();
  public address;

  isCollapsed: boolean = true;

  constructor(
    public loginSvc: LoginService,
    public fb: FormBuilder,
    public mainSvc: ServicesService,
    public utilsSvc: UtilsService,
    public router: Router,
    public utilSvc: UtilsService
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(
      this.utilSvc.autoCompleteAddress1(this.businessaddress).subscribe(
        async data => {
          if (data) {
            this.address = data;
          }
        }));
  }



  ngOnDestroy() {
  }

  ngAfterViewChecked() {
  }

  createForm() {
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      password2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      companyname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      socialnetworklink: ['', [Validators.required, this.utilSvc.socialLinkValidator]],
      fullname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      country: ['France', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      lat: 0,
      lng: 0,
      telephone: ['', [Validators.required, Validators.pattern(regexMobileNo)]],
    });

  }

  goHome() {
    this.router.navigate(['/home']);
  }

  createAccount() {
    const maf = this.utilSvc.mauth;
    let user = {} as Users;
    user.address = this.address ? this.address.formatted_address : null;
    user.lat = this.address ? String(this.address.lat) : '0';
    user.lng = this.address ? String(this.address.lng) : '0';
    if (!user.address) {
      this.accountForm.patchValue({
        address: ''
      }
      );
    } else {
      user.password = this.accountForm.value.password1;
      user.email = this.accountForm.value.email;
      user.fullname = this.accountForm.value.fullname;
      user.mobileNo = this.accountForm.value.telephone;
      user.socialnetworklink = this.accountForm.value.socialnetworklink;
      user.companyname = this.accountForm.value.companyname;
      user.country = this.accountForm.value.country;
      user.mobileNo = this.accountForm.value.telephone;
      user.address = this.address.formatted_address;
      user.lat = this.address ? this.address.lat : this.accountForm.value.lat;
      user.lng = this.address ? this.address.lng : this.accountForm.value.lng;
      user.emailverified = false;
      this.utilSvc.mauth.createUserWithEmailAndPassword(user.email, user.password)
        .then(async userCredential => {
          if (userCredential && userCredential.user) {
            await sendEmailVerification(userCredential.user, actionCodeSettings);
            console.log('Verification email sent');
            user.userId = userCredential.user.uid;
            this.loginSvc.mainSvc.storeDbSvc.updateObject(this.utilSvc.backendFBstoreId, this.utilSvc.mdb, OBJECTNAME.wnUsers, user, user.userId).then(
              data => {
                $('#accountCreatedModal').modal('show');
                $('#accountCreatedModal').on('shown.bs.modal', function () {
                  $('#accountCreatedModal button.btn-primary').trigger('focus'); // or .focus()
                });
              },
              error => console.log(error)
            );
      

          }
        })
        .catch(
          error => {
            console.error('Signup error:', error)
          });

    }
  }

  goToLogin() {
    $('#accountCreatedModal').modal('hide');
    this.router.navigate(['/login']);
  }

}
