import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from '../auth/register-user/register-user.component';
import { CategoryComponent } from './category/category.component';
import { AddCustomerInvoiceComponent } from './customer-order-invoice/add-customer-invoice/add-customer-invoice.component';
import { CustomerOrderInvoiceComponent } from './customer-order-invoice/customer-order-invoice.component';
import { ViewCustomerInvoiceByIdComponent } from './customer-order-invoice/view-customer-invoice-by-id/view-customer-invoice-by-id.component';
import { CustomerTransactionComponent } from './customer-transaction/customer-transaction.component';
import { CustomerComponent } from './customer/customer.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FiscalYearComponent } from './fiscal-year/fiscal-year.component';
import { ItemsComponent } from './items/items.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'fiscalYear',
        component: FiscalYearComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'item',
        component: ItemsComponent,
      },
      {
        path: 'customer',
        component: CustomerComponent,
      },
      {
        path: 'view-customer/:id',
        component: ViewCustomerComponent,
      },
      {
        path: 'users',
        component: RegisterUserComponent,
      },
      {
        path: 'customer-order-invoice',
        component: CustomerOrderInvoiceComponent,
      },
      {
        path: 'view-customer-invoice/:id',
        component: ViewCustomerInvoiceByIdComponent,
      },
      {
        path: 'add-customer-invoice',
        component: AddCustomerInvoiceComponent,
      },
      {
        path: 'customer-transaction',
        component: CustomerTransactionComponent
      },
      {
        path: 'userProfile',
        component: UserProfileComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
