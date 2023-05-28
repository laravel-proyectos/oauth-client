import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup = this.fb.group({
    client_id: ['9946b697-eb71-4624-adaf-c33c80868630', [Validators.required]],
    client_secret: ['Uh4i50sHZPcqpx71LACK8GZ85W2M3rm9ctVDSznA', [Validators.required]],
    username: ['ramirezjry17@gmail.com', [Validators.required]],
    password: ['ramirez123', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.authService.login(this.form.value).subscribe(() => {
      console.log('logeado');
      this.router.navigateByUrl('/')
    })
  }
}
