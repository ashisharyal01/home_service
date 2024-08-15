import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerInvoice } from 'src/app/models/CustomerInvoice';
import { OderedItem } from 'src/app/models/OrderedItems';
import { CustomerOrderInvoiceService } from 'src/app/services/customer-order-invoice-service/customer-order-invoice.service';

@Component({
  selector: 'app-view-customer-invoice-by-id',
  templateUrl: './view-customer-invoice-by-id.component.html',
  styleUrls: ['./view-customer-invoice-by-id.component.scss']
})
export class ViewCustomerInvoiceByIdComponent implements OnInit {
  public customerInvoiceDetails: CustomerInvoice;
  public customerOrderdItems: OderedItem[] = [];
  public id: number;

  constructor(private customerInvoiceService: CustomerOrderInvoiceService, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.customerInvoiceService.getCustomerInvoiceById(this.id).subscribe((data: any) => {
      this.customerInvoiceDetails = data;
      this.customerOrderdItems = data.OrderedItems;
    })
  }

}
