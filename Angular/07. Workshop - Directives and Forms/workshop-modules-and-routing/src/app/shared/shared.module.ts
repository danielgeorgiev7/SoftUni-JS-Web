import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, RouterLink],
  exports: [WelcomeComponent],
})
export class SharedModule {}
