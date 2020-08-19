import { Component } from '@angular/core';
import { AuftragService } from './service/auftrag.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'carconfig';

  constructor(public srvAuftrag: AuftragService) {

  }
}
