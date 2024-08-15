import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  @Input() fullName:string;
  @Input() email:string;
  @Input() description:string;
  @Input() address:string;
  @Input() gender:string;
  @Input() mobileNumber:string;
  @Input() dateOfBirth:string;

  currentModal;

  constructor(private activeModal: NgbActiveModal) {
    this.currentModal = activeModal;
  }
  ngOnInit(): void {
  }

}
