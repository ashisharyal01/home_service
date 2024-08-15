import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-customer-transaction',
  templateUrl: './view-customer-transaction.component.html',
  styleUrls: ['./view-customer-transaction.component.scss']
})
export class ViewCustomerTransactionComponent implements OnInit {

  @Input() customerName?: string;
  @Input() paidAmount: string;
  @Input() paymentMethod: string;
  @Input() orderTransactionNumber: string;
  @Input() transactionDate: Date;
  @Input() fiscalYear: string;
  @Input() transactionRemarks: string;
  @Input() registeredBy: string;
  @Input() customerTransactionId: number;

  currentModal;

  constructor(private activeModal: NgbActiveModal) {
    this.currentModal = activeModal;
  }
  ngOnInit(): void {

  }

}
