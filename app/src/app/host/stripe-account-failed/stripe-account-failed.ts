import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormsModule, FormControl, FormArray } from '@angular/forms';
import { Equipments, UtilsService } from 'godigital-lib';
import { ServicesService, Locations, OBJECTNAME } from 'godigital-lib';
import { Router, ActivatedRoute } from '@angular/router';
import { HostService } from '../host.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

declare let $: any;

@Component({
  selector: 'app-stripe-account-failed',
  templateUrl: './stripe-account-failed.html',
  styleUrls: ['./stripe-account-failed.css']
})
export class StripeAccountFailedComponent {
  @ViewChild('businessaddress', { static: false }) businessaddress: ElementRef;
  becomeahostForm!: FormGroup;
  showAllEquipments = false;
  public subscriptions = new Subscription();
  public address;
  public photos = [] as string[];
  public roomequipments = [] as string[];
  public componentName = 'stripe-account-failed';

  constructor(
    public hostSvc: HostService,
    public mainSvc: ServicesService,
    public utilsSvc: UtilsService,
    public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public translateSvc: TranslateService,
  ) { }

  message = '⚠️ Stripe onboarding was not completed.';

  restartOnboarding() {
    this.router.navigate(['/become-a-host']);
  }
}