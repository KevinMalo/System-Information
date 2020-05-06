import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { SystemInfoService } from '../../services/system-info.service';


@Component({
  selector: 'app-ram',
  templateUrl: './ram-temperature.component.html',
  styleUrls: ['./ram-temperature.component.css']
})
export class CpuTemperatureComponent implements OnInit, OnDestroy {

  private intervalUpdate: any = null;

  public memData: object = null;

  lineChartData: ChartDataSets[] = [
    { data: [], label: 'RAM Disponible' },
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

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

      const date: string = this.currentDate();

      this.lineChartData[0].data.push( response[1].available);
      this.lineChartLabels.push( date );
      this.memData = response[1];

      console.log( response );

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
