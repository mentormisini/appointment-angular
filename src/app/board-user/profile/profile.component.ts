import {Component, HostBinding, OnInit} from '@angular/core';
import {BoardUserComponent} from '../board-user.component';
import {TokenStorageService} from '../../_services/token-storage.service';
import {ProfiliService} from '../../_services/profili.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],

})
export class ProfileComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  username: string;
  roles: string[] = [];
  emri: string;
  mbiemri: string;
  ditelindja: Date;
  celulari: string;
  email: string;
  startDate = new Date(1990, 0, 1);

  constructor(private tokenStorage: TokenStorageService, private profiliService: ProfiliService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
      this.sendUsername();
    }
  }
  public sendUsername() {
    this.profiliService.getProfili(this.username).subscribe(
      respon => {
        this.email = respon.email;
        this.emri = respon.emri;
        this.mbiemri = respon.mbiemri;
        this.ditelindja = respon.dataLindjes;
        this.celulari = respon.celulari;
      });
  }
}
