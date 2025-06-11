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
  selector: 'app-stripe-account-confirm',
  templateUrl: './stripe-account-confirm.html',
  styleUrls: ['./stripe-account-confirm.css']
})
export class StripeAccountConfirmComponent implements OnInit {
  @ViewChild('businessaddress', { static: false }) businessaddress: ElementRef;
  becomeahostForm!: FormGroup;
  showAllEquipments = false;
  public subscriptions = new Subscription();
  public address;
  public photos = [] as string[];
  public roomequipments = [] as string[];
  public componentName = 'stripe-account-confirm';

  constructor(
    public hostSvc: HostService,
    public mainSvc: ServicesService,
    public utilsSvc: UtilsService,
    public fb: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public translateSvc: TranslateService,
  ) { }

  stripeAccountId: string | null = null;
  message = 'Checking your Stripe account...';

  ngOnInit(): void {
    this.route.queryParams.subscribe(async (params) => {
      this.stripeAccountId = params['account_id'];

      if (this.stripeAccountId) {
        try {
          this.hostSvc.wnGuest.stripeAccountId = this.stripeAccountId;
          await this.mainSvc.storeDbSvc.updateObject(this.utilsSvc.backendFBstoreId, this.utilsSvc.mdb, OBJECTNAME.wnUsers, this.hostSvc.wnGuest, this.hostSvc.wnGuest.userId);
          this.message = '✅ Your Stripe account has been successfully linked to WorkNest.';
        } catch (error) {
          this.message = '⚠️ An error occurred while saving your Stripe account. Please contact support.';
          console.error('Error saving Stripe account:', error);
        }
      } else {
        this.message = '❌ Missing Stripe account ID. Please try again or restart onboarding.';
      }
    });
  }
}