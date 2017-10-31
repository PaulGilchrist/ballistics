// Angular modules and components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
/* Shared Modules */
import { SharedModule } from './shared-module/shared.module';
/* Components */
import { AppComponent } from './app.component';
import { BallisticsModule } from './ballistics-module/ballistics.module';

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
		BrowserModule,
		FormsModule,
		SharedModule,
		RouterModule.forRoot([
				// Static Loading
				{ path: '', redirectTo: '/home', pathMatch: 'full' },
				{ path: 'home', component: BallisticsModule },
			],
			{preloadingStrategy: NoPreloading}
		)
	],
	providers: [
	]
})
export class AppModule {}
