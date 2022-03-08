import {Component, HostBinding, OnInit} from '@angular/core';
import {BoardUserComponent} from '../board-user.component';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  username = '';
  roles: string[] = [];
  startDate = new Date(1990, 0, 1);

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
    }
  }
}
