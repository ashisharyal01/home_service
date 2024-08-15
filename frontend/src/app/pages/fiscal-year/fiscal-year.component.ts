import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FiscalYear } from 'src/app/models/FiscalYear';
import { FiscalYearService } from 'src/app/services/fiscalYear/fiscal-year.service';
import Swal from 'sweetalert2';
import { AddEditFiscalYearComponent } from './add-edit-fiscal-year/add-edit-fiscal-year.component';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-fiscal-year',
  templateUrl: './fiscal-year.component.html',
  styleUrls: ['./fiscal-year.component.scss']
})
export class FiscalYearComponent implements OnInit {
  public years: FiscalYear[] = [];
  public loading: boolean = true;
  displayLoader: boolean = true;
  dispalyNotFoundData: boolean = false;
  page: number = 1;
  size: number = 5;
  PageNumber: number = 0;
  totalCount: number = 0;
  numberOfDatasInArray = [5, 10, 20, 30];

  constructor(
    private fiscalYearService: FiscalYearService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService,
    private authService: AuthService,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getAllYear().then(null);
  }

  public async getAllYear(): Promise<void> {
    this.fiscalYearService.getAllFiscalYears().subscribe({
      next: (yearDatas: any) => {
        this.years = yearDatas.data.rows;
        if (this.years?.length === 0) {
          this.displayLoader = false;
          this.dispalyNotFoundData = true;
        }
      },
      error: (error) => {
        this.toastrService.error(error.error.message || "Something went wrong!", 'Error', {
          progressBar: true,
        });
        this.displayLoader = false;
        this.dispalyNotFoundData = true;
      }
    });
  }

  addFiscalYear() {
    const modalRef = this.modalService.open(AddEditFiscalYearComponent);
    modalRef.componentInstance.isAddMode = true;
    modalRef.result.then(() => {
      this.getAllYear().then(null);
    }).catch((error) => { })

  }

  editFiscalYear(id: number) {
    const modalRef = this.modalService.open(AddEditFiscalYearComponent);
    modalRef.componentInstance.fiscalYearId = id;
    modalRef.componentInstance.isEditMode = true;
    modalRef.result.then(() => {
      this.getAllYear().then(null);
    }).catch((error) => { })
  }

  onDeleteFiscalYear(yearID: number) {
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
        this.fiscalYearService.deleteYearData(yearID).subscribe({
          next: (res: any) => {
            Swal.fire('<h4>Deleted!</h4>', res.message, 'success');
            this.getAllYear();
          },
          error: (error) => {
            Swal.fire('Error', error.error.message || "Something went wrong!", 'error');
          }
        });
      }
    });
  }

  onSetFiscalYear(statusYearId: number) {
    Swal.fire({
      title: '<h4>Are you sure?</h4>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DC3545',
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
      showConfirmButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.fiscalYearService.changeStatusOfFiscalYear(statusYearId).subscribe({
          next: (res: any) => {
            Swal.fire('<h4>Status Activated!</h4>', res.message, 'success');
            this.getAllYear();
          },
          error: (error) => {
            Swal.fire('Error', error.errors.msg || "Something went wrong!", 'error');
          }
        }
        );
      } else {
        this.getAllYear();
      }
    });
  }



  pageChange(event: any) {
    this.page = event;
    this.PageNumber = this.page - 1;
    this.getAllYear();
  }

  noOfRecordsSizeChange(): void {
    this.getAllYear();
  }

}
