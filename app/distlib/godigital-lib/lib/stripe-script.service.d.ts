import { ScriptLoadingService } from './script-loading.service';
import * as i0 from "@angular/core";
export declare class StripeScriptService {
    scriptLoadingService: ScriptLoadingService;
    baseUrl: string;
    globalVar: string;
    constructor(scriptLoadingService: ScriptLoadingService);
    registerScript(loaded: () => void): void;
    getStripeUrl(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<StripeScriptService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StripeScriptService>;
}
