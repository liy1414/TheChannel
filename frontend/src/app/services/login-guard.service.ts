import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({providedIn: 'root'})
export class LoginGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  async canActivate() {
    let isLogged = !!(await this.authService.loadUserInfo());
    if (isLogged) {
      this.router.navigate(['/chat']);
      return false;
    }

    return true;
  }

}
