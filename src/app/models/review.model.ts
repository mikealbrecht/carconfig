import { IMotor } from './motor.model';
import { ILackierung } from './lackierung.model';
import { IFelgen } from './felgen.model';
import { IAusstattung } from './ausstattung.model';

export interface IReviewModel {
    guid: string;
    date: Date;
    totalPrice: number;
    motor: IMotor;
    lackierung: ILackierung;
    felgen: IFelgen;
    ausstattung: IAusstattung[]
}