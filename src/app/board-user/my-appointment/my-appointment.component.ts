import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../_services/token-storage.service';

@Component({
  selector: 'app-my-appointment',
  templateUrl: './my-appointment.component.html',
  styleUrls: ['./my-appointment.component.css']
})
export class MyAppointmentComponent implements OnInit {
user: string;
  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.token.getUser().username;
  }

}
