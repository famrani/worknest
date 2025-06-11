import { NgZone } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UtilsService } from './utils.service';
import * as i0 from "@angular/core";
export declare enum OBJECTNAME {
    wnLocations = "backendlocations",
    wnLocationtypes = "backendlocationtypes",
    wnUsers = "backendusers",
    wnMessages = "backendmessages",
    wnEquipments = "backendequipments",
    wnBookings = "backendbookings",
    wnFeedbacks = "backendfeedbacks"
}
export interface SmsListener {
    timestamp: number;
    phonenumber: string;
    smstext: string;
}
export declare enum AUTHSTATUS {
    SUCCESS = 1,
    EMAILNOTVERIFIED = -1,
    UPDATETOKENFAILED = -2,
    UNKNOWNERROR = -100
}
export declare class StoreDbService {
    http: HttpClient;
    ngZone: NgZone;
    utilSvc: UtilsService;
    firebaseApp: {};
    adb: AngularFireDatabase;
    bdb: AngularFireDatabase;
    baf: AngularFireAuth;
    private storage;
    envPlatform: any;
    firebaseBSS: {
        [storeId: string]: {
            [fbObject: string]: BehaviorSubject<any>;
        };
    };
    firebaseBSSdata: {
        [storeId: string]: {
            [fbObject: string]: Observable<any>;
        };
    };
    firebaseRefOn: never[];
    firebaseData: {
        [storeId: string]: {
            [fbObject: string]: any[];
        };
    };
    backendFbRef: {};
    storageFbRef: never[];
    uploadProgress$: Observable<number>;
    firebaseauth: any;
    constructor(http: HttpClient, ngZone: NgZone, utilSvc: UtilsService);
    initFBlistener(storeId: any, fbObject: any): void;
    closeFBlistener(storeId: any, fbObject: any): void;
    initFB(storeId: string, config: any, appName: string, storage: boolean, auth: boolean, firebaseObjects: Array<string>, fbRef: any): Promise<unknown>;
    closeFB(storeId: string, firebaseObjects: Array<string>, fbRef: any): Promise<unknown>;
    initFirebaseDatabase(config: any, appname: string): firebase.database.Database;
    initFirebaseStorage(config: any, appname: string): any;
    initFirebaseAuth(config: any, appname: string): firebase.auth.Auth;
    subscribeObject(storeId: string, fbDbRef: any, fbObject: any, refId?: any): void;
    unsubscribeObject(storeId: any, fbDbRef: any, fbObject: any, refId?: any): void;
    getObject(storeId: any, fbDbRef: any, fbObject: any, refId?: any): Promise<unknown>;
    removeObject(storeId: any, fbDbRef: any, fbObject: any, refId: any): Promise<unknown>;
    updateObject(storeId: any, fbDbRef: any, fbObject: any, objectData: any, refId?: any): Promise<unknown>;
    getAvailableObjectId(BEStoreId: any, fbObject: any, idName: any): Promise<unknown>;
    deleteObject(storeId: any, objectToDelete: any): void;
    deleteObjectFromUrl(storeId: any, url: any): void;
    uploadObjects(event: any, directory: any, read?: any): Promise<unknown>;
    uploadObjects1(storeId: any, file: any, directory: any, read?: any): Promise<unknown>;
    uploadMedia(storeId: any, event: any, directory: any): Promise<unknown>;
    uploadMedia1(storeId: any, file: any, directory: any): Promise<unknown>;
    deletePImage(storeId: any, pImage: any, objectName: any): Promise<unknown>;
    deletePVideo(storeId: any, pVideo: any, objectName: any): Promise<unknown>;
    createPImage(storeId: any, pImageName: any, objectName: any, type1: any): Promise<unknown>;
    updatePImage(storeId: any, pImage: any, pImageName: any, objectName: any): Promise<unknown>;
    createPVideo(storeId: any, pVideoName: any, objectName: any, type1: any): Promise<unknown>;
    updatePVideo(storeId: any, pVideo: any, pVideoName: any, objectName: any): Promise<unknown>;
    validateVideoFile(file: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<StoreDbService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StoreDbService>;
}
