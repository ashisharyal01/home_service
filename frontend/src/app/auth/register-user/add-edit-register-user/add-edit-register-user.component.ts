import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-edit-register-user',
  templateUrl: './add-edit-register-user.component.html',
  styleUrls: ['./add-edit-register-user.component.scss']
})
export class AddEditRegisterUserComponent implements OnInit {
  submitted: boolean = false;
  loading: boolean = false;
  @Input() isEditMode: boolean;
  @Input() isAddMode: boolean;
  @Input() userId: number;
  usersForm: FormGroup;
  public user: User[];
  hide1: boolean = true;
  hide2: boolean = true;
  staticUserImage: string = '../../../../assets/images/logo/dummy-user.png';
  showImageForEdit: any;
  fileData: File;
  constructor(
    private toastr: ToastrService,
    private activeModalService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.usersForm = this.formBuilder.group({
      fullName: new FormControl('', [
        Validators.required,
        Validators.max(3),
      ]),
      address: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      dateOfBirth: new FormControl('', Validators.required),
      profilePictureId: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
        ),
        Validators.required,
      ]),
      confirmPassword: new FormControl('', Validators.required),
    });
    if (this.isEditMode === true) {
      this.userService
        .getUserById(this.userId)
        .pipe(first())
        .subscribe((data: any) => this.usersForm.patchValue(data.data));
    }
  }


  onSubmit() {
    this.loading = true;
    if (this.usersForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.userService
      .createUser(this.usersForm.value)
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

  private updateUser() {
    this.userService
      .updateUser(this.userId, this.usersForm.value)
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


  onFileChange(event: any) {
    this.fileData = event.target.files[0];
    var displaySelectedImage = new FileReader();
    displaySelectedImage.onload = (event: any) => {
      if (this.isAddMode) {
        this.staticUserImage = event.target.result;
      } else if (!this.isAddMode) {
        this.showImageForEdit = event.target.result;
      }
    };
    displaySelectedImage.readAsDataURL(this.fileData);
  }

  // public getImage() {
  //   this.userService.getUserById(this.id).subscribe((getImageData: any) => {
  //     this.showImageForEdit =
  //       this.allImageUrls + getImageData.data.userImage.fileName;
  //   });
  // }

}
