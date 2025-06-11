import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsService } from 'godigital-lib';
import { ServicesService, UsersService } from 'godigital-lib';
import { Router, NavigationEnd } from '@angular/router';
import { HostService } from '../host.service';
import { chatElement } from '../../services/services.service';

interface ChatMessage {
  role: string;
  content: string;
}

@Component({
  selector: 'app-hostdashboard',
  templateUrl: './hostdashboard.component.html',
  styleUrls: ['./hostdashboard.component.css'],
  imports: [FormsModule]
})
export class HostdashboardComponent implements OnInit, OnDestroy, AfterViewChecked {
  public componentName = 'hostdashboard.component';
  upcomingBookings = [
    { spaceTitle: 'Meeting Room A', date: 'May 2', time: '10:00 AM - 12:00 PM', guestName: 'Alice Dupont' },
    { spaceTitle: 'Zen Room', date: 'May 3', time: '2:00 PM - 4:00 PM', guestName: 'Mark Stevens' },
    { spaceTitle: 'Workshop Space', date: 'May 5', time: '9:00 AM - 11:00 AM', guestName: 'Chloé Dubois' }
  ];
  
  constructor(
    public hostSvc: HostService,
    public mainSvc: ServicesService,
    public utilsSvc: UtilsService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy() {
  }

  ngAfterViewChecked() {
  }

  createForm() {
    this.hostSvc.createForm();
  }

  goHome() {
    this.router.navigate(['/home']);
  }

}
