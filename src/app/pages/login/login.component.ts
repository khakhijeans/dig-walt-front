import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager} from 'ng2-toastr/ng2-toastr';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    username: string;
    password: string;

    constructor(
      private router: Router,
      private toastr: ToastsManager,
      private authService: AuthService
    ) { }

    ngOnInit() {
        
    }

    ngOnDestroy() {

    }

    onSubmit() {
      if (this.username == undefined || this.username == null || this.username == '' || this.password == undefined || this.username == '' || this.password == null) {
        this.toastr.error('Please fill in all required fields');
        return false;
      }
      if (!this.validateRegistrationEmail(this.username)) {
        this.toastr.error('Please enter a valid email address');
        return false;
      }
      this.authService.login(this.username, this.password).subscribe(user => {
        if (user == null || !user.success) {
          this.toastr.error('Login failed, please try again');
          return false;
        }
        this.authService.storeLoginData(user.token, user.user);
        this.router.navigate(['/home']);
      }, err => {
        console.log(err);
        return false;
      })
    }
      
    validateRegistrationEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
}
