import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Theme } from 'src/app/types/Theme';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.css'],
})
export class ThemesListComponent implements OnInit {
  themes: Theme[] = [];
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getThemes().subscribe((themes) => {
      this.themes = themes;
      console.log(themes);
    });
  }
}
