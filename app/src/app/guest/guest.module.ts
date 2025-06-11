/* eslint-disable max-len */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';

import { HomeComponent } from './home/home.component';
import { ChangeComponent } from './changepwd/changepwd.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { BookingCalendarComponent } from './booking-calendar/booking-calendar.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingdetailsComponent } from './listing-details/listing-details.component';

import { GodigitalbModule } from 'godigital-lib';

import { GuestRoutingModule } from './guest.router.module';

@NgModule({
  declarations: [HomeComponent, ListingsComponent, ListingdetailsComponent,
    FaqComponent, ContactComponent, ProfileComponent, BookingsComponent,
    ChangeComponent, BookingCalendarComponent],
  imports: [
    CommonModule,
    IonicModule,
    GuestRoutingModule,
    FormsModule, ReactiveFormsModule,
    CookieModule.forRoot(),
    GodigitalbModule,
  ],
  providers:[]
})
export class GuestModule { }
