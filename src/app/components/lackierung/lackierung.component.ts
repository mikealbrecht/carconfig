import { Component, OnInit } from '@angular/core';
import { ILackierung } from 'src/app/models/lackierung.model';
import { AuftragService } from 'src/app/service/auftrag.service';

@Component({
    selector: 'lackierung-component',
    templateUrl: 'lackierung.component.html'
})

export class LackierungComponent implements OnInit {
    constructor(private srvAuftrag: AuftragService) { }

    allLackierung: ILackierung[];
    loaded: boolean = false;

    ngOnInit() {
        this.srvAuftrag.AllLackierungen$.subscribe(res => this.allLackierung = res, err => { this.loaded = true; }, () => { this.loaded = true; });
    }

    onLackierungSelect(lackierung: ILackierung) {
        this.srvAuftrag.updateLackierung(lackierung);
    }
}