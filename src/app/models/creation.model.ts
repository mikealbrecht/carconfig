import { IMotor } from './motor.model';
import { ILackierung } from './lackierung.model';
import { IFelgen } from './felgen.model';
import { IAusstattung } from './ausstattung.model';

export interface ICreation {
    Motor: IMotor;
    Lackierung: ILackierung;
    Felgen: IFelgen;
    Sonderausstattung: IAusstattung[];
}