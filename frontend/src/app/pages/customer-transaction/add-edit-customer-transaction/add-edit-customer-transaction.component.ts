import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Customer } from 'src/app/models/Customer';
import { CustomerTransactionService } from 'src/app/services/customer-transaction/customer-transaction.service';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-add-edit-customer-transaction',
  templateUrl: './add-edit-customer-transaction.component.html',
  styleUrls: ['./add-edit-customer-transaction.component.scss']
})
export class AddEditCustomerTransactionComponent implements OnInit {

  submitted: boolean = false;
  loading: boolean = false;
  @Input() customerTransactionId: number;
  public customerData: Customer[] = [];
  public defaultTransactionCustomerAmount: number = 10;
  currentDate = new Date().toISOString().substring(0, 10);

  addCustomerTransaction: FormGroup;

  constructor(
    private toastr: ToastrService,
    private activeModalService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private customerTransactionService: CustomerTransactionService,
  ) { }


  ngOnInit(): void {
    this.getAllCustomers().then(null);
    this.addCustomerTransaction = this.formBuilder.group({
      customerId: new FormControl('', this.customerTransactionId !== null ? [] : Validators.required),
      paidAmount: new FormControl(this.defaultTransactionCustomerAmount, [Validators.required, Validators.min(10)]),
      paymentMethod: new FormControl('cash', Validators.required),
      transactionDate: new FormControl(formatDate(this.currentDate, 'yyyy-MM-dd', 'en'), Validators.required),
      transactionRemarks: new FormControl(''),
    });
  }

  public async getAllCustomers(): Promise<void> {
    this.customerService.getAllCustomers().subscribe({
      next: (customersDatas: any) => {
        this.customerData = customersDatas.data.rows;
      },
      error: (error) => {
        this.toastr.error(error.errors[0].msg || 'Something went wrong!', 'Error', {
          progressBar: true
        });
      }
    })
  }




  onSubmit() {
    this.loading = true;
    if (this.addCustomerTransaction.invalid) {
      return;
    }
    this.createCustomerTransaction();
  }



  private createCustomerTransaction() {
    if (this.customerTransactionId !== null) {
      this.addCustomerTransaction.value.customerId = this.customerTransactionId
    }

    console.log(this.addCustomerTransaction.value)
    this.customerTransactionService
      .addCustomerTransaction(this.addCustomerTransaction.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'Success', {
            progressBar: true,
          });
          this.closeModal();
          this.loading = false;
        },
        error: (error) => {
          this.toastr.error(error.error.errors[0].msg || 'Something went wrong', 'Error', {
            progressBar: true,
          });
          this.loading = false;

        },
      });
  }



  closeModal() {
    this.activeModalService.close();
  }


}
