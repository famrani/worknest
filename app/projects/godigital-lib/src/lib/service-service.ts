/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
import { Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpEvent, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, Subscription, Observable } from 'rxjs';
import { StoreDbService, OBJECTNAME,AUTHSTATUS} from './firebase-service';
import { UtilsService, dayInMilliseconds } from './utils.service';
import { UsersService, } from './users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXLogger } from 'ngx-logger';
import { ScriptLoadingService } from './script-loading.service';

import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

import { saveAs } from 'file-saver';

export const externalUrlProvider = new InjectionToken(
    'externalUrlRedirectResolver'
);
import { FormGroup } from '@angular/forms';

export enum EDITSLIDE {
    CREATIONSLIDE = 0,
    EDITIONSLIDE = 1
}

export enum BOOKINGSTATUS {
    CREATION = 'creation',
    REQUESTED = 'requested',
    PENDINGREQUEST = 'pendind request',
    APPROVED = 'approved',
    PENDINGCANCEL = 'pendind cancel',
    CANCELLED = 'cancelled',
}

export const regexUrl = /https?:\/\//;
export const regexUrlImage = /(https?:\/\/.*\.(?:png|jpg|jpeg))/;
export const regexUrlVideo = /(https?:\/\/.*\.(?:mp4|avi))/;
export const regexUrlMedia = /(^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$)|((https?:\/\/.*\.(?:mp4|avi|png|jpg|jpeg)))/;
export const regexMobileNo = /(^(0033|\+33|0)(6|7)(\d{8})$)|(^\+44\d{10}$)|(^\+31\d{8,10}$)|(^\+34(\d{8,10})$)|(^\+41(\d{8,10})$)|(^\+39(\d{8,10})$)/;
export const regexFixedNo = /(^(0033|\+33|0)(1|2|3|4|5|8|9)(\d{8})$)|(^\+44\d{10}$)|(^\+31\d{8,10}$)|(^\+34(\d{8,10})$)|(^\+41(\d{8,10})$)|(^\+39(\d{8,10})$)/;
export const regexEmail = /^[^@]+@[a-z0-9.-]+\.[a-z]{2,3}$/;


export interface Users {
    userId: string;
    password: string;
    fullname: string;
    socialnetworklink: string;
    stripeAccountId: string;
    stripeAccountStatus: string;
    mobileNo: string;
    email: string;
    address: string;
    lat: string;
    lng: string;
    companyname: string;
    country: string;
    emailverified: boolean;
}

export interface Bookings {
    bookingId: string;
    hostId: string | undefined;
    guestId: string | undefined;
    locationId: string | undefined;
    start: string;
    end: string;
    daybooking: boolean;
    price: number,
    status: string
}

export interface Locations {
    locationId: string;
    title: string;
    nameornumber: string;
    description: string;
    photos: string[];
    equipments: string[];
    priceperhour: number;
    priceperday: number;
    address: string;
    city: string;
    type: string;
    owner: string;
    capacity: number;
    shared: boolean;
    privatenote: string;
    availability: string;
    accessandrules: string;
    lat: number;
    lng: number;
}
export interface Locationtypes {
    locationtypeId: string;
    title: string;
    description: string;
}

export interface Feedbacks {
    feedbackId: string;
    userId: string;
    bookingId: string;
    rate: number;
    description: string;
}

export interface Messages {
    messageId: string;
    sender: string;
    receiver: string;
    timestamp: number;
    message: string;
}

export interface Equipments {
    equipmentId: string;
    title: string;
    description: string;
}

@Injectable({
    providedIn: 'root'
})
export class ServicesService {
    public config;

    public backendFbObjects = [
        OBJECTNAME.wnBookings,
        OBJECTNAME.wnEquipments,
        OBJECTNAME.wnFeedbacks,
        OBJECTNAME.wnLocations,
        OBJECTNAME.wnLocationtypes,
        OBJECTNAME.wnMessages,
        OBJECTNAME.wnUsers,
    ];

    public wnUser: Users | null;
    public wnUserO: BehaviorSubject<Users | null> = new BehaviorSubject<Users | null>(null);

    public wnGuest: Users[] | null;
    public wnGuestO: BehaviorSubject<Users[] | null> = new BehaviorSubject<Users[] | null>(null);

    public wnHost: Users[] | null;
    public wnHostO: BehaviorSubject<Users[] | null> = new BehaviorSubject<Users[] | null>(null);

    public wnBookings: Bookings[] | null;
    public wnBookingsO: BehaviorSubject<Bookings[] | null> = new BehaviorSubject<Bookings[] | null>(null);

    public wnLocations: Locations[] | null;
    public wnLocationsO: BehaviorSubject<Locations[] | null> = new BehaviorSubject<Locations[] | null>(null);

    public wnLocationtypes: Locationtypes[] | null;
    public wnLocationtypesO: BehaviorSubject<Locationtypes[] | null> = new BehaviorSubject<Locationtypes[] | null>(null);

    public wnEquipments: Equipments[] | null;
    public wnEquipmentsO: BehaviorSubject<Equipments[] | null> = new BehaviorSubject<Equipments[] | null>(null);

    public wnMessages: Messages[] | null;
    public wnMessagesO: BehaviorSubject<Messages[] | null> = new BehaviorSubject<Messages[] | null>(null);

    public wnFeedbacks: Feedbacks[] | null;
    public wnFeedbacksO: BehaviorSubject<Feedbacks[] | null> = new BehaviorSubject<Feedbacks[] | null>(null);

    public version;
    public firebaseBSSdata = {};
    public languageO: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

    public errorMessage = {
        title: '',
        description: '',
        details: ''
    };

    public currentPosition = {
        lat: 0,
        lng: 0
    };

    public progress = 0;

    constructor(
        public http: HttpClient,
        public router: Router,
        public storeDbSvc: StoreDbService,
        public utilSvc: UtilsService,
        public usersSvc: UsersService,
        public spinner: NgxSpinnerService,
        public scriptLoadingSvc: ScriptLoadingService,
        public logger: NGXLogger,
    ) {
    }

    logDS(...args: any[]) {
        let logText = '';
        for (let i = 1; i < args.length; i++) {
            logText = logText + args[i] + ',';
        }
        const userId =
            this.wnGuest
                ? this.wnUser ? this.wnUser.userId : undefined
                : 'Guest';

        logText =
            args[0] +
            ',' +
            this.utilSvc.appName +
            ',' +
            userId +
            ',' +
            this.currentPosition.lat +
            ',' +
            this.currentPosition.lng +
            ',' +
            logText;
        this.logger.info(logText);
    }

    public readConfigFile(env) {
        return new Promise((resolve, reject) => {
            this.utilSvc.readConfig('./assets/config/adf.json').then(
                (data: any) => {
                    this.config = data;
                    const backendURLString = 'backendURL';
                    if (!this.utilSvc.language) {
                        this.utilSvc.language = 'fr';
                    }

                    if (!env || !env.platform) {
                        this.utilSvc.platform = this.config.application?.platform;
                        env = {};
                        env.platform = this.utilSvc.platform;
                    } else {
                        this.utilSvc.platform = env.platform;
                    }
                    this.utilSvc.backendURL = data[env.platform][backendURLString];
                    if (this.config.application && this.config.application.stripeplatform) {
                        this.utilSvc.stripeplatform = this.config.application.stripeplatform;
                    } else {
                        this.utilSvc.stripeplatform = 'test';
                    }
                    if (this.config.application) {
                        if (this.config.application.release) {
                            this.version =
                                env.platform + '/' + this.config.application.release;
                        }
                    }
                    if (this.config[this.utilSvc.platform].backendWSUrl) {
                        this.utilSvc.backendWSURL = this.config[this.utilSvc.platform].backendWSUrl;
                    }
                    this.utilSvc.qcURL = this.config[env.platform].qcURL;
                    this.utilSvc.qcPort = this.config[env.platform].qcPort;
                    this.utilSvc.analyticsUrl = this.config[env.platform].analyticsUrl;
                    this.utilSvc.backendURL = this.config[env.platform].backendURL;
                    this.utilSvc.appName = this.utilSvc.appName;
                    resolve(this.config);
                },
                error => {
                    reject(error);
                }
            );
        });
    }

    public initBEService(env) {
        return new Promise((resolve, reject) => {
            const backendFbConfig = this.config[env.platform].firebaseMasterConfig;
            this.storeDbSvc.initFB(this.utilSvc.backendFBstoreId, backendFbConfig, 'goDigitalBE', true, true,
                this.backendFbObjects, this.storeDbSvc.backendFbRef).then(
                    async () => {
                        const databaseString = 'database';
                        const authString = 'auth';
                        this.utilSvc.mdb = this.storeDbSvc.backendFbRef[databaseString];
                        this.utilSvc.mauth = this.storeDbSvc.backendFbRef[authString];
                        this.backendFbObjects.forEach(fo => {
                            this.storeDbSvc.subscribeObject(this.utilSvc.backendFBstoreId, this.utilSvc.mdb, fo);
                        });
                        this.subscribeUsers();
                        this.subscribeLocations();
                        this.subscribeEquipments();
                        this.subscribeMessages();
                        this.subscribeFeedbacks();
                        this.subscribeBookings();
                        this.subscribeLocationtypes();
                        resolve(1);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    }

    public closeBEService() {
        return new Promise((resolve, _reject) => {
            this.unsubscribeUsers();
            this.unsubscribeLocations();
            this.unsubscribeEquipments();
            this.unsubscribeMessages();
            this.unsubscribeFeedbacks();
            this.unsubscribeBookings();
            this.unsubscribeLocationtypes();

            this.backendFbObjects.forEach(fo => {
                this.storeDbSvc.unsubscribeObject(this.utilSvc.backendFBstoreId, this.utilSvc.mdb, fo);
            });
            this.utilSvc.mdb = undefined;
            this.utilSvc.mst = undefined;
            this.utilSvc.mauth = undefined;

            this.storeDbSvc.closeFB(
                this.utilSvc.backendFBstoreId,
                this.backendFbObjects,
                this.storeDbSvc.backendFbRef
            );
            resolve(1);
        });
    }

    initStorageFb(env) {
        return new Promise((resolve, reject) => {
            const storageString = 'storage';
            this.storeDbSvc.initFB(this.utilSvc.backendFBstoreId2, this.config[env.platform].firebaseStorageConfig, 'goDigitalBE2', true, false, [], this.storeDbSvc.storageFbRef).then(() => {
                this.utilSvc.mst = this.storeDbSvc.storageFbRef[storageString];
                resolve(this.storeDbSvc.storageFbRef);
            },
                error => reject(error));
        });
    }

    closeStorageFb(storeId: string, fbObjects: Array<string>, storeFbRef: Array<any>) {
        return new Promise((resolve, reject) => {
            this.utilSvc.mst = undefined;

            this.storeDbSvc.closeFB(
                this.utilSvc.backendFBstoreId2,
                this.backendFbObjects,
                this.storeDbSvc.storageFbRef
            );
            resolve(1);
        });
    }

    public getUser(): Observable<Users | null> {
        return this.wnUserO.asObservable();
    }
    public setUser(users: Users | null) {
        this.wnUser = users;
        this.wnUserO.next(users);
    }


    public resetVariables() {
        this.storeDbSvc.storageFbRef = [];
        this.setUser(null);
    }

    public getHosts(wnHost: Users) {
        return new Promise((resolve, reject) => {
            let params1 = new HttpParams();
            if (wnHost && wnHost.stripeAccountId) {
                params1 = params1.set('connectedAccountId', wnHost.stripeAccountId);
                this.http.get(this.utilSvc.backendURL + 'stripe/customer/list', { params: params1, responseType: 'json' }).subscribe(
                    data => {
                        resolve(data);
                    },
                    error => {
                        reject(error);
                    }
                );
            } else {
                resolve({});
            }
        });
    }

    public exportObjects(objects, objectName) {
        const json = JSON.stringify(objects);
        const blob = new Blob([json], { type: 'application/json' });
        saveAs(blob, objectName + '.json');
    }

    public exportString(strings, objectName) {
        const blob = new Blob([strings], { type: 'application/json' });
        saveAs(blob, objectName + '.csv');
    }

    public stringToDate(stringDate: string) {
        const regexDate = /([0-9]{2})([0-9]{2})([0-9]{4})/;
        const dateTemp1 = regexDate.exec(stringDate);
        if (dateTemp1 && dateTemp1 != null && dateTemp1[3]) {
            return new Date(dateTemp1[3] + '-' + dateTemp1[2] + '-' + dateTemp1[1]).getTime();
        } else {
            return 0;
        }
    }

    subscribeUsers() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnUsers].subscribe(
            data => {
                const temp = data && data[0] ? this.utilSvc.objectToArray(data[0]) : null;
                this.setUsers(temp);
            }
        );
    }

    unsubscribeUsers() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(beStoreId, this.utilSvc.mdb, OBJECTNAME.wnUsers);
        this.setUsers(null);
    }

    public getUsers(): Observable<Users[] | null> {
        return this.usersSvc.allUsersO.asObservable();
    }
    public setUsers(value: Users[] | null) {
        this.usersSvc.allUsers = value;
        this.usersSvc.allUsersO.next(value);
    }

    async loginOrValidateUser(email?: string, password?: string, firebaseUid?: string): Promise<any> {
        const auth = this.utilSvc.mauth;
        const db = this.utilSvc.mdb;

        if (email && password) {
            // 🔥 Login with email/password
            try {
                const userCredential = await auth.signInWithEmailAndPassword(email, password);
                const user = userCredential.user;
                if (user && user.emailVerified) {
                    try {
                        const userf = await this.storeDbSvc.getObject(this.utilSvc.backendFBstoreId, this.utilSvc.mdb, OBJECTNAME.wnUsers, user.uid) as Users;
                        if (userf) {
                            this.setLoggedUser(userf);
                            return ([AUTHSTATUS.SUCCESS, userf]);
                        } else {
                            console.error('❌ User not found in Realtime Database.');
                            this.setLoggedUser(undefined);
                            throw ([AUTHSTATUS.UNKNOWNERROR,new Error('User not found in Realtime Database.')]);
                        }
                    } catch (error) {
                        console.error('❌ Error checking user existence:', error);
                        this.setLoggedUser(undefined);
                        throw ([AUTHSTATUS.UNKNOWNERROR,error]);
                    }
                } else {
                    throw ([AUTHSTATUS.EMAILNOTVERIFIED, ''])
                }
            } catch (error) {
                console.error('❌ Login failed:', error);
                this.setLoggedUser(undefined);
                throw ([AUTHSTATUS.UNKNOWNERROR,error]);
            }
        } else if (firebaseUid) {
            // 🔥 Validate that user exists in Realtime Database
            try {
                const userf = await this.storeDbSvc.getObject(this.utilSvc.backendFBstoreId, this.utilSvc.mdb, OBJECTNAME.wnUsers, firebaseUid) as Users;
                if (userf) {
                    try {
                        const userCredential = await auth.signInWithEmailAndPassword(userf.email, userf.password);
                        const user = userCredential.user;
                        this.setLoggedUser(userf);
                        return ([AUTHSTATUS.SUCCESS, userf]);
                    } catch (error) {
                        console.error('❌ Login failed:', error);
                        this.setLoggedUser(undefined);
                        throw ([AUTHSTATUS.UNKNOWNERROR,error]);
                    }
                } else {
                    console.error('❌ User not found in Realtime Database.');
                    this.setLoggedUser(undefined);
                    throw ([AUTHSTATUS.UNKNOWNERROR, new Error('User not found in Realtime Database.')]);
                }
            } catch (error) {
                console.error('❌ Error checking user existence:', error);
                this.setLoggedUser(undefined);
                throw ([AUTHSTATUS.UNKNOWNERROR,error]);
            }
        } else {
            this.setLoggedUser(undefined);
            throw ([AUTHSTATUS.UNKNOWNERROR, new Error('You must provide either email/password or firebaseUid.')]);
        }
    }

    disconnectingUser(adnUserId) {
        if (adnUserId) {
            this.unsubscribeUser(adnUserId);
            this.setLoggedUser(undefined);
            this.utilSvc.clearUid();
            this.usersSvc.logout();
        }
    }

    public subscribeUser(_adnUserId: string) {
        if (this.firebaseBSSdata[OBJECTNAME.wnUsers]) {
            this.firebaseBSSdata[OBJECTNAME.wnUsers].unsubscribe();
        }
        this.firebaseBSSdata[OBJECTNAME.wnUsers] =
            this.storeDbSvc.firebaseBSSdata[this.utilSvc.backendFBstoreId][OBJECTNAME.wnUsers].subscribe(
                data => {
                    const temp = data ? data[0] : undefined;
                    this.setLoggedUser(temp);
                },
                error => console.log(error)
            ) as Subscription;
    }

    public unsubscribeUser(wnUserId: string) {
        this.storeDbSvc.unsubscribeObject(
            this.utilSvc.backendFBstoreId,
            this.utilSvc.mdb,
            OBJECTNAME.wnUsers,
            wnUserId
        );
        if (this.firebaseBSSdata[OBJECTNAME.wnUsers]) {
            this.firebaseBSSdata[OBJECTNAME.wnUsers].unsubscribe();
        }
    }

    public getLoggedUser(): Observable<Users | null> {
        return this.wnUserO.asObservable();
    }
    public async setLoggedUser(value: Users | undefined) {
        if (value) {
            this.utilSvc.setUid(value.userId);
            this.wnUser = value;
            this.wnUserO.next(value);
        } else {
            this.utilSvc.clearUid();
            this.wnUser = null;
            this.wnUserO.next(null);
        }
    }

    public getLanguage(): Observable<string | null> {
        return this.languageO.asObservable();
    }
    public setLanguage(lang: string) {
        localStorage.setItem('language', lang);
        this.utilSvc.language = lang;
        if (lang != null) {
            this.languageO.next(lang);
        }
    }

    public checkValueObject(objectInput, parameterTitle, parameterValue) {
        let found = false;
        for (const key in objectInput) {
            if (objectInput[key]) {
                const valueInput = objectInput[key];
                if (valueInput[parameterTitle] && valueInput[parameterTitle] === parameterValue) {
                    found = true;
                    break;
                }
            }
        }
        return found;
    }

    registerScript(loaded: () => void, url, name): void {
        this.scriptLoadingSvc.registerScript(url, name, loaded);
    }

    uploadThumb(event1, source: string, url: string, directory: string) {
        return new Promise(async (resolve, reject) => {
            this.spinner.show();
            if (source === 'url') {
                if (url && url.length > 0) {
                    const params = new HttpParams()
                        .set('url', url)
                        .set('dir', 'assets/' + directory);
                    // tslint:disable-next-line: deprecation
                    this.http.get(this.utilSvc.backendURL + 'store/downloadUrl',
                        {
                            params,
                            reportProgress: true,
                            observe: 'events'
                        }).subscribe(
                            (data: HttpEvent<any>) => {
                                switch (data.type) {
                                    case HttpEventType.Sent:
                                        break;
                                    case HttpEventType.ResponseHeader:
                                        break;
                                    case HttpEventType.DownloadProgress:
                                        if (data && data.total) {
                                            this.progress = Math.round(data.loaded / data.total * 100);
                                        }
                                        break;
                                    case HttpEventType.Response:
                                        setTimeout(() => {
                                            this.progress = 0;
                                        }, 1500);
                                        this.spinner.hide();
                                        resolve(data.body);
                                        break;
                                }
                            },
                            error => {
                                this.spinner.hide();
                                console.log(error);
                                reject(error);
                            }
                        );
                }
            } else {
                if (event1) {
                    this.storeDbSvc.uploadMedia(undefined, event1, directory).then(
                        temp1 => {
                            const thumb = temp1 as string;
                            const params = new HttpParams()
                                .set('url', thumb)
                                .set('dir', 'assets/' + directory);
                            // tslint:disable-next-line: deprecation
                            this.http.get(this.utilSvc.backendURL + 'store/downloadUrl', {
                                params,
                                reportProgress: true,
                                observe: 'events'
                            }).subscribe(
                                (data: HttpEvent<any>) => {
                                    switch (data.type) {
                                        case HttpEventType.Sent:
                                            break;
                                        case HttpEventType.ResponseHeader:
                                            break;
                                        case HttpEventType.DownloadProgress:
                                            if (data && data.total) {
                                                this.progress = Math.round(data.loaded / data.total * 100);
                                            }
                                            break;
                                        case HttpEventType.Response:
                                            setTimeout(() => {
                                                this.progress = 0;
                                            }, 1500);
                                            this.spinner.hide();
                                            resolve(data.body);
                                            break;
                                    }
                                },
                                error => {
                                    this.spinner.hide();
                                    console.log(error);
                                    reject(error);
                                }
                            );
                        }, //
                        error => {
                            this.spinner.hide();
                            reject(error);
                        }
                    );
                }
            }
        });
    }

    subscribeLocations() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnLocations].subscribe(
            data => {
                const temp = data && data[0] != null ? this.utilSvc.objectToArray(data[0]) : null;
                this.setLocations(temp);
            },
            error => console.log(error)
        );

    }

    public unsubscribeLocations() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(
            beStoreId,
            this.utilSvc.mdb,
            OBJECTNAME.wnLocations
        );
        this.setLocations(null);

    }

    public getLocations(): Observable<Locations[] | null> {
        return this.wnLocationsO.asObservable();
    }
    public setLocations(value: Locations[] | null) {
        this.wnLocations = value;
        this.wnLocationsO.next(value);
    }

    subscribeEquipments() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnEquipments].subscribe(
            data => {
                const temp = data && data[0] != null ? this.utilSvc.objectToArray(data[0]) : null;
                this.setEquipments(temp);
            },
            error => console.log(error)
        );

    }

    public unsubscribeEquipments() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(
            beStoreId,
            this.utilSvc.mdb,
            OBJECTNAME.wnEquipments
        );
        this.setEquipments(null);

    }

    public getEquipments(): Observable<Equipments[] | null> {
        return this.wnEquipmentsO.asObservable();
    }
    public setEquipments(value: Equipments[] | null) {
        this.wnEquipments = value;
        this.wnEquipmentsO.next(value);
    }

    subscribeBookings() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnBookings].subscribe(
            data => {
                const temp = data && data[0] != null ? this.utilSvc.objectToArray(data[0]) : null;
                this.setBookings(temp);
            },
            error => console.log(error)
        );

    }

    public unsubscribeBookings() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(
            beStoreId,
            this.utilSvc.mdb,
            OBJECTNAME.wnBookings
        );
        this.setBookings(null);

    }

    public getBookings(): Observable<Bookings[] | null> {
        return this.wnBookingsO.asObservable();
    }
    public setBookings(value: Bookings[] | null) {
        this.wnBookings = value;
        this.wnBookingsO.next(value);
    }

    subscribeMessages() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnMessages].subscribe(
            data => {
                const temp = data && data[0] != null ? this.utilSvc.objectToArray(data[0]) : null;
                this.setMessages(temp);
            },
            error => console.log(error)
        );

    }

    public unsubscribeMessages() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(
            beStoreId,
            this.utilSvc.mdb,
            OBJECTNAME.wnMessages
        );
        this.setMessages(null);

    }

    public getMessages(): Observable<Messages[] | null> {
        return this.wnMessagesO.asObservable();
    }
    public setMessages(value: Messages[] | null) {
        this.wnMessages = value;
        this.wnMessagesO.next(value);
    }

    subscribeFeedbacks() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnFeedbacks].subscribe(
            data => {
                const temp = data && data[0] != null ? this.utilSvc.objectToArray(data[0]) : null;
                this.setFeedbacks(temp);
            },
            error => console.log(error)
        );

    }

    public unsubscribeFeedbacks() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(
            beStoreId,
            this.utilSvc.mdb,
            OBJECTNAME.wnFeedbacks
        );
        this.setFeedbacks(null);

    }

    public getFeedbacks(): Observable<Feedbacks[] | null> {
        return this.wnFeedbacksO.asObservable();
    }
    public setFeedbacks(value: Feedbacks[] | null) {
        this.wnFeedbacks = value;
        this.wnFeedbacksO.next(value);
    }

    subscribeLocationtypes() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnLocationtypes].subscribe(
            data => {
                const temp = data && data[0] != null ? this.utilSvc.objectToArray(data[0]) : null;
                this.setLocationtypes(temp);
            },
            error => console.log(error)
        );

    }

    public unsubscribeLocationtypes() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(
            beStoreId,
            this.utilSvc.mdb,
            OBJECTNAME.wnLocationtypes
        );
        this.setLocationtypes(null);

    }

    public getLocationtypes(): Observable<Locationtypes[] | null> {
        return this.wnLocationtypesO.asObservable();
    }
    public setLocationtypes(value: Locationtypes[] | null) {
        this.wnLocationtypes = value;
        this.wnLocationtypesO.next(value);
    }

    async createStripeExpressAccount(email: string, refreshUrl: string, returnUrl: string) {
        try {
            // Step 1: create the Express account
            const accountResponse = await this.http.post<any>(this.utilSvc.backendURL + '/stripe/expressaccount', {
                email,
            }).toPromise();

            const accountId = accountResponse.id;

            // Step 2: create the Express onboarding link
            const accountLinkResponse = await this.http.post<any>(this.utilSvc.backendURL + '/stripe/expressaccount-link', {
                accountId,
                refreshUrl: this.utilSvc.backendURL + refreshUrl,
                returnUrl: this.utilSvc.backendURL + returnUrl,
            }).toPromise();

            return accountLinkResponse.url; // return the onboarding URL

        } catch (error) {
            console.error('Error creating Stripe Express account:', error);
            throw error;
        }
    }

}
