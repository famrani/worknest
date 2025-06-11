import { Injectable, InjectionToken, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { UsersService, Users, ServicesService, UtilsService, Locations, Equipments, Messages, Feedbacks, Bookings, Locationtypes } from 'godigital-lib';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

//declare let what3words: any;
declare let $: any;

export interface chatElement {
  username: string;
  question: string;
  response: string;
  suggestedquestions: string[];
}



export const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');

@Injectable({
  providedIn: 'root'
})
export class LocalUtilsService {
  public wnGuest: Users;
  public currentPosition = {
    lat: 43.6280558,
    lng: 7.0358579,
    nearestCity: ''
  };
  public currentAddress = '';
  public errorMessage = {
    title: '',
    description: '',
    details: ''
  };

  public platform;

  public version;
  public event;
  public currentNickname = '';
  public geolocalised = 'yes';
  public currentEmail = '';
  public currentPassword = '';

  public opcoForm: FormGroup;
  public showModaltwoButtonsO: BehaviorSubject<any> = new BehaviorSubject(null);
  public showModaltwoButtonsSubscribtion: Subscription;

  public language = 'en';

  public regexPhone = /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;
  private apiKey = 'AIzaSyAgWkF2yefNoKGwRNdCQyoFp0zMwi9PdbQ';

  public locations: Locations[]|null;
  public filteredLocations: Locations[]|null;
  public locationtypes: Locationtypes[]|null;
  public equipments: Equipments[]|null;
  public messages: Messages[]|null;
  public feedbacks: Feedbacks[]|null;
  public users: Users[]|null;
  public bookings: Bookings[]|null;

  public currentUrl = '';

  public mode = 'Guest';

  public searchMode=0;

  public nearestCity='';

  public currentListing: Locations | null;
  public currentEquipments: Equipments[] | null;
  public currentOwner: Users | null;
  public currentBooking: Bookings | null;
  public subscriptions = new Subscription();
  

  public bookingTime = {
    date: '',
    startTime: '',
    endTime: '',
    duration: 0,
    price: 0
  }


  constructor(
    public http: HttpClient,
    public geolocation: Geolocation,
    public router: Router,
    public mainSvc: ServicesService,
    public usersSvc: UsersService,
    public utilsSvc: UtilsService,
    public spinner: NgxSpinnerService,
    @Inject(DOCUMENT) public document: Document,
  ) {
    this.init();
  }

  public init() {
    this.subscriptions.add(
      this.mainSvc.getLoggedUser().subscribe(user => {
        this.wnGuest = user as Users;
      })
    );

  }

  public geoLocalise(platform) {
    if (platform && platform.is('cordova')) {
      return new Promise((resolve, reject) => {
        this.geolocation.getCurrentPosition().then((resp) => {
          this.currentPosition.lat = resp.coords.latitude;
          this.currentPosition.lng = resp.coords.longitude;

          resolve(1);
        }).catch((error) => {
          console.log('error=', error);
          reject(error);
        });
      });
    } else {
        return new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            reject('Geolocation is not supported by this browser.');
          } else {
            navigator.geolocation.getCurrentPosition(
              position => resolve(position),
              error => {
                switch (error.code) {
                  case error.PERMISSION_DENIED:
                    reject(new Error('User denied the request for Geolocation.'));
                    break;
                  case error.POSITION_UNAVAILABLE:
                    reject(new Error('Location information is unavailable.'));
                    break;
                  case error.TIMEOUT:
                    reject(new Error('The request to get user location timed out.'));
                    break;
                  default:
                    reject(new Error('An unknown error occurred.'));
                    break;
                }
              });
            }
          });
      }
  }

    showModalNoButton(title: string, description: string) {
      this.errorMessage.title = title;
      this.errorMessage.description = description;
      $('#modal-no-buttons').modal('show');
    }

    showModaltwoButtons(title: string, description: string, details: string) {
      return new Promise(resolve => {
        this.errorMessage.title = title;
        this.errorMessage.description = description;
        this.errorMessage.details = details;
        $('#modal-two-buttons').modal('show');

        this.showModaltwoButtonsSubscribtion = this.getshowModaltwoButtons().subscribe(
          data => {
            if (this.showModaltwoButtonsSubscribtion !== undefined) {
              this.showModaltwoButtonsSubscribtion.unsubscribe();
            }
            if (data != null) {
              resolve(data);
            }
          }
        );
      });
    }

  public getshowModaltwoButtons(): Observable<any> {
    return this.showModaltwoButtonsO.asObservable();
  }
  public setshowModaltwoButtons(value: number) {
    this.showModaltwoButtonsO.next(value);
    this.showModaltwoButtonsO.next(null);
  }

  loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    const themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet';
      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }

  processLogin(email: string|undefined, password: string|undefined, adnUserId: string|undefined) {
    return new Promise((resolve, reject) => {
      this.mainSvc.loginOrValidateUser(email, password, adnUserId).then(
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

  logout() {
    this.mainSvc.disconnectingUser(this.wnGuest.userId);
    localStorage.clear();
    this.usersSvc.logout();
  }

  getCityFromCoords(lat: number, lng: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.apiKey}`;
    return this.http.get<any>(url);
  }

}
