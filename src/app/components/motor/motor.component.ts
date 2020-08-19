import { Component, OnInit } from '@angular/core';
import { IMotor } from 'src/app/models/motor.model';
import { AuftragService } from 'src/app/service/auftrag.service';

@Component({
    selector: 'motor-component',
    templateUrl: 'motor.component.html',
    styleUrls: ['motor.component.scss']
})

export class MotorComponent implements OnInit {
    constructor(private srvAuftrag: AuftragService) { }

    allMotor: IMotor[];
    loaded: boolean = false;

    ngOnInit() {
        this.srvAuftrag.AllMotor$.subscribe(res => this.allMotor = res, err => { this.loaded = true; }, () => { this.loaded = true; });
    }

    onMotorSelect(motor: IMotor) {
        this.srvAuftrag.updateMotor(motor);
    }
}