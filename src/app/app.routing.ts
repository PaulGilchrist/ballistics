import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, NoPreloading } from '@angular/router';
// Components
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
    // Static Loading
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {preloadingStrategy: NoPreloading});
