import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [
    GlobalLoaderComponent,
    ErrorPageComponent,
    NavigationComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [GlobalLoaderComponent, NavigationComponent, ErrorPageComponent],
})
export class CoreModule {}
