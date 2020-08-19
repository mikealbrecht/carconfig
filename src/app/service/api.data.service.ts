import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http'
import { IMotor } from '../models/motor.model';
import { Observable } from 'rxjs'
import { ILackierung } from '../models/lackierung.model';
import { IFelgen } from '../models/felgen.model';
import { IAusstattung } from '../models/ausstattung.model';
import { IExclusion } from '../models/exclusion.model';
import { ICreation } from '../models/creation.model';
import { IAuftrag } from '../models/auftrag.model';
import { IResponse } from '../models/response.model';
import { IAuftragResponse } from '../models/auftrag.response.model';

@Injectable({ providedIn: 'root' })
export class ApiDataService {
    constructor(private http: HttpClient) { }

    GetAllMotor(): Observable<IMotor[]> {
        return this.http.get<IMotor[]>(`${environment.CarConfigApiUrl}/motor`);
    }

    GetMotor(id: number): Observable<IMotor> {
        return this.http.get<IMotor>(`${environment.CarConfigApiUrl}/motor/${id}`);
    }

    GetAllLackierung(): Observable<ILackierung[]> {
        return this.http.get<ILackierung[]>(`${environment.CarConfigApiUrl}/lackierung`);
    }

    GetLackierung(id: number): Observable<ILackierung> {
        return this.http.get<ILackierung>(`${environment.CarConfigApiUrl}/lackierung/${id}`);
    }

    GetAllFelgen(): Observable<IFelgen[]> {
        return this.http.get<IFelgen[]>(`${environment.CarConfigApiUrl}/felgen`);
    }

    GetFelgen(id: number): Observable<IFelgen> {
        return this.http.get<IFelgen>(`${environment.CarConfigApiUrl}/felgen/${id}`);
    }

    GetAllAusstattungen(): Observable<IAusstattung[]> {
        return this.http.get<IAusstattung[]>(`${environment.CarConfigApiUrl}/sonderausstattung`);
    }

    GetAusstattung(id: number): Observable<IAusstattung> {
        return this.http.get<IAusstattung>(`${environment.CarConfigApiUrl}/sonderausstattung/${id}`);
    }

    GetAllExclusions(): Observable<IExclusion[]> {
        return this.http.get<IExclusion[]>(`${environment.CarConfigApiUrl}/exclusion`);
    }

    PostCreateAuftrag(auftrag: ICreation): Observable<IAuftrag> {
        return this.http.post<IAuftrag>(`${environment.CarConfigApiUrl}/auftrag/create`, auftrag);
    }

    PostGetSingleAuftrag(request: IResponse): Observable<IAuftragResponse> {
        return this.http.post<IAuftragResponse>(`${environment.CarConfigApiUrl}/auftrag/`, request);
    }
}