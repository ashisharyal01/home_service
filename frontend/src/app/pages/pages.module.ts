import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../@core/components/sidebar/sidebar.component';
import { FooterComponent } from '../@core/components/footer/footer.component';
import { HeaderComponent } from '../@core/components/header/header.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FiscalYearComponent } from './fiscal-year/fiscal-year.component';
import { AddEditFiscalYearComponent } from './fiscal-year/add-edit-fiscal-year/add-edit-fiscal-year.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoryComponent } from './category/category.component';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';
import { ItemsComponent } from './items/items.component';
import { AddEditItemsComponent } from './items/add-edit-items/add-edit-items.component';
import { CustomerComponent } from './customer/customer.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';
import { CustomerOrderInvoiceComponent } from './customer-order-invoice/customer-order-invoice.component';
import { AddCustomerInvoiceComponent } from './customer-order-invoice/add-customer-invoice/add-customer-invoice.component';
import { CustomerTransactionComponent } from './customer-transaction/customer-transaction.component';
import { AddEditCustomerTransactionComponent } from './customer-transaction/add-edit-customer-transaction/add-edit-customer-transaction.component';
import { ViewCustomerTransactionComponent } from './customer-transaction/view-customer-transaction/view-customer-transaction.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewCategoryComponent } from './category/view-category/view-category.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ViewCustomerInvoiceByIdComponent } from './customer-order-invoice/view-customer-invoice-by-id/view-customer-invoice-by-id.component';
import { EditWorkStatusComponent } from './customer-order-invoice/edit-work-status/edit-work-status.component';
import { ViewCustomerComponent } from './customer/view-customer/view-customer.component';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SidebarComponent,
  DashboardComponent,
  PageLayoutComponent,
  FiscalYearComponent,
  AddEditFiscalYearComponent,
  CategoryComponent,
  AddEditCategoryComponent,
  ItemsComponent,
  AddEditItemsComponent,
  CustomerComponent,
  AddEditCustomerComponent,
  CustomerOrderInvoiceComponent,
  AddCustomerInvoiceComponent,
  CustomerTransactionComponent,
  AddEditCustomerTransactionComponent,
  AddEditCategoryComponent,
  ItemsComponent,
  AddEditItemsComponent,
  CustomerComponent,
  AddEditCustomerComponent,
  UserProfileComponent,
  ViewCategoryComponent,
  ViewCustomerTransactionComponent,
  ViewCustomerInvoiceByIdComponent,
  EditWorkStatusComponent,
  ViewCustomerComponent
]

const MODULES = [
  CommonModule,
  RouterModule,
  PagesRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  NgxPaginationModule,
  NgMultiSelectDropDownModule.forRoot(),
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES]
})
export class PagesModule { }
