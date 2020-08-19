import { Injectable, OnInit } from '@angular/core';
import { IAuftrag } from '../models/auftrag.model';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { IMotor } from '../models/motor.model';
import { ApiDataService } from './api.data.service';
import { IFelgen } from '../models/felgen.model';
import { ILackierung } from '../models/lackierung.model';
import { IAusstattung } from '../models/ausstattung.model';
import { IExclusion } from '../models/exclusion.model';
import { Router } from '@angular/router';
import { PageState } from '../models/timeline.state';
import { ICreation } from '../models/creation.model';
import { IResponse } from '../models/response.model';
import { Page } from '@clr/angular/data/datagrid/providers/page';
import { IAuftragResponse } from '../models/auftrag.response.model';
import { IReviewModel } from '../models/review.model';
import { first } from 'rxjs/operators'

@Injectable({ providedIn: 'root' })
export class AuftragService implements OnInit {

    // Aus Api gelesen
    public readonly AllMotor$: Observable<IMotor[]>;
    public readonly AllFelgen$: Observable<IFelgen[]>;
    public readonly AllLackierungen$: Observable<ILackierung[]>;
    public readonly AllAusstattung$: Observable<IAusstattung[]>;
    public readonly AllExclusion$: Observable<IExclusion[]>;

    // Ausgewahlt
    private selectedMotor: IMotor;
    private selectedFelgen: IFelgen
    private selectedLack: ILackierung;
    private selectedAusstattung: IAusstattung[];

    public SelectedMotor(): IMotor { return this.selectedMotor };
    public SelectedFelgen(): IFelgen { return this.selectedFelgen };
    public SelectedLackierung(): ILackierung { return this.selectedLack };
    public SelectedAusstattung(): IAusstattung[] { return this.selectedAusstattung };

    // Status fuer die Timeline
    private stateMotor: BehaviorSubject<string> = new BehaviorSubject(PageState.Current);
    private stateLack: BehaviorSubject<string> = new BehaviorSubject(PageState.NotStarted);
    private stateFelgen: BehaviorSubject<string> = new BehaviorSubject(PageState.NotStarted);
    private stateAusstattung: BehaviorSubject<string> = new BehaviorSubject(PageState.NotStarted);
    private stateZusammen: BehaviorSubject<string> = new BehaviorSubject(PageState.NotStarted);
    private totalPrice: BehaviorSubject<number> = new BehaviorSubject(0);

    public StateMotor$: Observable<string> = this.stateMotor.asObservable();
    public StateLack$: Observable<string> = this.stateLack.asObservable();
    public StateFelgen$: Observable<string> = this.stateFelgen.asObservable();
    public StateAusstattung$: Observable<string> = this.stateAusstattung.asObservable();
    public StateZusammen$: Observable<string> = this.stateZusammen.asObservable();
    public TotalPrice$: Observable<number> = this.totalPrice.asObservable();

    constructor(private api: ApiDataService, private router: Router) {
        this.AllMotor$ = this.api.GetAllMotor();
        this.AllFelgen$ = this.api.GetAllFelgen();
        this.AllLackierungen$ = this.api.GetAllLackierung();
        this.AllAusstattung$ = this.api.GetAllAusstattungen();
        this.AllExclusion$ = this.api.GetAllExclusions();
    }

    ngOnInit(): void {

    }

    private updatePrice() {
        let motorPrice = this.selectedMotor?.price ?? 0;
        let lackierungPrice = this.selectedLack?.price ?? 0;
        let felgenPrice = this.selectedFelgen?.price ?? 0
        let ausstattungPrice: number = 0;
        this.selectedAusstattung?.forEach(x => ausstattungPrice += x?.price);
        let total = motorPrice + lackierungPrice + felgenPrice + (ausstattungPrice ?? 0);
        this.totalPrice.next(total);
    }

    navigateTo(route: string) {
        this.router.navigate([route]);
    }

    updateMotor(motor: IMotor) {
        this.selectedMotor = motor;
        this.stateMotor.next(PageState.Success);
        this.stateLack.next(PageState.Current);
        this.updatePrice();
        this.navigateTo("/lackierung");
    }

    updateLackierung(lackierung: ILackierung) {
        this.selectedLack = lackierung;
        this.stateLack.next(PageState.Success);
        this.stateFelgen.next(PageState.Current);
        this.updatePrice();
        this.navigateTo('/felgen');
    }

    updateFelgen(felgen: IFelgen) {
        this.selectedFelgen = felgen;
        this.stateFelgen.next(PageState.Success);
        this.stateAusstattung.next(PageState.Current);
        this.updatePrice();
        this.navigateTo('/ausstattung');
    }

    updateAusstattung(ausstattung: IAusstattung[]) {
        this.selectedAusstattung = ausstattung;
        this.stateAusstattung.next(PageState.Success);
        this.stateZusammen.next(PageState.Current);
        this.updatePrice();
        this.navigateTo('/zusammenfassung')
    }

    sendAuftrag(): Observable<IAuftrag> {
        this.stateZusammen.next(PageState.Success);
        const auftrag: ICreation = {
            Motor: this.selectedMotor,
            Felgen: this.selectedFelgen,
            Lackierung: this.selectedLack,
            Sonderausstattung: this.selectedAusstattung
        };
        return this.api.PostCreateAuftrag(auftrag);
    }

    private lockAllStates() {
        this.stateZusammen.next(PageState.Success);
        this.stateAusstattung.next(PageState.Success);
        this.stateFelgen.next(PageState.Success);
        this.stateLack.next(PageState.Success);
        this.stateMotor.next(PageState.Success);
    }

    private reviewAuftrag: BehaviorSubject<IReviewModel | undefined> = new BehaviorSubject(undefined);
    public ReviewAuftrag$: Observable<IReviewModel | undefined> = this.reviewAuftrag.asObservable();

    getAuftrag(guid: string) {
        const request: IResponse = {
            guid: guid
        };
        this.api.PostGetSingleAuftrag(request).subscribe(async res => {
            console.log(res);
            this.totalPrice.next(res.auftrag.totalPrice);
            this.lockAllStates();

            let ausstattung: IAusstattung[] = [];

            let motor = await this.api.GetMotor(res.auftrag.motor).toPromise();
            let lackierung = await this.api.GetLackierung(res.auftrag.lackierung).toPromise();
            let felgen = await this.api.GetFelgen(res.auftrag.felgen).toPromise();

            res.ausstattung.forEach(async element => {
                ausstattung.push(await this.api.GetAusstattung(element.sonderausstattung).toPromise());
            });

            const review: IReviewModel = {
                guid: res.auftrag.guid,
                date: res.auftrag.orderDate,
                totalPrice: res.auftrag.totalPrice,
                motor: motor,
                lackierung: lackierung,
                felgen: felgen,
                ausstattung: ausstattung
            };

            this.reviewAuftrag.next(review);
        });
    }
}