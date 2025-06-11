import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsService } from 'godigital-lib';
import { ServicesService, UsersService } from 'godigital-lib';
import { Router, NavigationEnd } from '@angular/router';
import {GuestService} from '../guest.service';

interface ChatMessage {
  role: string;
  content: string;
}

@Component({
  selector: 'app-listing-details',
  templateUrl: './listing-details.component.html',
  styleUrls: ['./listing-details.component.css'],
  imports: [FormsModule]
})
export class ListingdetailsComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('textInput') textInputInput: any;
  @ViewChild('chatWindow', { static: false }) chatWindowRef: ElementRef;
  public componentName = 'listing-details.component';

  isCollapsed: boolean = true;

  constructor(
    public guestSvc: GuestService,
    public mainSvc: ServicesService,
    public utilsSvc: UtilsService,
    public router: Router,
    ) { }

  ngOnInit() {
    if (!this.guestSvc.currentListing) {
    }
  }

  ngOnDestroy() {
  }

  ngAfterViewChecked() {
  }

  goHome(){
    this.router.navigate(['/home']);
  }

  goToCalendar() {
    this.guestSvc.currentBooking = null;
    this.router.navigate(['/booking-calendar']);
  }

}
