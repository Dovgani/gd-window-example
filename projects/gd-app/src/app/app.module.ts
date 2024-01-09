import { NgModule                 } from '@angular/core';
import { FormsModule              } from '@angular/forms';
import { BrowserModule            } from '@angular/platform-browser';
import { CommonModule             } from '@angular/common';
import { HttpClientModule         } from '@angular/common/http';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { GDWindowModule           } from 'gd-window';
import { GDWindowRef              } from 'gd-window';

import { GDLoginModule            } from 'projects/gd-login/src/lib/gd-login.module';

import { AppComponent             } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,    
    GDLoginModule,
    GDWindowModule
  ],
  providers: [
      GDWindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
