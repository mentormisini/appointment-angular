import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { ResetPasswordComponent} from './reset-password/reset-password.component';
import { ProfileComponent} from './profile/profile.component';

@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})

export class BoardUserComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  username='';
  roles: string[] = [];
  startDate = new Date(1990, 0, 1);
  callcomponent:any;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
      this.callProfile()
    }
  }

  callProfile(){
    this.callcomponent=ProfileComponent;
  }
  callPassword(){
    this.callcomponent=ResetPasswordComponent;
  }


}
