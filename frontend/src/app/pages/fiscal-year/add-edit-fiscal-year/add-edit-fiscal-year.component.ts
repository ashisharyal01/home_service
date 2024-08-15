import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { FiscalYear } from 'src/app/models/FiscalYear';
import { FiscalYearService } from 'src/app/services/fiscalYear/fiscal-year.service';

@Component({
  selector: 'app-add-edit-fiscal-year',
  templateUrl: './add-edit-fiscal-year.component.html',
  styleUrls: ['./add-edit-fiscal-year.component.scss']
})
export class AddEditFiscalYearComponent implements OnInit {

  submitted: boolean = false;
  loading: boolean = false;
  @Input() isEditMode: boolean;
  @Input() isAddMode: boolean;
  @Input() fiscalYearId: number;
  fiscalYearForm: FormGroup;
  public fiscalYear: FiscalYear[];

  constructor(public fiscalYearService: FiscalYearService,
    private toastr: ToastrService,
    private activeModalService: NgbActiveModal,
    private formBuilder: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.fiscalYearForm = this.formBuilder.group({
      year: new FormControl('', [Validators.required]),
    });

    if (this.isEditMode === true) {
      this.fiscalYearService
        .getActiveFiscalYearById(this.fiscalYearId)
        .pipe(first())
        .subscribe((data: any) => {
          this.fiscalYearForm.patchValue(data.data)
        });
    }
  }


  onSubmit() {
    this.loading = true
    if (this.fiscalYearForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createYear();
    } else {
      this.updateYearData();
    }
  }



  private createYear() {
    this.fiscalYearService
      .createYear(this.fiscalYearForm.value)
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
          this.toastr.error(error.error.message || 'Something went wrong!', 'Error', {
            progressBar: true,
          });
          this.loading = false;

        },
      });
  }

  private updateYearData() {
    this.fiscalYearService
      .updateYear(this.fiscalYearId, this.fiscalYearForm.value)
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
          this.toastr.error(error.error.message || 'Something went wrong!', 'Error', {
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
