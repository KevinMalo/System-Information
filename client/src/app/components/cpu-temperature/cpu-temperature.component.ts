import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-cpu-temperature',
  templateUrl: './cpu-temperature.component.html',
  styleUrls: ['./cpu-temperature.component.css']
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

  constructor( private http: HttpClient ) { }

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
    this.getFromAPI().subscribe(response => {

      const date: string = this.currentDate();

      this.lineChartData[0].data.push( response.available);
      this.lineChartLabels.push( date );
      this.memData = response;

    }, error => {
     console.error('ERROR: Unexpected response');
    });
  }


  private getFromAPI(): Observable<any>{
    return this.http.get(
      'http://localhost:4000',
      { responseType: 'json' }
    );
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
