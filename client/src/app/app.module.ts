import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CpuTemperatureComponent } from './components/ram/ram-temperature.component';

import { ChartsModule } from 'ng2-charts';

import { SystemInfoService } from './services/system-info.service';
import { CpuComponent } from './components/cpu/cpu.component';
import { BatteryComponent } from './components/battery/battery.component';
import { SystemComponent } from './components/system/system.component';


@NgModule({
  declarations: [
    AppComponent,
    CpuTemperatureComponent,
    CpuComponent,
    BatteryComponent,
    SystemComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule
  ],
  providers: [ SystemInfoService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
