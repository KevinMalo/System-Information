import { Observable } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SystemInfoService } from '../../services/system-info.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.component.html',
  styleUrls: ['./graphics.component.css']
})
export class GraphicsComponent implements OnInit,  OnDestroy {


  public graphicsData: object = null;
  private intervalUpdate: any = null;

  constructor( private _SystemInfoService: SystemInfoService ) { }

  private showData(): void {
    this.getFromServices().subscribe(response => {

      this.graphicsData = response[5];


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
