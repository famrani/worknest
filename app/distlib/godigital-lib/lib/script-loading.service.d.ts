import { NgZone } from '@angular/core';
import * as i0 from "@angular/core";
export declare class ScriptLoadingService {
    zone: NgZone;
    constructor(zone: NgZone);
    registerScript(url: string, variable: string, loaded: (variable: any) => void): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScriptLoadingService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ScriptLoadingService>;
}
