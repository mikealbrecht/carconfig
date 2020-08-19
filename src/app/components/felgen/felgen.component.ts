import { Component, OnInit } from '@angular/core';
import { AuftragService } from 'src/app/service/auftrag.service';
import { IFelgen } from 'src/app/models/felgen.model';

@Component({
    selector: 'felgen-component',
    templateUrl: 'felgen.component.html'
})

export class FelgenComponent implements OnInit {
    constructor(private srvAuftrag: AuftragService) { }

    allFelgen: IFelgen[];
    loaded: boolean = false;

    ngOnInit() {
        this.srvAuftrag.AllFelgen$.subscribe(res => this.allFelgen = res, error => { this.loaded = true }, () => this.loaded = true);
    }

    onFelgenSelect(felgen: IFelgen) {
        this.srvAuftrag.updateFelgen(felgen);
    }
}