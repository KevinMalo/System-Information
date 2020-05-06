import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemInfoService } from '../../services/system-info.service';

@Component({
  selector: 'app-disks',
  templateUrl: './disks.component.html',
  styleUrls: ['./disks.component.css']
})
export class DisksComponent implements OnInit, OnDestroy {

  public disksData: object = null;
  private intervalUpdate: any = null;

  constructor( private _SystemInfoService: SystemInfoService ) { }

  private showData(): void {
    this.getFromServices().subscribe(response => {

      this.disksData = response[6];

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
