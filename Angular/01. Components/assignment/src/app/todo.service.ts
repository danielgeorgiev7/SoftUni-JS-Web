import { EventEmitter, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TodoService {
  titles: string[] = ['Shopping', 'Rent Pay', 'Cleaning'];
  finished: string[] = [];
  isEditable: EventEmitter<string> = new EventEmitter();

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

  onUpdate(editedTitle: string, editableTitle: string) {
    console.log(editedTitle);
    this.titles = this.titles.map((title) =>
      title === editableTitle ? editedTitle : title
    );
  }

  onRemove(title: string) {
    this.titles.splice(this.titles.indexOf(title), 1);
  }
}
