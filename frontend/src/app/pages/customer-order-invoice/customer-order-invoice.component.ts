import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CustomerInvoice } from 'src/app/models/CustomerInvoice';
import { CustomerOrderInvoiceService } from 'src/app/services/customer-order-invoice-service/customer-order-invoice.service';
import Swal from 'sweetalert2';
import { EditWorkStatusComponent } from './edit-work-status/edit-work-status.component';

@Component({
  selector: 'app-customer-order-invoice',
  templateUrl: './customer-order-invoice.component.html',
  styleUrls: ['./customer-order-invoice.component.scss']
})
export class CustomerOrderInvoiceComponent implements OnInit {

  public customerInvoice: CustomerInvoice[] = [];
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
    private customerOrderInvoiceService: CustomerOrderInvoiceService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getAllCustomerInvoices().then(null);
  }

  public async getAllCustomerInvoices(): Promise<void> {
    this.customerOrderInvoiceService.getCustomerInvoicePagination().subscribe({
      next: (customerInvoiceDatas: any) => {
        this.customerInvoice = customerInvoiceDatas.rows;
        if (this.customerInvoice?.length === 0) {
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

  editCustomerInvoiceWorkStatus(customerId: number) {
    const customerTransactionRef = this.modalService.open(EditWorkStatusComponent);
    customerTransactionRef.componentInstance.customerInvoiceId = customerId
    customerTransactionRef.result.then(() => {
      this.getAllCustomerInvoices();
    })
  }



  deleteCustomerInvoice(customerOrderInvoiceId: number) {
    Swal.fire({
      title: '<h4>Are you sure?</h4>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC3545',
      confirmButtonText: 'DELETE',
      cancelButtonText: 'CANCEL',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerOrderInvoiceService.deleteCustomerInvoice(customerOrderInvoiceId).subscribe({
          next: (res: any) => {
            Swal.fire('<h4>Deleted!</h4>', res.message, 'success');
            this.getAllCustomerInvoices();
          },
          error: (error) => {
            Swal.fire('Error', error.error.message || "Something went wrong!");
          }
        }
        );
      }
    });
  }

  pageChange(event: any) {
    this.page = event;
    this.PageNumber = this.page - 1;
    this.getAllCustomerInvoices();
  }

  noOfRecordsSizeChange(): void {
    this.getAllCustomerInvoices();
  }

  public getValue(event: any){
    this.searchedValue = event.target.value;
    if (this.searchedValue.length >= 2){
      this.customerOrderInvoiceService.searchCustomerInvoiceData(this.PageNumber,this.size,this.searchedValue).subscribe({
        next: (customerInvoiceDatas: any) => {
          const paginationDetail = customerInvoiceDatas.data.results;
          this.page = paginationDetail.currentPage + 1;
          this.totalCount = (paginationDetail.totalPages) * this.size;
          this.customerInvoice = customerInvoiceDatas.data.results;
          if (this.customerInvoice?.length === 0) {
            this.displayLoader = false;
            this.dispalyNotFoundData = true;
          }
        },
      })
    }else if(this.searchedValue === ""){
      this.getAllCustomerInvoices();
    }
  }

}
