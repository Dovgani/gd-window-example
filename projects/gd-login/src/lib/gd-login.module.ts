import { NgModule               } from '@angular/core';
import { FormsModule            } from '@angular/forms';
import { BrowserModule          } from '@angular/platform-browser';

import { GDLoginComponent } from './gd-login.component';

@NgModule({
  declarations: [GDLoginComponent],
  exports:      [GDLoginComponent],
  imports:      [
    BrowserModule,
    FormsModule
  ]
})
export class GDLoginModule {}
