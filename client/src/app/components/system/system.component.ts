import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemInfoService } from '../../services/system-info.service';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit, OnDestroy {

  public systemData: object = null;
  private intervalUpdate: any = null;

  constructor( private _SystemInfoService: SystemInfoService ) { }

  private showData(): void {
    this.getFromServices().subscribe(response => {

      this.systemData = response[3];


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
