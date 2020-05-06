import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SystemInfoService } from '../../services/system-info.service';

@Component({
  selector: 'app-battery',
  templateUrl: './battery.component.html',
  styleUrls: ['./battery.component.css']
})
export class BatteryComponent implements OnInit, OnDestroy {

  public batteryData: object = null;
  private intervalUpdate: any = null;

  barChartOptions: ChartOptions = {
    responsive: true,
  };

  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: 'Percent' }
  ];


  constructor( private _SystemInfoService: SystemInfoService ) { }

  currentDate(): string {

    const date: Date =  new Date();

    // Año
    const y: number = date.getUTCFullYear();
    // Mes
    const m: number = date.getUTCMonth() + 1;
    // Día
    const d: number = date.getUTCDate();
    // Hora
    const h: number = date.getUTCHours();
    // Minutos
    const ms: number = date.getUTCMinutes();
    // Minutos
    const s: number = date.getUTCSeconds();

    // Fecha en formato 17:24-28/4/2020
    const fullDate = `${h}:${ms}:${s}-${d}/${m}/${y}`;

    return fullDate;

  }

  private showData(): void {

    this.getFromServices().subscribe(response => {

      this.barChartLabels.push( this.currentDate() );

      this.barChartData[0].data.push(response[2].percent);
      this.batteryData = response[2];

    }, error => {
     console.error('ERROR: Unexpected response');
    });

  }

  private getFromServices(): Observable<any>{
    return this._SystemInfoService.getFromAPI();
  }

  ngOnInit(): void {
    this.intervalUpdate = setInterval(function(){
      this.showData();
     }.bind(this), 500);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalUpdate);
  }

}
