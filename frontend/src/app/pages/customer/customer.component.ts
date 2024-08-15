import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/Customer';
import { CustomerService } from 'src/app/services/customer/customer.service';
import Swal from 'sweetalert2';
import { AddEditCustomerComponent } from './add-edit-customer/add-edit-customer.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  public customerData: Customer[] = [];
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
    private customerService: CustomerService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getAllCustomers().then(null);
  }

  public async getAllCustomers(): Promise<void> {
    this.customerService.getCustomersByPagination(this.PageNumber, this.size).subscribe({
      next: (customersDatas: any) => {
        const paginationDetail = customersDatas.data;
        this.page = paginationDetail.currentPage + 1;
        this.totalCount = (paginationDetail.totalPages) * this.size;
        this.customerData = customersDatas.data.results;
        if (this.customerData?.length === 0) {
          this.displayLoader = false;
          this.dispalyNotFoundData = true;
        }
      },
      error: (error) => {
        this.toastrService.error(error.errors[0].msg || 'Something went wrong!', 'Error', {
          progressBar: true
        });
        this.displayLoader = false;
        this.dispalyNotFoundData = true;
      }
    })
  }

  addCustomer() {
    const modalRef = this.modalService.open(AddEditCustomerComponent);
    modalRef.componentInstance.isAddMode = true;
    modalRef.result.then(() => {
      this.getAllCustomers().then(null);
    }).catch((error) => { })

  }



  editCustomer(id: number) {
    const modalRef = this.modalService.open(AddEditCustomerComponent);
    modalRef.componentInstance.customerId = id;
    modalRef.componentInstance.isEditMode = true;
    modalRef.result.then(() => {
      this.getAllCustomers().then(null);
    }).catch((error) => { })
  }

  deleteCustomer(customerId: number) {
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
        this.customerService.deleteCustomers(customerId).subscribe({
          next: (res: any) => {
            Swal.fire('<h4>Deleted!</h4>', res.message, 'success');
            this.getAllCustomers();
          },
          error: (error) => {
            this.toastrService.error(error.error.message || 'Something went wrong!', 'Error', {
              progressBar: true
            });
            this.displayLoader = false;
            this.dispalyNotFoundData = true;
          }
        }
        );
      }
    });
  }

  pageChange(event: any) {
    this.page = event;
    this.PageNumber = this.page - 1;
    this.getAllCustomers();
  }

  noOfRecordsSizeChange(): void {
    this.getAllCustomers();
  }

  // show(customer: Customer) {
  //   const modalRef = this.modalService.open(ViewCustomerComponent);
  //   modalRef.componentInstance.name = customer.customerName;
  //   modalRef.componentInstance.address = customer.customerAddress;
  //   modalRef.componentInstance.phoneNumber = customer.customerPhoneNumber;
  // }

  public getValue(event: any){
    this.searchedValue = event.target.value;
    if (this.searchedValue.length >= 2){
      this.customerService.searchCustomerData(this.PageNumber,this.size,this.searchedValue).subscribe({
        next: (customersDatas: any) => {
          const paginationDetail = customersDatas.data.results;
          this.page = paginationDetail.currentPage + 1;
          this.totalCount = (paginationDetail.totalPages) * this.size;
          this.customerData = customersDatas.data.results;
          if (this.customerData?.length === 0) {
            this.displayLoader = false;
            this.dispalyNotFoundData = true;
          }
        },
      })
    }else if(this.searchedValue === ""){
      this.getAllCustomers();
    }
    // this.customerService.searchCustomerData(this.size,this.PageNumber,this.searchedValue ,)
  }

}
