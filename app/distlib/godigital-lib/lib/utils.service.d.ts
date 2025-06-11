import { NgZone, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { ScriptLoadingService } from './script-loading.service';
import { HaversineService } from 'ng2-haversine';
import { ValidatorFn } from '@angular/forms';
import * as i0 from "@angular/core";
export declare enum MEDIATYPE {
    YOUTUBE = "youtube",
    DAILYMOTION = "dailymotion",
    VIMEO = "vimeo",
    GENERIC = "generic"
}
export declare enum MEDIADIR {
    YOUTUBE = "assets/video/youtube/",
    DAILYMOTION = "assets/video/dailymotion/",
    VIMEO = "assets/video/vimeo/",
    VIDEOGENERIC = "assets/video/generic/",
    RSS = "assets/rss/"
}
export declare const SCHEDULETYPE: {
    ADS: string;
    DAILY: string;
    DEFAULT: string;
    EXACTDATE: string;
    FORCED: string;
    MONTHLY: string;
    INACTIVE: string;
    WEEKLY: string;
};
export declare enum IMAGETYPE {
    OWN = 0,
    FRIEND = 1,
    CLIENT = 2
}
export declare const SCHEDULEARRAY: {
    name: string;
    priority: number;
    visible: boolean;
}[];
export declare enum LOGTYPE {
    ADVERTISING = "advertising",
    CATALOGUE = "catalogue",
    ACCOUNT = "account",
    PAYMENT = "payment",
    SIGNAGE = "signage",
    SPOTS = "spots"
}
export declare const dayInMilliseconds: number;
export declare const hourInMilliseconds: number;
export declare const fileExtensionRegex: RegExp;
export declare const guidregex: RegExp;
export declare class UtilsService {
    http: HttpClient;
    private ngZone;
    datepipe: DatePipe;
    haversineService: HaversineService;
    scriptLoadingSvc: ScriptLoadingService;
    backendWSURL: any;
    backendURL: any;
    backendURLPort: any;
    qcURL: any;
    qcPort: any;
    analyticsUrl: any;
    analyticsPort: any;
    mdb: any;
    mst: any;
    mauth: any;
    sdb: never[];
    sst: {
        [storeId: string]: {
            ref: (path: string) => any;
            refFromURL: (url: string) => any;
        };
    };
    sauth: never[];
    language: string;
    ref: AngularFireStorageReference;
    fileUploadEvent: any;
    urlToUpload: string;
    task: AngularFireUploadTask;
    uploadState: Observable<string> | undefined;
    uploadProgress: Observable<number | undefined>;
    downloadURL: string;
    addressBSS: BehaviorSubject<any>;
    addressBSSdata: Observable<any>;
    backendFBstoreId: string;
    backendFBstoreId2: string;
    addressAutocomplete: any;
    platformDevice: any;
    transfer: any;
    fileIonic: any;
    webview: any;
    connected: any;
    platform: any;
    stripeplatform: any;
    appName: any;
    algoliaLoaded: any;
    currentToken: string;
    fcm: any;
    private autocomplete;
    socialLinkValidator: ValidatorFn;
    constructor(http: HttpClient, ngZone: NgZone, datepipe: DatePipe, haversineService: HaversineService, scriptLoadingSvc: ScriptLoadingService);
    registerScript(loaded: () => void, url: any, name: any): void;
    readUrlFile(url: string): Promise<unknown>;
    readConfig(configFile: string): Promise<unknown>;
    objectToArray(objectInput: any): any[];
    objectToArray2(inputObject: any): any[];
    fileToUpload(event: any): void;
    urlToUploadAction(storeId: any, url: any, dir: any): Promise<unknown>;
    fileToUploadAction(storeId: any, event: any, dir: any): Promise<unknown>;
    getBlob(url: any): Promise<unknown>;
    autoCompleteAddress(fieldName: string): Observable<any>;
    autoCompleteAddress1(addressField: ElementRef): Observable<any>;
    delAutoCompleteAddress(): void;
    calculateDistanceDurationAtoB2(from: {
        lat: number;
        lng: number;
    }, to: {
        lat: number;
        lng: number;
    }): Promise<number>;
    calculateDistanceDurationAtoB(from1: any, to1: any): Promise<unknown>;
    upperCaseFirstLetter(string1: any): any;
    lowerCaseAllWordsExceptFirstLetters(string1: any): any;
    clearUid(): void;
    getParameterByName(name: any): string | null;
    getTimeInMinutes(time: any): number;
    checkBusinessOpen(storePayDineDetails: any, selectedPeriod: any): boolean;
    translate(text: any, language: any): Promise<unknown>;
    getCachedFile(filename: string): Promise<unknown>;
    getFirstSentence(text: any): any;
    sleep(ms: any): Promise<unknown>;
    swap(theArray: any, indexA: any, indexB: any): void;
    copyObjects(objectInput: any): {};
    setUid(uid: any): void;
    getUid(): string | null;
    setAssistantUid(uid: any): void;
    getAssistantUid(): string | null;
    setPlatformEnv(env: any): void;
    getPlatformEnv(): string | null;
    setStoreId(storeId: any): void;
    getStoreId(): string | null | undefined;
    setLanguage(language: string): void;
    getLanguage(): string | null;
    setMinDates(): (string | null)[];
    getNumberOfWeek(): number;
    getDateOfWeek(weekNum: any, year: any): string | null;
    isObject(obj: any): boolean;
    getTrueWay(placeName: string): Promise<unknown>;
    stringToDate(stringDate: string): number;
    checkFileIonic(dir: string, fileName: string, check?: any): Promise<unknown>;
    checkFile(dir: string, fileName: string, check?: any): Promise<unknown> | undefined;
    checkFileTablet(url: any, check?: any): Promise<unknown>;
    downloadThumb2(url: string, dir: string, localurl?: any, check?: any, force?: any): Promise<unknown>;
    downloadThumb(urlToDownload: string, dir: string, localurl?: any, check?: any): Promise<unknown>;
    checkFileBackend(fullFileName: string, check?: any): Promise<unknown>;
    getLocalUrl(mainAssetUrl: any, defaultAssetUrl: any, check?: any): Promise<string>;
    arrayToObject(arr: any, id: any): {};
    arrayToFile(arr: any, fileDir: any, fileName: any): any;
    listDir(path: string, dirName: string): Promise<unknown>;
    removeFile(dir: string, fileName: string): Promise<unknown> | undefined;
    getFilename(dir: string, url: string): string | undefined;
    getTodayStartTime(): number;
    getTodayEndTime(): number;
    getRssFeed(url: string): Promise<unknown>;
    parseMediaFile(url: string): any;
    copyObject(object1: any, object2: any): void;
    loadStyle(documentF: any, styleName: string): void;
    isEncoded2(uri: any): any;
    isEncoded(uri: any): any;
    swapElement(array: any, indexA: any, indexB: any): void;
    findInvalidControls(form: any): void;
    getGoogleMetadata(gmid: string): Promise<unknown>;
    createNotificationTopic(topic: string, title: string, body: string, link: string, linkId: string, image?: string): Promise<any>;
    createNotificationTarget(target: string, title: string, body: string, link: string, linkId: string, image?: string): Promise<any>;
    getMediaType(url: string): any;
    setVariable(variable: any, value: any): void;
    getVariable(variable: any): string | undefined;
    isSocialMediaLink(url: string): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<UtilsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UtilsService>;
}
