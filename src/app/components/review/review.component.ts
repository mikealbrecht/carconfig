import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuftragService } from 'src/app/service/auftrag.service';
import { IAuftragResponse } from 'src/app/models/auftrag.response.model';
import { IReviewModel } from 'src/app/models/review.model';

@Component({
    selector: 'review-component',
    templateUrl: 'review.component.html'
})

export class ReviewComponent implements OnInit {
    guid: string;
    auftrag: IReviewModel;
    constructor(private route: ActivatedRoute, public srvAuftrag: AuftragService) { }

    ngOnInit() {
        this.guid = this.route.snapshot.paramMap.get('id');
        this.srvAuftrag.ReviewAuftrag$.subscribe(res => {
            this.auftrag = res;
            console.log(res)
        });
        this.srvAuftrag.getAuftrag(this.guid);
    }
}