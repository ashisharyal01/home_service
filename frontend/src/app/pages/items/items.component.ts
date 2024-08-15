import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/models/Items';
import { ItemsService } from 'src/app/services/items/items.service';
import Swal from 'sweetalert2';
import { AddEditItemsComponent } from './add-edit-items/add-edit-items.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  public itemData: Item[] = [];
  public loading: boolean = true;
  displayLoader: boolean = true;
  dispalyNotFoundData: boolean = false;
  page: number = 1;
  size: number = 10;
  PageNumber: number = 0;
  totalCount: number = 0;
  numberOfDatasInArray = [5, 10, 20, 30];
  public searchedValue: string;

  constructor(
    private itemsService: ItemsService,
    private toastrService: ToastrService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getAllItems().then(null);
  }

  public async getAllItems(): Promise<void> {
    this.itemsService.getItemsByPagination(this.PageNumber, this.size).subscribe({
      next: (itemDatas: any) => {
        this.itemData = itemDatas.data.rows;
        console.log(itemDatas)
        const paginationDetail = itemDatas.data;
        this.page = paginationDetail.currentPage + 1;
        this.totalCount = (paginationDetail.totalPages) * this.size;
        this.itemData = itemDatas.data.results;
        if (this.itemData?.length === 0) {
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

  addItem() {
    const modalRef = this.modalService.open(AddEditItemsComponent);
    modalRef.componentInstance.isAddMode = true;
    modalRef.result.then(() => {
      this.getAllItems().then(null);
    }).catch((error) => { })

  }



  editItems(id: number) {
    const modalRef = this.modalService.open(AddEditItemsComponent);
    modalRef.componentInstance.itemId = id;
    modalRef.componentInstance.isEditMode = true;
    modalRef.result.then(() => {
      this.getAllItems().then(null);
    }).catch((error) => { })
  }

  deleteItems(itemId: number) {
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
        this.itemsService.deleteItems(itemId).subscribe({
          next: (res: any) => {
            Swal.fire('<h4>Deleted!</h4>', res.message, 'success');
            this.getAllItems();
          },
          error: (error) => {
            Swal.fire('Error', error.error.message || "Something went wrong!");
          }
        }
        );
      }
    });
  }


  pageChange(event: any) {
    this.page = event;
    this.PageNumber = this.page - 1;
    this.getAllItems();
  }

  noOfRecordsSizeChange(): void {
    this.getAllItems();
  }

  public getValue(event: any){
    this.searchedValue = event.target.value;
    if (this.searchedValue.length >= 2){
      this.itemsService.searchItemData(this.PageNumber,this.size,this.searchedValue).subscribe({
        next: (itemsDatas: any) => {
          const paginationDetail = itemsDatas.data.results;
          this.page = paginationDetail.currentPage + 1;
          this.totalCount = (paginationDetail.totalPages) * this.size;
          this.itemData = itemsDatas.data.results;
          if (this.itemData?.length === 0) {
            this.displayLoader = false;
            this.dispalyNotFoundData = true;
          }
        },
      })
    }else if(this.searchedValue === ""){
      this.getAllItems();
    }
  }

}
