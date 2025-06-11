import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UtilsService } from 'godigital-lib';
import { ServicesService, UsersService } from 'godigital-lib';
import { Router, NavigationEnd } from '@angular/router';
import {GuestService} from '../guest.service';
import {chatElement} from '../../services/services.service';

interface ChatMessage {
  role: string;
  content: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  imports: [FormsModule]
})
export class ContactComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('textInput') textInputInput: any;
  @ViewChild('chatWindow', { static: false }) chatWindowRef: ElementRef;
  public componentName = 'contact.component';

  isCollapsed: boolean = true;

  constructor(
    public guestSvc: GuestService,
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
  }


}
