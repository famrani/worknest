import { Injectable } from '@nestjs/common'; // if using NestJS
import { BehaviorSubject } from 'rxjs';
import * as admin from 'firebase-admin';   // ✅ Correct way
import * as fs from 'fs';
import { UtilsService } from './utils.service';

export enum OBJECTNAME {
  wnLocations = 'backendlocations',
  wnLocationtypes = 'backendlocationtypes',
  wnUsers = 'backendusers',
  wnMessages = 'backendmessages',
  wnEquipments = 'backendequipments',
  wnBookings = 'backendbookings',
  wnFeedbacks = 'backendfeedbacks',
}


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
  hostId: string|undefined;
  guestId: string|undefined;
  locationId: string|undefined;
  start: string;
  end: string;
  daybooking: boolean;
  price: number,
  status: string
}

export interface Locations {
  locationId: string;
  title: string;
  description: string;
  photos: string[];
  equipments: string[];
  priceperhour: number;
  priceperday: number;
  address: string;
  city: string;
  lat: number;
  lng: number;
  type: string;
  owner: string
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



@Injectable()
export class StoreDbService {
  private db;
  private bucket;

  public firebaseBSS: any = {};
  public firebaseData: any = {};

  constructor(private utilSvc: UtilsService) {
  }

  initFirebase() {
    let currentDir = process.cwd();
    const serviceAccount = JSON.parse(
      fs.readFileSync(currentDir + '/dist2/config/worknest-ca1e4-firebase-adminsdk-fbsvc-b2c22eac3a.json', 'utf8')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: this.utilSvc.databaseURL,
      storageBucket: 'your-bucket.appspot.com',
    });

    this.db = admin.database();
    this.bucket = admin.storage().bucket();  }

  async getObject(refPath: string) {
    const snapshot = await this.db.ref(refPath).once('value');
    return snapshot.val();
  }

  async setObject(refPath: string, data: any) {
    await this.db.ref(refPath).set(data);
  }

  async removeObject(refPath: string) {
    await this.db.ref(refPath).remove();
  }

  subscribe(refPath: string, storeKey: string) {
    if (!this.firebaseBSS[storeKey]) {
      this.firebaseBSS[storeKey] = new BehaviorSubject(null);
    }

    this.db.ref(refPath).on('value', snapshot => {
      const value = snapshot.val();
      this.firebaseBSS[storeKey].next(value);
    });
  }

  unsubscribe(refPath: string) {
    this.db.ref(refPath).off();
  }

  async uploadFile(localFilePath: string, destinationPath: string) {
    await this.bucket.upload(localFilePath, {
      destination: destinationPath,
      metadata: {
        cacheControl: 'public,max-age=31536000',
      },
    });
  }

  async deleteFile(destinationPath: string) {
    await this.bucket.file(destinationPath).delete();
  }
}
