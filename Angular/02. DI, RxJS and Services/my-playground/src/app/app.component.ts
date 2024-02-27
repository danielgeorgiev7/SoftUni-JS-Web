import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './types/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'my-playground';
  appUsers: User[] = [];

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().then((data) => {
      console.log(data);
    });
  }

  setUsers(inputName: HTMLInputElement, inputAge: HTMLInputElement) {
    // Validation of inputs ??? Transformation of the input
    this.userService.addUser(inputName, inputAge);
    // Additional functionality
  }
}
