import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AllUserDetail } from '../all-user-detail';
import { UserService } from '../user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  allUserDetails: AllUserDetail;
  title = 'app';
  private userInput: String = '';
  private cacheValue: String;
  infoPage: number = 1;
  constructor(private userService: UserService, private spinner: NgxSpinnerService) {

  }
  getUsers(userName: String) {
    this.spinner.show();
    this.userService.callGitApiToGetUsers(userName).subscribe(data => { this.allUserDetails = data; console.log(this.allUserDetails); this.spinner.hide(); });
  }
  onKey(event: any) {
    // tslint:disable-next-line:max-line-length
    if (event.keyCode !== 32 && event.keyCode !== 37 && event.keyCode !== 38 && event.keyCode !== 39 && event.keyCode !== 40) {
      if (this.userInput.length > 2) {
        this.cacheValue = this.userInput;
        this.getUsers(this.userInput);
      }
    }
  }
  ngOnInit() {
    this.allUserDetails = new AllUserDetail();
  }
  sortByAtoZ() {
    if (this.allUserDetails != null && this.allUserDetails.items != null) {
      this.allUserDetails.items = this.allUserDetails.items.sort((a, b) => {
        if (a.login.toLowerCase() < b.login.toLowerCase()) return -1;
        else if (a.login.toLowerCase() > b.login.toLowerCase()) return 1;
        else return 0;
      });
    }
  }
  sortByZtoA() {
    if (this.allUserDetails != null && this.allUserDetails.items != null) {
      this.allUserDetails.items = this.allUserDetails.items.sort((a, b) => {
        if (a.login.toLowerCase() < b.login.toLowerCase()) return 1;
        else if (a.login.toLowerCase() > b.login.toLowerCase()) return -1;
        else return 0;
      });
    }
  }

  sortByRankDown() {
    if (this.allUserDetails != null && this.allUserDetails.items != null) {
      this.allUserDetails.items = this.allUserDetails.items.sort((a, b) => {
        if (a.score < b.score) return -1;
        else if (a.score > b.score) return 1;
        else return 0;
      });
    }
  }
  sortByRankUp() {
    if (this.allUserDetails != null && this.allUserDetails.items != null) {
      this.allUserDetails.items = this.allUserDetails.items.sort((a, b) => {
        if (a.score < b.score) return 1;
        else if (a.score > b.score) return -1;
        else return 0;
      });
    }
  }
}
