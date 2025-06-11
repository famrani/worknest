import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { UtilsService } from 'godigital-lib';
import { ServicesService, UsersService } from 'godigital-lib';
import { Router, NavigationEnd } from '@angular/router';
import { GuestService } from '../guest.service';
import { Subscription, } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

interface ChatMessage {
  role: string;
  content: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [FormsModule]
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('businessaddress', { static: false }) businessaddress: ElementRef;
  public componentName = 'home.component';
  public subscriptions = new Subscription();
  public homeForm: FormGroup;
  public address;

  isCollapsed: boolean = true;

  constructor(
    public guestSvc: GuestService,
    public fb: FormBuilder,
    public mainSvc: ServicesService,
    public utilsSvc: UtilsService,
    public router: Router,
    public translateSvc: TranslateService,
  ) { }

  ngOnInit() {
    this.createForm();

    this.subscriptions.add(
      this.guestSvc.mainSvc.getLanguage().subscribe(language => {
        this.translateSvc.use(<any>language);
      })
    );
    this.subscriptions.add(
      // tslint:disable-next-line: deprecation
      this.guestSvc.mainSvc.getLocations().subscribe((locations) => {
        this.guestSvc.locations = locations;
        this.guestSvc.filteredLocations = locations && locations.filter(l => l.city.toLowerCase() === this.guestSvc.currentPosition.nearestCity.toLowerCase());
      }));

    this.subscriptions.add(
      // tslint:disable-next-line: deprecation
      this.guestSvc.mainSvc.getEquipments().subscribe((equipments) => {
        this.guestSvc.equipments = equipments;
      }));
    this.subscriptions.add(
      // tslint:disable-next-line: deprecation
      this.guestSvc.mainSvc.getLocationtypes().subscribe((locationtypes) => {
        this.guestSvc.locationtypes = locationtypes;
      }));
    this.subscriptions.add(
      // tslint:disable-next-line: deprecation
      this.guestSvc.mainSvc.getUsers().subscribe((users) => {
        this.guestSvc.users = users;
      }));

  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewChecked() {
  }

  createForm() {
    this.homeForm = this.fb.group({
      address: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    });
  }

  async generateResponse() {
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  searchListings() {
    if (this.homeForm.controls.address.valid) {
      this.guestSvc.nearestCity = this.homeForm.value.address;
      localStorage.setItem('nearestCity', this.guestSvc.nearestCity);
    }
    else if (this.guestSvc.currentPosition && this.guestSvc.currentPosition.nearestCity && this.guestSvc.currentPosition.nearestCity.length > 0) {
      this.guestSvc.nearestCity = this.guestSvc.currentPosition.nearestCity
      localStorage.setItem('nearestCity', this.guestSvc.nearestCity);
    } else {
      this.guestSvc.nearestCity = localStorage.getItem('nearestCity') ?? '';
    }
    this.guestSvc.filteredLocations = this.guestSvc.locations && this.guestSvc.locations.filter(
      l => {
        return l.city.toLowerCase().indexOf(this.guestSvc.nearestCity.toLowerCase()) >= 0;
      });
    this.router.navigate(['/listings'])
  }

}
