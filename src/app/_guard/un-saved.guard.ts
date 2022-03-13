import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
export interface PreventChanges {
  canLeave: () => boolean;
}
@Injectable({
  providedIn: 'root'
})
export class UnSavedGuard implements CanDeactivate<PreventChanges> {
  canDeactivate(component: PreventChanges) {
    if (component.canLeave) {
      return component.canLeave();
    }
    return true;
  }

}
