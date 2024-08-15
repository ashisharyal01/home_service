import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/User';
import { UserProfileComponent } from 'src/app/pages/user-profile/user-profile.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/token/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name?: string;

  constructor(private tokenStorageService: TokenStorageService,
    private authService: AuthService, private modalService: NgbModal,
    @Inject(DOCUMENT) private document: Document
  ) { }

  ngOnInit(): void {
    this.name = this.tokenStorageService.getUser()?.loggedInUserName;
  }

  logout() {
    this.authService.logout();
  }


  show() {
    const modalRef = this.modalService.open(UserProfileComponent);
    modalRef.componentInstance.fullName = this.tokenStorageService.getUser()?.loggedInUserName;
    // modalRef.componentInstance.email = user.email;
    // modalRef.componentInstance.address = user.address;
    // modalRef.componentInstance.gender = user.gender;
    // modalRef.componentInstance.mobileNumber = user.mobileNumber;
    // modalRef.componentInstance.dateOfBirth = user.dateOfBirth;
    // modalRef.componentInstance.mobileNumber = user.mobileNumber;
  }

  openSidebar() {
    this.document.getElementById('sidebar').classList.add('active')
  }
}
