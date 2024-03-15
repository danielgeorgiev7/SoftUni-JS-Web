import { Component } from '@angular/core';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLogged;
  }
  constructor(private userService: UserService) {}
}
