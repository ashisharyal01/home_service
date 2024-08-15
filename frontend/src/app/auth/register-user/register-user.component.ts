import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import { AddEditRegisterUserComponent } from './add-edit-register-user/add-edit-register-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  public userData: User[] = [];
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
    private userService: UserService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getAllUsers().then(null);
  }

  public async getAllUsers(): Promise<void> {
    this.userService.getUsersByPagination(this.PageNumber, this.size).subscribe({
      next: (usersDatas: any) => {
        const paginationDetail = usersDatas.data;
        this.page = paginationDetail.currentPage + 1;
        this.totalCount = (paginationDetail.totalPages) * this.size;
        this.userData = usersDatas.data.results;
        if (this.userData?.length === 0) {
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

  addUser() {
    const modalRef = this.modalService.open(AddEditRegisterUserComponent, { size: 'lg' });
    modalRef.componentInstance.isAddMode = true;
    modalRef.result.then(() => {
      this.getAllUsers().then(null);
    }).catch((error) => { })
  }

  editUser(id: number) {
    const modalRef = this.modalService.open(AddEditRegisterUserComponent);
    modalRef.componentInstance.userId = id;
    modalRef.componentInstance.isEditMode = true;
    modalRef.result.then(() => {
      this.getAllUsers().then(null);
    }).catch((error) => { })
  }

  deleteUser(userId: number) {
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
        this.userService.deleteUser(userId).subscribe({
          next: (res: any) => {
            Swal.fire('<h4>Deleted!</h4>', res.message, 'success');
            this.getAllUsers();
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

  show(user: User) {
    const modalRef = this.modalService.open(ViewUserComponent);
    modalRef.componentInstance.fullName = user.fullName;
    modalRef.componentInstance.email = user.email;
    modalRef.componentInstance.address = user.address;
    modalRef.componentInstance.gender = user.gender;
    modalRef.componentInstance.mobileNumber = user.mobileNumber;
    modalRef.componentInstance.dateOfBirth = user.dateOfBirth;
    modalRef.componentInstance.mobileNumber = user.mobileNumber;
  }


  pageChange(event: any) {
    this.page = event;
    this.PageNumber = this.page - 1;
    this.getAllUsers();
  }

  noOfRecordsSizeChange(): void {
    this.getAllUsers();
  }

  public getValue(event: any){
    this.searchedValue = event.target.value;
    if (this.searchedValue.length >= 2){
      this.userService.searchUserData(this.PageNumber,this.size,this.searchedValue).subscribe({
        next: (usersDatas: any) => {
          const paginationDetail = usersDatas.data.results;
          this.page = paginationDetail.currentPage + 1;
          this.totalCount = (paginationDetail.totalPages) * this.size;
          this.userData = usersDatas.data.results;
          if (this.userData?.length === 0) {
            this.displayLoader = false;
            this.dispalyNotFoundData = true;
          }
        },
      })
    }else if(this.searchedValue === ""){
      this.getAllUsers();
    }
  }

}
