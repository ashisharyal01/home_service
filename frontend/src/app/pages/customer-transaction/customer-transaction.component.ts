import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CustomerTransaction } from 'src/app/models/CustomerTransaction';
import { CustomerTransactionService } from 'src/app/services/customer-transaction/customer-transaction.service';
import { AddEditCustomerTransactionComponent } from './add-edit-customer-transaction/add-edit-customer-transaction.component';
import { ViewCustomerTransactionComponent } from './view-customer-transaction/view-customer-transaction.component';

@Component({
  selector: 'app-customer-transaction',
  templateUrl: './customer-transaction.component.html',
  styleUrls: ['./customer-transaction.component.scss']
})
export class CustomerTransactionComponent implements OnInit {
  public customerTransaction: CustomerTransaction[] = [];
  public loading: boolean = true;
  displayLoader: boolean = true;
  dispalyNotFoundData: boolean = false;
  page: number = 1;
  size: number = 5;
  PageNumber: number = 0;
  totalCount: number = 0;
  numberOfDatasInArray = [5, 10, 20, 30];
  public searchedValue: string;

  constructor(
    private customerTransactionService: CustomerTransactionService,
    private modalService: NgbModal,
    private toastrService: ToastrService,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getAllCustomerTransaction().then(null);
  }

  public async getAllCustomerTransaction(): Promise<void> {
    this.customerTransactionService.getCustomerTransaction().subscribe({
      next: (customerTransactionData: any) => {
        this.customerTransaction = customerTransactionData;
        if (this.customerTransaction?.length === 0) {
          this.displayLoader = false;
          this.dispalyNotFoundData = true;
        }
      },
      error: (error) => {
        this.toastrService.error(error.error.message || 'Something went wrong!', 'Error', {
          progressBar: true
        });
        this.displayLoader = false;
        this.dispalyNotFoundData = true;
      }
    })
  }


  addCustomerTransaction() {
    const customerTransactionRef = this.modalService.open(AddEditCustomerTransactionComponent);
    customerTransactionRef.componentInstance.customerTransactionId = null
    customerTransactionRef.result.then(() => {
      this.getAllCustomerTransaction();
    })
  }

  viewCustomerTransaction(customerTransactionDetails: CustomerTransaction) {
    const viewCustoemrTransactionByIdRef = this.modalService.open(ViewCustomerTransactionComponent);
    viewCustoemrTransactionByIdRef.componentInstance.customerName = customerTransactionDetails.customer.customerName;
    viewCustoemrTransactionByIdRef.componentInstance.paidAmount = customerTransactionDetails.paidAmount;
    viewCustoemrTransactionByIdRef.componentInstance.orderTransactionNumber = customerTransactionDetails.orderTransactionNo;
    viewCustoemrTransactionByIdRef.componentInstance.paymentMethod = customerTransactionDetails.paymentMethod;
    viewCustoemrTransactionByIdRef.componentInstance.transactionDate = customerTransactionDetails.transactionDate;
    viewCustoemrTransactionByIdRef.componentInstance.fiscalYear = customerTransactionDetails.fiscalYearTransaction.year;
    viewCustoemrTransactionByIdRef.componentInstance.transactionRemarks = customerTransactionDetails.transactionRemarks;
    viewCustoemrTransactionByIdRef.componentInstance.registeredBy = customerTransactionDetails.RegisterUser.fullName;
  }


  pageChange(event: any) {
    this.page = event;
    this.PageNumber = this.page - 1;
    this.getAllCustomerTransaction();
  }

  noOfRecordsSizeChange(): void {
    this.getAllCustomerTransaction();
  }

  public getValue(event: any) {
    this.searchedValue = event.target.value;
    if (this.searchedValue.length >= 2) {
      this.customerTransactionService.searchCustomerTransactionData(this.PageNumber, this.size, this.searchedValue).subscribe({
        next: (customerTransactionDatas: any) => {
          const paginationDetail = customerTransactionDatas.data.results;
          this.page = paginationDetail.currentPage + 1;
          this.totalCount = (paginationDetail.totalPages) * this.size;
          this.customerTransaction = customerTransactionDatas.data.results;
          if (this.customerTransaction?.length === 0) {
            this.displayLoader = false;
            this.dispalyNotFoundData = true;
          }
        },
      })
    } else if (this.searchedValue === "") {
      this.getAllCustomerTransaction();
    }
  }


}
