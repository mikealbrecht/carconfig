import { Component, OnInit } from '@angular/core';
import { AuftragService } from 'src/app/service/auftrag.service';

@Component({
    selector: 'timeline-component',
    templateUrl: 'timeline.component.html'
})

export class TimelineComponent implements OnInit {

    constructor(public srvAuftrag: AuftragService) { }

    ngOnInit() { }
}