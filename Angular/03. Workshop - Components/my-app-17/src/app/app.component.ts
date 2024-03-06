import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my-app-17';
  tasks = [
    { id: 1, name: 'SoftUni', status: 'inProgress' },
    { id: 2, name: 'Udemy', status: 'todo' },
    { id: 3, name: 'Make Dinner', status: 'finished' },
  ];
}
