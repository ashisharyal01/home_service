import { TokenStorageService } from 'src/app/services/token/token-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public username: string;
  public mobileNumber: string;
  address: string;
  email: string;
  dateOfBirth: Date;
  gender: string;
  @Input() fullName: string;
  currentModal;

  constructor(private activeModal: NgbActiveModal,
    private tokenStorageService: TokenStorageService) {
    this.currentModal = activeModal;
  }
  ngOnInit(): void {
    this.getUser();
  }



  public getUser() {
    this.address = this.tokenStorageService.getUser()?.loggedInAddress;
    this.email = this.tokenStorageService.getUser()?.loggedInEmail;
    this.mobileNumber = this.tokenStorageService.getUser()?.loggedInMobileNumber;
    this.dateOfBirth = this.tokenStorageService.getUser()?.dateOfBirth;
    this.gender = this.tokenStorageService.getUser()?.gender;
  }


}
