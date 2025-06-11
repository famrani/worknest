

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BookingCalendarComponent } from './booking-calendar/booking-calendar.component';
import { ChangeComponent } from './changepwd/changepwd.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { ListingsComponent } from './listings/listings.component';
import { ListingdetailsComponent } from './listing-details/listing-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'booking-calendar', component: BookingCalendarComponent },
  { path: 'changepwd', component: ChangeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'guestmain', component: HomeComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'listings', component: ListingsComponent },
  { path: 'listing-detail', component: ListingdetailsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class GuestRoutingModule { }
