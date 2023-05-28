import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class TokenResolver implements Resolve<boolean> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.authService.refresh().subscribe(
        () => {
          resolve(true); // Token válido, continuar con la carga de la ruta
        },
        () => {
          this.router.navigate(['/login']); // Token inválido, redirigir al login
          resolve(false);
        }
      );
    });
  }
}