import { Component, Input } from '@angular/core';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [],
  templateUrl: './list-item.component.html',
  styleUrl: '../app.component.css',
})
export class ListItemComponent {
  @Input('title') title: string;

  constructor(private todoService: TodoService) {
    this.title = '';
  }

  onFinish(title: string) {
    this.todoService.onFinish(title);
  }

  onRemove(title: string) {
    this.todoService.onRemove(title);
  }
}
