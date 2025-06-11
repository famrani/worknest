/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';

import { HostdashboardComponent } from './hostdashboard/hostdashboard.component';
import { BecomeahostComponent } from './become-a-host/become-a-host.component';
import { StripeAccountConfirmComponent } from './stripe-account-confirm/stripe-account-confirm';
import { StripeAccountFailedComponent } from './stripe-account-failed/stripe-account-failed';

import { GodigitalbModule } from 'godigital-lib';

import { HostRoutingModule } from './host.router.module';

@NgModule({
  declarations: [HostdashboardComponent, BecomeahostComponent, StripeAccountConfirmComponent, StripeAccountFailedComponent],
  imports: [
    CommonModule,
    IonicModule,
    HostRoutingModule,
    FormsModule, ReactiveFormsModule,
    CookieModule.forRoot(),
    GodigitalbModule,
  ],
  providers:[]
})
export class HostModule { }
