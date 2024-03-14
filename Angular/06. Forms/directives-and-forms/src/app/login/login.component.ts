import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  // TEMPLATE DRIVEN APPROACH
  @ViewChild('loginForm') loginForm: NgForm | undefined; // if form is not passed in submit fn

  ngOnInit(): void {
    // renders static content
  }

  ngAfterViewInit(): void {
    // renders the final content + dynamic content
  }

  formSubmitHandler() {
    // form can be passed in fn, instead of view child
    if (!this.loginForm) return;
    const form = this.loginForm;
    if (form.invalid) return;
    // form.value => ngModel on input
    const { email, password } = form?.value;
    // 2 ways of resetting the data
    // form.reset();
    form.setValue({ email: '', password: '' });
  }

  log(any: any) {
    console.log(any);
  }
}
