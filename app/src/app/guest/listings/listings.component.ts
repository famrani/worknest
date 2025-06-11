import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Bookings, BOOKINGSTATUS, UtilsService } from 'godigital-lib';
import { ServicesService, UsersService } from 'godigital-lib';
import { Router, NavigationEnd } from '@angular/router';
import { GuestService } from '../guest.service';
import { Subscription, } from 'rxjs';

interface ChatMessage {
  role: string;
  content: string;
}

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css'],
  imports: [FormsModule]
})
export class ListingsComponent implements OnInit, OnDestroy {
  @ViewChild('businessaddress', { static: false }) businessaddress: ElementRef;
  public componentName = 'home.listings';
  public listingForm: FormGroup;
  isCollapsed: boolean = true;
  public subscriptions = new Subscription();
  public address;

  constructor(
    public guestSvc: GuestService,
    public fb: FormBuilder,
    public mainSvc: ServicesService,
    public utilsSvc: UtilsService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
    const nextWorkingDay = this.guestSvc.getNextWorkingDay();
    const nextWorkingDayStr = nextWorkingDay.toString().split('T')[0];

    this.listingForm.get('date1')?.setValue(nextWorkingDayStr);

    const dateInput = document.getElementById('date1') as HTMLInputElement;
    if (dateInput) {
      dateInput.min = nextWorkingDayStr;
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

  goHome() {
    this.router.navigate(['/home']);
  }

  createForm() {
    const nextday = this.guestSvc.getNextWorkingDay();
    this.listingForm = this.fb.group({
      address: ['', Validators.required],
      date1: [nextday, Validators.required],
      from: ['09:00', [Validators.required, this.guestSvc.halfHourValidator]],
      to: ['16:00', [Validators.required, this.guestSvc.halfHourValidator]],
    }, { validators: this.guestSvc.timeRangeValidator }); // ⬅️ Validator de groupe ici
  }

  searchListings() {
    console.log(this.listingForm.value);
  }

  goToListing(i) {
    this.guestSvc.currentListing = this.guestSvc.filteredLocations && this.guestSvc.filteredLocations[i];
    this.guestSvc.currentEquipments = [];
    if (this.guestSvc.currentListing) {
      for (let eq of this.guestSvc.currentListing.equipments) {
        let temp = this.guestSvc.equipments && this.guestSvc.equipments.find(e => e.equipmentId === eq);
        if (temp) {
          this.guestSvc.currentEquipments.push(temp);
        }
      }
    }
    this.guestSvc.currentOwner = this.guestSvc.users?.find(u => {
      return this.guestSvc.currentListing && u.userId === this.guestSvc.currentListing.owner
    }) ?? null;
    if (this.guestSvc.currentOwner && this.guestSvc.currentEquipments && this.guestSvc.currentEquipments.length > 0) {
      this.guestSvc.currentBooking = {} as Bookings;
      this.guestSvc.currentBooking.bookingId = String(Math.round(Math.random() * 100000));
      this.guestSvc.currentBooking.start = this.guestSvc.getTimestamp(this.listingForm.value.date1, this.listingForm.value.from);
      this.guestSvc.currentBooking.end = this.guestSvc.getTimestamp(this.listingForm.value.date1, this.listingForm.value.to);
      this.guestSvc.currentBooking.daybooking = false;
      this.guestSvc.currentBooking.guestId = this.guestSvc.wnGuest ? this.guestSvc.wnGuest.userId : undefined;
      this.guestSvc.currentBooking.hostId = this.guestSvc.currentOwner.userId;
      this.guestSvc.currentBooking.status = BOOKINGSTATUS.CREATION;

      let duration = this.guestSvc.getDuration(Number(this.guestSvc.currentBooking.start), Number(this.guestSvc.currentBooking.end));
      this.guestSvc.currentBooking.price = duration ? Math.round(this.guestSvc.currentListing ? this.guestSvc.currentListing.priceperhour * duration * 100 : 0) / 100 : 0;
      this.guestSvc.bookingTime.date = this.guestSvc.getDate(this.guestSvc.currentBooking.start);
      this.guestSvc.bookingTime.startTime = this.guestSvc.getTime(this.guestSvc.currentBooking.start);
      this.guestSvc.bookingTime.endTime = this.guestSvc.getTime(this.guestSvc.currentBooking.end);
      this.guestSvc.bookingTime.price = this.guestSvc.currentBooking.price;

      this.router.navigate(['/listing-detail']);
    }
  }

}
