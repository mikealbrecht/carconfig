import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import '@angular/common/locales/global/de';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimelineComponent } from './components/timeline/timeline.component';
import { MotorComponent } from './components/motor/motor.component';
import { HttpClientModule } from '@angular/common/http';
import { LackierungComponent } from './components/lackierung/lackierung.component';
import { FelgenComponent } from './components/felgen/felgen.component';
import { AusstattungComponent } from './components/ausstattung/ausstattung.component';
import { ZusammenfassungComponent } from './components/zusammenfassung/zusammenfassung.component';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './components/review/review.component';

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    MotorComponent,
    LackierungComponent,
    FelgenComponent,
    AusstattungComponent,
    ZusammenfassungComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
