import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements AfterViewInit {
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.maxLength(4)],
  });

  ngAfterViewInit(): void {
    if (this.registerForm) {
      this.registerForm.valueChanges.subscribe((data) => console.log(data));
    }
  }

  constructor(private fb: FormBuilder) {}

  handleSubmit() {
    console.log(this.registerForm);
  }
}
