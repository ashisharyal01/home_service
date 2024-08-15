import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { subMonths } from 'date-fns';
import { CustomerInvoiceTransactionService } from 'src/app/services/customer-invoice-transaction/customer-invoice-transaction.service';
import { CustomerInvoice } from 'src/app/models/CustomerInvoice';
import { CustomerTransaction } from 'src/app/models/CustomerTransaction';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddEditCustomerTransactionComponent } from '../../customer-transaction/add-edit-customer-transaction/add-edit-customer-transaction.component';
import { ViewCustomerTransactionComponent } from '../../customer-transaction/view-customer-transaction/view-customer-transaction.component';


@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {
  public customerDetails: Customer;
  public customerInvoiceDetails: CustomerInvoice[] = []
  public customerTransactionDetails: CustomerTransaction[] = [];
  public customerTransactionDetailsForEmpty: CustomerTransaction[] = [];
  public customerId: number;
  public startDateValue: string;
  public endDateValue: string;
  public searchedInvoiceListingValue: string;
  public searchedTransactionListingValue: string;
  public invoiceStartDateValue: string;
  public invoiceEndDateValue: string;
  public transactionStartDateValue: string;
  public transactionEndDateValue: string;
  public totalCalulatedAmountOfCustomerInvoice: number;
  public totalCalulatedAmountOfCustomerTransaction: number;
  dateForm: FormGroup;
  currentDate = new Date().toISOString().substring(0, 10);
  previousDate = subMonths(new Date(), 1).toISOString().substring(0, 10);
  displayLoader: boolean = true;
  dispalyNotFoundData: boolean = false;
  disableTranscationButton: boolean = false;



  constructor(private customerService: CustomerService, private toastr: ToastrService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private route: ActivatedRoute, private FormBuilder: FormBuilder,
    private router: Router,
    private customerInvoiceTransactionService: CustomerInvoiceTransactionService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];
    this.searchedInvoiceListingValue = "";
    this.searchedTransactionListingValue = "";
    this.dateForm = this.FormBuilder.group({
      startDate: new FormControl(formatDate(this.previousDate, 'yyyy-MM-dd', 'en')),
      endDate: new FormControl(formatDate(this.currentDate, 'yyyy-MM-dd', 'en')),
    })

    this.invoiceStartDateValue = formatDate(this.previousDate, 'yyyy-MM-dd', 'en');
    this.invoiceEndDateValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en');
    this.transactionStartDateValue = formatDate(this.previousDate, 'yyyy-MM-dd', 'en');
    this.transactionEndDateValue = formatDate(this.currentDate, 'yyyy-MM-dd', 'en');

    this.fetchInvoiceListingDetails().then(null);
    this.fetchTransactionListingDetails().then(null)
    this.getCustomerDetails().then(null)
  }

  public async getCustomerDetails(): Promise<void> {
    this.customerService.getCustomersById(this.customerId).subscribe((customerData: any) => {
      this.customerDetails = customerData.data;
    })
  }

  addCustomerTransaction() {
    const customerTransactionRef = this.modalService.open(AddEditCustomerTransactionComponent);
    customerTransactionRef.componentInstance.customerTransactionId = this.customerId
    customerTransactionRef.result.then(() => {
      this.fetchTransactionListingDetails();
    })
  }

  // Invoice Listing Details
  getStartDateValueOfInvoiceListing(event: Event) {
    this.invoiceStartDateValue = (event.target as HTMLInputElement).value;
    this.fetchInvoiceListingDetails();
  }

  getEndDateValueOfInvoiceListing(event: Event) {
    this.invoiceEndDateValue = (event.target as HTMLInputElement).value;
    this.fetchInvoiceListingDetails();
  }

  getValueOfSearchedInvoiceListing(event: Event) {
    this.searchedInvoiceListingValue = (event.target as HTMLInputElement).value;
    this.fetchInvoiceListingDetails();

  }

  public async fetchInvoiceListingDetails(): Promise<void> {
    if (this.searchedInvoiceListingValue == "" || this.searchedInvoiceListingValue.length >= 2) {
      this.customerInvoiceTransactionService.searchCustomerInvoiceDetails(this.customerId, this.searchedInvoiceListingValue, this.invoiceStartDateValue, this.invoiceEndDateValue).subscribe((customerInvoiceData: any) => {
        this.customerInvoiceDetails = customerInvoiceData.data?.orders;
        const filteredTotalAmountOfCustomerInvoice = this.customerInvoiceDetails?.map((amountOfCustomerInvoice: any) => {
          let totalFilteredAmountOfCustomerInvoice = +amountOfCustomerInvoice.grandTotal;
          return totalFilteredAmountOfCustomerInvoice;
        })
        const arrayOfFilteredPartyInvoiceAmount = filteredTotalAmountOfCustomerInvoice;
        this.totalCalulatedAmountOfCustomerInvoice = arrayOfFilteredPartyInvoiceAmount?.reduce((current, next) => {
          return current + next;
        }, 0)

        if (this.customerInvoiceDetails?.length === 0 || this.customerInvoiceDetails?.length === undefined) {
          this.displayLoader = false;
          this.dispalyNotFoundData = true;

        }
      }, (error) => {
        this.toastr.error(error.error.message || 'Something went wrong!', 'Error', {
          progressBar: true,
        });
        this.displayLoader = false;
        this.dispalyNotFoundData = true;
      })
    }
  }


  // Transaction Listing Details
  getStartDateValueOfTransactionListing(event: Event) {
    this.transactionStartDateValue = (event.target as HTMLInputElement).value;
    this.fetchTransactionListingDetails();
  }

  getEndDateValueOfTransactionListing(event: Event) {
    this.transactionEndDateValue = (event.target as HTMLInputElement).value;
    this.fetchTransactionListingDetails();
  }

  getValueOfSearchedTransactionListing(event: Event) {
    this.searchedTransactionListingValue = (event.target as HTMLInputElement).value;
    this.fetchTransactionListingDetails();

  }

  public async fetchTransactionListingDetails(): Promise<void> {
    if (this.searchedTransactionListingValue == "" || this.searchedTransactionListingValue.length >= 2) {
      this.customerInvoiceTransactionService.searchCustomerTransactionDetails(this.customerId, this.searchedTransactionListingValue, this.transactionStartDateValue, this.transactionEndDateValue).subscribe((customerInvoiceData: any) => {
        this.customerTransactionDetails = customerInvoiceData.data?.transactionOrder;
        this.customerTransactionDetailsForEmpty = customerInvoiceData.data;
        console.log('transaction', this.customerTransactionDetailsForEmpty);

        const filteredTotalAmountOfCustomerTransaction = this.customerTransactionDetails?.map((amountOfCustomerTransaction: any) => {
          let totalFilteredAmountOfCustomerTransaction = +amountOfCustomerTransaction.paidAmount;
          return totalFilteredAmountOfCustomerTransaction;
        })
        const arrayOfFilteredPartyTransactionAmount = filteredTotalAmountOfCustomerTransaction;
        this.totalCalulatedAmountOfCustomerTransaction = arrayOfFilteredPartyTransactionAmount?.reduce((current, next) => {
          return current + next;
        }, 0)
        if (this.customerTransactionDetails?.length === 0 || this.customerTransactionDetails?.length === undefined) {
          this.displayLoader = false;
          this.dispalyNotFoundData = true;

        }
      }, (error: any) => {
        this.toastr.error(error.error.message || 'Something went wrong!', 'Error', {
          progressBar: true,
        });
        this.displayLoader = false;
        this.dispalyNotFoundData = true;
      })
    }
  }

  viewCustomerInvoice(orderInvoiceId: number) {
    this.router.navigateByUrl("/pages/view-customer-invoice/" + orderInvoiceId)
  }

  viewCustomerTransaction(customerTransactionDetails: CustomerTransaction) {
    console.log(customerTransactionDetails)
    const viewCustomerTransactionByIdRef = this.modalService.open(ViewCustomerTransactionComponent);
    viewCustomerTransactionByIdRef.componentInstance.customerName = customerTransactionDetails.customer.customerName;
    viewCustomerTransactionByIdRef.componentInstance.paidAmount = customerTransactionDetails.paidAmount;
    viewCustomerTransactionByIdRef.componentInstance.orderTransactionNumber = customerTransactionDetails.orderTransactionNo;
    viewCustomerTransactionByIdRef.componentInstance.paymentMethod = customerTransactionDetails.paymentMethod;
    viewCustomerTransactionByIdRef.componentInstance.transactionDate = customerTransactionDetails.transactionDate;
    viewCustomerTransactionByIdRef.componentInstance.fiscalYear = customerTransactionDetails.fiscalYearTransaction.year;
    viewCustomerTransactionByIdRef.componentInstance.transactionRemarks = customerTransactionDetails.transactionRemarks;
    viewCustomerTransactionByIdRef.componentInstance.registeredBy = customerTransactionDetails.RegisterUser.fullName;
  }




}
