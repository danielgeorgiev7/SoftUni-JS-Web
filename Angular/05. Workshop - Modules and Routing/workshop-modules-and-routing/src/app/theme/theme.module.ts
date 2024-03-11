import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddThemeComponent } from './add-theme/add-theme.component';
import { CurrentThemeComponent } from './current-theme/current-theme.component';
import { ThemeRoutingModule } from './theme-routing.module';
import { MainComponent } from './main/main.component';
import { PostsListComponent } from './main/posts-list/posts-list.component';
import { ThemesListComponent } from './main/themes-list/themes-list.component';

@NgModule({
  declarations: [
    AddThemeComponent,
    CurrentThemeComponent,
    MainComponent,
    PostsListComponent,
    ThemesListComponent,
  ],
  imports: [CommonModule, ThemeRoutingModule],
})
export class ThemeModule {}
