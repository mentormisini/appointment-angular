import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OraretService } from '../_services/OraretServices/oraret.service';
import { DatePipe, formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../_services/auth.service';
import {SherbimetService} from '../_services/OraretServices/sherbimet.service';
import {PunetoretService} from '../_services/OraretServices/punetoret.service';
import {DergoRezerviminService} from '../_services/OraretServices/dergo-rezervimin.service';
import {PreloaderService} from '../_services/preloader.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-oraret',
  templateUrl: './oraret.component.html',
  styleUrls: ['./oraret.component.css']
})
export class OraretComponent implements OnInit {
  toppings = new FormControl();
  dataZgjedhur: Date;
  oraret: string[] = [];
  sherbimi: string[] = [];
  punetori: string[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  selektori: any;
  sherbimiZgj: any;
  puntoriZgj: any;
  emri: string;
  kohapritjes = 6;
  isSuccessful = false;
  isFailed = false;
  errorMessage: string;
  typeSelected: string;
  realizimiTerminit = '';
  deshtimiTerminit = '';
  realizmiKorrekt = false;
  realizimiFatal = false;
  showOraret = true;
  username: string;
  showemri: string;
  showmbiemri: string;
  showemail: string;
  showcelulari: string;
  isLoggedIn: boolean;
  roles: string[] = [];
  //
  constructor(private oraretService: OraretService,
              private sherbimetService: SherbimetService,
              private punetoretService: PunetoretService,
              private dergoRezerviminService: DergoRezerviminService,
              private _formBuilder: FormBuilder,
              public datepipe: DatePipe,
              private _snackBar: MatSnackBar,
              private authService: AuthService,
              private prel: PreloaderService,
              private tokenStorage: TokenStorageService) {
     this.typeSelected = 'timer';
     }

     openSnackBar() {
      this._snackBar.open('Zgjedheni Daten pastaj oren', 'X', {
        duration: this.kohapritjes * 1000,
      });
    }
    ngOnInit(): void {
      // shfaq sherbimet
      this.sherbimetService.getSherbimet().subscribe(
        responddata => {
          this.sherbimi = responddata.sherbimet;
        });

      // shfaq punetoret
      this.punetoretService.getPunetoret().subscribe(
        respond => {
          this.punetori = respond.punetoret;
        });
      // forma 1
      this.firstFormGroup = this._formBuilder.group({
      sherbimiZgjedhur : ['', Validators.required],
      puntoriZgjedhur : ['', Validators.required]
      });
      // forma 2
      this.secondFormGroup = this._formBuilder.group({
      orarizgjedhur: ['', Validators.required],
      dataZgjedhur: ['', Validators.required]
      });
      // forma 3
      this.thirdFormGroup = this._formBuilder.group({
      emri: ['', Validators.required],
      mbiemri: ['', Validators.required],
      email: ['', Validators.required],
      numri: ['', Validators.required, ]
    });
  }
  // lejo vetem numrat tek Celulari
  numericOnly(event): boolean {
    const patt = /^([0-9])$/;
    const result = patt.test(event.key);
    return result;
  }
  // kliko daten pastaj bej load Oraret
  onClickDate() {
    this.oraret = [];
    console.log(this.datepipe.transform(this.dataZgjedhur, 'yyyy-MM-dd'));
    this.getOraret(this.dataZgjedhur);
    this.prel.showSpinner();
    this.showOraret = false;
  }
  // load oraret e klikuara ne kalendar
  getOraret(selectedDate: Date) {
    const latest_date = this.datepipe.transform(this.dataZgjedhur, 'yyyy-MM-dd');
    this.oraretService.getOraret(latest_date).subscribe(
      respon => this.shfaqeOraret(respon));
  }
  // shfaq oraret tek stepper 1
  shfaqeOraret(response) {
    response.forEach(element => {
      this.oraret.push(element[0]);
    });
    console.log(response);
  }
  // merr Details nese useri eshte i loguar tek stepper 2 shfaqi ato
  public sendProfilDetails() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
      this.oraretService.getProfili(this.username).subscribe(
        respon => {
          this.showemri = respon.emri;
          this.showmbiemri = respon.mbiemri;
          this.showemail = respon.email;
          this.showcelulari = respon.celulari;
        });
    }}
  // Dero dhe realizo terminin
  submit() {
    this.dergoRezerviminService.postTermin(this.firstFormGroup.value, this.thirdFormGroup.value, this.secondFormGroup.value).subscribe(
      data => {
        this.realizmiKorrekt = true;
        this.realizimiTerminit = data.mesazhi;
        this.realizimiFatal = false;
      },
      gabim => {
        this.realizimiFatal = true;
        this.deshtimiTerminit = gabim.error.mesazhi;
      });
  }
}
