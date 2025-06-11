(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_host_host_module_ts"],{

/***/ 2348:
/*!***************************************************************************!*\
  !*** ./src/app/host/become-a-host/become-a-host.component.css?ngResource ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 5022:
/*!**********************************************************************************!*\
  !*** ./src/app/host/stripe-account-failed/stripe-account-failed.html?ngResource ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<header class=\"masthead bg-light\">\n  <div class=\"masthead-content\">\n    <div class=\"container text-center\">\n      <h1 class=\"mb-4 text-danger fw-bold\">Onboarding Failed</h1>\n      <p class=\"lead\">{{ message }}</p>\n      <button class=\"btn btn-primary\" (click)=\"restartOnboarding()\">Try Again</button>\n    </div>\n  </div>\n</header>\n";

/***/ }),

/***/ 6845:
/*!*************************************!*\
  !*** ./src/app/host/host.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HostModule: () => (/* binding */ HostModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 27824);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 35135);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 21507);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var ngx_cookie__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-cookie */ 99787);
/* harmony import */ var _hostdashboard_hostdashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hostdashboard/hostdashboard.component */ 50607);
/* harmony import */ var _become_a_host_become_a_host_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./become-a-host/become-a-host.component */ 66635);
/* harmony import */ var _stripe_account_confirm_stripe_account_confirm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stripe-account-confirm/stripe-account-confirm */ 28912);
/* harmony import */ var _stripe_account_failed_stripe_account_failed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stripe-account-failed/stripe-account-failed */ 69366);
/* harmony import */ var godigital_lib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! godigital-lib */ 83);
/* harmony import */ var _host_router_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./host.router.module */ 72476);

/* eslint-disable max-len */











let HostModule = class HostModule {};
HostModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
  declarations: [_hostdashboard_hostdashboard_component__WEBPACK_IMPORTED_MODULE_0__.HostdashboardComponent, _become_a_host_become_a_host_component__WEBPACK_IMPORTED_MODULE_1__.BecomeahostComponent, _stripe_account_confirm_stripe_account_confirm__WEBPACK_IMPORTED_MODULE_2__.StripeAccountConfirmComponent, _stripe_account_failed_stripe_account_failed__WEBPACK_IMPORTED_MODULE_3__.StripeAccountFailedComponent],
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonicModule, _host_router_module__WEBPACK_IMPORTED_MODULE_4__.HostRoutingModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.ReactiveFormsModule, ngx_cookie__WEBPACK_IMPORTED_MODULE_10__.CookieModule.forRoot(), godigital_lib__WEBPACK_IMPORTED_MODULE_11__.GodigitalbModule],
  providers: []
})], HostModule);


/***/ }),

/***/ 28907:
/*!***********************************************************************************!*\
  !*** ./src/app/host/stripe-account-confirm/stripe-account-confirm.css?ngResource ***!
  \***********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 28912:
/*!***********************************************************************!*\
  !*** ./src/app/host/stripe-account-confirm/stripe-account-confirm.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StripeAccountConfirmComponent: () => (/* binding */ StripeAccountConfirmComponent)
/* harmony export */ });
/* harmony import */ var _Users_faycalamrani_data_angular_worknest2_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 27824);
/* harmony import */ var _stripe_account_confirm_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stripe-account-confirm.html?ngResource */ 81952);
/* harmony import */ var _stripe_account_confirm_css_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stripe-account-confirm.css?ngResource */ 28907);
/* harmony import */ var _stripe_account_confirm_css_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_stripe_account_confirm_css_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var godigital_lib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! godigital-lib */ 83);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 50085);
/* harmony import */ var _host_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../host.service */ 51566);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 48503);












let StripeAccountConfirmComponent = class StripeAccountConfirmComponent {
  hostSvc;
  mainSvc;
  utilsSvc;
  fb;
  router;
  route;
  translateSvc;
  businessaddress;
  becomeahostForm;
  showAllEquipments = false;
  subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subscription();
  address;
  photos = [];
  roomequipments = [];
  componentName = 'stripe-account-confirm';
  constructor(hostSvc, mainSvc, utilsSvc, fb, router, route, translateSvc) {
    this.hostSvc = hostSvc;
    this.mainSvc = mainSvc;
    this.utilsSvc = utilsSvc;
    this.fb = fb;
    this.router = router;
    this.route = route;
    this.translateSvc = translateSvc;
  }
  stripeAccountId = null;
  message = 'Checking your Stripe account...';
  ngOnInit() {
    var _this = this;
    this.route.queryParams.subscribe(/*#__PURE__*/function () {
      var _ref = (0,_Users_faycalamrani_data_angular_worknest2_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (params) {
        _this.stripeAccountId = params['account_id'];
        if (_this.stripeAccountId) {
          try {
            _this.hostSvc.wnGuest.stripeAccountId = _this.stripeAccountId;
            yield _this.mainSvc.storeDbSvc.updateObject(_this.utilsSvc.backendFBstoreId, _this.utilsSvc.mdb, godigital_lib__WEBPACK_IMPORTED_MODULE_5__.OBJECTNAME.wnUsers, _this.hostSvc.wnGuest, _this.hostSvc.wnGuest.userId);
            _this.message = '✅ Your Stripe account has been successfully linked to WorkNest.';
          } catch (error) {
            _this.message = '⚠️ An error occurred while saving your Stripe account. Please contact support.';
            console.error('Error saving Stripe account:', error);
          }
        } else {
          _this.message = '❌ Missing Stripe account ID. Please try again or restart onboarding.';
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }
  static ctorParameters = () => [{
    type: _host_service__WEBPACK_IMPORTED_MODULE_3__.HostService
  }, {
    type: godigital_lib__WEBPACK_IMPORTED_MODULE_5__.ServicesService
  }, {
    type: godigital_lib__WEBPACK_IMPORTED_MODULE_5__.UtilsService
  }, {
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormBuilder
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.Router
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.ActivatedRoute
  }, {
    type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateService
  }];
  static propDecorators = {
    businessaddress: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild,
      args: ['businessaddress', {
        static: false
      }]
    }]
  };
};
StripeAccountConfirmComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-stripe-account-confirm',
  template: _stripe_account_confirm_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_stripe_account_confirm_css_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], StripeAccountConfirmComponent);


/***/ }),

/***/ 50607:
/*!***************************************************************!*\
  !*** ./src/app/host/hostdashboard/hostdashboard.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HostdashboardComponent: () => (/* binding */ HostdashboardComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 27824);
/* harmony import */ var _hostdashboard_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hostdashboard.component.html?ngResource */ 91089);
/* harmony import */ var _hostdashboard_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hostdashboard.component.css?ngResource */ 52656);
/* harmony import */ var _hostdashboard_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_hostdashboard_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var godigital_lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! godigital-lib */ 83);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 50085);
/* harmony import */ var _host_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../host.service */ 51566);









let HostdashboardComponent = class HostdashboardComponent {
  hostSvc;
  mainSvc;
  utilsSvc;
  router;
  componentName = 'hostdashboard.component';
  upcomingBookings = [{
    spaceTitle: 'Meeting Room A',
    date: 'May 2',
    time: '10:00 AM - 12:00 PM',
    guestName: 'Alice Dupont'
  }, {
    spaceTitle: 'Zen Room',
    date: 'May 3',
    time: '2:00 PM - 4:00 PM',
    guestName: 'Mark Stevens'
  }, {
    spaceTitle: 'Workshop Space',
    date: 'May 5',
    time: '9:00 AM - 11:00 AM',
    guestName: 'Chloé Dubois'
  }];
  constructor(hostSvc, mainSvc, utilsSvc, router) {
    this.hostSvc = hostSvc;
    this.mainSvc = mainSvc;
    this.utilsSvc = utilsSvc;
    this.router = router;
  }
  ngOnInit() {
    this.createForm();
  }
  ngOnDestroy() {}
  ngAfterViewChecked() {}
  createForm() {
    this.hostSvc.createForm();
  }
  goHome() {
    this.router.navigate(['/home']);
  }
  static ctorParameters = () => [{
    type: _host_service__WEBPACK_IMPORTED_MODULE_2__.HostService
  }, {
    type: godigital_lib__WEBPACK_IMPORTED_MODULE_3__.ServicesService
  }, {
    type: godigital_lib__WEBPACK_IMPORTED_MODULE_3__.UtilsService
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_4__.Router
  }];
};
HostdashboardComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
  selector: 'app-hostdashboard',
  template: _hostdashboard_component_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  imports: [_angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule],
  styles: [(_hostdashboard_component_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], HostdashboardComponent);


/***/ }),

/***/ 51566:
/*!**************************************!*\
  !*** ./src/app/host/host.service.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HostService: () => (/* binding */ HostService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 27824);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var godigital_lib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! godigital-lib */ 83);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 50085);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 93262);
/* harmony import */ var _services_services_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services.service */ 92030);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-spinner */ 61249);

/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */









let HostService = class HostService {
  router;
  mainSvc;
  utilsSvc;
  usersSvc;
  localUtilsSvc;
  fb;
  http;
  spinner;
  signinForm;
  address;
  currentPlaceId;
  constructor(router, mainSvc, utilsSvc, usersSvc, localUtilsSvc, fb, http, spinner) {
    this.router = router;
    this.mainSvc = mainSvc;
    this.utilsSvc = utilsSvc;
    this.usersSvc = usersSvc;
    this.localUtilsSvc = localUtilsSvc;
    this.fb = fb;
    this.http = http;
    this.spinner = spinner;
  }
  getGoogleMetadata(gmid) {
    return new Promise((resolve, reject) => {
      const params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpParams().set('placeId', gmid);
      // tslint:disable-next-line: deprecation
      this.http.get(this.utilsSvc.backendURL + 'utils/getGoogleMetadata', {
        params
      }).subscribe(data => {
        resolve(data);
      }, error => {
        console.log('error=', error);
        reject(error);
      });
    });
  }
  updateBackendUser(adnUser) {
    return new Promise((resolve, reject) => {
      this.usersSvc.updateUser(adnUser).then(data => resolve(data), error => reject(error));
    });
  }
  forgotPwd(emailPwdRecovery) {
    this.usersSvc.resetPwdUser(emailPwdRecovery).then(() => {
      this.localUtilsSvc.showModalNoButton('password reset', 'An email for recovering your password has been sent to this email adress.');
      this.router.navigate(['/login']);
    }, error => {
      this.localUtilsSvc.showModalNoButton('password reset', 'no account exists under this email. please check again.');
      this.router.navigate(['/login']);
    });
  }
  createForm() {}
  get wnGuest() {
    return this.localUtilsSvc.wnGuest;
  }
  set wnGuest(value) {
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
  static ctorParameters = () => [{
    type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.Router
  }, {
    type: godigital_lib__WEBPACK_IMPORTED_MODULE_3__.ServicesService
  }, {
    type: godigital_lib__WEBPACK_IMPORTED_MODULE_3__.UtilsService
  }, {
    type: godigital_lib__WEBPACK_IMPORTED_MODULE_3__.UsersService
  }, {
    type: _services_services_service__WEBPACK_IMPORTED_MODULE_0__.LocalUtilsService
  }, {
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder
  }, {
    type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient
  }, {
    type: ngx_spinner__WEBPACK_IMPORTED_MODULE_5__.NgxSpinnerService
  }];
};
HostService = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Injectable)({
  providedIn: 'root'
})], HostService);


/***/ }),

/***/ 52656:
/*!***************************************************************************!*\
  !*** ./src/app/host/hostdashboard/hostdashboard.component.css?ngResource ***!
  \***************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 66635:
/*!***************************************************************!*\
  !*** ./src/app/host/become-a-host/become-a-host.component.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BecomeahostComponent: () => (/* binding */ BecomeahostComponent)
/* harmony export */ });
/* harmony import */ var _Users_faycalamrani_data_angular_worknest2_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 89204);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 27824);
/* harmony import */ var _become_a_host_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./become-a-host.component.html?ngResource */ 79621);
/* harmony import */ var _become_a_host_component_css_ngResource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./become-a-host.component.css?ngResource */ 2348);
/* harmony import */ var _become_a_host_component_css_ngResource__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_become_a_host_component_css_ngResource__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var godigital_lib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! godigital-lib */ 83);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 50085);
/* harmony import */ var _host_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../host.service */ 51566);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 48503);












let BecomeahostComponent = class BecomeahostComponent {
  hostSvc;
  mainSvc;
  utilsSvc;
  fb;
  router;
  translateSvc;
  businessaddress;
  becomeahostForm;
  showAllEquipments = false;
  subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subscription();
  address;
  photos = [];
  roomequipments = [];
  componentName = 'become-a-host.component';
  constructor(hostSvc, mainSvc, utilsSvc, fb, router, translateSvc) {
    this.hostSvc = hostSvc;
    this.mainSvc = mainSvc;
    this.utilsSvc = utilsSvc;
    this.fb = fb;
    this.router = router;
    this.translateSvc = translateSvc;
  }
  ngOnInit() {
    this.subscriptions.add(this.hostSvc.mainSvc.getLanguage().subscribe(language => {
      this.translateSvc.use(language);
    }));
    this.subscriptions.add(
    // tslint:disable-next-line: deprecation
    this.hostSvc.mainSvc.getLocations().subscribe(locations => {
      this.hostSvc.locations = locations;
      this.hostSvc.filteredLocations = locations && locations.filter(l => l.city.toLowerCase() === this.hostSvc.currentPosition.nearestCity.toLowerCase());
    }));
    this.subscriptions.add(
    // tslint:disable-next-line: deprecation
    this.hostSvc.mainSvc.getEquipments().subscribe(equipments => {
      this.hostSvc.equipments = equipments;
      let random = Math.round(Math.random() * 1000);
      if (equipments && equipments.length > 0 && !this.becomeahostForm) {
        this.becomeahostForm = this.fb.group({
          spacetype: ['meeting-room', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
          roomtitle: ['room title ' + random, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
          roomaddress: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
          roomdescription: ['room description ' + random, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
          roomnameornumber: ['room number ' + random],
          roomcapacity: [4, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
          isroomshared: [false],
          privatenote: ['privatenote bla bla bla ' + random],
          pricehour: [10, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
          priceday: [50, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
          availability: ['weekdays', _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
          accessandrules: ['accessandrules ' + random, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required],
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
    this.hostSvc.mainSvc.getLocationtypes().subscribe(locationtypes => {
      this.hostSvc.locationtypes = locationtypes;
    }));
    this.subscriptions.add(
    // tslint:disable-next-line: deprecation
    this.hostSvc.mainSvc.getUsers().subscribe(users => {
      this.hostSvc.users = users;
    }));
  }
  ngAfterViewInit() {
    var _this = this;
    this.subscriptions.add(this.utilsSvc.autoCompleteAddress1(this.businessaddress).subscribe(/*#__PURE__*/function () {
      var _ref = (0,_Users_faycalamrani_data_angular_worknest2_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (data) {
        if (data) {
          _this.address = data;
        }
      });
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }()));
  }
  get equipmentsFormArray() {
    return this.becomeahostForm.get('equipments');
  }
  toggleEquipments() {
    this.showAllEquipments = !this.showAllEquipments;
  }
  onSubmit() {
    var _this2 = this;
    return (0,_Users_faycalamrani_data_angular_worknest2_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.hostSvc.wnGuest) {
        if (_this2.hostSvc.wnGuest.stripeAccountId) {
          _this2.onSubmit2();
        } else {
          $('#stripeModal').modal('show');
        }
      }
    })();
  }
  onSubmit2() {
    var _this3 = this;
    return (0,_Users_faycalamrani_data_angular_worknest2_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.becomeahostForm.valid) {
        const formValues = _this3.becomeahostForm.value;
        const selectedEquipments = _this3.hostSvc.equipments && _this3.hostSvc.equipments.filter((_, index) => formValues.equipments[index]).map(eq => eq.title);
        const submission = {
          ...formValues,
          selectedEquipments
        };
        if (_this3.hostSvc.equipments) {
          for (let i = 0; i < _this3.hostSvc.equipments?.length; i++) {
            if (formValues.equipments[i]) {
              _this3.roomequipments.push(_this3.hostSvc.equipments[i].equipmentId);
            }
            i++;
          }
        }
        let newLocation = {};
        newLocation.locationId = String(Math.round(Math.random() * 100000));
        newLocation.accessandrules = formValues.accessandrules;
        newLocation.address = formValues.roomaddress;
        newLocation.availability = formValues.availability;
        newLocation.capacity = formValues.roomcapacity;
        newLocation.city = _this3.address && _this3.address.locality ? _this3.address.locality : '';
        newLocation.description = formValues.roomdescription;
        newLocation.equipments = _this3.roomequipments;
        newLocation.lat = _this3.address && _this3.address.lat ? _this3.address.lat : 0;
        newLocation.lng = _this3.address && _this3.address.lng ? _this3.address.lng : 0;
        newLocation.nameornumber = formValues.roomnameornumber;
        newLocation.owner = _this3.hostSvc.wnGuest.userId;
        newLocation.photos = _this3.photos;
        newLocation.priceperday = formValues.priceday;
        newLocation.priceperhour = formValues.pricehour;
        newLocation.privatenote = formValues.privatenote;
        newLocation.shared = formValues.isroomshared;
        newLocation.title = formValues.roomtitle;
        newLocation.type = formValues.spacetype;
        yield _this3.mainSvc.storeDbSvc.updateObject(_this3.utilsSvc.backendFBstoreId, _this3.utilsSvc.mdb, godigital_lib__WEBPACK_IMPORTED_MODULE_6__.OBJECTNAME.wnLocations, newLocation, newLocation.locationId);
        yield _this3.createStripeExpressAccount();
        // You can send this to your backend API
      } else {
        _this3.becomeahostForm.markAllAsTouched();
      }
    })();
  }
  onSpaceTypeChange(selectedType) {
    // Reset fields or add specific controls based on the spaceType
    // You can add/remove validators dynamically here if needed
    // Example: adjust required fields for "apartment"
    if (selectedType === 'apartment') {
      this.becomeahostForm.get('roomcapacity')?.setValidators([_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.min(1)]);
      // Add or modify other controls based on type if needed
    }
    this.becomeahostForm.get('roomcapacity')?.updateValueAndValidity();
  }
  uploadFile(event) {
    const files = event.target.files;
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
      reader.onload = e => {
        this.photos.push(e.target.result); // Add base64 to preview
      };
      reader.readAsDataURL(file);
      // OPTIONAL: upload to server in parallel if you want
      const directory = '/worknest/locations/meetingrooms/';
      this.mainSvc.storeDbSvc.uploadObjects({
        target: {
          files: [file]
        }
      }, directory).then(data => {
        // If you prefer, you can update `photos` here with the server URL instead of base64
      }, error => console.error('Upload error:', error));
    }
  }
  createStripeExpressAccount() {
    var _this4 = this;
    return (0,_Users_faycalamrani_data_angular_worknest2_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const email = _this4.hostSvc.wnGuest.email;
        const userId = _this4.hostSvc.wnGuest.userId;
        _this4.mainSvc.createStripeExpressAccount(email, '', '').then(response => {
          const onboardingUrl = response;
          if (onboardingUrl) {
            window.location.href = onboardingUrl; // 🚀 Redirect to Stripe onboarding
          }
        }, error => {
          console.error('Error creating Stripe Express Account:', error);
          alert('An error occurred while creating your Stripe account. Please try again.');
        });
      } catch (error) {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred.');
      }
    })();
  }
  static ctorParameters = () => [{
    type: _host_service__WEBPACK_IMPORTED_MODULE_3__.HostService
  }, {
    type: godigital_lib__WEBPACK_IMPORTED_MODULE_6__.ServicesService
  }, {
    type: godigital_lib__WEBPACK_IMPORTED_MODULE_6__.UtilsService
  }, {
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_7__.Router
  }, {
    type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateService
  }];
  static propDecorators = {
    businessaddress: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild,
      args: ['businessaddress', {
        static: false
      }]
    }]
  };
};
BecomeahostComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
  selector: 'app-become-a-host',
  template: _become_a_host_component_html_ngResource__WEBPACK_IMPORTED_MODULE_1__,
  styles: [(_become_a_host_component_css_ngResource__WEBPACK_IMPORTED_MODULE_2___default())]
})], BecomeahostComponent);


/***/ }),

/***/ 69366:
/*!*********************************************************************!*\
  !*** ./src/app/host/stripe-account-failed/stripe-account-failed.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StripeAccountFailedComponent: () => (/* binding */ StripeAccountFailedComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 27824);
/* harmony import */ var _stripe_account_failed_html_ngResource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stripe-account-failed.html?ngResource */ 5022);
/* harmony import */ var _stripe_account_failed_css_ngResource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stripe-account-failed.css?ngResource */ 84285);
/* harmony import */ var _stripe_account_failed_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_stripe_account_failed_css_ngResource__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var godigital_lib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! godigital-lib */ 83);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 50085);
/* harmony import */ var _host_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../host.service */ 51566);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 34456);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ngx-translate/core */ 48503);











let StripeAccountFailedComponent = class StripeAccountFailedComponent {
  hostSvc;
  mainSvc;
  utilsSvc;
  fb;
  router;
  route;
  translateSvc;
  businessaddress;
  becomeahostForm;
  showAllEquipments = false;
  subscriptions = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subscription();
  address;
  photos = [];
  roomequipments = [];
  componentName = 'stripe-account-failed';
  constructor(hostSvc, mainSvc, utilsSvc, fb, router, route, translateSvc) {
    this.hostSvc = hostSvc;
    this.mainSvc = mainSvc;
    this.utilsSvc = utilsSvc;
    this.fb = fb;
    this.router = router;
    this.route = route;
    this.translateSvc = translateSvc;
  }
  message = '⚠️ Stripe onboarding was not completed.';
  restartOnboarding() {
    this.router.navigate(['/become-a-host']);
  }
  static ctorParameters = () => [{
    type: _host_service__WEBPACK_IMPORTED_MODULE_2__.HostService
  }, {
    type: godigital_lib__WEBPACK_IMPORTED_MODULE_4__.ServicesService
  }, {
    type: godigital_lib__WEBPACK_IMPORTED_MODULE_4__.UtilsService
  }, {
    type: _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.Router
  }, {
    type: _angular_router__WEBPACK_IMPORTED_MODULE_6__.ActivatedRoute
  }, {
    type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_7__.TranslateService
  }];
  static propDecorators = {
    businessaddress: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild,
      args: ['businessaddress', {
        static: false
      }]
    }]
  };
};
StripeAccountFailedComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
  selector: 'app-stripe-account-failed',
  template: _stripe_account_failed_html_ngResource__WEBPACK_IMPORTED_MODULE_0__,
  styles: [(_stripe_account_failed_css_ngResource__WEBPACK_IMPORTED_MODULE_1___default())]
})], StripeAccountFailedComponent);


/***/ }),

/***/ 72476:
/*!********************************************!*\
  !*** ./src/app/host/host.router.module.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HostRoutingModule: () => (/* binding */ HostRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 27824);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 37580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 99585);
/* harmony import */ var _hostdashboard_hostdashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hostdashboard/hostdashboard.component */ 50607);
/* harmony import */ var _become_a_host_become_a_host_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./become-a-host/become-a-host.component */ 66635);
/* harmony import */ var _stripe_account_confirm_stripe_account_confirm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stripe-account-confirm/stripe-account-confirm */ 28912);
/* harmony import */ var _stripe_account_failed_stripe_account_failed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stripe-account-failed/stripe-account-failed */ 69366);







const routes = [{
  path: 'hostmain',
  component: _hostdashboard_hostdashboard_component__WEBPACK_IMPORTED_MODULE_0__.HostdashboardComponent
}, {
  path: 'become-a-host',
  component: _become_a_host_become_a_host_component__WEBPACK_IMPORTED_MODULE_1__.BecomeahostComponent
}, {
  path: 'stripe-account-confirm',
  component: _stripe_account_confirm_stripe_account_confirm__WEBPACK_IMPORTED_MODULE_2__.StripeAccountConfirmComponent
}, {
  path: 'stripe-account-failed',
  component: _stripe_account_failed_stripe_account_failed__WEBPACK_IMPORTED_MODULE_3__.StripeAccountFailedComponent
}];
let HostRoutingModule = class HostRoutingModule {};
HostRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule.forChild(routes)],
  exports: [_angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule]
})], HostRoutingModule);


/***/ }),

/***/ 79621:
/*!****************************************************************************!*\
  !*** ./src/app/host/become-a-host/become-a-host.component.html?ngResource ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<section class=\"container text-padding\">\n    <div class=\"container\" *ngIf=\"hostSvc.equipments && hostSvc.equipments.length>0\">\n        <h1 class=\"text-center mb-4\">Monetize Your Unused Meeting Room</h1>\n        <p class=\"lead text-center mb-5\">Have a quiet meeting space available during the day? Let others benefit from\n            it.</p>\n        <form [formGroup]=\"becomeahostForm\" (ngSubmit)=\"onSubmit()\" class=\"container mt-5\" *ngIf=\"hostSvc.equipments\">\n            <div class=\"row mb-3\">\n                <div class=\"col-md-6\">\n                    <label for=\"roomtitle\" class=\"form-label\">Room Title</label>\n                    <input id=\"roomtitle\" class=\"form-control\" formControlName=\"roomtitle\"\n                        placeholder=\"e.g., Quiet Meeting Room\">\n                </div>\n                <div class=\"col-md-6\">\n                    <label for=\"spacetype\" class=\"form-label\">Space Type</label>\n                    <select id=\"spacetype\" class=\"form-select\" formControlName=\"spacetype\"\n                        (change)=\"onSpaceTypeChange($event)\">\n                        <option value=\"\" disabled selected>Select type</option>\n                        <option value=\"meeting-room\">Meeting Room</option>\n                        <option value=\"apartment\">Day Rent Apartment</option>\n                        <option value=\"private-room\">Private Room in House</option>\n                        <option value=\"other\">Other</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"mb-3\">\n                <label for=\"roomdescription\" class=\"form-label\">Room Description</label>\n                <textarea id=\"roomdescription\" class=\"form-control\" rows=\"4\" formControlName=\"roomdescription\"\n                    placeholder=\"Describe the room, features, and ambiance...\"></textarea>\n            </div>\n\n            <div class=\"row mb-3\">\n                <div class=\"col-md-4\">\n                    <label for=\"roomaddress\" class=\"form-label\">Room Address</label>\n                    <input id=\"roomaddress\" type=\"text\" class=\"form-control\" formControlName=\"roomaddress\"\n                        placeholder=\"123 Business Street, City\" #businessaddress>\n                </div>\n                <div class=\"col-md-4\">\n                    <label for=\"roomnameornumber\" class=\"form-label\">Room Number / Name (optional)</label>\n                    <input id=\"roomnameornumber\" type=\"text\" class=\"form-control\" formControlName=\"roomnameornumber\"\n                        placeholder=\"Meeting Room A\">\n                </div>\n                <div class=\"col-md-4\">\n                    <label for=\"roomcapacity\" class=\"form-label\">Capacity (People)</label>\n                    <input id=\"roomcapacity\" type=\"number\" class=\"form-control\" formControlName=\"roomcapacity\"\n                        placeholder=\"e.g., 6\">\n                </div>\n            </div>\n\n            <div class=\"mb-3\">\n                <label class=\"form-label\">Is the room shared with others?</label>\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" type=\"radio\" id=\"isroomshared\" formControlName=\"isroomshared\"\n                        [value]=\"true\">\n                    <label class=\"form-check-label\" for=\"isroomshared\">Yes</label>\n                </div>\n                <div class=\"form-check\">\n                    <input class=\"form-check-input\" type=\"radio\" id=\"sharedNo\" formControlName=\"isroomshared\"\n                        [value]=\"false\">\n                    <label class=\"form-check-label\" for=\"sharedNo\">No</label>\n                </div>\n            </div>\n\n            <!-- Equipments Section -->\n            <div class=\"mb-3\">\n                <label class=\"form-label\">Available Equipment</label>\n                <div class=\"row\">\n                    <ng-container *ngFor=\"let eq of hostSvc.equipments.slice(0, 6); let i = index\">\n                        <div class=\"col-md-4\">\n                            <div class=\"form-check\">\n                                <input type=\"checkbox\" class=\"form-check-input\"\n                                    [formControl]=\"equipmentsFormArray.controls[i]\" [id]=\"'eq' + i\">\n                                <label class=\"form-check-label\" [for]=\"'eq' + i\">{{ eq.title }}</label>\n                            </div>\n                        </div>\n                    </ng-container>\n                </div>\n\n                <div [class.collapse]=\"!showAllEquipments\" class=\"mt-3\" id=\"showAllEquipments\">\n                    <div class=\"row\">\n                        <ng-container *ngFor=\"let eq of hostSvc.equipments.slice(6); let i = index\">\n                            <div class=\"col-md-4\">\n                                <div class=\"form-check\">\n                                    <input type=\"checkbox\" class=\"form-check-input\"\n                                        [formControl]=\"equipmentsFormArray.controls[i + 6]\" [id]=\"'eq' + (i + 6)\">\n                                    <label class=\"form-check-label\" [for]=\"'eq' + (i + 6)\">{{ eq.title }}</label>\n                                </div>\n                            </div>\n                        </ng-container>\n                    </div>\n                </div>\n\n                <button type=\"button\" class=\"btn btn-link px-0 mt-2\" (click)=\"toggleEquipments()\">\n                    {{ showAllEquipments ? 'Show Less' : 'Show More' }}\n                </button>\n            </div>\n\n            <div class=\"row mb-3\">\n                <div class=\"col-md-4\">\n                    <label for=\"priceHour\" class=\"form-label\">Price per Hour (€)</label>\n                    <input id=\"priceHour\" type=\"number\" class=\"form-control\" formControlName=\"pricehour\"\n                        placeholder=\"e.g., 10\">\n                </div>\n                <div class=\"col-md-4\">\n                    <label for=\"priceDay\" class=\"form-label\">Price per Day (€)</label>\n                    <input id=\"priceDay\" type=\"number\" class=\"form-control\" formControlName=\"priceday\"\n                        placeholder=\"e.g., 50\">\n                </div>\n                <div class=\"col-md-4\">\n                    <label for=\"availability\" class=\"form-label\">Availability</label>\n                    <select id=\"availability\" class=\"form-select\" formControlName=\"availability\">\n                        <option value=\"\" disabled selected>Select availability</option>\n                        <option value=\"Weekdays\">Weekdays</option>\n                        <option value=\"Weekends\">Weekends</option>\n                        <option value=\"Flexible\">Flexible</option>\n                    </select>\n                </div>\n            </div>\n\n            <div class=\"mb-3\">\n                <label for=\"accessandrules\" class=\"form-label\">Access & Rules</label>\n                <textarea id=\"accessandrules\" class=\"form-control\" rows=\"3\" formControlName=\"accessandrules\"\n                    placeholder=\"e.g., No smoking, badge required, etc.\"></textarea>\n            </div>\n\n            <div class=\"mb-4\">\n                <label for=\"photo\" class=\"form-label\">Upload photos of your space</label>\n                <input class=\"form-control\" type=\"file\" id=\"photo\" multiple (change)=\"uploadFile($event)\"\n                    accept=\"image/*\">\n            </div>\n\n            <!-- Preview uploaded photos -->\n            <div class=\"row\" *ngIf=\"photos.length > 0\">\n                <div class=\"col-md-3 mb-3\" *ngFor=\"let photo of photos\">\n                    <img [src]=\"photo\" class=\"img-fluid rounded shadow\" style=\"height: 150px; object-fit: cover;\">\n                </div>\n            </div>\n            <button type=\"submit\" class=\"btn btn-primary w-100\"\n                [disabled]=\"becomeahostForm.invalid || !address || photos && photos.length===0\">Submit\n                Listing</button>\n\n        </form>\n    </div>\n</section>\n\n<!-- Modal -->\n<div class=\"modal fade\" id=\"stripeModal\" tabindex=\"-1\" aria-labelledby=\"stripeModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-dialog-centered\">\n      <div class=\"modal-content\">\n        <div class=\"modal-header\">\n          <h5 class=\"modal-title fw-bold\" id=\"stripeModalLabel\">Create Your Stripe Account</h5>\n          <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\n        </div>\n        <div class=\"modal-body text-center\">\n          <p class=\"lead\">Would you like to create your Stripe account now to start receiving payments?</p>\n        </div>\n        <div class=\"modal-footer justify-content-center\">\n          <button type=\"button\" class=\"btn btn-secondary\" data-bs-dismiss=\"modal\">No, Later</button>\n          <button type=\"button\" class=\"btn btn-primary\" data-bs-dismiss=\"modal\" (click)=\"onSubmit2()\">Yes, Create Now</button>\n        </div>\n      </div>\n    </div>\n  </div>";

/***/ }),

/***/ 81952:
/*!************************************************************************************!*\
  !*** ./src/app/host/stripe-account-confirm/stripe-account-confirm.html?ngResource ***!
  \************************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<header class=\"masthead bg-light\">\n    <div class=\"masthead-content\">\n      <div class=\"container text-center\">\n        <h1 class=\"mb-4 text-primary fw-bold\">Stripe Account Confirmation</h1>\n        <p class=\"lead\">{{ message }}</p>\n        <div class=\"mt-4\">\n          <a class=\"btn btn-primary\" routerLink=\"/home\">Return to Home</a>\n          <a *ngIf=\"stripeAccountId\" class=\"btn btn-outline-secondary ms-2\" routerLink=\"/become-a-host\">Continue Hosting</a>\n        </div>\n      </div>\n    </div>\n  </header>\n  ";

/***/ }),

/***/ 84285:
/*!*********************************************************************************!*\
  !*** ./src/app/host/stripe-account-failed/stripe-account-failed.css?ngResource ***!
  \*********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_SOURCEMAP_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/sourceMaps.js */ 53142);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../node_modules/css-loader/dist/runtime/api.js */ 35950);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ``, "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___.toString();


/***/ }),

/***/ 91089:
/*!****************************************************************************!*\
  !*** ./src/app/host/hostdashboard/hostdashboard.component.html?ngResource ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = "<section class=\"pt-5 mt-4\">\n  <div class=\"container\">\n    <h2 class=\"mb-4\">Welcome back, Host!</h2>\n\n    <!-- Dashboard Summary Cards -->\n    <div class=\"row g-3 mb-4\">\n      <div class=\"col-md-4\">\n        <div class=\"card shadow-sm border-0\">\n          <div class=\"card-body\">\n            <h6 class=\"text-muted\">Total Earnings</h6>\n            <h3 class=\"fw-bold\">€1,250</h3>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-4\">\n        <div class=\"card shadow-sm border-0\">\n          <div class=\"card-body\">\n            <h6 class=\"text-muted\">Upcoming Bookings</h6>\n            <h3 class=\"fw-bold\">3</h3>\n          </div>\n        </div>\n      </div>\n      <div class=\"col-md-4\">\n        <div class=\"card shadow-sm border-0\">\n          <div class=\"card-body\">\n            <h6 class=\"text-muted\">Listing Views This Week</h6>\n            <h3 class=\"fw-bold\">78</h3>\n          </div>\n        </div>\n      </div>\n    </div>\n\n    <!-- Upcoming Bookings -->\n    <div class=\"card shadow-sm border-0 mb-4\">\n      <div class=\"card-header bg-white\">\n        <h5 class=\"mb-0\">Next Bookings</h5>\n      </div>\n      <div class=\"card-body\">\n        <div *ngIf=\"upcomingBookings?.length > 0; else noBookings\">\n          <div *ngFor=\"let booking of upcomingBookings\" class=\"mb-3 border-bottom pb-2\">\n            <h6 class=\"mb-1\">{{ booking.spaceTitle }}</h6>\n            <p class=\"mb-0 text-muted\">\n              {{ booking.date }} — {{ booking.time }} | {{ booking.guestName }}\n            </p>\n          </div>\n        </div>\n        <ng-template #noBookings>\n          <p class=\"text-muted\">You have no upcoming bookings.</p>\n        </ng-template>\n      </div>\n    </div>\n\n    <!-- Quick Actions -->\n    <div class=\"row g-3\">\n      <div class=\"col-md-6\">\n        <a class=\"btn btn-primary w-100 py-3\" routerLink=\"/host/listings/new\">+ Add New Listing</a>\n      </div>\n      <div class=\"col-md-6\">\n        <a class=\"btn btn-outline-secondary w-100 py-3\" routerLink=\"/host/messages\">📩 Check Messages</a>\n      </div>\n    </div>\n  </div>\n</section>\n";

/***/ })

}]);
//# sourceMappingURL=src_app_host_host_module_ts.js.map