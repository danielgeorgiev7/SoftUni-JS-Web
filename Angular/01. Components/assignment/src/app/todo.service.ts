import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TodoService {
  titles: string[] = ['Shopping', 'Rent Pay', 'Cleaning'];
  finished: string[] = [];

  addTitle(title: string) {
    this.titles.push(title);
  }

  onFinish(title: string) {
    if (this.finished.includes(title)) {
      this.finished.splice(this.finished.indexOf(title), 1);
    } else {
      this.finished.push(title);
    }
  }

  onRemove(title: string) {
    this.titles.splice(this.titles.indexOf(title), 1);
  }

  onEdit() {}
}
