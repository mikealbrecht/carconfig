import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MotorComponent } from './components/motor/motor.component';
import { LackierungComponent } from './components/lackierung/lackierung.component';
import { FelgenComponent } from './components/felgen/felgen.component';
import { AusstattungComponent } from './components/ausstattung/ausstattung.component';
import { ZusammenfassungComponent } from './components/zusammenfassung/zusammenfassung.component';
import { ReviewComponent } from './components/review/review.component';


const routes: Routes = [
  { path: 'motor', component: MotorComponent },
  { path: 'lackierung', component: LackierungComponent },
  { path: 'felgen', component: FelgenComponent },
  { path: 'ausstattung', component: AusstattungComponent },
  { path: 'zusammenfassung', component: ZusammenfassungComponent },
  { path: 'auftrag/:id', component: ReviewComponent },
  { path: '', pathMatch: 'full', redirectTo: '/motor' },
  { path: '**', redirectTo: '/motor' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
