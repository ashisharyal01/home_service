import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category/category.service';
import { ItemsService } from 'src/app/services/items/items.service';

@Component({
  selector: 'app-add-edit-items',
  templateUrl: './add-edit-items.component.html',
  styleUrls: ['./add-edit-items.component.scss']
})
export class AddEditItemsComponent implements OnInit {

  submitted: boolean = false;
  loading: boolean = false;
  @Input() isEditMode: boolean;
  @Input() isAddMode: boolean;
  @Input() itemId: number;
  itemsForm: FormGroup;
  public category: Category[];
  uploadedImage: string | ArrayBuffer | null = null;



  constructor(
    private toastrService: ToastrService,
    private activeModalService: NgbActiveModal,
    private formBuilder: FormBuilder,
    private itemService: ItemsService,
    private categoryService: CategoryService,
  ) { }


  ngOnInit(): void {
    this.getAllCategories().then(null);
    this.itemsForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.max(10),
      ]),
      categoryId: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });

    if (this.isEditMode === true) {
      this.itemService
        .getItemsById(this.itemId)
        .pipe(first())
        .subscribe((data: any) => this.itemsForm.patchValue(data.data));
    }
  }

  public async getAllCategories(): Promise<void> {
    this.categoryService.getAllCategories().subscribe({
      next: (categoriesData: any) => {
        this.category = categoriesData.data.rows;
      }, error: (error) => {
        this.toastrService.error(error.error.message || 'Something went wrong', 'Error', {
          progressBar: true,
        });
      },
    })
  }


  onSubmit() {
    this.loading = true;
    if (this.itemsForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.createItems();
    } else {
      this.updateItems();
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.uploadedImage = reader.result;
        this.itemsForm.patchValue({ image: file });
      };
      reader.readAsDataURL(file);
    }
  }


  private createItems() {
    this.itemService
      .createItems(this.itemsForm.value)
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
          this.toastrService.error(error.error.message || 'Something went wrong', 'Error', {
            progressBar: true,
          });
          this.loading = false;

        },
      });
  }


  private updateItems() {
    this.itemService
      .updateItems(this.itemId, this.itemsForm.value)
      .pipe(first())
      .subscribe({
        next: (res: any) => {
          this.toastrService.success(res.message, 'Success', {
            progressBar: true,
          });
          this.closeModal();
          this.loading = false
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
