// Angular modules and components
import { NgModule } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
/* Shared Modules */
import { SharedModule } from './shared-module/shared.module';
/* Components */
import { AppComponent } from './app.component';
import { BallisticsModule } from './ballistics-module/ballistics.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
	bootstrap: [AppComponent],
	declarations: [
		AppComponent,
	],
	exports: [
		SharedModule
	],
	imports: [
		BallisticsModule,
        BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		SharedModule,
		RouterModule.forRoot([
				// Static Loading
				{ path: '', redirectTo: '/home', pathMatch: 'full' },
				{ path: 'home', component: BallisticsModule },
			],
			{preloadingStrategy: NoPreloading}
		),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
	],
	providers: [
	]
})
export class AppModule {}
