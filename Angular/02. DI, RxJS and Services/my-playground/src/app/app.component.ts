import { ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-playground';

  constructor(public userService: UserService) {}

  setUsers(inputName: HTMLInputElement, inputAge: HTMLInputElement) {
    // Validation of inputs ??? Transformation of the input
    this.userService.addUser(inputName, inputAge);
    // Additional functionality
  }
}
