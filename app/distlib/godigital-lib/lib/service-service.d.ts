import { InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { StoreDbService, OBJECTNAME } from './firebase-service';
import { UtilsService } from './utils.service';
import { UsersService } from './users.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NGXLogger } from 'ngx-logger';
import { ScriptLoadingService } from './script-loading.service';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import * as i0 from "@angular/core";
export declare const externalUrlProvider: InjectionToken<unknown>;
export declare enum EDITSLIDE {
    CREATIONSLIDE = 0,
    EDITIONSLIDE = 1
}
export declare enum BOOKINGSTATUS {
    CREATION = "creation",
    REQUESTED = "requested",
    PENDINGREQUEST = "pendind request",
    APPROVED = "approved",
    PENDINGCANCEL = "pendind cancel",
    CANCELLED = "cancelled"
}
export declare const regexUrl: RegExp;
export declare const regexUrlImage: RegExp;
export declare const regexUrlVideo: RegExp;
export declare const regexUrlMedia: RegExp;
export declare const regexMobileNo: RegExp;
export declare const regexFixedNo: RegExp;
export declare const regexEmail: RegExp;
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
    price: number;
    status: string;
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
export declare class ServicesService {
    http: HttpClient;
    router: Router;
    storeDbSvc: StoreDbService;
    utilSvc: UtilsService;
    usersSvc: UsersService;
    spinner: NgxSpinnerService;
    scriptLoadingSvc: ScriptLoadingService;
    logger: NGXLogger;
    config: any;
    backendFbObjects: OBJECTNAME[];
    wnUser: Users | null;
    wnUserO: BehaviorSubject<Users | null>;
    wnGuest: Users[] | null;
    wnGuestO: BehaviorSubject<Users[] | null>;
    wnHost: Users[] | null;
    wnHostO: BehaviorSubject<Users[] | null>;
    wnBookings: Bookings[] | null;
    wnBookingsO: BehaviorSubject<Bookings[] | null>;
    wnLocations: Locations[] | null;
    wnLocationsO: BehaviorSubject<Locations[] | null>;
    wnLocationtypes: Locationtypes[] | null;
    wnLocationtypesO: BehaviorSubject<Locationtypes[] | null>;
    wnEquipments: Equipments[] | null;
    wnEquipmentsO: BehaviorSubject<Equipments[] | null>;
    wnMessages: Messages[] | null;
    wnMessagesO: BehaviorSubject<Messages[] | null>;
    wnFeedbacks: Feedbacks[] | null;
    wnFeedbacksO: BehaviorSubject<Feedbacks[] | null>;
    version: any;
    firebaseBSSdata: {};
    languageO: BehaviorSubject<string | null>;
    errorMessage: {
        title: string;
        description: string;
        details: string;
    };
    currentPosition: {
        lat: number;
        lng: number;
    };
    progress: number;
    constructor(http: HttpClient, router: Router, storeDbSvc: StoreDbService, utilSvc: UtilsService, usersSvc: UsersService, spinner: NgxSpinnerService, scriptLoadingSvc: ScriptLoadingService, logger: NGXLogger);
    logDS(...args: any[]): void;
    readConfigFile(env: any): Promise<unknown>;
    initBEService(env: any): Promise<unknown>;
    closeBEService(): Promise<unknown>;
    initStorageFb(env: any): Promise<unknown>;
    closeStorageFb(storeId: string, fbObjects: Array<string>, storeFbRef: Array<any>): Promise<unknown>;
    getUser(): Observable<Users | null>;
    setUser(users: Users | null): void;
    resetVariables(): void;
    getHosts(wnHost: Users): Promise<unknown>;
    exportObjects(objects: any, objectName: any): void;
    exportString(strings: any, objectName: any): void;
    stringToDate(stringDate: string): number;
    subscribeUsers(): void;
    unsubscribeUsers(): void;
    getUsers(): Observable<Users[] | null>;
    setUsers(value: Users[] | null): void;
    loginOrValidateUser(email?: string, password?: string, firebaseUid?: string): Promise<any>;
    disconnectingUser(adnUserId: any): void;
    subscribeUser(_adnUserId: string): void;
    unsubscribeUser(wnUserId: string): void;
    getLoggedUser(): Observable<Users | null>;
    setLoggedUser(value: Users | undefined): Promise<void>;
    getLanguage(): Observable<string | null>;
    setLanguage(lang: string): void;
    checkValueObject(objectInput: any, parameterTitle: any, parameterValue: any): boolean;
    registerScript(loaded: () => void, url: any, name: any): void;
    uploadThumb(event1: any, source: string, url: string, directory: string): Promise<unknown>;
    subscribeLocations(): void;
    unsubscribeLocations(): void;
    getLocations(): Observable<Locations[] | null>;
    setLocations(value: Locations[] | null): void;
    subscribeEquipments(): void;
    unsubscribeEquipments(): void;
    getEquipments(): Observable<Equipments[] | null>;
    setEquipments(value: Equipments[] | null): void;
    subscribeBookings(): void;
    unsubscribeBookings(): void;
    getBookings(): Observable<Bookings[] | null>;
    setBookings(value: Bookings[] | null): void;
    subscribeMessages(): void;
    unsubscribeMessages(): void;
    getMessages(): Observable<Messages[] | null>;
    setMessages(value: Messages[] | null): void;
    subscribeFeedbacks(): void;
    unsubscribeFeedbacks(): void;
    getFeedbacks(): Observable<Feedbacks[] | null>;
    setFeedbacks(value: Feedbacks[] | null): void;
    subscribeLocationtypes(): void;
    unsubscribeLocationtypes(): void;
    getLocationtypes(): Observable<Locationtypes[] | null>;
    setLocationtypes(value: Locationtypes[] | null): void;
    createStripeExpressAccount(email: string, refreshUrl: string, returnUrl: string): Promise<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ServicesService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ServicesService>;
}
