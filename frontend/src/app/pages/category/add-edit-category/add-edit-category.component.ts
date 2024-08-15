import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent implements OnInit {
  submitted: boolean = false;
  loading: boolean = false;
  @Input() isEditMode: boolean;
  @Input() isAddMode: boolean;
  @Input() categoryId: number;
  categoryForm: FormGroup;
  public category: Category[];

  constructor(
    private toastr: ToastrService,
    private activeModalService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
  ) { }


  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      categoryName: new FormControl('', [
        Validators.required,
        Validators.max(3),
      ]),
      categoryDescription: new FormControl(''),
    });

    if (this.isEditMode === true) {
      this.categoryService
        .getCategoryById(this.categoryId)
        .pipe(first())
        .subscribe((data: any) => this.categoryForm.patchValue(data.data));
    }
  }



  onSubmit() {
    this.loading = true;
    if (this.categoryForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createCategory();
    } else {
      this.updateCategory();
    }
  }



  private createCategory() {
    this.categoryService
      .createCategory(this.categoryForm.value)
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
          this.toastr.error(error.error.message || 'Something went wrong', 'Error', {
            progressBar: true,
          });
          this.loading = false;

        },
      });
  }


  private updateCategory() {
    this.categoryService
      .updateCategory(this.categoryId, this.categoryForm.value)
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
