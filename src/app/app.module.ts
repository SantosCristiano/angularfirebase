import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReclamosComponent } from './reclamos/reclamos.component';

import { environment } from '../environments/environment';
import { AngularFirebaseModule } from '../angularfirebase2/database';
import { AngularFireModule} from 'angularfire2';

@NgModule({
  declarations: [
    AppComponent,
    ReclamosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFirebaseModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
