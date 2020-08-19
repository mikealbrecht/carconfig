import { Component, OnInit } from '@angular/core';
import { AuftragService } from 'src/app/service/auftrag.service';
import { IAusstattung } from 'src/app/models/ausstattung.model';
import { IExclusion } from 'src/app/models/exclusion.model';
import { IAusstattungUI, AusstattungUIFactory } from './models/ausstattung.ui.component';

@Component({
    selector: 'ausstattung-component',
    templateUrl: 'ausstattung.component.html',
    styleUrls: ['ausstattung.component.scss']
})

export class AusstattungComponent implements OnInit {
    constructor(private srvAuftrag: AuftragService) { }

    allAusstattung: IAusstattungUI[] = [];
    allExclusion: IExclusion[];
    loaded: boolean = false;

    selectedAusstattung: IAusstattung[] = [];

    ngOnInit() {
        this.srvAuftrag.AllAusstattung$.subscribe(
            res => {
                res.map(x => { this.allAusstattung.push(AusstattungUIFactory.GetNew(x)) });
            },
            error => this.loaded = true,
            () => this.loaded = true
        );

        this.srvAuftrag.AllExclusion$.subscribe(
            res => { this.allExclusion = res; },
            error => this.loaded = true,
            () => this.loaded = true
        );
    }

    onSelected(a: IAusstattungUI) {
        a.isSelected = true;
        // disabledId kann immer nur ein Wert sein (eine Row aus der Tabelle)
        let disableId = this.allExclusion.filter(x => x.sonderausstattung == a.ausstattung.id).pop();
        if (disableId !== null && disableId !== undefined) {
            this.allAusstattung.forEach(x => {
                if (x.ausstattung.id == disableId.cannot) {
                    x.canSelect = false;
                }
            });
        }
    }

    onDeselect(a: IAusstattungUI) {
        a.isSelected = false;
        let enabledId = this.allExclusion.filter(x => x.sonderausstattung == a.ausstattung.id).pop();
        if (enabledId !== null && enabledId !== undefined) {
            this.allAusstattung.forEach(x => {
                if (x.ausstattung.id == enabledId.cannot) {
                    x.canSelect = true;
                }
            });
        }
    }

    onWeiter() {
        this.allAusstattung.forEach(x => {
            if (x.isSelected) {
                this.selectedAusstattung.push(x.ausstattung);
            }
        });
        this.srvAuftrag.updateAusstattung(this.selectedAusstattung);
    }
}