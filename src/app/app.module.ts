import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, NoPreloading } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { BallisticsModule } from './ballistics-module/ballistics.module';
import { environment } from '../environments/environment';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent
    ],
    imports: [
        BallisticsModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot([
            // Static Loading
            { path: '', redirectTo: '/home', pathMatch: 'full' },
            { path: 'home', component: BallisticsModule },
        ],
            { preloadingStrategy: NoPreloading, relativeLinkResolution: 'legacy' }
        ),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    providers: []
})
export class AppModule { }
