import { IAuftrag } from './auftrag.model';
import { IAusstattung } from './ausstattung.model';
import { IExclusion } from './exclusion.model';

export interface IAuftragResponse {
    auftrag: IAuftrag,
    ausstattung: IExclusion[];
}