

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HostdashboardComponent } from './hostdashboard/hostdashboard.component';
import { BecomeahostComponent } from './become-a-host/become-a-host.component';
import { StripeAccountConfirmComponent } from './stripe-account-confirm/stripe-account-confirm';
import { StripeAccountFailedComponent } from './stripe-account-failed/stripe-account-failed';

const routes: Routes = [
  { path: 'hostmain', component: HostdashboardComponent },
  { path: 'become-a-host', component: BecomeahostComponent },
  { path: 'stripe-account-confirm', component: StripeAccountConfirmComponent },
  { path: 'stripe-account-failed', component: StripeAccountFailedComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HostRoutingModule { }
