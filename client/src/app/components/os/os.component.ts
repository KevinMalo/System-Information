import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemInfoService } from '../../services/system-info.service';


@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent implements OnInit, OnDestroy {

  public osData: object = null;
  private intervalUpdate: any = null;

  constructor( private _SystemInfoService: SystemInfoService ) { }

  private showData(): void {
    this.getFromServices().subscribe(response => {

      this.osData = response[4];


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
