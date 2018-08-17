// Angular modules and components
import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import * as $ from 'jquery';
import * as toastr from 'toastr';

/* Services */
import { AtmosphericService } from './services/atmospheric.service';
import { BallisticsService } from './services/ballistics.service';
import { ConversionService } from './services/conversion.service';
import { DataService } from './services/data.service';
import { DragService } from './services/drag.service';
/* Components */
import { ChartComponent } from './components/chart/chart.component';
import { D3GraphComponent } from './components/d3-graph/d3-graph.component';
import { FirearmComponent } from './components/firearm/firearm.component';
import { FirearmsComponent } from './components/firearms/firearms.component';
import { HomeComponent } from './components/home/home.component';
import { RoundComponent } from './components/round/round.component';
import { RoundsComponent } from './components/rounds/rounds.component';
import { TargetComponent } from './components/target/target.component';
import { WeatherComponent } from './components/weather/weather.component';
// Not currently importing any shared modules

@NgModule({
	declarations: [
		ChartComponent,
		D3GraphComponent,
		FirearmComponent,
		FirearmsComponent,
		HomeComponent,
		RoundComponent,
		RoundsComponent,
		TargetComponent,
		WeatherComponent
	],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([
			{ path: '', component: HomeComponent },
		])
	],
	providers: [
		AtmosphericService,
		BallisticsService,
		ConversionService,
		DataService,
		DragService
	]
})
export class BallisticsModule {}
