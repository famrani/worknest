import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@angular/fire/compat";
import * as i3 from "@angular/fire/compat/auth";
import * as i4 from "@angular/fire/compat/storage";
import * as i5 from "@angular/fire/compat/database";
import * as i6 from "@ngx-translate/core";
import * as i7 from "./gopipe";
export declare function createTranslateLoader(http: HttpClient): TranslateHttpLoader;
export declare class MyMissingTranslationHandler implements MissingTranslationHandler {
    handle(params: MissingTranslationHandlerParams): string | undefined;
}
export declare class GodigitalbModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<GodigitalbModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<GodigitalbModule, never, [typeof i1.HttpClientModule, typeof i2.AngularFireModule, typeof i3.AngularFireAuthModule, typeof i4.AngularFireStorageModule, typeof i5.AngularFireDatabaseModule, typeof i6.TranslateModule, typeof i7.FilterGenericN, typeof i7.FilterGenericS, typeof i7.FilterGenericIS, typeof i7.CountGenericS, typeof i7.CountGenericPS, typeof i7.FilterGenericNS, typeof i7.FilterGenericPS, typeof i7.FilterGenericB, typeof i7.CountGenericB, typeof i7.FilterGenericA, typeof i7.TranslateAuto, typeof i7.AddComponent, typeof i7.CountGenericN, typeof i7.FilterGenericPSA, typeof i7.FilterGenericPSO], [typeof i7.FilterGenericN, typeof i7.FilterGenericS, typeof i7.FilterGenericIS, typeof i7.CountGenericS, typeof i7.CountGenericPS, typeof i7.FilterGenericNS, typeof i7.FilterGenericPS, typeof i7.FilterGenericB, typeof i7.CountGenericB, typeof i7.FilterGenericA, typeof i7.TranslateAuto, typeof i7.AddComponent, typeof i7.CountGenericN, typeof i7.FilterGenericPSA, typeof i7.FilterGenericPSO, typeof i6.TranslateModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<GodigitalbModule>;
}
