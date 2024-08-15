import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/Customer';
import { Item } from 'src/app/models/Items';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ItemsService } from 'src/app/services/items/items.service';
import { TransactionStatus } from 'src/app/enum_type/TransactionStatus.type';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditCustomerComponent } from '../../customer/add-edit-customer/add-edit-customer.component';
import { AddEditItemsComponent } from '../../items/add-edit-items/add-edit-items.component';
import { CustomerOrderInvoiceService } from 'src/app/services/customer-order-invoice-service/customer-order-invoice.service';
import { CustomerTransactionService } from 'src/app/services/customer-transaction/customer-transaction.service';
import { first } from 'rxjs';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare var $: any;

@Component({
  selector: 'app-add-customer-invoice',
  templateUrl: './add-customer-invoice.component.html',
  styleUrls: ['./add-customer-invoice.component.scss']
})
export class AddCustomerInvoiceComponent implements OnInit {
  public customerDetails: Customer[];
  public itemDetails: Item[];
  submitted: boolean = false;
  loading: boolean = false;
  customerInvoiceForm: FormGroup;
  currentDate = new Date().toISOString().substring(0, 10);
  initailValue: number = 0;
  valueOfDiscountAmount: number = 0;
  calculatedSubTotalAmount: number = 0;
  calculatedTotalAmount: number = 0;
  public defaultTransactionCustomerAmount: number = 10;
  public showPaidAmountInput: boolean = false;
  public selectedAmountStatus: TransactionStatus;
  public bootstrapGridValue: number = 4;
  public customerInvoiceResponseData: any[];
  customerInfo: IDropdownSettings = {};
  itemId: IDropdownSettings = {}
  id: string;


  constructor(private customerService: CustomerService,
    private ItemService: ItemsService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private customerInvoiceService: CustomerOrderInvoiceService,
    private customerTransactionService: CustomerTransactionService
  ) { }

  ngOnInit(): void {
    this.getAllCustomers().then(null);
    this.getAllItem().then(null);
    // this.customerInfo = {
    //   idField: 'ids',
    //   textField: 'customerName',
    //   allowSearchFilter: true,
    //   singleSelection: true,
    //   closeDropDownOnSelection: true,
    //   noDataAvailablePlaceholderText: 'Not data available',
    // };
    // this.itemId = {
    //   idField: 'id',
    //   textField: 'name',
    //   allowSearchFilter: true,
    //   singleSelection: true,
    //   closeDropDownOnSelection: true,
    //   noDataAvailablePlaceholderText: 'Not data available',
    // };
    this.selectedAmountStatus = TransactionStatus.NoPayment;
    this.customerInvoiceForm = this.formBuilder.group({
      customerId: new FormControl('', Validators.required),
      orderLocation: new FormControl('', Validators.required),
      orderDate: new FormControl(formatDate(this.currentDate, 'yyyy-MM-dd', 'en'),
        Validators.required),
      workStatus: new FormControl('inProgress', Validators.required),
      discountAmount: new FormControl(
        this.valueOfDiscountAmount,
        Validators.min(0),
      ),
      totalOrderAmount: new FormControl('0.00'),
      grandTotal: new FormControl('0.00'),
      remarks: new FormControl(''),
      vatAmount: new FormControl("0.00"),
      paymentStatus: new FormControl('noPayment', Validators.required),
      paidAmount: new FormControl(this.defaultTransactionCustomerAmount, [Validators.required, Validators.min(10)],),
      paymentMethod: new FormControl('cash', Validators.required),
      transactionDate: new FormControl(formatDate(this.currentDate, 'yyyy-MM-dd', 'en'),
        Validators.required,),
      transactionRemarks: new FormControl(''),
      orderItemsArray: this.formBuilder.array([this.initItemRow()]),
    })
  }


  public async getAllCustomers(): Promise<void> {
    this.customerService.getAllCustomers().subscribe({
      next: (customerData: any) => {
        this.customerDetails = customerData.data.rows;
      }, error: (error) => {
        this.toastr.error(error.error.message || 'Something went wrong', 'Error', {
          progressBar: true,
        });
      },
    })
  }

  onItemSelect(event: any) {

  }

  public async getAllItem(): Promise<void> {
    this.ItemService.getAllItems().subscribe({
      next: (itemDatas: any) => {
        this.itemDetails = itemDatas.data.rows;
      }, error: (error) => {
        this.toastr.error(error.error.message || 'Something went wrong', 'Error', {
          progressBar: true,
        });
      },
    })
  }

  protected refreshItemData() {
    this.getAllItem().then(null);
  }

  addCustomer() {
    const modalRef = this.modalService.open(AddEditCustomerComponent);
    modalRef.componentInstance.isAddMode = true;
    modalRef.result.then(() => {
      this.getAllCustomers().then(null);
    }).catch((error) => { })
  }

  addItem() {
    const modalRef = this.modalService.open(AddEditItemsComponent);
    modalRef.componentInstance.isAddMode = true;
    modalRef.result.then(() => {
    }).catch((error) => { })
  }

  initItemRow() {
    return this.formBuilder.group({
      itemId: ['', Validators.required],
      quantity: ['', Validators.required],
      itemPrice: ['', Validators.required],
      itemRemarks: [''],
    });
  }

  addNewRow() {
    const control = <FormArray>this.customerInvoiceForm.controls['orderItemsArray'];
    control.push(this.initItemRow());
    this.initailValue++;
  }

  getOrderItemsArray() {
    return (this.customerInvoiceForm.get('orderItemsArray') as FormArray).controls;
  }

  deleteRow(index: number) {
    const control = <FormArray>this.customerInvoiceForm.controls['orderItemsArray'];
    if (control != null) {
      index = control.value.length;
    }

    if (index > 1) {
      control.removeAt(index - 1);
      $('#addr' + (index - 1)).html('');
      index--;
      this.getTotalCost();
      return true;
    } else {
      this.toastr.error(
        'One record is mendatory!',
        'Error',
        {
          progressBar: true,
        },
      );
      return false;
    }
  }

  getValues() {
    this.getTotalCost();
  }

  getValueOfDiscountAmount(event: any) {
    this.calculateSubTotal();
  }

  getTotalCost() {
    $('#table1 tbody tr').each(function () {
      var html = $(this).html();
      if (html != '') {
        const itemPriceAmount = $(this).find('.itemPrice').val();
        const quantityAmount = $(this).find('.quantity').val();
        $(this).find('.total_cost').val(itemPriceAmount * quantityAmount);
      }
    })
    this.calculateSubTotal();
  }



  private calculateSubTotal() {
    var totalProductAmount = 0;
    $('.total_cost').each(function () {
      totalProductAmount += parseFloat($(this).val());
    });

    $('#totalOrderAmount').val(totalProductAmount.toFixed(3));
    this.calculatedSubTotalAmount = totalProductAmount;
    this.valueOfDiscountAmount = parseFloat($('#discountAmount').val());
    this.calculatedTotalAmount =
      this.calculatedSubTotalAmount - this.valueOfDiscountAmount;

    $('#grandTotal').val(this.calculatedTotalAmount.toFixed(3));
  }

  getSelectedPaymentStatus(event: any) {
    this.selectedAmountStatus = event.target.value;
    if (this.selectedAmountStatus === TransactionStatus.PartialPayment) {
      this.bootstrapGridValue = 6;
      this.showPaidAmountInput = true;
    } else if (this.selectedAmountStatus === TransactionStatus.NoPayment) {
      this.bootstrapGridValue = 4;
      this.showPaidAmountInput = false;
    } else if (this.selectedAmountStatus === TransactionStatus.FullPayment) {
      this.bootstrapGridValue = 4;
      this.showPaidAmountInput = false;
    } else {
      return;
    }
  }


  onSubmit() {
    this.loading = true;
    if (this.customerInvoiceForm.invalid) {
      return;
    }
    this.customerInvoiceForm.value.grandTotal = this.calculatedTotalAmount;

    if (this.selectedAmountStatus === TransactionStatus.PartialPayment) {
      this.customerInvoiceForm.value.paidAmount;
    } else if (this.selectedAmountStatus === TransactionStatus.FullPayment) {
      this.customerInvoiceForm.value.paidAmount = this.calculatedTotalAmount;
    }

    let customerInvoiceData = {
      customerId: this.customerInvoiceForm.value.customerId,
      orderLocation: this.customerInvoiceForm.value.orderLocation,
      discountAmount: this.customerInvoiceForm.value.discountAmount,
      workStatus: this.customerInvoiceForm.value.workStatus,
      orderDate: this.customerInvoiceForm.value.orderDate,
      remarks: this.customerInvoiceForm.value.remarks,
      orderItemsArray: this.customerInvoiceForm.value.orderItemsArray,
      paidAmount: this.customerInvoiceForm.value.paidAmount,
      paymentMethod: this.customerInvoiceForm.value.paymentMethod,
      transactionRemarks: this.customerInvoiceForm.value.transactionRemarks,
      transactionDate: this.customerInvoiceForm.value.transactionDate,
      paymentStatus: this.customerInvoiceForm.value.paymentStatus,
      vatAmount: this.customerInvoiceForm.value.vatAmount

    }

    this.customerInvoiceService.createCustomerInvoice(customerInvoiceData).pipe(first()).subscribe({
      next: (responseData: any) => {
        this.toastr.success('Customer invoice created successfully!', 'Success', {
          progressBar: true,
        });
        this.customerInvoiceForm.reset();
        this.showPaidAmountInput = false;
        this.router.navigate(['/pages/customer-order-invoice']);
        this.loading = false;

      },
      error: (error) => {
        this.toastr.error(error.error.error.message || 'Something went wrong!', 'Error', {
          progressBar: true,
        });
        this.loading = false;

      },
    })
  }
}
