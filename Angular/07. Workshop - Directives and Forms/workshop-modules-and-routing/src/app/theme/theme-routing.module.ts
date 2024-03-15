import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddThemeComponent } from './add-theme/add-theme.component';
import { CurrentThemeComponent } from './current-theme/current-theme.component';
import { MainComponent } from './main/main.component';
import { AuthActivate } from '../guards/auth.activate';

const routes: Routes = [
  {
    path: 'themes',
    children: [
      { path: '', pathMatch: 'full', component: MainComponent },
      {
        path: ':themeId',
        component: CurrentThemeComponent,
      },
    ],
  },
  {
    path: 'add-theme',
    component: AddThemeComponent,
    canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class ThemeRoutingModule {}
