import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../layout.service';
import { LocalUtilsService } from '../../services/services.service';
import { UtilsService, } from 'godigital-lib';
import { Subscription, } from 'rxjs';
declare let $: any;


@Component({
  selector: 'app-headerhost',
  templateUrl: './headerhost.component.html',
  styleUrls: ['./headerhost.component.scss'],
})
export class HeaderhostComponent implements OnInit, OnDestroy {
  public subscriptions = new Subscription();

  public componentName = 'headerhost.component';
  constructor(
    public router: Router,
    public layoutSvc: LayoutService,
    public utilsSvc: UtilsService,
    public localUtilsSvc: LocalUtilsService,
    public translateSvc: TranslateService,
  ) { }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnInit() {
    this.subscriptions.add(
      this.layoutSvc.mainSvc.getLanguage().subscribe(language => {
        this.translateSvc.use(<any>language);
      }));
  }

  setLanguage() {
    this.layoutSvc.mainSvc.setLanguage(this.localUtilsSvc.language);
  }

  goToLink(routeL: string) {
    this.layoutSvc.currentUrl = this.router.url;
    this.router.navigate([routeL]);
    $('#navcol-1').collapse('hide');
  }

  goHome() {
    this.layoutSvc.goHome();
  }

  logout() {
    this.layoutSvc.logout();
    this.router.navigate(['/login']);
  }



}

