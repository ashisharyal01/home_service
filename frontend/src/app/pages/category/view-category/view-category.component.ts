import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  @Input() name: string;
  @Input() description: string;

  currentModal;

  constructor(private activeModal: NgbActiveModal) {
    this.currentModal = activeModal;
  }

  ngOnInit(): void {
  }

}
