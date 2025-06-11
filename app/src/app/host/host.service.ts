/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Users, UsersService,  } from 'godigital-lib';
import { Router, } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UtilsService, EDITSLIDE } from 'godigital-lib';
import { LocalUtilsService } from '../services/services.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService,  } from 'godigital-lib';
import { chatElement } from '../services/services.service';

interface ChatMessage {
  role: string;
  content: string;
}


@Injectable({
  providedIn: 'root'
})
export class HostService {
  public signinForm: FormGroup;
  public address;
  public currentPlaceId;
  constructor(
    private router: Router,
    public mainSvc: ServicesService,
    private utilsSvc: UtilsService,
    private usersSvc: UsersService,
    public localUtilsSvc: LocalUtilsService,
    public fb: FormBuilder,
    public http: HttpClient,
    public spinner: NgxSpinnerService,
  ) { }

  getGoogleMetadata(gmid: string) {
    return new Promise((resolve, reject) => {
      const params = new HttpParams()
        .set('placeId', gmid);
      // tslint:disable-next-line: deprecation
      this.http.get(this.utilsSvc.backendURL + 'utils/getGoogleMetadata', { params }).subscribe(
        data => {
          resolve(data);
        },
        error => {
          console.log('error=', error);
          reject(error);
        }
      );

    });
  }

  updateBackendUser(adnUser) {
    return new Promise((resolve, reject) => {
      this.usersSvc.updateUser(adnUser).then(
        data => resolve(data), error => reject(error)
      );
    });
  }

  forgotPwd(emailPwdRecovery) {
    this.usersSvc.resetPwdUser(emailPwdRecovery).then(
      () => {
        this.localUtilsSvc.showModalNoButton('password reset',
          'An email for recovering your password has been sent to this email adress.');
        this.router.navigate(['/login']);
      },
      error => {
        this.localUtilsSvc.showModalNoButton('password reset',
          'no account exists under this email. please check again.');
        this.router.navigate(['/login']);
      }
    );
  }

  createForm() {
  }

  get wnGuest() {
    return this.localUtilsSvc.wnGuest;
  }
  set wnGuest(value: Users) {
    this.localUtilsSvc.wnGuest = value;
  }

  get errorMessage() {
    return this.localUtilsSvc.errorMessage;
  }
  set errorMessage(value) {
    this.localUtilsSvc.errorMessage = value;
  }

  get version() {
    return this.mainSvc.version;
  }
  set version(value) {
    this.mainSvc.version = value;
  }

  get locations() {
    return this.localUtilsSvc.locations;
  }
  set locations(value) {
    this.localUtilsSvc.locations = value;
  }
  get filteredLocations() {
    return this.localUtilsSvc.filteredLocations;
  }
  set filteredLocations(value) {
    this.localUtilsSvc.filteredLocations = value;
  }
  get equipments() {
    return this.localUtilsSvc.equipments;
  }
  set equipments(value) {
    this.localUtilsSvc.equipments = value;
  }
  get bookings() {
    return this.localUtilsSvc.bookings;
  }
  set bookings(value) {
    this.localUtilsSvc.bookings = value;
  }
  get locationtypes() {
    return this.localUtilsSvc.locationtypes;
  }
  set locationtypes(value) {
    this.localUtilsSvc.locationtypes = value;
  }
  get currentPosition() {
    return this.localUtilsSvc.currentPosition;
  }
  set currentPosition(value) {
    this.localUtilsSvc.currentPosition = value;
  }
  get searchMode() {
    return this.localUtilsSvc.searchMode;
  }
  set searchMode(value) {
    this.localUtilsSvc.searchMode = value;
  }
  get nearestCity() {
    return this.localUtilsSvc.nearestCity;
  }
  set nearestCity(value) {
    this.localUtilsSvc.nearestCity = value;
  }
  get currentListing() {
    return this.localUtilsSvc.currentListing;
  }
  set currentListing(value) {
    this.localUtilsSvc.currentListing = value;
  }
  get currentEquipments() {
    return this.localUtilsSvc.currentEquipments;
  }
  set currentEquipments(value) {
    this.localUtilsSvc.currentEquipments = value;
  }
  get currentOwner() {
    return this.localUtilsSvc.currentOwner;
  }
  set currentOwner(value) {
    this.localUtilsSvc.currentOwner = value;
  }
  get users() {
    return this.localUtilsSvc.users;
  }
  set users(value) {
    this.localUtilsSvc.users = value;
  }
  get currentBooking() {
    return this.localUtilsSvc.currentBooking;
  }
  set currentBooking(value) {
    this.localUtilsSvc.currentBooking = value;
  }
  get bookingTime() {
    return this.localUtilsSvc.bookingTime;
  }
  set bookingTime(value) {
    this.localUtilsSvc.bookingTime = value;
  }



}
