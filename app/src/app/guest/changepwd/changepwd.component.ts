import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsService } from 'godigital-lib';
import { ServicesService, OBJECTNAME } from 'godigital-lib';
import { Router, NavigationEnd } from '@angular/router';
import { GuestService } from '../guest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { Subscription, } from 'rxjs';
declare let $: any;

interface ChatMessage {
  role: string;
  content: string;
}

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.css'],
  imports: [FormsModule]
})
export class ChangeComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('textInput') textInputInput: any;
  @ViewChild('chatWindow', { static: false }) chatWindowRef: ElementRef;
  public componentName = 'changepwd.component';
  public changepwdForm: FormGroup;
  public subscriptions = new Subscription();

  isCollapsed: boolean = true;

  constructor(
    public guestSvc: GuestService,
    public fb: FormBuilder,
    public mainSvc: ServicesService,
    public utilsSvc: UtilsService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewChecked() {
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  changepwd() {
    if (this.changepwdForm && this.changepwdForm.value && this.changepwdForm.value.newpassword1) {
      this.changePassword(this.changepwdForm.value.oldpassword, this.changepwdForm.value.newpassword1);
      $('#passwordChangedModal').modal('show');
    }
  }

  createForm() {
    this.changepwdForm = this.fb.group({
      oldpassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      newpassword1: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
      newpassword2: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    });

  }


  changePassword(currentPassword: string, newPassword: string): void {
    let user = this.utilsSvc.mauth.currentUser;
    if (user && user.email) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      reauthenticateWithCredential(user, credential)
        .then(() => {
          return updatePassword(user, newPassword);
        })
        .then(async () => {
          user = this.utilsSvc.mauth.currentUser;
          this.guestSvc.wnGuest.password = newPassword;
          await this.guestSvc.mainSvc.storeDbSvc.updateObject(this.utilsSvc.backendFBstoreId, this.utilsSvc.mdb, OBJECTNAME.wnUsers, this.guestSvc.wnGuest, this.guestSvc.wnGuest.userId);
          // Show success modal or message
        })
        .catch(error => {
          console.error('Password update failed:', error);
          // Show error modal or toast
        });
    } else {
      console.error('No user is logged in.');
    }
  }
}
