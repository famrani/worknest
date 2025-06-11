import { PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilsService } from './utils.service';
import * as i0 from "@angular/core";
export declare class FilterGenericN implements PipeTransform {
    transform(objects: any[], filterField: any, filterValue: any, fake?: any, negativeValue?: any): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterGenericN, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterGenericN, "filterGenericN", true>;
}
export declare class CountGenericN implements PipeTransform {
    transform(objects: any[], filterField: any, filterValue: any, fake?: any, negativeValue?: any): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<CountGenericN, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CountGenericN, "countGenericN", true>;
}
export declare class FilterGenericNS implements PipeTransform {
    transform(objects: any[], filterField: any, filterValue: any, fake?: any, negativeValue?: any): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterGenericNS, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterGenericNS, "filterGenericNS", true>;
}
export declare class CountGenericS implements PipeTransform {
    transform(objects: any[], filterField: any, filterValue: string, reverse?: any, fake?: any): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<CountGenericS, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CountGenericS, "countGenericS", true>;
}
export declare class FilterGenericS implements PipeTransform {
    transform(objects: any[], filterField: any, filterValue: string, reverse?: any, fake?: any): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterGenericS, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterGenericS, "filterGenericS", true>;
}
export declare class CountGenericPS implements PipeTransform {
    transform(objects: any[], filterField: any, filterValue: any, reverse?: any, fake?: any): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<CountGenericPS, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CountGenericPS, "countGenericPS", true>;
}
export declare class FilterGenericPS implements PipeTransform {
    transform(objects: any[], filterField: any, filterValue: any, reverse?: any, fake?: any): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterGenericPS, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterGenericPS, "filterGenericPS", true>;
}
export declare class FilterGenericPSO implements PipeTransform {
    transform(objects: any[], filterField1: any, filterValue1: any, filterField2: any, filterValue2: any): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterGenericPSO, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterGenericPSO, "filterGenericPSO", true>;
}
export declare class FilterGenericPSA implements PipeTransform {
    transform(objects: any[], filterField1: any, filterValue1: any, filterField2: any, filterValue2: any): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterGenericPSA, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterGenericPSA, "filterGenericPSA", true>;
}
export declare class FilterGenericIS implements PipeTransform {
    transform(objects: any[], filterField: any, filterValue: any, fake?: any): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterGenericIS, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterGenericIS, "filterGenericIS", true>;
}
export declare class FilterGenericA implements PipeTransform {
    transform(objects: any[], filterField: any, filterValue: any, fake?: any): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterGenericA, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterGenericA, "filterGenericA", true>;
}
export declare class FilterGenericB implements PipeTransform {
    transform(objects: any[], filterField: any, filterValue?: any, fake?: any): any[];
    static ɵfac: i0.ɵɵFactoryDeclaration<FilterGenericB, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<FilterGenericB, "filterGenericB", true>;
}
export declare class CountGenericB implements PipeTransform {
    transform(objects: any[], filterField: any, filterValue: any, fake?: any): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<CountGenericB, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CountGenericB, "countGenericB", true>;
}
export declare class TranslateAuto implements PipeTransform {
    http: HttpClient;
    utilsSvc: UtilsService;
    constructor(http: HttpClient, utilsSvc: UtilsService);
    transform(text: string, fake: any, languageo?: any): Promise<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<TranslateAuto, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<TranslateAuto, "translateAuto", true>;
}
export declare class AddComponent implements PipeTransform {
    transform(text: string, componentName: string): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddComponent, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AddComponent, "addComponent", true>;
}
