import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemInfoService } from '../../services/system-info.service';


@Component({
  selector: 'app-cpu',
  templateUrl: './cpu.component.html',
  styleUrls: ['./cpu.component.css']
})
export class CpuComponent implements OnInit, OnDestroy {

  public cpuData: object = null;
  private intervalUpdate: any = null;

  constructor( private _SystemInfoService: SystemInfoService ) { }

  private showData(): void {
    this.getFromServices().subscribe(response => {

      this.cpuData = response[0];


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
