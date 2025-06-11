import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GodigitalbModule, UtilsService } from 'godigital-lib';
import { LayoutguestComponent } from './layoutguest/layoutguest.component';
import { LayouthostComponent } from './layouthost/layouthost.component';
import { LayoutnoneComponent } from './layoutnone/layoutnone.component';
import { HeaderhostComponent } from './headerhost/headerhost.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderguestComponent } from './headerguest/headerguest.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout.router.module';



@NgModule({
  declarations: [LayoutguestComponent,FooterComponent,HeaderguestComponent, LayouthostComponent,HeaderhostComponent, LayoutnoneComponent],
  imports: [
    LayoutguestComponent,FooterComponent,HeaderguestComponent, LayouthostComponent,HeaderhostComponent, LayoutnoneComponent,
    CommonModule,
    IonicModule,
    GodigitalbModule,
    FormsModule, ReactiveFormsModule,
    LayoutRoutingModule,
    NgxSpinnerModule,
  ],
  providers:[]
})
export class LayoutModule { }
