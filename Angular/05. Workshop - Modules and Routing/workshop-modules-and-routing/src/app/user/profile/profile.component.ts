import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { UserForAuth } from 'src/app/types/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  get user(): UserForAuth | undefined {
    return this.userService.user;
  }

  constructor(public userService: UserService) {}
}
