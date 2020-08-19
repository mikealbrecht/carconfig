import { Component, OnInit } from '@angular/core';
import { AuftragService } from 'src/app/service/auftrag.service';
import { IAusstattung } from 'src/app/models/ausstattung.model';
import { ClrLoadingState } from '@clr/angular';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'zusammenfassung-component',
    templateUrl: 'zusammenfassung.component.html',
    styleUrls: ['zusammenfassung.component.scss']
})

export class ZusammenfassungComponent implements OnInit {
    constructor(public srvAuftrag: AuftragService) { }

    ausstattungen: IAusstattung[] = [];
    submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    showLink: boolean = false;
    link: string;

    ngOnInit() {
        this.ausstattungen = this.srvAuftrag.SelectedAusstattung();
    }

    onSend() {
        this.submitBtnState = ClrLoadingState.LOADING;
        this.srvAuftrag.sendAuftrag().subscribe(res => {
            console.table(res);
            this.showLink = true;
            this.link = `${environment.CarConfigAppUrl}/auftrag/${res.guid}`;
        }, error => {
            this.submitBtnState = ClrLoadingState.DEFAULT;
        }, () => {
            this.submitBtnState = ClrLoadingState.SUCCESS;
        })
    }
}