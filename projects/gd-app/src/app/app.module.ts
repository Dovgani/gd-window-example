import { NgModule                 } from '@angular/core';
import { FormsModule              } from '@angular/forms';
import { BrowserModule            } from '@angular/platform-browser';
import { CommonModule             } from '@angular/common';
import { HttpClientModule         } from '@angular/common/http';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

import { GDCommonModule           } from 'gd-common';
import { GDWindowModule           } from 'gd-window';
import { GDWindowRef              } from 'gd-window';

import { GDLoginComponent         } from '../../../gd-login/src/lib/gd-login.component';
import { AppComponent             } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    GDLoginComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,    
    GDCommonModule,
    GDWindowModule
  ],
  providers: [
      GDWindowRef
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
