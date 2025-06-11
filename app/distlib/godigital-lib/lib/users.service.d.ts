import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreDbService } from './firebase-service';
import { UtilsService } from './utils.service';
import { AlertController } from '@ionic/angular';
import { Users } from './service-service';
import * as i0 from "@angular/core";
export declare const firebaseConfig: {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    storageBucke: string;
    messagingSenderId: string;
};
export declare class UsersService {
    http: HttpClient;
    storeDbSvc: StoreDbService;
    utilSvc: UtilsService;
    private alertController;
    userInfo: Users;
    currentUser: any;
    allUsers: Users[] | null;
    allUsersO: BehaviorSubject<Users[] | null>;
    confirmationResult: any;
    firebaseauth: any;
    recaptchaVerifier: any;
    constructor(http: HttpClient, storeDbSvc: StoreDbService, utilSvc: UtilsService, alertController: AlertController);
    authUser(email: string, password1: string, emailNotVerified?: boolean): Promise<unknown>;
    logout(): Promise<unknown>;
    resetPwdUser(email: string): Promise<unknown>;
    getUser(wnUserId: string): Promise<Users>;
    updatePwd(wnUser: Users, oldPwd1: string, newPwd1: string): Promise<any>;
    updateUser(wnUser: Users): Promise<unknown>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UsersService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UsersService>;
}
