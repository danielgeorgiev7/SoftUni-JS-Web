import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';
import { CommonModule, NgFor } from '@angular/common';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListItemComponent, NgFor, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  titles: string[] = [];
  finished: string[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.titles = this.todoService.titles;
    this.finished = this.todoService.finished;
  }

  onAdd(inputTitle: HTMLInputElement) {
    this.todoService.addTitle(inputTitle.value);
    inputTitle.value = '';
  }
}
