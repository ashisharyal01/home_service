import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  // public currDate = new Date();
  // public getHours: any;
  // public getMins: any;
  // public getSecs: any;
  // public getTime: any;

  ngOnInit(): void {
    //   this.getHours = this.currDate.getHours();
    //   this.getMins = this.currDate.getMinutes();
    //   this.getSecs = this.currDate.getSeconds();
    //   this.getTime = this.getHours >= 12 ? 'PM' : 'AM';
  }

}
