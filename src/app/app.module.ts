import { CoreModule } from './shared/modules/core.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LayoutModule } from './shared/modules/layout.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { DragableDirective } from './shared/directives/dragable.directive';

@NgModule({
  declarations: [
    AppComponent,
    DragableDirective
  ],
  imports: [
    BrowserModule,
    LayoutModule,
    FormsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
