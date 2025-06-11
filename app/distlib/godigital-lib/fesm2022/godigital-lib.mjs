import * as i0 from '@angular/core';
import { Injectable, Pipe, NgModule, InjectionToken } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import * as i1 from '@angular/common/http';
import { HttpParams, HttpHeaders, HttpClientModule, HttpClient, HttpEventType } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import * as i2 from '@angular/common';
import { map, finalize } from 'rxjs/operators';
import * as i3 from 'ng2-haversine';
import { HaversineService } from 'ng2-haversine';
import * as i4 from '@ionic/angular';
import * as i1$1 from '@angular/fire/compat';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import * as i2$1 from '@ngx-translate/core';
import { TranslateModule, MissingTranslationHandler, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import * as i2$2 from '@angular/router';
import * as i6 from 'ngx-spinner';
import * as i8 from 'ngx-logger';
import { saveAs } from 'file-saver';

class ScriptLoadingService {
    zone;
    constructor(zone) {
        this.zone = zone;
    }
    registerScript(url, variable, loaded) {
        const existingVariable = window[variable];
        if (existingVariable) {
            this.zone.run(() => {
                loaded(existingVariable);
            });
            return;
        }
        const scriptElement = document.createElement('script');
        scriptElement.id = `payment-script-${variable}`;
        scriptElement.innerHTML = '';
        scriptElement.onload = () => {
            this.zone.run(() => {
                loaded(window[variable]);
            });
        };
        scriptElement.src = url;
        scriptElement.async = true;
        scriptElement.defer = true;
        document.getElementsByTagName('head')[0].appendChild(scriptElement);
    }
    static ɵfac = function ScriptLoadingService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ScriptLoadingService)(i0.ɵɵinject(i0.NgZone)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ScriptLoadingService, factory: ScriptLoadingService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ScriptLoadingService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i0.NgZone }], null); })();

/// <reference types='google.maps' />
const yandexTranslationKey = 'trnsl.1.1.20181124T000031Z.6a4475d4dc7a02d4.19510b67449beff52049e256ae97f6d6fc55a772';
const urlYandex = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' +
    yandexTranslationKey;
var MEDIATYPE;
(function (MEDIATYPE) {
    MEDIATYPE["YOUTUBE"] = "youtube";
    MEDIATYPE["DAILYMOTION"] = "dailymotion";
    MEDIATYPE["VIMEO"] = "vimeo";
    MEDIATYPE["GENERIC"] = "generic";
})(MEDIATYPE || (MEDIATYPE = {}));
var MEDIADIR;
(function (MEDIADIR) {
    MEDIADIR["YOUTUBE"] = "assets/video/youtube/";
    MEDIADIR["DAILYMOTION"] = "assets/video/dailymotion/";
    MEDIADIR["VIMEO"] = "assets/video/vimeo/";
    MEDIADIR["VIDEOGENERIC"] = "assets/video/generic/";
    MEDIADIR["RSS"] = "assets/rss/";
})(MEDIADIR || (MEDIADIR = {}));
const SCHEDULETYPE = {
    ADS: 'ADS',
    DAILY: 'DAILY',
    DEFAULT: 'DEFAULT',
    EXACTDATE: 'EXACTDATE',
    FORCED: 'FORCED',
    MONTHLY: 'MONTHLY',
    INACTIVE: 'INACTIVE',
    WEEKLY: 'WEEKLY'
};
var IMAGETYPE;
(function (IMAGETYPE) {
    IMAGETYPE[IMAGETYPE["OWN"] = 0] = "OWN";
    IMAGETYPE[IMAGETYPE["FRIEND"] = 1] = "FRIEND";
    IMAGETYPE[IMAGETYPE["CLIENT"] = 2] = "CLIENT";
})(IMAGETYPE || (IMAGETYPE = {}));
const SCHEDULEARRAY = [
    { name: SCHEDULETYPE.ADS, priority: 0, visible: false },
    { name: SCHEDULETYPE.DEFAULT, priority: 6, visible: true },
    { name: SCHEDULETYPE.FORCED, priority: 1, visible: true },
    { name: SCHEDULETYPE.EXACTDATE, priority: 2, visible: true },
    { name: SCHEDULETYPE.DAILY, priority: 3, visible: true },
    { name: SCHEDULETYPE.WEEKLY, priority: 4, visible: true },
    { name: SCHEDULETYPE.MONTHLY, priority: 5, visible: true },
    { name: SCHEDULETYPE.INACTIVE, priority: 1000, visible: false }
];
var LOGTYPE;
(function (LOGTYPE) {
    LOGTYPE["ADVERTISING"] = "advertising";
    LOGTYPE["CATALOGUE"] = "catalogue";
    LOGTYPE["ACCOUNT"] = "account";
    LOGTYPE["PAYMENT"] = "payment";
    LOGTYPE["SIGNAGE"] = "signage";
    LOGTYPE["SPOTS"] = "spots";
})(LOGTYPE || (LOGTYPE = {}));
const dayInMilliseconds = 1000 * 3600 * 24;
const hourInMilliseconds = 1000 * 3600;
const fileExtensionRegex = /\.(\w+)(\?.*)?$/;
const guidregex = /(.*\/)?([^?^\/]+)/;
class UtilsService {
    http;
    ngZone;
    datepipe;
    haversineService;
    scriptLoadingSvc;
    backendWSURL;
    backendURL;
    backendURLPort;
    qcURL;
    qcPort;
    analyticsUrl;
    analyticsPort;
    mdb;
    mst;
    mauth;
    sdb = [];
    sst = {};
    sauth = [];
    language = 'en';
    ref;
    fileUploadEvent;
    urlToUpload = '';
    task;
    uploadState;
    uploadProgress;
    downloadURL = '';
    addressBSS = new BehaviorSubject([]);
    addressBSSdata = this.addressBSS.asObservable();
    backendFBstoreId = '1000';
    backendFBstoreId2 = '2001';
    addressAutocomplete;
    platformDevice;
    transfer;
    fileIonic;
    webview;
    connected;
    platform;
    stripeplatform;
    appName;
    algoliaLoaded;
    currentToken;
    fcm;
    autocomplete;
    socialLinkValidator = (control) => {
        const value = control.value;
        if (!value)
            return null;
        return this.isSocialMediaLink(value) ? null : { invalidSocialLink: true };
    };
    constructor(http, ngZone, 
    //    public mapsAPILoader: MapsAPILoader,
    datepipe, haversineService, scriptLoadingSvc) {
        this.http = http;
        this.ngZone = ngZone;
        this.datepipe = datepipe;
        this.haversineService = haversineService;
        this.scriptLoadingSvc = scriptLoadingSvc;
        this.registerScript(() => { }, 'https://cdn.jsdelivr.net/npm/places.js@1.18.1', 'places.js');
    }
    registerScript(loaded, url, name) {
        this.scriptLoadingSvc.registerScript(url, name, loaded);
    }
    readUrlFile(url) {
        return new Promise((resolve, reject) => {
            // tslint:disable-next-line: deprecation
            this.http.get(url).subscribe(data => {
                resolve(data);
            }, error => {
                reject(error);
            });
        });
    }
    readConfig(configFile) {
        return new Promise((resolve, reject) => {
            // tslint:disable-next-line: deprecation
            this.http.get(configFile).subscribe(data => {
                resolve(data);
            }, error => {
                reject(error);
            });
        });
    }
    objectToArray(objectInput) {
        let keyI;
        const ArrayOutput = [];
        if (objectInput !== undefined) {
            for (keyI in objectInput) {
                if (objectInput.hasOwnProperty(keyI)) {
                    ArrayOutput.push(objectInput[keyI]);
                }
            }
        }
        return ArrayOutput;
    }
    objectToArray2(inputObject) {
        let outputTable = [];
        for (const i in inputObject) {
            if (inputObject.hasOwnProperty(i)) {
                const temp = inputObject[i];
                const temp2 = this.objectToArray(temp);
                if (temp2 !== undefined) {
                    outputTable = outputTable.concat(temp2);
                }
            }
        }
        return outputTable;
    }
    fileToUpload(event) {
        this.fileUploadEvent = event;
    }
    urlToUploadAction(storeId, url, dir) {
        return new Promise((resolve, reject) => {
            const fileName = url.substring(url.lastIndexOf('/') + 1);
            this.getBlob(url).then(blob => {
                this.ref = this.sst[storeId].ref(dir + fileName);
                this.task = this.ref.put(blob);
                this.uploadState = this.task
                    .snapshotChanges()
                    .pipe(map(s => s ? s.state : ''));
                this.uploadProgress = this.task.percentageChanges();
                this.task
                    .snapshotChanges()
                    .pipe(finalize(() => {
                    // tslint:disable-next-line: deprecation
                    this.ref.getDownloadURL().subscribe(x => {
                        this.downloadURL = x;
                        this.uploadState = undefined;
                        resolve(this.downloadURL);
                    }, error => {
                        console.log('error getting download url=%s error=', url, error);
                        reject(error);
                    });
                }))
                    // tslint:disable-next-line: deprecation
                    .subscribe();
            }, error => {
                console.log('error getting blob=', error);
                reject(error);
            });
        });
    }
    fileToUploadAction(storeId, event, dir) {
        return new Promise(resolve => {
            if (event !== null && event !== undefined) {
                const fileName = event.target.files[0].name;
                this.ref = this.sst[storeId].ref(dir + fileName);
                this.task = this.ref.put(event.target.files[0]);
                this.uploadState = this.task.snapshotChanges().pipe(map(s => s ? s.state : ''));
                this.uploadProgress = this.task.percentageChanges();
                const temp = this.task
                    .snapshotChanges()
                    .pipe(finalize(() => {
                    // tslint:disable-next-line: deprecation
                    this.ref.getDownloadURL().subscribe(x => {
                        this.downloadURL = x;
                        this.uploadState = undefined;
                        resolve(this.downloadURL);
                    });
                }))
                    // tslint:disable-next-line: deprecation
                    .subscribe();
            }
            else {
                resolve(null);
            }
        });
    }
    getBlob(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = event => {
                const blob = xhr.response;
                resolve(blob);
            };
            xhr.open('GET', url);
            xhr.send();
        });
    }
    autoCompleteAddress(fieldName) {
        const subject = new BehaviorSubject(null);
        if (typeof places !== 'undefined') {
            const placesAutocomplete = places({
                appId: 'pl9PLUYVD4F4',
                apiKey: '49dee498903deab620fd60e9f3b97052',
                container: document.querySelector(fieldName)
            });
            placesAutocomplete.on('change', e => {
                subject.next(e.suggestion);
            });
            placesAutocomplete.on('clear', () => {
                subject.next(null);
            });
        }
        else {
            subject.next(null);
        }
        return subject.asObservable();
    }
    autoCompleteAddress1(addressField) {
        const subject = new BehaviorSubject(null);
        if (!window.google || !google.maps.places) {
            console.error('Google Maps script not loaded');
            subject.next({});
            return subject.asObservable();
        }
        this.autocomplete = new google.maps.places.Autocomplete(addressField.nativeElement, {
            componentRestrictions: { country: ['fr'] },
            fields: ['geometry', 'formatted_address', 'address_components'],
        });
        this.autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
                const place = this.autocomplete.getPlace(); // <-- place est défini ici
                if (!place.geometry || !place.address_components) {
                    subject.next({});
                    return;
                }
                const result = {
                    place_id: place.place_id,
                    fullText: place.formatted_address,
                    lat: place && place.geometry && place.geometry.location ? place.geometry.location.lat() : 0,
                    lng: place && place.geometry && place.geometry.location ? place.geometry.location.lng() : 0
                };
                for (const component of place.address_components) {
                    const type = component.types[0];
                    result[type] = component.short_name;
                }
                subject.next(result);
            });
        });
        return subject.asObservable();
    }
    delAutoCompleteAddress() {
        if (this.addressAutocomplete !== undefined) {
            google.maps.event.clearInstanceListeners(this.addressAutocomplete);
            this.addressAutocomplete = undefined;
        }
    }
    calculateDistanceDurationAtoB2(from, to) {
        return new Promise(resolve => {
            // Vérifie que l'API Google Maps est bien chargée
            if (typeof google !== 'undefined' && google.maps?.geometry?.spherical) {
                const origin = new google.maps.LatLng(from.lat, from.lng);
                const destination = new google.maps.LatLng(to.lat, to.lng);
                const distance = google.maps.geometry.spherical.computeDistanceBetween(origin, destination);
                resolve(distance); // distance en mètres
            }
            else {
                console.error('Google Maps API or geometry library not loaded.');
                resolve(0); // ou rejeter si tu préfères
            }
        });
    }
    calculateDistanceDurationAtoB(from1, to1) {
        return new Promise(resolve => {
            const distanceAndDuration = {};
            const latString = 'lat';
            const lngString = 'lng';
            const durationString = 'duration';
            const from = {
                latitude: from1[latString],
                longitude: from1[lngString]
            };
            const to = {
                latitude: to1[latString],
                longitude: to1[lngString]
            };
            distanceAndDuration[durationString] = 1000;
        });
    }
    upperCaseFirstLetter(string1) {
        return string1.charAt(0).toUpperCase() + string1.slice(1);
    }
    lowerCaseAllWordsExceptFirstLetters(string1) {
        return string1.replace(/\w\S*/g, (word) => {
            return word.charAt(0) + word.slice(1).toLowerCase();
        });
    }
    clearUid() {
        localStorage.removeItem('uid');
    }
    getParameterByName(name) {
        const url = window.location.href;
        name = name.replace(/[[]]/g, '$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace('/+/g', ' '));
    }
    getTimeInMinutes(time) {
        let temph = 0;
        let tempm = 0;
        if (time !== undefined) {
            if (time.length > 0) {
                const regExT = /^(2[0-4]|[01]?[0-9])[:h]([0-5]?[0-9])?/;
                if (time.match(regExT) !== undefined) {
                    if (time.match(regExT)[1] !== undefined) {
                        temph = Number(time.match(regExT)[1]);
                    }
                    if (time.match(regExT)[2] !== undefined) {
                        tempm = Number(time.match(regExT)[2]);
                    }
                }
                return temph * 60 + tempm;
            }
            else {
                return -1;
            }
        }
        else {
            return -1;
        }
    }
    checkBusinessOpen(storePayDineDetails, selectedPeriod) {
        let result = false;
        if (storePayDineDetails !== undefined && selectedPeriod !== undefined) {
            const openingHours = storePayDineDetails.openingHours;
            const requestedDay1 = new Date(selectedPeriod);
            const requestedDay = requestedDay1.getDay();
            if (openingHours !== undefined) {
                const temp = openingHours.find(oh => Number(oh.DayNumber) === Number(requestedDay));
                result = temp !== undefined;
            }
        }
        return result;
    }
    translate(text, language) {
        return new Promise((resolve, reject) => {
            if (text !== undefined) {
                if (text.length > 0) {
                    if (language.substring(0, 2) !== 'no') {
                        const url = urlYandex + '&lang=' + language + '&format=html&text=' + text;
                        // tslint:disable-next-line: deprecation
                        this.http.get(url).subscribe(data => {
                            const textString = 'text';
                            resolve(data[textString]);
                        }, error => {
                            resolve(text);
                        });
                    }
                    else {
                        resolve(text);
                    }
                }
                else {
                    resolve(text);
                }
            }
            else {
                resolve(text);
            }
        });
    }
    getCachedFile(filename) {
        return new Promise((resolve, reject) => {
            resolve(1);
            reject(1);
        });
    }
    getFirstSentence(text) {
        const regex = /(<[a-z A-Z\/=\'\':.0-9]*>)/;
        return text.replace(/(<[a-z A-Z\/=\'\':.0-9]*>)/gm, '');
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    swap(theArray, indexA, indexB) {
        const temp = theArray[indexA];
        theArray[indexA] = theArray[indexB];
        theArray[indexB] = temp;
    }
    copyObjects(objectInput) {
        const temp = {};
        for (const i in objectInput) {
            if (typeof objectInput[i] !== 'function') {
                temp[i] = objectInput[i];
            }
        }
        return temp;
    }
    setUid(uid) {
        localStorage.setItem('uid', uid);
    }
    getUid() {
        return localStorage.getItem('uid');
    }
    setAssistantUid(uid) {
        localStorage.setItem('assistantuid', uid);
    }
    getAssistantUid() {
        return localStorage.getItem('assistantuid');
    }
    setPlatformEnv(env) {
        localStorage.setItem('platformenv', env);
    }
    getPlatformEnv() {
        return localStorage.getItem('platformenv');
    }
    setStoreId(storeId) {
        localStorage.setItem('storeId', storeId);
    }
    getStoreId() {
        const temp = localStorage.getItem('storeId');
        return temp === 'undefined' ? undefined : temp;
    }
    setLanguage(language) {
        localStorage.setItem('language', language);
    }
    getLanguage() {
        const temp = localStorage.getItem('language');
        return temp === 'undefined' || !temp ? null : temp;
    }
    setMinDates() {
        const today = new Date();
        const month = today.getMonth() + 2;
        const year = today.getFullYear();
        let monthString;
        if (month < 10) {
            monthString = '0' + String(month);
        }
        else {
            monthString = String(month);
        }
        const minDay = this.datepipe.transform(today.setDate(today.getDate()), 'yyyy-MM-dd');
        const weekNumber = this.getNumberOfWeek() < 10 ? '0' + String(this.getNumberOfWeek()) : String(this.getNumberOfWeek());
        const minWeek = year + '-W' + weekNumber;
        const minMonth = year + '-' + monthString;
        return [minDay, minWeek, minMonth];
    }
    getNumberOfWeek() {
        const today = new Date();
        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const pastDaysOfYear = (today.getTime() - firstDayOfYear.getTime()) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
    }
    getDateOfWeek(weekNum, year) {
        const monday = new Date(Number(year), 0, 1 + (Number(weekNum) - 1) * 7);
        while (monday.getDay() !== 0) {
            monday.setDate(monday.getDate() - 1);
        }
        monday.setDate(monday.getDate() + 1);
        return this.datepipe.transform(monday, 'yyyy-MM-dd');
    }
    isObject(obj) {
        return (obj !== undefined &&
            obj !== null &&
            (obj.constructor === Object || obj.constructor === Array));
    }
    getTrueWay(placeName) {
        return new Promise(resolve => {
            const resultsString = 'results';
            const params1 = new HttpParams().set('text', placeName);
            const headers1 = new HttpHeaders()
                .set('x-rapidapi-host', 'trueway-places.p.rapidapi.com')
                .set('x-rapidapi-key', '20869f36afmsh29e673ad5cde67bp1ad92djsn33ed3f6a4e87');
            this.http
                .get('https://trueway-places.p.rapidapi.com/FindPlaceByText', {
                headers: headers1,
                params: params1
            })
                // tslint:disable-next-line: deprecation
                .subscribe(data => {
                if (data !== undefined) {
                    resolve(data[resultsString]);
                }
                else {
                    resolve([]);
                }
            });
        });
    }
    stringToDate(stringDate) {
        const regexDate = /([0-9]{2})([0-9]{2})([0-9]{4})/;
        const dateTemp1 = regexDate.exec(stringDate);
        if (dateTemp1 && dateTemp1 != null && dateTemp1[3]) {
            return new Date(dateTemp1[3] + '-' + dateTemp1[2] + '-' + dateTemp1[1]).getTime();
        }
        else {
            return 0;
        }
    }
    async checkFileIonic(dir, fileName, check) {
        let result = 0;
        return new Promise(async (resolve) => {
            this.fileIonic.checkFile(this.fileIonic.externalDataDirectory + dir, fileName).then(async (data) => {
                this.fileIonic.resolveLocalFilesystemUrl(this.fileIonic.externalDataDirectory + dir + fileName).then(data1 => {
                    data1.getMetadata(metadata => {
                        if (metadata.size > 2000) {
                            result = metadata.size;
                        }
                        resolve(result);
                    }, error => resolve(result));
                }, error => resolve(result));
            }, error => {
                resolve(result);
            });
        });
    }
    checkFile(dir, fileName, check) {
        if (this.platformDevice && this.platformDevice.is('cordova')) {
            return this.checkFileIonic(dir, fileName, check);
        }
    }
    checkFileTablet(url, check) {
        return new Promise(async (resolve, reject) => {
            const pathnameRegex = /(\/?(.+)\/)/;
            const filenameRegex = /.*\/(.+)$/;
            const filedirt = pathnameRegex.exec(url);
            const filenamet = filenameRegex.exec(url);
            if (filedirt != null && filenamet != null) {
                if (filedirt[0] !== undefined && filenamet[1] !== undefined) {
                    const filedir = 'dist2/' + filedirt[0];
                    const filename = filenamet[1];
                    try {
                        const temp = await this.checkFile(filedir, filename, check);
                        resolve(temp);
                    }
                    catch (e) {
                        resolve(false);
                    }
                }
                else {
                    resolve(false);
                }
            }
            else {
                resolve(false);
            }
        });
    }
    downloadThumb2(url, dir, localurl, check, force) {
        return new Promise(async (resolvef) => {
            const filenameRegyoutube = /(youtube\.com|youtu\.be)/;
            const regExB = /(([^\/]+\.([\w]+))(\?.*)?)$/;
            const regExC = /([^\/]+)\?.+$/;
            const urlToDownload1 = decodeURIComponent(url);
            const filenameB = regExB.exec(urlToDownload1);
            const filenameC = regExC.exec(urlToDownload1);
            let filename;
            let temp3;
            if (url && url.includes('http')) {
                const filenameRegyoutubeTemp = filenameRegyoutube.exec(url);
                if (filenameRegyoutubeTemp != null && filenameRegyoutubeTemp !== undefined) {
                    const youtubefn1 = /[^\/]+$/;
                    const youtubefn2 = /v=([\-\w\d]+)/;
                    const youtubefn1Temp = youtubefn1.exec(url);
                    const youtubefn2Temp = youtubefn2.exec(url);
                    if (youtubefn2Temp != null && youtubefn2Temp !== undefined) {
                        filename = youtubefn2Temp[1] + '.mp4';
                    }
                    else if (youtubefn1Temp != null && youtubefn1Temp !== undefined) {
                        {
                            filename = youtubefn1Temp[0] + '.mp4';
                        }
                    }
                }
                else {
                    if (filenameB && filenameB != null && filenameB[2]) {
                        filename = filenameB[2];
                    }
                    else if (filenameC && filenameC[1]) {
                        filename = filenameC[1] + '.png';
                    }
                }
                localurl = localurl ? localurl : filename ? dir + this.isEncoded(filename) : undefined;
                const temp11 = await this.checkFileBackend(localurl, check);
                //        const url1 = url;
                let promise1;
                if (temp11 === false || force) {
                    promise1 = new Promise(resolve => {
                        const params1 = new HttpParams()
                            .set('url', this.isEncoded(url))
                            .set('dir', this.isEncoded(dir));
                        const urldownloadUrl = this.backendURL + 'store/downloadUrl';
                        // tslint:disable-next-line: deprecation
                        if (check) {
                            console.log('this.isEncoded(url))=', this.isEncoded(url));
                        }
                        this.http.get(urldownloadUrl, { params: params1 }).subscribe(async (temp12) => {
                            const result = temp12;
                            localurl = result.backendurl;
                            if (this.platformDevice && this.platformDevice.is('cordova')) {
                                const temp13 = await this.checkFileTablet(localurl, check);
                                if (temp13 === 0) {
                                    const fileTransfer = this.transfer.create();
                                    let resultt;
                                    try {
                                        await fileTransfer.download(this.backendURL + localurl, this.fileIonic.externalDataDirectory + 'dist2/' + localurl);
                                    }
                                    catch (e) {
                                        resultt = e;
                                    }
                                    resolve(resultt);
                                }
                                else {
                                    resolve(undefined);
                                }
                            }
                            else {
                                resolve(result);
                            }
                        }, error1 => {
                            console.log('error=', error1, ' , urlToDownload=', this.isEncoded(url));
                            resolve(undefined);
                        });
                    });
                }
                else {
                    promise1 = new Promise(resolve => resolve({ backendurl: localurl }));
                }
                promise1.then(async (temp3) => {
                    if (localurl && this.platformDevice && this.platformDevice.is('cordova')) {
                        const temp1 = await this.checkFileTablet(localurl, check);
                        if (temp1 === 0) {
                            const fileTransfer = this.transfer.create();
                            let temp;
                            try {
                                temp = await fileTransfer.download(this.backendURL + localurl, this.fileIonic.externalDataDirectory + 'dist2/' + localurl);
                            }
                            catch (e) {
                                console.log('error 1 on %s error =', this.backendURL + localurl, e);
                            }
                        }
                    }
                    resolvef(temp3);
                });
            }
            else {
                resolvef(undefined);
            }
        });
    }
    downloadThumb(urlToDownload, dir, localurl, check) {
        return new Promise(async (resolve, reject) => {
            if (urlToDownload) {
                let temp1;
                if (localurl === undefined) {
                    localurl = this.getFilename(dir, urlToDownload);
                }
                if (localurl !== undefined && localurl !== null && (localurl && localurl.length > 0)) {
                    temp1 = await this.checkFileBackend(localurl, check);
                    if (temp1 === false) {
                        const params1 = new HttpParams()
                            .set('url', encodeURI(urlToDownload))
                            .set('dir', encodeURI(dir));
                        const url = this.backendURL + 'store/downloadUrl';
                        // tslint:disable-next-line: deprecation
                        this.http.get(url, { params: params1 }).subscribe(async (temp) => {
                            const result = temp;
                            localurl = result.backendurl;
                            if (this.platformDevice && this.platformDevice.is('cordova')) {
                                temp1 = await this.checkFileTablet(localurl, check);
                                if (temp1 === 0) {
                                    const fileTransfer = this.transfer.create();
                                    try {
                                        await fileTransfer.download(this.backendURL + localurl, this.fileIonic.externalDataDirectory + 'dist2/' + localurl);
                                    }
                                    catch (e) {
                                        console.log('error 1 on %s error =', this.backendURL + localurl, e);
                                    }
                                    const temp3 = { backendurl: localurl };
                                    resolve(temp);
                                }
                                else {
                                    const temp3 = { backendurl: localurl };
                                    resolve(temp);
                                }
                            }
                            else {
                                const temp3 = { backendurl: localurl };
                                resolve(temp3);
                            }
                        }, error1 => {
                            console.log('error=', error1, ' , urlToDownload=', urlToDownload);
                            reject(undefined);
                        });
                    }
                    else {
                        if (this.platformDevice && this.platformDevice.is('cordova')) {
                            let toto;
                            temp1 = await this.checkFileTablet(localurl, check);
                            if (temp1 === 0) {
                                const fileTransfer = this.transfer.create();
                                try {
                                    toto = await fileTransfer.download(this.backendURL + localurl, this.fileIonic.externalDataDirectory + 'dist2/' + localurl);
                                }
                                catch (e) {
                                    console.log('error 2 on %s error =', this.backendURL + localurl, e);
                                }
                                const temp = { backendurl: localurl };
                                resolve(temp);
                            }
                            else {
                                const temp = { backendurl: localurl };
                                resolve(temp);
                            }
                        }
                        else {
                            const temp = { backendurl: encodeURI(localurl) };
                            resolve(temp);
                        }
                    }
                }
                else {
                    const params1 = new HttpParams()
                        .set('url', encodeURI(urlToDownload))
                        .set('dir', encodeURI(dir));
                    const url = this.backendURL + 'store/downloadUrl';
                    // tslint:disable-next-line: deprecation
                    this.http.get(url, { params: params1 }).subscribe(async (temp) => {
                        const result = temp;
                        localurl = result.backendurl;
                        if (this.platformDevice && this.platformDevice.is('cordova')) {
                            let toto;
                            temp1 = await this.checkFileTablet(localurl);
                            if (localurl !== undefined && temp1 === 0) {
                                const fileTransfer = this.transfer.create();
                                try {
                                    toto = await fileTransfer.download(this.backendURL + localurl, this.fileIonic.externalDataDirectory +
                                        'dist2/' +
                                        localurl);
                                }
                                catch (e) {
                                    console.log('error 3 on %s error =', localurl, e);
                                }
                            }
                        }
                        resolve({ backendurl: localurl });
                    }, error => {
                        console.log('error=', error, ' , urlToDownload=', urlToDownload);
                        reject(undefined);
                    });
                }
            }
            else {
                reject('url ' + urlToDownload + ' does not exist');
            }
        });
    }
    checkFileBackend(fullFileName, check) {
        return new Promise((resolve, reject) => {
            let params1;
            if (check) {
                params1 = new HttpParams()
                    .set('check', check)
                    .set('filename', fullFileName);
            }
            else {
                params1 = new HttpParams()
                    .set('filename', fullFileName);
            }
            const url = this.backendURL + 'utils/fileDetails';
            // tslint:disable-next-line: deprecation
            this.http.get(url, { params: params1 }).subscribe(temp => {
                if (temp && temp[0]) {
                    resolve(true);
                }
                else {
                    resolve(false);
                }
            }, error => {
                resolve(false);
            });
        });
    }
    getLocalUrl(mainAssetUrl, defaultAssetUrl, check) {
        let result;
        return new Promise(async (resolve, reject) => {
            let toto = false;
            if (mainAssetUrl !== undefined) {
                //        if (false) {
                if (this.platformDevice && this.platformDevice.is('cordova')) {
                    const temp = await this.checkFileTablet(mainAssetUrl, check);
                    if (temp) {
                        result = this.webview.convertFileSrc(this.fileIonic.externalDataDirectory + 'dist2/' + encodeURI(mainAssetUrl));
                        toto = true;
                    }
                }
                if (!toto) {
                    if (this.connected) {
                        if (await this.checkFileBackend(mainAssetUrl)) {
                            if (mainAssetUrl) {
                                result = this.backendURL + encodeURI(mainAssetUrl);
                                toto = true;
                            }
                        }
                    }
                }
            }
            if (!toto) {
                result = defaultAssetUrl;
            }
            resolve(result);
        });
    }
    arrayToObject(arr, id) {
        const result = {};
        if (arr) {
            for (const e of arr) {
                const ide = e[id];
                result[ide] = e;
            }
        }
        return result;
    }
    arrayToFile(arr, fileDir, fileName) {
        if (this.platformDevice && this.platformDevice.is('cordova')) {
            return this.fileIonic.writeFile(this.fileIonic.externalDataDirectory + fileDir, fileName, JSON.stringify(arr), { replace: true });
        }
    }
    listDir(path, dirName) {
        return new Promise(async (resolve, reject) => {
            if (this.platformDevice && this.platformDevice.is('cordova')) {
                const path1 = this.fileIonic.externalDataDirectory + path;
                let dirList;
                try {
                    dirList = await this.fileIonic.listDir(path1, dirName);
                }
                catch (e) {
                    console.log('error 5 listDir %s error ', path1, e);
                    reject(e);
                }
                resolve(dirList);
            }
            else {
                const storeId = localStorage.getItem('storeId');
                let result = {};
                if (storeId == null || storeId === undefined) {
                    result = { isFile: false, isDirectory: true, name: '2000' };
                }
                else {
                    result = { isFile: false, isDirectory: true, name: storeId };
                }
                resolve([result]);
            }
        });
    }
    removeFile(dir, fileName) {
        if (this.platformDevice && this.platformDevice.is('cordova')) {
            return new Promise((resolve, reject) => {
                this.fileIonic.removeFile(this.fileIonic.externalDataDirectory + dir, fileName).then(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
            });
        }
    }
    getFilename(dir, url) {
        const decodedUrl = decodeURIComponent(url);
        const urlRegex = /(([^\/]+\.([\w]+))(\?.*)?)$/;
        const yt1Regex = /(https:\/\/www\.youtube\.com\/watch\?v=)([^&]+)/;
        const yt2Regex = /(youtu\.be\/)(.+)/;
        const temp1 = urlRegex.exec(decodedUrl);
        const temp2 = yt1Regex.exec(decodedUrl);
        const temp3 = yt2Regex.exec(decodedUrl);
        if (temp1 && temp1[2]) {
            return dir + temp1[2];
        }
        else if (temp2 && temp2[2]) {
            return dir + temp2[2] + '.mp4';
        }
        else if (temp3 && temp3[2]) {
            return dir + temp3[2] + '.mp4';
        }
        else {
            return undefined;
        }
    }
    getTodayStartTime() {
        // get current time for UTC timezone
        const d = new Date();
        const year = d.getUTCFullYear();
        const month = d.getUTCMonth();
        const day = d.getUTCDate();
        // set time to begin day UTC
        return Date.UTC(year, month, day, 0, 0, 0, 0);
    }
    getTodayEndTime() {
        // get current time for UTC timezone
        const d = new Date();
        const year = d.getUTCFullYear();
        const month = d.getUTCMonth();
        const day = d.getUTCDate();
        // set time to end day UTC
        return Date.UTC(year, month, day, 23, 59, 0, 0);
    }
    getRssFeed(url) {
        return new Promise(resolve => {
            const params1 = new HttpParams().set('url', url);
            this.http.get(this.backendURL + 'utils/getRssFeed', {
                params: params1
            })
                // tslint:disable-next-line: deprecation
                .subscribe(data => {
                if (data !== undefined) {
                    resolve(data);
                }
                else {
                    resolve([]);
                }
            });
        });
    }
    parseMediaFile(url) {
        const regex1 = /youtu\.be\/([^\/]+$)/;
        const regex2 = /youtube\.com\/watch\?v=([\-\w\d]+)/;
        const regex3 = /([^\/]+$)/;
        const regex4 = /(.+)(\?.+)/;
        let temp1;
        let temp2;
        let temp3;
        let temp4;
        let match = false;
        let result;
        if (url !== undefined && url != null) {
            temp1 = regex1.exec(url);
            if (!match && temp1 !== undefined && temp1 != null && temp1[1] !== undefined) {
                result = temp1[1] + '.mp4';
                match = true;
            }
            else {
                temp2 = regex2.exec(url);
            }
            if (!match && temp2 !== undefined && temp2 != null && temp2[1] !== undefined) {
                result = temp2[1] + '.mp4';
                match = true;
            }
            else {
                temp3 = regex3.exec(url);
            }
            if (!match && temp3 !== undefined && temp3 != null && temp3[1] !== undefined) {
                temp4 = regex4.exec(temp3[1]);
                if (temp4 !== undefined && temp4 != null && temp4[1] !== undefined) {
                    result = temp4[1];
                }
                else {
                    console.log('unmatched url=', url);
                }
            }
        }
        return result;
    }
    copyObject(object1, object2) {
        if (object1 && object2) {
            for (const key in object2) {
                if (object2[key]) {
                    object1[key] = object2[key];
                }
            }
        }
    }
    loadStyle(documentF, styleName) {
        const head = documentF.getElementsByTagName('head')[0];
        const themeLink = documentF.getElementById('client-theme');
        if (themeLink) {
            themeLink.href = styleName;
        }
        else {
            const style = documentF.createElement('link');
            style.id = 'client-theme';
            style.rel = 'stylesheet';
            style.href = `${styleName}`;
            head.appendChild(style);
        }
    }
    isEncoded2(uri) {
        if (decodeURI(uri) === uri) {
            //not encodec yet...so return encoded of val
            return encodeURI(uri);
        }
        else {
            if (decodeURI(decodeURI(uri)) === decodeURI(uri)) {
                return uri;
            }
            else {
                if (decodeURI(decodeURI(decodeURI(uri))) === decodeURI(decodeURI(uri))) {
                    return decodeURI(uri);
                }
            }
        }
    }
    isEncoded(uri) {
        var encValue = encodeURIComponent(uri);
        try {
            if (decodeURIComponent(decodeURIComponent(encValue)) === uri) {
                //not encodec yet...so return encoded of val
                return encodeURI(uri);
            }
        }
        catch (err) {
            //not encodec yet...so return encoded of val
            return encodeURI(uri);
        }
        return uri; //same value returned  }
    }
    swapElement(array, indexA, indexB) {
        const tmp = array[indexA];
        array[indexA] = array[indexB];
        array[indexB] = tmp;
    }
    findInvalidControls(form) {
        const invalid = [];
        const controls = form;
        for (const name in controls) {
            if (!controls[name]) {
                invalid.push(name);
            }
            else if (controls[name] && controls[name].invalid) {
                invalid.push(name);
            }
        }
        console.log('invalid=', invalid);
    }
    getGoogleMetadata(gmid) {
        return new Promise((resolve, reject) => {
            const params = new HttpParams()
                .set('placeId', gmid);
            // tslint:disable-next-line: deprecation
            this.http.get(this.backendURL + 'utils/getGoogleMetadata', { params: params }).subscribe(data => {
                resolve(data);
            }, error => {
                console.log('error=', error);
                reject(error);
            });
        });
    }
    createNotificationTopic(topic, title, body, link, linkId, image) {
        return new Promise((resolve, reject) => {
            let params1 = new HttpParams()
                .set('topic', encodeURIComponent(topic))
                .set('title', encodeURIComponent(title))
                .set('link', encodeURIComponent(link))
                .set('linkId', encodeURIComponent(linkId))
                .set('body', encodeURIComponent(body));
            if (image) {
                params1 = params1.set('image', encodeURIComponent(image));
            }
            this.http.get(this.backendURL + 'utils/sendNotificationTopic', { responseType: 'text', params: params1 })
                // tslint:disable-next-line: deprecation
                .subscribe(data => {
                resolve(data);
            }, error => {
                reject(error);
            });
        });
    }
    createNotificationTarget(target, title, body, link, linkId, image) {
        return new Promise((resolve, reject) => {
            let params1 = new HttpParams()
                .set('target', encodeURIComponent(target))
                .set('title', encodeURIComponent(title))
                .set('link', encodeURIComponent(link))
                .set('linkId', encodeURIComponent(linkId))
                .set('body', encodeURIComponent(body));
            if (image) {
                params1 = params1.set('image', encodeURIComponent(image));
            }
            this.http.get(this.backendURL + 'utils/sendNotificationTopic', { responseType: 'text', params: params1 })
                // tslint:disable-next-line: deprecation
                .subscribe(data => {
                resolve(data);
            }, error => {
                reject(error);
            });
        });
    }
    getMediaType(url) {
        const temp = fileExtensionRegex.exec(url);
        let currentMediaType;
        if (temp != null && temp[1] != null) {
            if (temp[1].toLowerCase() === 'mp4') {
                currentMediaType = 'video';
            }
            else {
                currentMediaType = 'image';
            }
        }
        return currentMediaType;
    }
    setVariable(variable, value) {
        localStorage.setItem(variable, value);
    }
    getVariable(variable) {
        const temp = localStorage.getItem(variable);
        return temp === 'undefined' || !temp ? undefined : temp;
    }
    isSocialMediaLink(url) {
        if (!url)
            return false;
        const socialPatterns = [
            /^(https?:\/\/)?(www\.)?linkedin\.com\/.+/i,
            /^(https?:\/\/)?(www\.)?facebook\.com\/.+/i,
            /^(https?:\/\/)?(www\.)?twitter\.com\/.+/i,
            /^(https?:\/\/)?(www\.)?instagram\.com\/.+/i,
            /^(https?:\/\/)?(www\.)?tiktok\.com\/.+/i,
            /^(https?:\/\/)?(www\.)?youtube\.com\/.+/i,
            /^(https?:\/\/)?(www\.)?github\.com\/.+/i,
            /^(https?:\/\/)?(www\.)?behance\.net\/.+/i,
            /^(https?:\/\/)?(www\.)?dribbble\.com\/.+/i
        ];
        return socialPatterns.some(pattern => pattern.test(url));
    }
    static ɵfac = function UtilsService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UtilsService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(i2.DatePipe), i0.ɵɵinject(i3.HaversineService), i0.ɵɵinject(ScriptLoadingService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UtilsService, factory: UtilsService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UtilsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }, { type: i0.NgZone }, { type: i2.DatePipe }, { type: i3.HaversineService }, { type: ScriptLoadingService }], null); })();

var OBJECTNAME;
(function (OBJECTNAME) {
    OBJECTNAME["wnLocations"] = "backendlocations";
    OBJECTNAME["wnLocationtypes"] = "backendlocationtypes";
    OBJECTNAME["wnUsers"] = "backendusers";
    OBJECTNAME["wnMessages"] = "backendmessages";
    OBJECTNAME["wnEquipments"] = "backendequipments";
    OBJECTNAME["wnBookings"] = "backendbookings";
    OBJECTNAME["wnFeedbacks"] = "backendfeedbacks";
})(OBJECTNAME || (OBJECTNAME = {}));
var AUTHSTATUS;
(function (AUTHSTATUS) {
    AUTHSTATUS[AUTHSTATUS["SUCCESS"] = 1] = "SUCCESS";
    AUTHSTATUS[AUTHSTATUS["EMAILNOTVERIFIED"] = -1] = "EMAILNOTVERIFIED";
    AUTHSTATUS[AUTHSTATUS["UPDATETOKENFAILED"] = -2] = "UPDATETOKENFAILED";
    AUTHSTATUS[AUTHSTATUS["UNKNOWNERROR"] = -100] = "UNKNOWNERROR";
})(AUTHSTATUS || (AUTHSTATUS = {}));
class StoreDbService {
    http;
    ngZone;
    utilSvc;
    firebaseApp = {};
    adb;
    bdb;
    baf;
    storage = null;
    envPlatform;
    firebaseBSS = {};
    firebaseBSSdata = {};
    firebaseRefOn = [];
    firebaseData = {};
    backendFbRef = {};
    storageFbRef = [];
    uploadProgress$;
    firebaseauth;
    constructor(http, ngZone, utilSvc) {
        this.http = http;
        this.ngZone = ngZone;
        this.utilSvc = utilSvc;
    }
    initFBlistener(storeId, fbObject) {
        this.firebaseBSS[storeId][fbObject] = new BehaviorSubject([]);
        this.firebaseBSSdata[storeId][fbObject] = this.firebaseBSS[storeId][fbObject].asObservable();
        this.firebaseData[storeId][fbObject] = [];
    }
    closeFBlistener(storeId, fbObject) {
        if (this.firebaseBSS[storeId]) {
            delete this.firebaseBSS[storeId][fbObject];
        }
        if (this.firebaseBSSdata[storeId]) {
            delete this.firebaseBSSdata[storeId][fbObject];
        }
        if (this.firebaseData[storeId]) {
            delete this.firebaseData[storeId][fbObject];
        }
    }
    initFB(storeId, config, appName, storage, auth, firebaseObjects, fbRef) {
        return new Promise((resolve, reject) => {
            this.firebaseData[storeId] = this.firebaseData[storeId] ?? {};
            this.firebaseBSS[storeId] = this.firebaseBSS[storeId] ?? {};
            this.firebaseBSSdata[storeId] = this.firebaseBSSdata[storeId] ?? {};
            this.firebaseRefOn[storeId] = this.firebaseRefOn[storeId] ? this.firebaseRefOn[storeId] : [];
            firebaseObjects.forEach(fbObject => {
                this.initFBlistener(storeId, fbObject);
            });
            let data;
            data = this.initFirebaseDatabase(config, appName);
            const databaseString = 'database';
            const authString = 'auth';
            const storageString = 'storage';
            fbRef[databaseString] = data;
            if (auth) {
                let data1;
                data1 = this.initFirebaseAuth(config, appName);
                data1.languageCode = 'fr';
                fbRef[authString] = data1;
            }
            if (storage) {
                let data2;
                data2 = this.initFirebaseStorage(config, appName);
                fbRef[storageString] = data2;
            }
            resolve(fbRef);
        });
    }
    closeFB(storeId, firebaseObjects, fbRef) {
        return new Promise(resolve => {
            const promises = [];
            firebaseObjects.forEach(fbObject => {
                this.closeFBlistener(storeId, fbObject);
            });
            this.firebaseData[storeId] = {};
            this.firebaseBSS[storeId] = {};
            this.firebaseBSSdata[storeId] = {};
            this.firebaseRefOn[storeId] = [];
            fbRef = [];
            Promise.all(promises).then(() => resolve(1));
        });
    }
    // method for initialisation of FB
    initFirebaseDatabase(config, appname) {
        if (!this.firebaseApp[appname]) {
            this.firebaseApp[appname] = firebase.initializeApp(config, appname);
        }
        const database = firebase.database(this.firebaseApp[appname]);
        return database;
    }
    initFirebaseStorage(config, appname) {
        if (!this.firebaseApp[appname]) {
            this.firebaseApp[appname] = firebase.initializeApp(config, appname);
        }
        const storage = this.firebaseApp[appname].storage();
        return storage;
    }
    initFirebaseAuth(config, appname) {
        if (!this.firebaseApp[appname]) {
            this.firebaseApp[appname] = firebase.initializeApp(config, appname);
        }
        const auth = firebase.auth(this.firebaseApp[appname]);
        this.firebaseauth = firebase.auth;
        /*    this.firebaseauth = new firebase.auth.RecaptchaVerifier('sign-in-button', {
              size: 'visible',
              callback: (response) => {
    
              },
              'expired-callback': () => {
              }
            });*/
        return auth;
    }
    // CRUD methods for a given object
    subscribeObject(storeId, fbDbRef, fbObject, refId) {
        let tempObject = fbObject;
        if (fbObject.indexOf('backend') !== 0) {
            tempObject = storeId + '/' + fbObject;
        }
        if (refId && refId !== -1) {
            tempObject = tempObject + '/' + refId;
        }
        this.firebaseRefOn[storeId][fbObject] = fbDbRef.ref(tempObject)
            .on('value', data => {
            let temp = data.val();
            if (temp == null) {
                temp = undefined;
            }
            if (refId !== undefined) {
                if (refId !== -1) {
                    this.firebaseData[storeId][fbObject][refId] = temp;
                }
                else {
                    this.firebaseData[storeId][fbObject] = temp;
                }
            }
            else {
                if (temp !== undefined) {
                    this.firebaseData[storeId][fbObject] = this.utilSvc.objectToArray(data.val());
                }
            }
            if (this.firebaseBSS[storeId][fbObject]) {
                this.firebaseBSS[storeId][fbObject].next([temp]);
            }
        });
    }
    unsubscribeObject(storeId, fbDbRef, fbObject, refId) {
        if (this.firebaseRefOn[storeId]) {
            if (this.firebaseRefOn[storeId][fbObject]) {
                let tempObject = fbObject;
                if (fbObject.indexOf('backend') !== 0) {
                    tempObject = storeId + '/' + fbObject;
                }
                if (refId && refId !== -1) {
                    tempObject = tempObject + '/' + refId + '/';
                }
                fbDbRef.ref(tempObject).off();
                delete this.firebaseRefOn[storeId][fbObject];
            }
        }
    }
    getObject(storeId, fbDbRef, fbObject, refId) {
        return new Promise((resolve, reject) => {
            let tempObject = fbObject;
            if (fbObject.indexOf('backend') !== 0) {
                tempObject = storeId + '/' + fbObject;
            }
            if (refId !== undefined && refId !== -1) {
                tempObject = tempObject + '/' + refId;
            }
            if (fbDbRef) {
                fbDbRef.ref(tempObject)
                    .once('value')
                    .then(data => {
                    resolve(data.val());
                }, error => {
                    reject(error);
                });
            }
            else {
                resolve(null);
            }
        });
    }
    removeObject(storeId, fbDbRef, fbObject, refId) {
        return new Promise((resolve, reject) => {
            let tempObject;
            if (refId !== undefined) {
                if (fbObject.indexOf('backend') !== 0) {
                    tempObject = storeId + '/' + fbObject + '/' + refId;
                }
                else {
                    tempObject = fbObject + '/' + refId;
                }
                fbDbRef.ref(tempObject).remove().then(() => {
                    resolve(String(refId));
                }, error => {
                    reject(error);
                });
            }
            else {
                resolve(undefined);
            }
        });
    }
    updateObject(storeId, fbDbRef, fbObject, objectData, refId) {
        return new Promise((resolve, reject) => {
            let tempObject = fbObject;
            if (fbObject.indexOf('backend') !== 0) {
                tempObject = storeId + '/' + fbObject;
            }
            else {
            }
            const tod = new Date().getTime();
            if (refId) {
                tempObject = tempObject + '/' + refId;
                objectData.modifiedTS = tod;
            }
            if (objectData) {
                fbDbRef
                    .ref(tempObject)
                    .set(objectData)
                    .then(async (data) => {
                    resolve(objectData);
                }, error => reject(error));
            }
            else {
                reject(undefined);
            }
        });
    }
    getAvailableObjectId(BEStoreId, fbObject, idName) {
        return new Promise((resolve, reject) => {
            this.getObject(BEStoreId, this.utilSvc.mdb, fbObject).then(data => {
                const temp = data;
                const objectId = temp[temp.length - 1][idName] + 1;
                resolve(objectId);
            }, error => reject(error));
        });
    }
    deleteObject(storeId, objectToDelete) {
        let ref;
        const regexasset = /(\/?assets\/)(.+)/;
        const temp = regexasset.exec(objectToDelete);
        if (temp && temp[2]) {
            if (storeId === this.utilSvc.backendFBstoreId) {
                // Create a reference to the file to delete
                ref = this.utilSvc.mst.ref(temp[2]);
            }
            else {
                ref = this.utilSvc.sst[storeId].ref(temp[2]);
            }
            // Delete the file
            ref.delete();
        }
    }
    deleteObjectFromUrl(storeId, url) {
        let ref;
        let error;
        if (storeId === this.utilSvc.backendFBstoreId) {
            // Create a reference to the file to delete
            try {
                ref = this.utilSvc.mst.refFromURL(url);
            }
            catch (e) {
                error = e;
            }
        }
        else {
            try {
                ref = this.utilSvc.sst[storeId].refFromURL(url);
            }
            catch (e) {
                error = e;
            }
        }
        // Delete the file
        if (ref) {
            try {
                ref.delete();
            }
            catch (e) { }
        }
    }
    uploadObjects(event, directory, read) {
        return new Promise((resolve, reject) => {
            let ref;
            const fileName = event.target.files[0].name;
            ref = this.utilSvc.mst.ref(directory + '/' + fileName);
            const task = ref.put(event.target.files[0]).then(async (snapshot) => {
                try {
                    const downloadURL = await ref.getDownloadURL();
                    resolve(downloadURL);
                }
                catch (e) {
                    reject(e);
                }
            }, error => {
                reject(error);
            });
        });
    }
    uploadObjects1(storeId, file, directory, read) {
        return new Promise((resolve, reject) => {
            let ref;
            const fileName = file.name;
            if (storeId !== this.utilSvc.backendFBstoreId) {
                ref = this.utilSvc.sst[storeId].ref(directory + '/' + fileName);
            }
            else {
                ref = this.utilSvc.mst.ref(directory + '/' + fileName);
            }
            const task = ref.put(file).then(async (snapshot) => {
                try {
                    const downloadURL = await ref.getDownloadURL();
                    resolve(downloadURL);
                }
                catch (e) {
                    reject(e);
                }
            }, error => {
                reject(error);
            });
        });
    }
    uploadMedia(storeId, event, directory) {
        return new Promise(async (resolve, reject) => {
            let thumb;
            if (!directory) {
                directory = '';
            }
            if (event) {
                try {
                    thumb = await this.uploadObjects(event, directory, false);
                }
                catch (e) {
                    console.log('quick connect error e=', e);
                }
            }
            resolve(thumb);
        });
    }
    uploadMedia1(storeId, file, directory) {
        return new Promise(async (resolve, reject) => {
            let thumb;
            if (!directory) {
                directory = '';
            }
            if (event) {
                try {
                    thumb = await this.uploadObjects1(storeId, file, directory, false);
                }
                catch (e) { }
            }
            resolve(thumb);
        });
    }
    deletePImage(storeId, pImage, objectName) {
        return new Promise((resolve, reject) => {
            if (pImage.fburl) {
                this.deleteObject(storeId, pImage.backendurl);
            }
            this.removeObject(storeId, this.utilSvc.sdb[storeId], objectName, String(pImage.assetId)).then(data => {
                resolve(pImage);
            }, error => {
                reject(error);
            });
        });
    }
    deletePVideo(storeId, pVideo, objectName) {
        return new Promise((resolve, reject) => {
            if (pVideo.fburl) {
                this.deleteObject(storeId, pVideo.backendurl);
            }
            this.removeObject(storeId, this.utilSvc.sdb[storeId], objectName, String(pVideo.assetId)).then(data => {
                resolve(pVideo);
            }, error => {
                reject(error);
            });
        });
    }
    createPImage(storeId, pImageName, objectName, type1) {
        return new Promise((resolve, reject) => {
            const pImage = {
                nickName: pImageName,
                assetId: Math.floor(Math.random() * 100000),
                type: type1
            };
            this.updateObject(storeId, this.utilSvc.sdb[storeId], objectName, pImage, pImage.assetId).then(data => {
                resolve(pImage);
            }, error => {
                reject(error);
            });
        });
    }
    updatePImage(storeId, pImage, pImageName, objectName) {
        return new Promise((resolve, reject) => {
            pImage.nickName = pImageName;
            this.updateObject(storeId, this.utilSvc.sdb[storeId], objectName, pImage, pImage.assetId).then(data => {
                resolve(pImage);
            }, error => {
                reject(error);
            });
        });
    }
    createPVideo(storeId, pVideoName, objectName, type1) {
        return new Promise((resolve, reject) => {
            const pVideo = {
                nickName: pVideoName,
                assetId: Math.floor(Math.random() * 100000),
                type: type1
            };
            this.updateObject(storeId, this.utilSvc.sdb[storeId], objectName, pVideo, pVideo.assetId).then(data => {
                resolve(pVideo);
            }, error => {
                reject(error);
            });
        });
    }
    updatePVideo(storeId, pVideo, pVideoName, objectName) {
        return new Promise((resolve, reject) => {
            pVideo.nickName = pVideoName;
            this.updateObject(storeId, this.utilSvc.sdb[storeId], objectName, pVideo, pVideo.assetId).then(data => {
                resolve(pVideo);
            }, error => {
                reject(error);
            });
        });
    }
    validateVideoFile(file) {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src);
        };
        video.srcObject = file;
    }
    static ɵfac = function StoreDbService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StoreDbService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i0.NgZone), i0.ɵɵinject(UtilsService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: StoreDbService, factory: StoreDbService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StoreDbService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }, { type: i0.NgZone }, { type: UtilsService }], null); })();

class FilterGenericN {
    transform(objects, filterField, filterValue, fake, negativeValue) {
        if (objects) {
            let temp;
            if (fake) {
                fake++;
            }
            if (negativeValue) {
                if (negativeValue !== '-1') {
                    temp = objects.filter(i => {
                        if (i != null) {
                            return String(i[filterField]) === String(filterValue);
                        }
                        else {
                            return false;
                        }
                    });
                }
                else {
                    temp = objects.filter(i => {
                        if (i != null) {
                            return String(i[filterField]) !== String(filterValue);
                        }
                        else {
                            return false;
                        }
                    });
                }
            }
            else {
                temp = objects.filter(i => String(i[filterField]) === String(filterValue));
            }
            return temp;
        }
        else {
            return [];
        }
    }
    static ɵfac = function FilterGenericN_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterGenericN)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "filterGenericN", type: FilterGenericN, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterGenericN, [{
        type: Pipe,
        args: [{
                name: 'filterGenericN',
                pure: false
            }]
    }], null, null); })();
class CountGenericN {
    transform(objects, filterField, filterValue, fake, negativeValue) {
        let temp = [];
        if (objects) {
            if (fake) {
                fake++;
            }
            if (negativeValue) {
                if (negativeValue !== '-1') {
                    temp = objects.filter(i => {
                        if (i != null) {
                            return i[filterField] === filterValue;
                        }
                        else {
                            return false;
                        }
                    });
                }
                else {
                    temp = objects.filter(i => {
                        if (i != null) {
                            return i[filterField] !== filterValue;
                        }
                        else {
                            return false;
                        }
                    });
                }
            }
            else {
                temp = objects.filter(i => i[filterField] === filterValue);
            }
            if (!temp) {
                temp = [];
            }
        }
        return temp.length;
    }
    static ɵfac = function CountGenericN_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CountGenericN)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "countGenericN", type: CountGenericN, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CountGenericN, [{
        type: Pipe,
        args: [{
                name: 'countGenericN',
                pure: false
            }]
    }], null, null); })();
class FilterGenericNS {
    transform(objects, filterField, filterValue, fake, negativeValue) {
        if (objects) {
            let temp;
            if (fake) {
                fake++;
            }
            if (filterValue && (filterValue !== -1)) {
                temp = objects.filter(i => {
                    if (i != null) {
                        if (i[filterField]) {
                            return String(i[filterField]).toLowerCase().includes(String(filterValue).toLowerCase());
                        }
                    }
                    else {
                        return false;
                    }
                });
            }
            else {
                temp = objects;
            }
            return temp;
        }
        else {
            return [];
        }
    }
    static ɵfac = function FilterGenericNS_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterGenericNS)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "filterGenericNS", type: FilterGenericNS, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterGenericNS, [{
        type: Pipe,
        args: [{
                name: 'filterGenericNS',
                pure: false
            }]
    }], null, null); })();
class CountGenericS {
    transform(objects, filterField, filterValue, reverse, fake) {
        if (objects) {
            let temp;
            if (fake) {
                fake++;
            }
            if ((filterValue) && (filterValue.length > 0)) {
                temp = objects.filter(i => {
                    if (i != null) {
                        if (i[filterField] && filterValue) {
                            if (reverse) {
                                if (!reverse) {
                                    return String(i[filterField]).toLowerCase().search(String(filterValue).toLowerCase()) === 0;
                                }
                                else {
                                    return String(i[filterField]).toLowerCase().search(String(filterValue).toLowerCase()) !== 0;
                                }
                            }
                            else {
                                return String(i[filterField]).toLowerCase().search(String(filterValue).toLowerCase()) === 0;
                            }
                        }
                    }
                    else {
                        return false;
                    }
                });
            }
            else {
                temp = objects;
            }
            return temp.length;
        }
        else {
            return [];
        }
    }
    static ɵfac = function CountGenericS_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CountGenericS)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "countGenericS", type: CountGenericS, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CountGenericS, [{
        type: Pipe,
        args: [{
                name: 'countGenericS',
                pure: false
            }]
    }], null, null); })();
class FilterGenericS {
    transform(objects, filterField, filterValue, reverse, fake) {
        if (objects) {
            let temp;
            if (fake) {
                fake++;
            }
            if ((filterValue) && (filterValue.length > 0)) {
                temp = objects.filter(i => {
                    if (i != null) {
                        if (i[filterField] && filterValue) {
                            if (reverse) {
                                if (!reverse) {
                                    return String(i[filterField]).toLowerCase().search(String(filterValue).toLowerCase()) === 0;
                                }
                                else {
                                    return String(i[filterField]).toLowerCase().search(String(filterValue).toLowerCase()) !== 0;
                                }
                            }
                            else {
                                return String(i[filterField]).toLowerCase().search(String(filterValue).toLowerCase()) === 0;
                            }
                        }
                    }
                    else {
                        return false;
                    }
                });
            }
            else {
                temp = objects;
            }
            return temp;
        }
        else {
            return [];
        }
    }
    static ɵfac = function FilterGenericS_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterGenericS)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "filterGenericS", type: FilterGenericS, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterGenericS, [{
        type: Pipe,
        args: [{
                name: 'filterGenericS',
                pure: false
            }]
    }], null, null); })();
class CountGenericPS {
    transform(objects, filterField, filterValue, reverse, fake) {
        if (objects) {
            let temp;
            if (fake) {
                fake++;
            }
            if ((String(filterValue)) && (String(filterValue).length > 0)) {
                temp = objects.filter(i => {
                    if (i != null) {
                        if (i[filterField]) {
                            if (reverse) {
                                if (!reverse) {
                                    return String(i[filterField]).toLowerCase().includes(String(filterValue).toLowerCase());
                                }
                                else {
                                    return !String(i[filterField]).toLowerCase().includes(String(filterValue).toLowerCase());
                                }
                            }
                            else {
                                return String(i[filterField]).toLowerCase().includes(String(filterValue).toLowerCase());
                            }
                        }
                    }
                    else {
                        return false;
                    }
                });
            }
            else {
                temp = objects;
            }
            return temp.length;
        }
        else {
            return 0;
        }
    }
    static ɵfac = function CountGenericPS_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CountGenericPS)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "countGenericPS", type: CountGenericPS, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CountGenericPS, [{
        type: Pipe,
        args: [{
                name: 'countGenericPS',
                pure: false
            }]
    }], null, null); })();
class FilterGenericPS {
    transform(objects, filterField, filterValue, reverse, fake) {
        if (objects) {
            let temp;
            if (fake) {
                fake++;
            }
            if ((String(filterValue)) && (String(filterValue).length > 0)) {
                temp = objects.filter(i => {
                    if (i != null) {
                        if (i[filterField]) {
                            if (reverse) {
                                if (!reverse) {
                                    return String(i[filterField]).toLowerCase().includes(String(filterValue).toLowerCase());
                                }
                                else {
                                    return !String(i[filterField]).toLowerCase().includes(String(filterValue).toLowerCase());
                                }
                            }
                            else {
                                return String(i[filterField]).toLowerCase().includes(String(filterValue).toLowerCase());
                            }
                        }
                    }
                    else {
                        return false;
                    }
                });
            }
            else {
                temp = objects;
            }
            return temp;
        }
        else {
            return [];
        }
    }
    static ɵfac = function FilterGenericPS_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterGenericPS)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "filterGenericPS", type: FilterGenericPS, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterGenericPS, [{
        type: Pipe,
        args: [{
                name: 'filterGenericPS',
                pure: false
            }]
    }], null, null); })();
class FilterGenericPSO {
    transform(objects, filterField1, filterValue1, filterField2, filterValue2) {
        if (objects) {
            let temp;
            if ((filterValue1) && (filterValue2)) {
                temp = objects.filter(i => {
                    if (i) {
                        if (i[filterField1] && i[filterField2]) {
                            return (String(i[filterField1]).toLowerCase().includes(String(filterValue1).toLowerCase()) ||
                                String(i[filterField2]).toLowerCase().includes(String(filterValue2).toLowerCase()));
                        }
                    }
                    else {
                        return false;
                    }
                });
            }
            else {
                temp = objects;
            }
            return temp;
        }
        else {
            return [];
        }
    }
    static ɵfac = function FilterGenericPSO_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterGenericPSO)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "filterGenericPSO", type: FilterGenericPSO, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterGenericPSO, [{
        type: Pipe,
        args: [{
                name: 'filterGenericPSO',
                pure: false
            }]
    }], null, null); })();
class FilterGenericPSA {
    transform(objects, filterField1, filterValue1, filterField2, filterValue2) {
        if (objects) {
            let temp;
            if ((filterValue1) && (filterValue2)) {
                temp = objects.filter(i => {
                    if (i) {
                        if (i[filterField1] && i[filterField2]) {
                            return (String(i[filterField1]).toLowerCase().includes(String(filterValue1).toLowerCase()) &&
                                String(i[filterField2]).toLowerCase().includes(String(filterValue2).toLowerCase()));
                        }
                    }
                    else {
                        return false;
                    }
                });
            }
            else {
                temp = objects;
            }
            return temp;
        }
        else {
            return [];
        }
    }
    static ɵfac = function FilterGenericPSA_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterGenericPSA)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "filterGenericPSA", type: FilterGenericPSA, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterGenericPSA, [{
        type: Pipe,
        args: [{
                name: 'filterGenericPSA',
                pure: false
            }]
    }], null, null); })();
class FilterGenericIS {
    transform(objects, filterField, filterValue, fake) {
        if (objects) {
            let temp;
            if (fake) {
                fake++;
            }
            if ((filterValue !== -1) && (filterValue) && (filterValue != null)) {
                temp = objects.filter(i => {
                    if (i != null) {
                        if (i[filterField]) {
                            return i[filterField].toLowerCase().includes(String(filterValue).toLowerCase());
                        }
                    }
                    else {
                        return false;
                    }
                });
            }
            else {
                temp = objects;
            }
            return temp;
        }
        else {
            return [];
        }
    }
    static ɵfac = function FilterGenericIS_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterGenericIS)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "filterGenericIS", type: FilterGenericIS, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterGenericIS, [{
        type: Pipe,
        args: [{
                name: 'filterGenericIS',
                pure: false
            }]
    }], null, null); })();
class FilterGenericA {
    transform(objects, filterField, filterValue, fake) {
        if (objects) {
            let temp = [];
            ;
            if (fake) {
                fake++;
            }
            if ((filterValue !== -1) && (filterValue) && (filterValue != null)) {
                if (filterValue.length === 0) {
                    temp = objects;
                }
                else {
                    if (objects) {
                        for (const obj of objects) {
                            let found = false;
                            for (let i = 0; i < obj[filterField].length && !found; i++) {
                                for (let j = 0; j < filterValue.length && !found; j++) {
                                    if (obj != null) {
                                        if (String(obj[filterField][i]).toLowerCase() === String(filterValue[j]).toLowerCase()) {
                                            temp.push(obj);
                                            found = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            else {
                temp = objects;
            }
            return temp;
        }
        else {
            return [];
        }
    }
    static ɵfac = function FilterGenericA_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterGenericA)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "filterGenericA", type: FilterGenericA, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterGenericA, [{
        type: Pipe,
        args: [{
                name: 'filterGenericA',
                pure: false
            }]
    }], null, null); })();
class FilterGenericB {
    transform(objects, filterField, filterValue, fake) {
        if (objects) {
            let temp;
            if (fake !== undefined) {
                fake++;
            }
            temp = objects.filter(i => {
                let temp2 = false;
                if (filterValue === undefined) {
                    filterValue = true;
                }
                if (i != null) {
                    if (i[filterField] !== undefined) {
                        temp2 = i[filterField] === filterValue;
                    }
                    else {
                        temp2 = true;
                    }
                }
                return temp2;
            });
            return temp;
        }
        else {
            return [];
        }
    }
    static ɵfac = function FilterGenericB_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || FilterGenericB)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "filterGenericB", type: FilterGenericB, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(FilterGenericB, [{
        type: Pipe,
        args: [{
                name: 'filterGenericB',
                pure: false
            }]
    }], null, null); })();
class CountGenericB {
    transform(objects, filterField, filterValue, fake) {
        if (objects) {
            let temp;
            if (fake) {
                fake++;
            }
            if (filterValue === undefined) {
                filterValue = true;
            }
            if (filterValue !== undefined) {
                temp = objects.filter(i => {
                    if (i != null) {
                        if (i[filterField]) {
                            return i[filterField];
                        }
                    }
                    else {
                        return false;
                    }
                });
            }
            else {
                temp = objects;
            }
            return temp.length;
        }
        else {
            return 0;
        }
    }
    static ɵfac = function CountGenericB_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || CountGenericB)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "countGenericB", type: CountGenericB, pure: false });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CountGenericB, [{
        type: Pipe,
        args: [{
                name: 'countGenericB',
                pure: false
            }]
    }], null, null); })();
class TranslateAuto {
    http;
    utilsSvc;
    constructor(http, utilsSvc) {
        this.http = http;
        this.utilsSvc = utilsSvc;
    }
    transform(text, fake, languageo) {
        let language;
        if (!languageo) {
            language = 'en-' + this.utilsSvc.language;
        }
        else {
            language = languageo + '-' + this.utilsSvc.language;
        }
        return this.utilsSvc.translate(text, language).then(data => {
            return data;
        });
    }
    static ɵfac = function TranslateAuto_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || TranslateAuto)(i0.ɵɵdirectiveInject(i1.HttpClient, 16), i0.ɵɵdirectiveInject(UtilsService, 16)); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "translateAuto", type: TranslateAuto, pure: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TranslateAuto, [{
        type: Pipe,
        args: [{
                name: 'translateAuto'
            }]
    }], () => [{ type: i1.HttpClient }, { type: UtilsService }], null); })();
class AddComponent {
    transform(text, componentName) {
        return componentName + '.' + text;
    }
    static ɵfac = function AddComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || AddComponent)(); };
    static ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "addComponent", type: AddComponent, pure: true });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AddComponent, [{
        type: Pipe,
        args: [{
                name: 'addComponent'
            }]
    }], null, null); })();

/* eslint-disable @typescript-eslint/naming-convention */
const firebaseConfig$1 = {
    apiKey: 'AIzaSyAFIiBNkBda_tNdkppBmdzCzZhizmFOgKc',
    authDomain: 'backend-prod-e4d4e.firebaseapp.com',
    databaseURL: 'https://backend-prod-e4d4e.firebaseio.com',
    projectId: 'backend-prod-e4d4e',
    storageBucke: 'backend-prod-e4d4e.appspot.com',
    messagingSenderId: '981006637106'
};
class UsersService {
    http;
    storeDbSvc;
    utilSvc;
    alertController;
    userInfo;
    currentUser;
    allUsers;
    allUsersO = new BehaviorSubject(null);
    confirmationResult;
    firebaseauth;
    recaptchaVerifier;
    constructor(http, storeDbSvc, utilSvc, alertController) {
        this.http = http;
        this.storeDbSvc = storeDbSvc;
        this.utilSvc = utilSvc;
        this.alertController = alertController;
    }
    authUser(email, password1, emailNotVerified) {
        const password = password1;
        const maf = this.utilSvc.mauth;
        return new Promise((resolve, reject) => {
            maf.signInWithEmailAndPassword(email.toLowerCase(), password).then((success) => {
                const user = success.user;
                console.log('user=', user);
                if (user.emailVerified || emailNotVerified) {
                    resolve([AUTHSTATUS.SUCCESS, user]);
                }
                else {
                    reject([AUTHSTATUS.EMAILNOTVERIFIED, 'Login Failed! email not verified']);
                }
            }, error => {
                reject([AUTHSTATUS.UNKNOWNERROR, error]);
            })
                .catch((error) => {
                reject([AUTHSTATUS.UNKNOWNERROR, error]);
            });
        });
    }
    logout() {
        const maf = this.utilSvc.mauth;
        return new Promise((resolve, reject) => {
            maf.signOut().then((success) => {
                resolve(success);
            }, error => {
                reject(error);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    resetPwdUser(email) {
        const maf = this.utilSvc.mauth;
        return new Promise((resolve, reject) => {
            maf.sendPasswordResetEmail(email)
                .then(() => {
                resolve(1);
            }, (error) => {
                reject(error);
            })
                .catch((error) => {
                reject(error);
            });
        });
    }
    getUser(wnUserId) {
        const storeId = this.utilSvc.backendFBstoreId;
        return new Promise(async (resolve, reject) => {
            if (!wnUserId) {
                reject(undefined);
            }
            else {
                this.storeDbSvc.getObject(storeId, this.utilSvc.mdb, OBJECTNAME.wnUsers, wnUserId).then(async (data) => {
                    this.userInfo = data;
                    if (this.userInfo) {
                        let temp;
                        try {
                            temp = await this.authUser(this.userInfo.email, this.userInfo.password, true);
                            resolve(temp);
                        }
                        catch (e) {
                            console.log('error=', e);
                            reject(e);
                        }
                    }
                }, error => {
                    reject(error);
                });
            }
        });
    }
    updatePwd(wnUser, oldPwd1, newPwd1) {
        return new Promise((resolve, reject) => {
            this.authUser(wnUser.email, oldPwd1).then(data => {
                const body = {
                    email: wnUser.email,
                    newpassword: newPwd1,
                };
                const httpOptions = {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                    })
                };
                // tslint:disable-next-line: deprecation
                this.http.post(this.utilSvc.backendURL + 'user/updatePwd', body, httpOptions).subscribe(result => {
                    resolve(result);
                }, error => {
                    reject(error);
                });
            }, error => {
                reject(error);
            });
        });
    }
    updateUser(wnUser) {
        return new Promise((resolve, reject) => {
            if (wnUser && wnUser.userId) {
                this.storeDbSvc.updateObject(this.utilSvc.backendFBstoreId, this.utilSvc.mdb, OBJECTNAME.wnUsers, wnUser, wnUser.userId).then(data => {
                    resolve(data);
                }, error => reject(error));
            }
            else {
                reject('user undefined');
            }
        });
    }
    static ɵfac = function UsersService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || UsersService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(StoreDbService), i0.ɵɵinject(UtilsService), i0.ɵɵinject(i4.AlertController)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: UsersService, factory: UsersService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(UsersService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }, { type: StoreDbService }, { type: UtilsService }, { type: i4.AlertController }], null); })();

class StripeScriptService {
    scriptLoadingService;
    baseUrl = 'https://js.stripe.com/v3/';
    globalVar = 'stripe';
    constructor(scriptLoadingService) {
        this.scriptLoadingService = scriptLoadingService;
    }
    registerScript(loaded) {
        this.scriptLoadingService.registerScript(this.getStripeUrl(), this.globalVar, loaded);
    }
    getStripeUrl() {
        return this.baseUrl;
    }
    static ɵfac = function StripeScriptService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || StripeScriptService)(i0.ɵɵinject(ScriptLoadingService)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: StripeScriptService, factory: StripeScriptService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StripeScriptService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: ScriptLoadingService }], null); })();

const firebaseConfig = {
    apiKey: 'AIzaSyAFIiBNkBda_tNdkppBmdzCzZhizmFOgKc',
    authDomain: 'backend-prod-e4d4e.firebaseapp.com',
    databaseURL: 'https://backend-prod-e4d4e.firebaseio.com',
    projectId: 'backend-prod-e4d4e',
    storageBucket: 'backend-prod-e4d4e.appspot.com',
    messagingSenderId: '981006637106'
};

function createTranslateLoader(http) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
class MyMissingTranslationHandler {
    handle(params) {
        const regexComponent = /.*\.component\.((.|\n|\r)+)+/gi;
        const temp = regexComponent.exec(params.key);
        if (temp && temp != null) {
            return temp[1];
        }
    }
}
class GodigitalbModule {
    static ɵfac = function GodigitalbModule_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || GodigitalbModule)(); };
    static ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: GodigitalbModule });
    static ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [HaversineService], imports: [HttpClientModule,
            AngularFireModule.initializeApp(firebaseConfig, 'bootstrap'),
            AngularFireAuthModule,
            AngularFireStorageModule,
            AngularFireDatabaseModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: (createTranslateLoader),
                    deps: [HttpClient],
                },
                missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
                useDefaultLang: false
            }), TranslateModule] });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(GodigitalbModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [
                    HttpClientModule,
                    AngularFireModule.initializeApp(firebaseConfig, 'bootstrap'),
                    AngularFireAuthModule,
                    AngularFireStorageModule,
                    AngularFireDatabaseModule,
                    TranslateModule.forRoot({
                        loader: {
                            provide: TranslateLoader,
                            useFactory: (createTranslateLoader),
                            deps: [HttpClient],
                        },
                        missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
                        useDefaultLang: false
                    }),
                    // 👉 Ajoute ici tous tes pipes standalone :
                    FilterGenericN,
                    FilterGenericS,
                    FilterGenericIS,
                    CountGenericS,
                    CountGenericPS,
                    FilterGenericNS,
                    FilterGenericPS,
                    FilterGenericB,
                    CountGenericB,
                    FilterGenericA,
                    TranslateAuto,
                    AddComponent,
                    CountGenericN,
                    FilterGenericPSA,
                    FilterGenericPSO
                ],
                exports: [
                    // Ré-exporte ici les standalone que tu veux exposer
                    FilterGenericN,
                    FilterGenericS,
                    FilterGenericIS,
                    CountGenericS,
                    CountGenericPS,
                    FilterGenericNS,
                    FilterGenericPS,
                    FilterGenericB,
                    CountGenericB,
                    FilterGenericA,
                    TranslateAuto,
                    AddComponent,
                    CountGenericN,
                    FilterGenericPSA,
                    FilterGenericPSO,
                    TranslateModule
                ],
                providers: [HaversineService]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(GodigitalbModule, { imports: [HttpClientModule, i1$1.AngularFireModule, AngularFireAuthModule,
        AngularFireStorageModule,
        AngularFireDatabaseModule, i2$1.TranslateModule, 
        // 👉 Ajoute ici tous tes pipes standalone :
        FilterGenericN,
        FilterGenericS,
        FilterGenericIS,
        CountGenericS,
        CountGenericPS,
        FilterGenericNS,
        FilterGenericPS,
        FilterGenericB,
        CountGenericB,
        FilterGenericA,
        TranslateAuto,
        AddComponent,
        CountGenericN,
        FilterGenericPSA,
        FilterGenericPSO], exports: [
        // Ré-exporte ici les standalone que tu veux exposer
        FilterGenericN,
        FilterGenericS,
        FilterGenericIS,
        CountGenericS,
        CountGenericPS,
        FilterGenericNS,
        FilterGenericPS,
        FilterGenericB,
        CountGenericB,
        FilterGenericA,
        TranslateAuto,
        AddComponent,
        CountGenericN,
        FilterGenericPSA,
        FilterGenericPSO,
        TranslateModule] }); })();

/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
const externalUrlProvider = new InjectionToken('externalUrlRedirectResolver');
var EDITSLIDE;
(function (EDITSLIDE) {
    EDITSLIDE[EDITSLIDE["CREATIONSLIDE"] = 0] = "CREATIONSLIDE";
    EDITSLIDE[EDITSLIDE["EDITIONSLIDE"] = 1] = "EDITIONSLIDE";
})(EDITSLIDE || (EDITSLIDE = {}));
var BOOKINGSTATUS;
(function (BOOKINGSTATUS) {
    BOOKINGSTATUS["CREATION"] = "creation";
    BOOKINGSTATUS["REQUESTED"] = "requested";
    BOOKINGSTATUS["PENDINGREQUEST"] = "pendind request";
    BOOKINGSTATUS["APPROVED"] = "approved";
    BOOKINGSTATUS["PENDINGCANCEL"] = "pendind cancel";
    BOOKINGSTATUS["CANCELLED"] = "cancelled";
})(BOOKINGSTATUS || (BOOKINGSTATUS = {}));
const regexUrl = /https?:\/\//;
const regexUrlImage = /(https?:\/\/.*\.(?:png|jpg|jpeg))/;
const regexUrlVideo = /(https?:\/\/.*\.(?:mp4|avi))/;
const regexUrlMedia = /(^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$)|((https?:\/\/.*\.(?:mp4|avi|png|jpg|jpeg)))/;
const regexMobileNo = /(^(0033|\+33|0)(6|7)(\d{8})$)|(^\+44\d{10}$)|(^\+31\d{8,10}$)|(^\+34(\d{8,10})$)|(^\+41(\d{8,10})$)|(^\+39(\d{8,10})$)/;
const regexFixedNo = /(^(0033|\+33|0)(1|2|3|4|5|8|9)(\d{8})$)|(^\+44\d{10}$)|(^\+31\d{8,10}$)|(^\+34(\d{8,10})$)|(^\+41(\d{8,10})$)|(^\+39(\d{8,10})$)/;
const regexEmail = /^[^@]+@[a-z0-9.-]+\.[a-z]{2,3}$/;
class ServicesService {
    http;
    router;
    storeDbSvc;
    utilSvc;
    usersSvc;
    spinner;
    scriptLoadingSvc;
    logger;
    config;
    backendFbObjects = [
        OBJECTNAME.wnBookings,
        OBJECTNAME.wnEquipments,
        OBJECTNAME.wnFeedbacks,
        OBJECTNAME.wnLocations,
        OBJECTNAME.wnLocationtypes,
        OBJECTNAME.wnMessages,
        OBJECTNAME.wnUsers,
    ];
    wnUser;
    wnUserO = new BehaviorSubject(null);
    wnGuest;
    wnGuestO = new BehaviorSubject(null);
    wnHost;
    wnHostO = new BehaviorSubject(null);
    wnBookings;
    wnBookingsO = new BehaviorSubject(null);
    wnLocations;
    wnLocationsO = new BehaviorSubject(null);
    wnLocationtypes;
    wnLocationtypesO = new BehaviorSubject(null);
    wnEquipments;
    wnEquipmentsO = new BehaviorSubject(null);
    wnMessages;
    wnMessagesO = new BehaviorSubject(null);
    wnFeedbacks;
    wnFeedbacksO = new BehaviorSubject(null);
    version;
    firebaseBSSdata = {};
    languageO = new BehaviorSubject(null);
    errorMessage = {
        title: '',
        description: '',
        details: ''
    };
    currentPosition = {
        lat: 0,
        lng: 0
    };
    progress = 0;
    constructor(http, router, storeDbSvc, utilSvc, usersSvc, spinner, scriptLoadingSvc, logger) {
        this.http = http;
        this.router = router;
        this.storeDbSvc = storeDbSvc;
        this.utilSvc = utilSvc;
        this.usersSvc = usersSvc;
        this.spinner = spinner;
        this.scriptLoadingSvc = scriptLoadingSvc;
        this.logger = logger;
    }
    logDS(...args) {
        let logText = '';
        for (let i = 1; i < args.length; i++) {
            logText = logText + args[i] + ',';
        }
        const userId = this.wnGuest
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
    readConfigFile(env) {
        return new Promise((resolve, reject) => {
            this.utilSvc.readConfig('./assets/config/adf.json').then((data) => {
                this.config = data;
                const backendURLString = 'backendURL';
                if (!this.utilSvc.language) {
                    this.utilSvc.language = 'fr';
                }
                if (!env || !env.platform) {
                    this.utilSvc.platform = this.config.application?.platform;
                    env = {};
                    env.platform = this.utilSvc.platform;
                }
                else {
                    this.utilSvc.platform = env.platform;
                }
                this.utilSvc.backendURL = data[env.platform][backendURLString];
                if (this.config.application && this.config.application.stripeplatform) {
                    this.utilSvc.stripeplatform = this.config.application.stripeplatform;
                }
                else {
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
            }, error => {
                reject(error);
            });
        });
    }
    initBEService(env) {
        return new Promise((resolve, reject) => {
            const backendFbConfig = this.config[env.platform].firebaseMasterConfig;
            this.storeDbSvc.initFB(this.utilSvc.backendFBstoreId, backendFbConfig, 'goDigitalBE', true, true, this.backendFbObjects, this.storeDbSvc.backendFbRef).then(async () => {
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
            }, error => {
                reject(error);
            });
        });
    }
    closeBEService() {
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
            this.storeDbSvc.closeFB(this.utilSvc.backendFBstoreId, this.backendFbObjects, this.storeDbSvc.backendFbRef);
            resolve(1);
        });
    }
    initStorageFb(env) {
        return new Promise((resolve, reject) => {
            const storageString = 'storage';
            this.storeDbSvc.initFB(this.utilSvc.backendFBstoreId2, this.config[env.platform].firebaseStorageConfig, 'goDigitalBE2', true, false, [], this.storeDbSvc.storageFbRef).then(() => {
                this.utilSvc.mst = this.storeDbSvc.storageFbRef[storageString];
                resolve(this.storeDbSvc.storageFbRef);
            }, error => reject(error));
        });
    }
    closeStorageFb(storeId, fbObjects, storeFbRef) {
        return new Promise((resolve, reject) => {
            this.utilSvc.mst = undefined;
            this.storeDbSvc.closeFB(this.utilSvc.backendFBstoreId2, this.backendFbObjects, this.storeDbSvc.storageFbRef);
            resolve(1);
        });
    }
    getUser() {
        return this.wnUserO.asObservable();
    }
    setUser(users) {
        this.wnUser = users;
        this.wnUserO.next(users);
    }
    resetVariables() {
        this.storeDbSvc.storageFbRef = [];
        this.setUser(null);
    }
    getHosts(wnHost) {
        return new Promise((resolve, reject) => {
            let params1 = new HttpParams();
            if (wnHost && wnHost.stripeAccountId) {
                params1 = params1.set('connectedAccountId', wnHost.stripeAccountId);
                this.http.get(this.utilSvc.backendURL + 'stripe/customer/list', { params: params1, responseType: 'json' }).subscribe(data => {
                    resolve(data);
                }, error => {
                    reject(error);
                });
            }
            else {
                resolve({});
            }
        });
    }
    exportObjects(objects, objectName) {
        const json = JSON.stringify(objects);
        const blob = new Blob([json], { type: 'application/json' });
        saveAs(blob, objectName + '.json');
    }
    exportString(strings, objectName) {
        const blob = new Blob([strings], { type: 'application/json' });
        saveAs(blob, objectName + '.csv');
    }
    stringToDate(stringDate) {
        const regexDate = /([0-9]{2})([0-9]{2})([0-9]{4})/;
        const dateTemp1 = regexDate.exec(stringDate);
        if (dateTemp1 && dateTemp1 != null && dateTemp1[3]) {
            return new Date(dateTemp1[3] + '-' + dateTemp1[2] + '-' + dateTemp1[1]).getTime();
        }
        else {
            return 0;
        }
    }
    subscribeUsers() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnUsers].subscribe(data => {
            const temp = data && data[0] ? this.utilSvc.objectToArray(data[0]) : null;
            this.setUsers(temp);
        });
    }
    unsubscribeUsers() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(beStoreId, this.utilSvc.mdb, OBJECTNAME.wnUsers);
        this.setUsers(null);
    }
    getUsers() {
        return this.usersSvc.allUsersO.asObservable();
    }
    setUsers(value) {
        this.usersSvc.allUsers = value;
        this.usersSvc.allUsersO.next(value);
    }
    async loginOrValidateUser(email, password, firebaseUid) {
        const auth = this.utilSvc.mauth;
        const db = this.utilSvc.mdb;
        if (email && password) {
            // 🔥 Login with email/password
            try {
                const userCredential = await auth.signInWithEmailAndPassword(email, password);
                const user = userCredential.user;
                if (user && user.emailVerified) {
                    try {
                        const userf = await this.storeDbSvc.getObject(this.utilSvc.backendFBstoreId, this.utilSvc.mdb, OBJECTNAME.wnUsers, user.uid);
                        if (userf) {
                            this.setLoggedUser(userf);
                            return ([AUTHSTATUS.SUCCESS, userf]);
                        }
                        else {
                            console.error('❌ User not found in Realtime Database.');
                            this.setLoggedUser(undefined);
                            throw ([AUTHSTATUS.UNKNOWNERROR, new Error('User not found in Realtime Database.')]);
                        }
                    }
                    catch (error) {
                        console.error('❌ Error checking user existence:', error);
                        this.setLoggedUser(undefined);
                        throw ([AUTHSTATUS.UNKNOWNERROR, error]);
                    }
                }
                else {
                    throw ([AUTHSTATUS.EMAILNOTVERIFIED, '']);
                }
            }
            catch (error) {
                console.error('❌ Login failed:', error);
                this.setLoggedUser(undefined);
                throw ([AUTHSTATUS.UNKNOWNERROR, error]);
            }
        }
        else if (firebaseUid) {
            // 🔥 Validate that user exists in Realtime Database
            try {
                const userf = await this.storeDbSvc.getObject(this.utilSvc.backendFBstoreId, this.utilSvc.mdb, OBJECTNAME.wnUsers, firebaseUid);
                if (userf) {
                    try {
                        const userCredential = await auth.signInWithEmailAndPassword(userf.email, userf.password);
                        const user = userCredential.user;
                        this.setLoggedUser(userf);
                        return ([AUTHSTATUS.SUCCESS, userf]);
                    }
                    catch (error) {
                        console.error('❌ Login failed:', error);
                        this.setLoggedUser(undefined);
                        throw ([AUTHSTATUS.UNKNOWNERROR, error]);
                    }
                }
                else {
                    console.error('❌ User not found in Realtime Database.');
                    this.setLoggedUser(undefined);
                    throw ([AUTHSTATUS.UNKNOWNERROR, new Error('User not found in Realtime Database.')]);
                }
            }
            catch (error) {
                console.error('❌ Error checking user existence:', error);
                this.setLoggedUser(undefined);
                throw ([AUTHSTATUS.UNKNOWNERROR, error]);
            }
        }
        else {
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
    subscribeUser(_adnUserId) {
        if (this.firebaseBSSdata[OBJECTNAME.wnUsers]) {
            this.firebaseBSSdata[OBJECTNAME.wnUsers].unsubscribe();
        }
        this.firebaseBSSdata[OBJECTNAME.wnUsers] =
            this.storeDbSvc.firebaseBSSdata[this.utilSvc.backendFBstoreId][OBJECTNAME.wnUsers].subscribe(data => {
                const temp = data ? data[0] : undefined;
                this.setLoggedUser(temp);
            }, error => console.log(error));
    }
    unsubscribeUser(wnUserId) {
        this.storeDbSvc.unsubscribeObject(this.utilSvc.backendFBstoreId, this.utilSvc.mdb, OBJECTNAME.wnUsers, wnUserId);
        if (this.firebaseBSSdata[OBJECTNAME.wnUsers]) {
            this.firebaseBSSdata[OBJECTNAME.wnUsers].unsubscribe();
        }
    }
    getLoggedUser() {
        return this.wnUserO.asObservable();
    }
    async setLoggedUser(value) {
        if (value) {
            this.utilSvc.setUid(value.userId);
            this.wnUser = value;
            this.wnUserO.next(value);
        }
        else {
            this.utilSvc.clearUid();
            this.wnUser = null;
            this.wnUserO.next(null);
        }
    }
    getLanguage() {
        return this.languageO.asObservable();
    }
    setLanguage(lang) {
        localStorage.setItem('language', lang);
        this.utilSvc.language = lang;
        if (lang != null) {
            this.languageO.next(lang);
        }
    }
    checkValueObject(objectInput, parameterTitle, parameterValue) {
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
    registerScript(loaded, url, name) {
        this.scriptLoadingSvc.registerScript(url, name, loaded);
    }
    uploadThumb(event1, source, url, directory) {
        return new Promise(async (resolve, reject) => {
            this.spinner.show();
            if (source === 'url') {
                if (url && url.length > 0) {
                    const params = new HttpParams()
                        .set('url', url)
                        .set('dir', 'assets/' + directory);
                    // tslint:disable-next-line: deprecation
                    this.http.get(this.utilSvc.backendURL + 'store/downloadUrl', {
                        params,
                        reportProgress: true,
                        observe: 'events'
                    }).subscribe((data) => {
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
                    }, error => {
                        this.spinner.hide();
                        console.log(error);
                        reject(error);
                    });
                }
            }
            else {
                if (event1) {
                    this.storeDbSvc.uploadMedia(undefined, event1, directory).then(temp1 => {
                        const thumb = temp1;
                        const params = new HttpParams()
                            .set('url', thumb)
                            .set('dir', 'assets/' + directory);
                        // tslint:disable-next-line: deprecation
                        this.http.get(this.utilSvc.backendURL + 'store/downloadUrl', {
                            params,
                            reportProgress: true,
                            observe: 'events'
                        }).subscribe((data) => {
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
                        }, error => {
                            this.spinner.hide();
                            console.log(error);
                            reject(error);
                        });
                    }, //
                    //
                    error => {
                        this.spinner.hide();
                        reject(error);
                    });
                }
            }
        });
    }
    subscribeLocations() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnLocations].subscribe(data => {
            const temp = data && data[0] != null ? this.utilSvc.objectToArray(data[0]) : null;
            this.setLocations(temp);
        }, error => console.log(error));
    }
    unsubscribeLocations() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(beStoreId, this.utilSvc.mdb, OBJECTNAME.wnLocations);
        this.setLocations(null);
    }
    getLocations() {
        return this.wnLocationsO.asObservable();
    }
    setLocations(value) {
        this.wnLocations = value;
        this.wnLocationsO.next(value);
    }
    subscribeEquipments() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnEquipments].subscribe(data => {
            const temp = data && data[0] != null ? this.utilSvc.objectToArray(data[0]) : null;
            this.setEquipments(temp);
        }, error => console.log(error));
    }
    unsubscribeEquipments() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(beStoreId, this.utilSvc.mdb, OBJECTNAME.wnEquipments);
        this.setEquipments(null);
    }
    getEquipments() {
        return this.wnEquipmentsO.asObservable();
    }
    setEquipments(value) {
        this.wnEquipments = value;
        this.wnEquipmentsO.next(value);
    }
    subscribeBookings() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnBookings].subscribe(data => {
            const temp = data && data[0] != null ? this.utilSvc.objectToArray(data[0]) : null;
            this.setBookings(temp);
        }, error => console.log(error));
    }
    unsubscribeBookings() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(beStoreId, this.utilSvc.mdb, OBJECTNAME.wnBookings);
        this.setBookings(null);
    }
    getBookings() {
        return this.wnBookingsO.asObservable();
    }
    setBookings(value) {
        this.wnBookings = value;
        this.wnBookingsO.next(value);
    }
    subscribeMessages() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnMessages].subscribe(data => {
            const temp = data && data[0] != null ? this.utilSvc.objectToArray(data[0]) : null;
            this.setMessages(temp);
        }, error => console.log(error));
    }
    unsubscribeMessages() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(beStoreId, this.utilSvc.mdb, OBJECTNAME.wnMessages);
        this.setMessages(null);
    }
    getMessages() {
        return this.wnMessagesO.asObservable();
    }
    setMessages(value) {
        this.wnMessages = value;
        this.wnMessagesO.next(value);
    }
    subscribeFeedbacks() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnFeedbacks].subscribe(data => {
            const temp = data && data[0] != null ? this.utilSvc.objectToArray(data[0]) : null;
            this.setFeedbacks(temp);
        }, error => console.log(error));
    }
    unsubscribeFeedbacks() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(beStoreId, this.utilSvc.mdb, OBJECTNAME.wnFeedbacks);
        this.setFeedbacks(null);
    }
    getFeedbacks() {
        return this.wnFeedbacksO.asObservable();
    }
    setFeedbacks(value) {
        this.wnFeedbacks = value;
        this.wnFeedbacksO.next(value);
    }
    subscribeLocationtypes() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.firebaseBSSdata[beStoreId][OBJECTNAME.wnLocationtypes].subscribe(data => {
            const temp = data && data[0] != null ? this.utilSvc.objectToArray(data[0]) : null;
            this.setLocationtypes(temp);
        }, error => console.log(error));
    }
    unsubscribeLocationtypes() {
        const beStoreId = this.utilSvc.backendFBstoreId;
        this.storeDbSvc.unsubscribeObject(beStoreId, this.utilSvc.mdb, OBJECTNAME.wnLocationtypes);
        this.setLocationtypes(null);
    }
    getLocationtypes() {
        return this.wnLocationtypesO.asObservable();
    }
    setLocationtypes(value) {
        this.wnLocationtypes = value;
        this.wnLocationtypesO.next(value);
    }
    async createStripeExpressAccount(email, refreshUrl, returnUrl) {
        try {
            // Step 1: create the Express account
            const accountResponse = await this.http.post(this.utilSvc.backendURL + '/stripe/expressaccount', {
                email,
            }).toPromise();
            const accountId = accountResponse.id;
            // Step 2: create the Express onboarding link
            const accountLinkResponse = await this.http.post(this.utilSvc.backendURL + '/stripe/expressaccount-link', {
                accountId,
                refreshUrl: this.utilSvc.backendURL + refreshUrl,
                returnUrl: this.utilSvc.backendURL + returnUrl,
            }).toPromise();
            return accountLinkResponse.url; // return the onboarding URL
        }
        catch (error) {
            console.error('Error creating Stripe Express account:', error);
            throw error;
        }
    }
    static ɵfac = function ServicesService_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || ServicesService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2$2.Router), i0.ɵɵinject(StoreDbService), i0.ɵɵinject(UtilsService), i0.ɵɵinject(UsersService), i0.ɵɵinject(i6.NgxSpinnerService), i0.ɵɵinject(ScriptLoadingService), i0.ɵɵinject(i8.NGXLogger)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: ServicesService, factory: ServicesService.ɵfac, providedIn: 'root' });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ServicesService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], () => [{ type: i1.HttpClient }, { type: i2$2.Router }, { type: StoreDbService }, { type: UtilsService }, { type: UsersService }, { type: i6.NgxSpinnerService }, { type: ScriptLoadingService }, { type: i8.NGXLogger }], null); })();

/*
 * Public API Surface of godigital-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AUTHSTATUS, AddComponent, BOOKINGSTATUS, CountGenericB, CountGenericN, CountGenericPS, CountGenericS, EDITSLIDE, FilterGenericA, FilterGenericB, FilterGenericIS, FilterGenericN, FilterGenericNS, FilterGenericPS, FilterGenericPSA, FilterGenericPSO, FilterGenericS, GodigitalbModule, IMAGETYPE, LOGTYPE, MEDIADIR, MEDIATYPE, MyMissingTranslationHandler, OBJECTNAME, SCHEDULEARRAY, SCHEDULETYPE, ScriptLoadingService, ServicesService, StoreDbService, StripeScriptService, TranslateAuto, UsersService, UtilsService, createTranslateLoader, dayInMilliseconds, externalUrlProvider, fileExtensionRegex, firebaseConfig$1 as firebaseConfig, guidregex, hourInMilliseconds, regexEmail, regexFixedNo, regexMobileNo, regexUrl, regexUrlImage, regexUrlMedia, regexUrlVideo };
//# sourceMappingURL=godigital-lib.mjs.map
