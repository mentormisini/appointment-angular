import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { TokenStorageService} from '../_services/token-storage.service';
import { ToastrService} from 'ngx-toastr';
import {getDecoratorStripTransformerFactory} from '@angular/compiler-cli/src/transformers/r3_strip_decorators';

@Injectable({
  providedIn: 'root'
})
export class GuardAuthGuard implements CanActivate {
  constructor(private TokenStorage: TokenStorageService,
              private route: Router,
              private toast: ToastrService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.TokenStorage.isLoggedIn()) {
      return true;
    }
    this.route.navigate(['/login']);
    this.toast.info('Pastaj realizo terminin', 'Logohu se pari ',
      {timeOut: 5000,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,
        positionClass: 'toast-bottom-center'});
    return false;
  }
}
