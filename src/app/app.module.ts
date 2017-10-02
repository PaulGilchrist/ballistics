// Angular modules and components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
/* Shared Modules */
import { SharedModule } from './shared-module/shared.module';
/* Routing */
import { routing } from './app.routing';
/* Services */
import { AtmosphericService } from './services/atmospheric.service';
import { BallisticsService } from './services/ballistics.service';
import { ConversionService } from './services/conversion.service';
import { DataService } from './services/data.service';
import { DragService } from './services/drag.service';
/* Components */
import { AppComponent } from './components/app/app.component';
import { ChartComponent } from './components/chart/chart.component';
import { ConditionsComponent } from './components/conditions/conditions.component';
import { FirearmComponent } from './components/firearm/firearm.component';
import { FirearmsComponent } from './components/firearms/firearms.component';
import { HomeComponent } from './components/home/home.component';
import { RoundComponent } from './components/round/round.component';
import { RoundsComponent } from './components/rounds/rounds.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        ChartComponent,
        ConditionsComponent,
        FirearmComponent,
        FirearmsComponent,
        HomeComponent,
        RoundComponent,
        RoundsComponent
    ],
    exports: [
        SharedModule
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        SharedModule,
        routing
    ],
    providers: [
        // { provide: LocationStrategy, useClass: HashLocationStrategy },
        { provide: Window, useValue: window },
        AtmosphericService,
        BallisticsService,
        ConversionService,
        DataService,
        DragService
    ]
})
export class AppModule {}
