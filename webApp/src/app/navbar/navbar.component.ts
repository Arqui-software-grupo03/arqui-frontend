import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import * as $ from 'jquery';
import { UsersService } from '@app/users/users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

declare var jQuery: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {
  user;
  private ngUnsubscribe = new Subject();
  constructor(private usersService: UsersService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.usersService.castUser.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      user => {
        this.user = user;
      }
    );
    this.addjQueryTooltip();
    this.addjQuerySideBarToggle();

  }

  ngOnDestroy() {
    this.cdRef.detach();
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

  addjQueryTooltip() {
    jQuery('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    }).on('click', () => {
      jQuery(jQuery('[data-toggle="tooltip"]')).tooltip('hide');
    });
  }
  addjQuerySideBarToggle() {
    jQuery('#sidebarCollapse').on('click', () => {
      jQuery('#sidebar').toggleClass('active');
      jQuery('#rightBox').toggleClass('active');
    });
  }
}
