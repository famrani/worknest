/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { UsersService, Users, regexEmail, regexMobileNo } from 'godigital-lib';
import { Router, } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { UtilsService, EDITSLIDE } from 'godigital-lib';
import { LocalUtilsService } from '../services/services.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ServicesService } from 'godigital-lib';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

interface ChatMessage {
  role: string;
  content: string;
}


@Injectable({
  providedIn: 'root'
})
export class GuestService {
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

  // ✅ Date: doit être au moins le prochain jour ouvré
  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const enteredDate = new Date(control.value);

    // Définir aujourd'hui
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Définir le "next working day"
    const nextWorkingDay = new Date(today);
    nextWorkingDay.setDate(today.getDate() + 1);

    // Si samedi (6) ➔ ajouter 2 jours (lundi)
    if (nextWorkingDay.getDay() === 6) {
      nextWorkingDay.setDate(nextWorkingDay.getDate() + 2);
    }
    // Si dimanche (0) ➔ ajouter 1 jour (lundi)
    else if (nextWorkingDay.getDay() === 0) {
      nextWorkingDay.setDate(nextWorkingDay.getDate() + 1);
    }

    // Remise à 00h00 pour éviter des problèmes d'heures
    nextWorkingDay.setHours(0, 0, 0, 0);

    return enteredDate >= nextWorkingDay ? null : { pastDate: true };
  }

  halfHourValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const [hours, minutes] = value.split(':').map(Number);
    if (minutes !== 0 && minutes !== 30) {
      return { notHalfHour: true };
    }
    return null;
  }

  // Validator pour forcer FROM < TO
  timeRangeValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const from = group.get('from')?.value;
    const to = group.get('to')?.value;

    if (!from || !to) return null;

    // Comparer les heures
    const [fromHours, fromMinutes] = from.split(':').map(Number);
    const [toHours, toMinutes] = to.split(':').map(Number);

    const fromTotal = fromHours * 60 + fromMinutes;
    const toTotal = toHours * 60 + toMinutes;

    if (toTotal <= fromTotal) {
      return { timeRangeInvalid: true };
    }
    return null;
  }

  getNextWorkingDay(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // If Saturday (6), add 2 days ➔ Monday
    if (tomorrow.getDay() === 6) {
      tomorrow.setDate(tomorrow.getDate() + 2);
    }
    // If Sunday (0), add 1 day ➔ Monday
    if (tomorrow.getDay() === 0) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }

    return tomorrow.toISOString().split('T')[0];
  }

  getTimestamp(date1, time1) {

    let fullDateTime = `${date1}T${time1}:00`; // Combine them into ISO format
    let timestamp = new Date(fullDateTime).getTime(); // Get timestamp

    return (String(timestamp)); // 👉 Will print timestamp in milliseconds
  }

  getDuration(startTimestamp, endTimestamp) {

    let durationMs = endTimestamp - startTimestamp; // duration in milliseconds
    let durationHours = durationMs / (1000 * 60 * 60); // convert ms -> hours

    return (durationHours); // e.g., 3 hours
  }

  getDate(timestamp) {
    const dateObj = new Date(Number(timestamp));

    // Format date
    const date = dateObj.toLocaleDateString();  // e.g., "4/30/2025" (depends on your locale)
    return (date);
  }

  getTime(timestamp) {
    const dateObj = new Date(Number(timestamp));

    // Format date
    const time = dateObj.toLocaleTimeString();  // e.g., "4:00 PM" (depends on your locale)
    return (time);
  }

  getIsoTime(timestamp) {
    const date = new Date(timestamp);

    // Convert to ISO string with timezone offset manually
    const tzOffset = -date.getTimezoneOffset();
    const diff = tzOffset >= 0 ? '+' : '-';
    const pad = (n) => String(Math.floor(Math.abs(n))).padStart(2, '0');
    const isoWithOffset = date.getFullYear()
      + '-' + pad(date.getMonth() + 1)
      + '-' + pad(date.getDate())
      + 'T' + pad(date.getHours())
      + ':' + pad(date.getMinutes())
      + ':' + pad(date.getSeconds())
      + diff + pad(tzOffset / 60) + ':' + pad(tzOffset % 60);

    return (isoWithOffset);
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
