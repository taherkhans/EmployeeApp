import { AlertifyService } from './../_services/alertify.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private authService: AuthService, private alertifyService: AlertifyService, private route: Router,
     private fb: FormBuilder) { }

  ngOnInit() {
    this.bsConfig = {
      containerClass : 'theme-blue'
    }
    this.createRegisterForm();
}

createRegisterForm() {
this.registerForm = this.fb.group({
  gender: ['male'],
  knownAs: ['', Validators.required],
  dateOfBirth: [null, Validators.required],
  city: ['', Validators.required],
  country: ['', Validators.required],
  username: ['', Validators.required],
  password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]],
  confirmPassword: ['', Validators.required]
},
{validator: this.passwordVlidation});
}

passwordVlidation(g: FormGroup){
  return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch' : true};
}
register(){
  if(this.registerForm.valid){
    this.user = Object.assign({}, this.registerForm.value);
    this.authService.register(this.user).subscribe(() => {
      this.alertifyService.success('registration succesfull');
    }, error => {
      this.alertifyService.error(error);
    }, () => {
      this.authService.login(this.user).subscribe(() => {
        this.route.navigate(['/employees']);
      });
    });
  }

}
  cancel() {
    this.cancelRegister.emit(false);
    this.alertifyService.message('cancelled');
  }

}
