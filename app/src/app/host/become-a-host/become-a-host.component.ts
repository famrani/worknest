import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked, AfterViewInit } from '@angular/core';
import { FormsModule, FormControl, FormArray } from '@angular/forms';
import { Equipments, UtilsService } from 'godigital-lib';
import { ServicesService, Locations, OBJECTNAME } from 'godigital-lib';
import { Router, NavigationEnd } from '@angular/router';
import { HostService } from '../host.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

declare let $: any;

@Component({
  selector: 'app-become-a-host',
  templateUrl: './become-a-host.component.html',
  styleUrls: ['./become-a-host.component.css']
})
export class BecomeahostComponent implements OnInit {
  @ViewChild('businessaddress', { static: false }) businessaddress: ElementRef;
  becomeahostForm!: FormGroup;
  showAllEquipments = false;
  public subscriptions = new Subscription();
  public address;
  public photos = [] as string[];
  public roomequipments = [] as string[];
  public componentName = 'become-a-host.component';

  constructor(
    public hostSvc: HostService,
    public mainSvc: ServicesService,
    public utilsSvc: UtilsService,
    public fb: FormBuilder,
    public router: Router,
    public translateSvc: TranslateService,
  ) { }

  ngOnInit(): void {

    this.subscriptions.add(
      this.hostSvc.mainSvc.getLanguage().subscribe(language => {
        this.translateSvc.use(<any>language);
      })
    );
    this.subscriptions.add(
      // tslint:disable-next-line: deprecation
      this.hostSvc.mainSvc.getLocations().subscribe((locations) => {
        this.hostSvc.locations = locations;
        this.hostSvc.filteredLocations = locations && locations.filter(l => l.city.toLowerCase() === this.hostSvc.currentPosition.nearestCity.toLowerCase());
      }));

    this.subscriptions.add(
      // tslint:disable-next-line: deprecation
      this.hostSvc.mainSvc.getEquipments().subscribe((equipments) => {
        this.hostSvc.equipments = equipments;
        let random = Math.round(Math.random() * 1000);
        if (equipments && equipments.length > 0 && !this.becomeahostForm) {
          this.becomeahostForm = this.fb.group({
            spacetype: ['meeting-room', Validators.required],
            roomtitle: ['room title ' + random, Validators.required],
            roomaddress: ['', Validators.required],
            roomdescription: ['room description ' + random, Validators.required],
            roomnameornumber: ['room number ' + random],
            roomcapacity: [4, Validators.required],
            isroomshared: [false],
            privatenote: ['privatenote bla bla bla ' + random],
            pricehour: [10, Validators.required],
            priceday: [50, Validators.required],
            availability: ['weekdays', Validators.required],
            accessandrules: ['accessandrules ' + random, Validators.required],
            equipments: this.hostSvc.equipments ? this.fb.array(this.hostSvc.equipments.map((_, index) => {
              this.fb.control(false);
            })) : this.fb.array([])
          });

          this.equipmentsFormArray.controls.forEach((control, index) => {
            if (index < 4) {
              control.setValue(true);
            }
          });
        }
      }));
    this.subscriptions.add(
      // tslint:disable-next-line: deprecation
      this.hostSvc.mainSvc.getLocationtypes().subscribe((locationtypes) => {
        this.hostSvc.locationtypes = locationtypes;
      }));
    this.subscriptions.add(
      // tslint:disable-next-line: deprecation
      this.hostSvc.mainSvc.getUsers().subscribe((users) => {
        this.hostSvc.users = users;
      }));
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

  get equipmentsFormArray(): FormArray {
    return this.becomeahostForm.get('equipments') as FormArray;
  }

  toggleEquipments(): void {
    this.showAllEquipments = !this.showAllEquipments;
  }

  async onSubmit(): Promise<void> {
    if (this.hostSvc.wnGuest) {
      if (this.hostSvc.wnGuest.stripeAccountId) {
        this.onSubmit2();
      } else {
        $('#stripeModal').modal('show');
      }
    }
  }

  async onSubmit2(): Promise<void> {
    if (this.becomeahostForm.valid) {
      const formValues = this.becomeahostForm.value;
      const selectedEquipments = this.hostSvc.equipments && this.hostSvc.equipments
        .filter((_, index) => formValues.equipments[index])
        .map(eq => eq.title);

      const submission = {
        ...formValues,
        selectedEquipments,
      };

      if (this.hostSvc.equipments) {
        for (let i = 0; i < this.hostSvc.equipments?.length; i++) {
          if (formValues.equipments[i]) {
            this.roomequipments.push(this.hostSvc.equipments[i].equipmentId);
          }
          i++;
        }
      }

      let newLocation = {} as Locations;
      newLocation.locationId = String(Math.round(Math.random() * 100000));
      newLocation.accessandrules = formValues.accessandrules;
      newLocation.address = formValues.roomaddress;
      newLocation.availability = formValues.availability;
      newLocation.capacity = formValues.roomcapacity;
      newLocation.city = this.address && this.address.locality ? this.address.locality : '';
      newLocation.description = formValues.roomdescription;
      newLocation.equipments = this.roomequipments;
      newLocation.lat = this.address && this.address.lat ? this.address.lat : 0;
      newLocation.lng = this.address && this.address.lng ? this.address.lng : 0;
      newLocation.nameornumber = formValues.roomnameornumber;
      newLocation.owner = this.hostSvc.wnGuest.userId;
      newLocation.photos = this.photos;
      newLocation.priceperday = formValues.priceday;
      newLocation.priceperhour = formValues.pricehour;
      newLocation.privatenote = formValues.privatenote;
      newLocation.shared = formValues.isroomshared;
      newLocation.title = formValues.roomtitle;
      newLocation.type = formValues.spacetype;

      await this.mainSvc.storeDbSvc.updateObject(this.utilsSvc.backendFBstoreId, this.utilsSvc.mdb, OBJECTNAME.wnLocations, newLocation, newLocation.locationId);
      await this.createStripeExpressAccount();

      // You can send this to your backend API
    } else {
      this.becomeahostForm.markAllAsTouched();
    }
  }

  onSpaceTypeChange(selectedType: string): void {
    // Reset fields or add specific controls based on the spaceType
    // You can add/remove validators dynamically here if needed

    // Example: adjust required fields for "apartment"
    if (selectedType === 'apartment') {
      this.becomeahostForm.get('roomcapacity')?.setValidators([Validators.required, Validators.min(1)]);
      // Add or modify other controls based on type if needed
    }
    this.becomeahostForm.get('roomcapacity')?.updateValueAndValidity();
  }

  uploadFile(event: any) {
    const files: FileList = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!file.type.startsWith('image/')) {
        alert('Only image files are allowed.');
        continue;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.photos.push(e.target.result); // Add base64 to preview
      };
      reader.readAsDataURL(file);

      // OPTIONAL: upload to server in parallel if you want
      const directory = '/worknest/locations/meetingrooms/';
      this.mainSvc.storeDbSvc.uploadObjects({ target: { files: [file] } }, directory).then(
        (data: any) => {
          // If you prefer, you can update `photos` here with the server URL instead of base64
        },
        error => console.error('Upload error:', error)
      );
    }
  }

  async createStripeExpressAccount() {
    try {
      const email = this.hostSvc.wnGuest.email;
      const userId = this.hostSvc.wnGuest.userId;
      this.mainSvc.createStripeExpressAccount(email, '', '').then(
        (response) => {
          const onboardingUrl = response;
          if (onboardingUrl) {
            window.location.href = onboardingUrl; // 🚀 Redirect to Stripe onboarding
          }
        },
        (error) => {
          console.error('Error creating Stripe Express Account:', error);
          alert('An error occurred while creating your Stripe account. Please try again.');
        }
      );
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('An unexpected error occurred.');
    }
  }

}
