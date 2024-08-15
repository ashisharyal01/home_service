import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {

  submitted: boolean = false;
  loading: boolean = false;
  @Input() isEditMode: boolean;
  @Input() isAddMode: boolean;
  @Input() customerId: number;
  customersForm: FormGroup;
  public category: Category[];

  constructor(
    private toastr: ToastrService,
    private activeModalService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
  ) { }


  ngOnInit(): void {
    this.customersForm = this.formBuilder.group({
      customerName: new FormControl('', [
        Validators.required,
        Validators.max(3),
      ]),
      customerAddress: new FormControl('', Validators.required),
      customerPhoneNumber: new FormControl('', Validators.required),
    });

    if (this.isEditMode === true) {
      this.customerService
        .getCustomersById(this.customerId)
        .pipe(first())
        .subscribe((data: any) => this.customersForm.patchValue(data.data));
    }
  }



  onSubmit() {
    this.loading = true;
    if (this.customersForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createCustomer();
    } else {
      this.updateCustomer();
    }
  }



  private createCustomer() {
    this.customerService
      .createCustomers(this.customersForm.value)
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


  private updateCustomer() {
    this.customerService
      .updateCustomers(this.customerId, this.customersForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.toastr.success(res.message, 'Success', {
            progressBar: true,
          });
          this.closeModal();
          this.loading = false
        },
        error: (error) => {
          this.toastr.error(error.error.errors[0].msg || 'Something went wrong!', 'Error', {
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
