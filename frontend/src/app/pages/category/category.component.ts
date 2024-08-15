import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/Category';
import { CategoryService } from 'src/app/services/category/category.service';
import Swal from 'sweetalert2';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { ViewCategoryComponent } from './view-category/view-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public categoryData: Category[] = [];
  public loading: boolean = true;
  displayLoader: boolean = true;
  dispalyNotFoundData: boolean = false;
  page:number = 1;
  size:number = 5;
  PageNumber:number = 0;
  totalCount:number = 0;
  numberOfDatasInArray = [5,10,20,30];
  public searchedValue: string;


  constructor(
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getAllCategoriesDetails().then(null);
  }

  public async getAllCategoriesDetails(): Promise<void> {
    this.categoryService.getCategoriesByPagination(this.PageNumber, this.size).subscribe({
      next: (categoryDatas: any) => {
        const paginationDetail = categoryDatas.data;
        this.page = paginationDetail.currentPage + 1;
        this.totalCount = (paginationDetail.totalPages)*this.size;
        this.categoryData = categoryDatas.data.results;
        if (this.categoryData?.length === 0) {
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

  addCategory() {
    const modalRef = this.modalService.open(AddEditCategoryComponent);
    modalRef.componentInstance.isAddMode = true;
    modalRef.result.then(() => {
      this.getAllCategoriesDetails().then(null);
    }).catch((error) => { })

  }



  editCategory(id: number) {
    const modalRef = this.modalService.open(AddEditCategoryComponent);
    modalRef.componentInstance.categoryId = id;
    modalRef.componentInstance.isEditMode = true;
    modalRef.result.then(() => {
      this.getAllCategoriesDetails().then(null);
    }).catch((error) => { })
  }

  deleteCategory(categoryId: number) {
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
        this.categoryService.deleteCategory(categoryId).subscribe({
          next: (res: any) => {
            Swal.fire('<h4>Deleted!</h4>', res.message, 'success');
            this.getAllCategoriesDetails();
          },
          error: (error) => {
            Swal.fire('Error', error.error.message || "Something went wrong!");
          }
        }
        );
      }
    });
  }

  show(category: Category) {
    const modalRef = this.modalService.open(ViewCategoryComponent);
    modalRef.componentInstance.name = category.categoryName;
    modalRef.componentInstance.description = category.categoryDescription;
  }

  pageChange(event: any) {
    this.page = event;
    this.PageNumber = this.page - 1;
    this.getAllCategoriesDetails();
  }

  noOfRecordsSizeChange(): void {
    this.getAllCategoriesDetails();
  }

  public getValue(event: any){
    this.searchedValue = event.target.value;
    if (this.searchedValue.length >= 2){
      this.categoryService.searchCategoryData(this.PageNumber,this.size,this.searchedValue).subscribe({
        next: (categorysDatas: any) => {
          const paginationDetail = categorysDatas.data;
          this.page = paginationDetail.currentPage + 1;
          this.totalCount = (paginationDetail.totalPages) * this.size;
          this.categoryData = categorysDatas.data.results;
          if (this.categoryData?.length === 0) {
            this.displayLoader = false;
            this.dispalyNotFoundData = true;
          }
        },
      })
    }else if(this.searchedValue === ""){
      this.getAllCategoriesDetails();
    }
  }
}
