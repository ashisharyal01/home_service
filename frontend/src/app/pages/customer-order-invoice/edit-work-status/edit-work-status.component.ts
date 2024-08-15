import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { CustomerOrderInvoiceService } from 'src/app/services/customer-order-invoice-service/customer-order-invoice.service';

@Component({
  selector: 'app-edit-work-status',
  templateUrl: './edit-work-status.component.html',
  styleUrls: ['./edit-work-status.component.scss']
})
export class EditWorkStatusComponent implements OnInit {
  @Input() customerInvoiceId: number;
  editWorkStatusForm: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(private orderService: CustomerOrderInvoiceService,
    private formBuilder: FormBuilder,
    private activeModalService: NgbActiveModal,
    private customerOrderInvoiceService: CustomerOrderInvoiceService,
    private toastrService: ToastrService

  ) { }

  ngOnInit(): void {
    this.editWorkStatusForm = this.formBuilder.group({
      workStatus: new FormControl('', [Validators.required]),
    });

    this.orderService
      .getCustomerInvoiceById(this.customerInvoiceId)
      .pipe(first())
      .subscribe((data: any) => {
        this.editWorkStatusForm.patchValue(data)
      });
  }

  onSubmit() {
    this.loading = true
    this.customerOrderInvoiceService
      .updateCustomerInvoice(this.customerInvoiceId, this.editWorkStatusForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.toastrService.success(res.message, 'Success', {
            progressBar: true,
          });
          this.closeModal();
          this.loading = false;
        },
        error: (error) => {
          this.toastrService.error(error.error.message || 'Something went wrong!', 'Error', {
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
