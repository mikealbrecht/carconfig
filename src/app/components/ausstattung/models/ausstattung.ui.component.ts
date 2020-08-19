import { IAusstattung } from 'src/app/models/ausstattung.model';

export interface IAusstattungUI {
    ausstattung: IAusstattung,
    isSelected: boolean,
    canSelect: boolean
}

export class AusstattungUIFactory {
    public static GetNew(ausstattung: IAusstattung): IAusstattungUI {
        return { ausstattung: ausstattung, isSelected: false, canSelect: true };
    }
}