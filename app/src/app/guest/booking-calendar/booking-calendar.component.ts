import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Bookings, BOOKINGSTATUS, UtilsService } from 'godigital-lib';
import { ServicesService } from 'godigital-lib';
import { Router } from '@angular/router';
import { GuestService } from '../guest.service';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { getDatabase, ref, push, set, query, orderByChild, equalTo, get, remove } from 'firebase/database';
import Swal from 'sweetalert2';
import tippy from 'tippy.js'; // <--- import tippy
//import 'tippy.js/dist/tippy.css'; // <--- import tippy styles

@Component({
  selector: 'app-booking-calendar',
  templateUrl: './booking-calendar.component.html',
  styleUrls: ['./booking-calendar.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class BookingCalendarComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('chatWindow', { static: false }) chatWindowRef: ElementRef;
  public componentName = 'booking-calendar.component';

  calendar: Calendar;

  constructor(
    public guestSvc: GuestService,
    public mainSvc: ServicesService,
    public utilsSvc: UtilsService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
    const db = this.utilsSvc.mdb;

    const calendarEl = document.getElementById('calendar')!;

    this.calendar = new Calendar(calendarEl, {
      plugins: [timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek',
      slotMinTime: '08:00:00',
      slotMaxTime: '20:00:00',
      slotDuration: '01:00:00',
      selectable: true,
      nowIndicator: true,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridDay,timeGridWeek'
      },
      eventContent: (arg) => {
        const booking: any = arg.event.extendedProps;
        const isCreation = booking.status === BOOKINGSTATUS.CREATION;

        let buttonsHtml = '';
        if (isCreation) {
          buttonsHtml = `
            <div class="fc-buttons">
              <button class="btn btn-success btn-sm" data-action="confirm" data-id="${arg.event.id}">✓</button>
              <button class="btn btn-danger btn-sm" data-action="cancel" data-id="${arg.event.id}">❌</button>
            </div>`;
        } else {
          buttonsHtml = `
            <div class="fc-buttons">
              <button class="btn btn-danger btn-sm" data-action="cancel" data-id="${arg.event.id}">❌</button>
            </div>`;
        }

        return {
          html: `
            <div class="fc-event-title">${arg.event.title}</div>
            ${buttonsHtml}
          `
        };
      },
      eventDidMount: (info) => {
        const booking = info.event.extendedProps;
        const tooltipContent = `
          <strong>Guest:</strong> ${booking.guestId || 'Unknown'}<br>
          <strong>Price:</strong> €${booking.price || 'N/A'}<br>
          <strong>Status:</strong> ${booking.status || 'N/A'}<br>
          <strong>Start:</strong> ${info.event.start?.toLocaleString() || ''}<br>
          <strong>End:</strong> ${info.event.end?.toLocaleString() || ''}
        `;

        tippy(info.el, {
          content: tooltipContent,
          allowHTML: true,
          placement: 'top',
          theme: 'light-border',
          delay: [100, 100],
          interactive: true,
        });
      },
      events: [],
      select: (info) => this.handleNewBooking(info, db)
    });

    this.loadBookings(db);

    if (this.guestSvc.currentBooking) {
      this.guestSvc.currentBooking.start = this.guestSvc.getIsoTime(Number(this.guestSvc.currentBooking.start));
      this.guestSvc.currentBooking.end = this.guestSvc.getIsoTime(Number(this.guestSvc.currentBooking.end));
      const eventToAdd = {
        id: this.guestSvc.currentBooking.bookingId || String(Math.round(Math.random() * 100000)),
        ...this.guestSvc.currentBooking,
        color: '#fd7e14'
      };
      this.calendar.addEvent(eventToAdd);
    }

    this.calendar.render();

    calendarEl.addEventListener('click', (e: any) => this.handleButtonClick(e));
  }

  private handleNewBooking(info: any, db: any) {
    Swal.fire({
      title: 'Confirm Booking',
      text: `Do you want to book from ${info.startStr} to ${info.endStr}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        const bookingId = String(Math.round((Math.random() * 10000)));
        const newbooking: Bookings = {
          bookingId: bookingId,
          hostId: this.guestSvc.currentListing?.owner,
          locationId: this.guestSvc.currentListing?.locationId,
          guestId: this.guestSvc.wnGuest?.userId,
          start: info.startStr,
          end: info.endStr,
          daybooking: false,
          price: this.guestSvc.bookingTime.price,
          status: BOOKINGSTATUS.PENDINGREQUEST
        };

        const bookingsRef = ref(db, 'backendbookings');
        const newBookingRef = push(bookingsRef);
        set(newBookingRef, newbooking);

        this.calendar.addEvent({ id: bookingId, ...newbooking, color: '#ffc107' });

        Swal.fire('Saved!', 'Booking created successfully.', 'success');
      }
    });
  }

  private handleButtonClick(event: any) {
    if (event.target.tagName === 'BUTTON') {
      const action = event.target.getAttribute('data-action');
      const eventId = event.target.getAttribute('data-id');
      const calendarEvent = this.calendar.getEventById(eventId);

      if (!calendarEvent) return;

      if (action === 'confirm') {
        Swal.fire('Confirmed!', 'Booking has been confirmed.', 'success');
        calendarEvent.setProp('color', '#198754');
      }

      if (action === 'edit') {
        Swal.fire('Edit Booking', 'Feature coming soon!', 'info');
      }

      if (action === 'cancel') {
        Swal.fire({
          title: 'Cancel Booking',
          text: `Do you want to cancel this booking?`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, cancel it',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.isConfirmed) {
            calendarEvent.remove();
            Swal.fire('Cancelled!', 'Booking has been removed.', 'success');
          }
        });
      }
    }
  }

  private loadBookings(db: any) {
    const bookingsQuery = query(ref(db, 'backendbookings'), orderByChild('locationId'), equalTo(<any>this.guestSvc.currentListing?.locationId));

    get(bookingsQuery).then(snapshot => {
      const bookings: any[] = [];
      snapshot.forEach(childSnapshot => {
        const data = childSnapshot.val();
        bookings.push({ id: data.bookingId, ...data, color: '#0d6efd' });
      });
      this.calendar.addEventSource(bookings);
    });
  }

  ngOnDestroy() {}

  ngAfterViewChecked() {}

  createForm() {}
}
