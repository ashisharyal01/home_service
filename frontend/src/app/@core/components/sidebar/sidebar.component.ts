import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  public menuList = [
    {
      title: $localize`:@@dashboard: Dashboard`,
      icon: 'bi bi-grid-fill',
      link: '/pages/dashboard',
    },
    {
      title: $localize`:@@fiscalYear: Fiscal Year`,
      icon: 'bi bi-calendar-check-fill',
      link: '/pages/fiscalYear',
    },
    {
      title: $localize`:@@user: Users`,
      icon: 'bi bi-person-check-fill',
      link: '/pages/users',
    },
    // {
    //   title: $localize`:@@changePassword: Password`,
    //   icon: 'bi bi-lock',
    //   link: '/pages/changePassword',
    // },
    {
      title: $localize`:@@customers: Customers`,
      icon: 'bi bi-people-fill',
      link: '/pages/customer',
    },
    {
      title: $localize`:@@category: Category`,
      icon: 'bi bi-list',
      link: '/pages/category',
    },

    {
      title: $localize`:@@items: Items`,
      icon: 'bi bi-list',
      link: '/pages/item',
    },
    {
      title: $localize`:@@customerInvoice: Customer Invoice`,
      icon: 'bi bi-receipt',
      link: '/pages/customer-order-invoice',
    },
    {
      title: $localize`:@@customerTransaction: Transaction Details`,
      icon: 'bi bi-cash-stack',
      link: '/pages/customer-transaction',
    },



  ];



  ngOnInit(): void {
  }

  closeSideBar() {
    this.document.getElementById('sidebar').classList.remove("active");
  }

}
