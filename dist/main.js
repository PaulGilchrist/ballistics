(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\r\n    margin: auto;\r\n\tpadding: 5px;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<main class='container'>\r\n    <router-outlet></router-outlet>\r\n</main>\r\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        // Extend jQuery to allow for simpler animations
        jquery__WEBPACK_IMPORTED_MODULE_1__["fn"].extend({
            animateCss: function (animationName) {
                // Remove animation if it is still an added class
                jquery__WEBPACK_IMPORTED_MODULE_1__(this).removeClass('animated ' + animationName);
                var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                jquery__WEBPACK_IMPORTED_MODULE_1__(this).addClass('animated ' + animationName).one(animationEnd, function () {
                    // Remove animation now that it is complete
                    jquery__WEBPACK_IMPORTED_MODULE_1__(this).removeClass('animated ' + animationName);
                });
            }
        });
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            moduleId: module.i.toString(),
            selector: 'my-app',
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")],
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html")
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_module_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shared-module/shared.module */ "./src/app/shared-module/shared.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _ballistics_module_ballistics_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ballistics-module/ballistics.module */ "./src/app/ballistics-module/ballistics.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular modules and components




/* Shared Modules */

/* Components */


var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"]],
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_5__["AppComponent"],
            ],
            exports: [
                _shared_module_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"]
            ],
            imports: [
                _ballistics_module_ballistics_module__WEBPACK_IMPORTED_MODULE_6__["BallisticsModule"],
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _shared_module_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forRoot([
                    // Static Loading
                    { path: '', redirectTo: '/home', pathMatch: 'full' },
                    { path: 'home', component: _ballistics_module_ballistics_module__WEBPACK_IMPORTED_MODULE_6__["BallisticsModule"] },
                ], { preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_3__["NoPreloading"] })
            ],
            providers: []
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/ballistics-module/ballistics.module.ts":
/*!********************************************************!*\
  !*** ./src/app/ballistics-module/ballistics.module.ts ***!
  \********************************************************/
/*! exports provided: BallisticsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BallisticsModule", function() { return BallisticsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! angular-confirmation-popover */ "./node_modules/angular-confirmation-popover/fesm5/angular-confirmation-popover.js");
/* harmony import */ var _services_atmospheric_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/atmospheric.service */ "./src/app/ballistics-module/services/atmospheric.service.ts");
/* harmony import */ var _services_ballistics_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/ballistics.service */ "./src/app/ballistics-module/services/ballistics.service.ts");
/* harmony import */ var _services_conversion_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/conversion.service */ "./src/app/ballistics-module/services/conversion.service.ts");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/data.service */ "./src/app/ballistics-module/services/data.service.ts");
/* harmony import */ var _services_drag_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/drag.service */ "./src/app/ballistics-module/services/drag.service.ts");
/* harmony import */ var _components_chart_chart_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/chart/chart.component */ "./src/app/ballistics-module/components/chart/chart.component.ts");
/* harmony import */ var _components_d3_graph_d3_graph_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/d3-graph/d3-graph.component */ "./src/app/ballistics-module/components/d3-graph/d3-graph.component.ts");
/* harmony import */ var _components_firearm_firearm_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/firearm/firearm.component */ "./src/app/ballistics-module/components/firearm/firearm.component.ts");
/* harmony import */ var _components_firearms_firearms_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/firearms/firearms.component */ "./src/app/ballistics-module/components/firearms/firearms.component.ts");
/* harmony import */ var _components_home_home_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/home/home.component */ "./src/app/ballistics-module/components/home/home.component.ts");
/* harmony import */ var _components_round_round_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/round/round.component */ "./src/app/ballistics-module/components/round/round.component.ts");
/* harmony import */ var _components_rounds_rounds_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/rounds/rounds.component */ "./src/app/ballistics-module/components/rounds/rounds.component.ts");
/* harmony import */ var _components_target_target_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/target/target.component */ "./src/app/ballistics-module/components/target/target.component.ts");
/* harmony import */ var _components_weather_weather_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/weather/weather.component */ "./src/app/ballistics-module/components/weather/weather.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// Angular modules and components





/* Services */





/* Components */









// Not currently importing any shared modules
var BallisticsModule = /** @class */ (function () {
    function BallisticsModule() {
    }
    BallisticsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [
                _components_chart_chart_component__WEBPACK_IMPORTED_MODULE_10__["ChartComponent"],
                _components_d3_graph_d3_graph_component__WEBPACK_IMPORTED_MODULE_11__["D3GraphComponent"],
                _components_firearm_firearm_component__WEBPACK_IMPORTED_MODULE_12__["FirearmComponent"],
                _components_firearms_firearms_component__WEBPACK_IMPORTED_MODULE_13__["FirearmsComponent"],
                _components_home_home_component__WEBPACK_IMPORTED_MODULE_14__["HomeComponent"],
                _components_round_round_component__WEBPACK_IMPORTED_MODULE_15__["RoundComponent"],
                _components_rounds_rounds_component__WEBPACK_IMPORTED_MODULE_16__["RoundsComponent"],
                _components_target_target_component__WEBPACK_IMPORTED_MODULE_17__["TargetComponent"],
                _components_weather_weather_component__WEBPACK_IMPORTED_MODULE_18__["WeatherComponent"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                angular_confirmation_popover__WEBPACK_IMPORTED_MODULE_4__["ConfirmationPopoverModule"].forRoot({
                    confirmButtonType: 'danger' // set defaults here
                }),
                _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild([
                    { path: '', component: _components_home_home_component__WEBPACK_IMPORTED_MODULE_14__["HomeComponent"] },
                ])
            ],
            providers: [
                _services_atmospheric_service__WEBPACK_IMPORTED_MODULE_5__["AtmosphericService"],
                _services_ballistics_service__WEBPACK_IMPORTED_MODULE_6__["BallisticsService"],
                _services_conversion_service__WEBPACK_IMPORTED_MODULE_7__["ConversionService"],
                _services_data_service__WEBPACK_IMPORTED_MODULE_8__["DataService"],
                _services_drag_service__WEBPACK_IMPORTED_MODULE_9__["DragService"]
            ]
        })
    ], BallisticsModule);
    return BallisticsModule;
}());



/***/ }),

/***/ "./src/app/ballistics-module/components/chart/chart.component.css":
/*!************************************************************************!*\
  !*** ./src/app/ballistics-module/components/chart/chart.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".card-body {\r\n\tpadding: 5px\r\n}\r\n.font-size-small {\r\n\tfont-size: 0.8em;\r\n}\r\n.tooltip {\r\n\tposition: fixed;\r\n}"

/***/ }),

/***/ "./src/app/ballistics-module/components/chart/chart.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/ballistics-module/components/chart/chart.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf='dataService.rangeData'>\r\n\t<div class=\"card\">\r\n\t\t<div class=\"card-heading bg-dark text-light p-2 d-flex\">\r\n\t\t\tRange Chart - Firearm ({{this.dataService.currentFirearm.name}}) - Round ({{this.dataService.currentRound.name}})\r\n\t\t\t<i class=\"fa fa-fw ml-auto\" [class.fa-chevron-right]=\"!isOpen\" [class.fa-chevron-down]=\"isOpen\" (click)=\"isOpen=!isOpen\"></i>\r\n\t\t</div>\r\n\t\t<div class=\"card-body\" [class.collapse]=\"!isOpen\">\r\n\t\t\t<div class=\"table-responsive\">\r\n\t\t\t\t<table class=\"table table-condensed table-striped table-hover font-size-small\">\r\n\t\t\t\t\t<thead>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<th data-toggle=\"tooltip\" title=\"Range in yards from the muzzle to the bullet\">\r\n\t\t\t\t\t\t\t\tRange<br>(yards)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th data-toggle=\"tooltip\" title=\"Velocity of the bullet in feet per second\">\r\n\t\t\t\t\t\t\t\tVelocity<br>(FPS)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th class=\"d-none d-sm-table-cell\" data-toggle=\"tooltip\" title=\"Energy of the bullet on impact\">\r\n\t\t\t\t\t\t\t\tEnergy<br>(FtLbs)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th class=\"d-none d-sm-table-cell\" data-toggle=\"tooltip\" title=\"Time the bullet has been in flight since leaving the muzzle\">\r\n\t\t\t\t\t\t\t\tTime<br>(sec)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th class=\"d-none d-sm-table-cell\" data-toggle=\"tooltip\" title=\"Amount of bullet drop in relation to the muzzle angle not the ground\">\r\n\t\t\t\t\t\t\t\tDrop<br>(inch)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th class='d-none d-md-table-cell' data-toggle=\"tooltip\" title=\"Bullet elevation above or below the target centerline\">\r\n\t\t\t\t\t\t\t\tElevation<br>(inch)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th *ngIf='showMil' data-toggle=\"tooltip\" title=\"Bullet elevation above or below the target centerline\">\r\n\t\t\t\t\t\t\t\tElevation<br>(Mil)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th *ngIf='showMoa' data-toggle=\"tooltip\" title=\"Bullet elevation above or below the target centerline\">\r\n\t\t\t\t\t\t\t\tElevation<br>(MoA)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th *ngIf='showIPHY' data-toggle=\"tooltip\" title=\"Bullet elevation above or below the target centerline\">\r\n\t\t\t\t\t\t\t\tElevation<br>(IPHY)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th class='d-none d-md-table-cell' data-toggle=\"tooltip\" title=\"Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.\">\r\n\t\t\t\t\t\t\t\tWind<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentWeather.windVelocityMPH}} MPH<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentWeather.windAngleDegrees}} deg<br>\r\n\t\t\t\t\t\t\t\t(inch)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th *ngIf='showMil' data-toggle=\"tooltip\" title=\"Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.\">\r\n\t\t\t\t\t\t\t\tWind<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentWeather.windVelocityMPH}} MPH<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentWeather.windAngleDegrees}} deg<br>\r\n\t\t\t\t\t\t\t\t(Mil)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th *ngIf='showMoa' data-toggle=\"tooltip\" title=\"Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.\">\r\n\t\t\t\t\t\t\t\tWind<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentWeather.windVelocityMPH}} MPH<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentWeather.windAngleDegrees}} deg<br>\r\n\t\t\t\t\t\t\t\t(MoA)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th *ngIf='showIPHY' data-toggle=\"tooltip\" title=\"Bullet drift left or right of the target centerline.  Drift is calculated at 90 degrees with velocity automatically adjusted from original wind direction.\">\r\n\t\t\t\t\t\t\t\tWind<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentWeather.windVelocityMPH}} MPH<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentWeather.windAngleDegrees}} deg<br>\r\n\t\t\t\t\t\t\t\t(IPHY)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th class='d-none d-md-table-cell' data-toggle=\"tooltip\" title=\"Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.\">\r\n\t\t\t\t\t\t\t\tLead<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentTarget.speedMPH}} MPH<br>\r\n\t\t\t\t\t\t\t\t(inch)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th *ngIf='showMil' data-toggle=\"tooltip\" title=\"Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.\">\r\n\t\t\t\t\t\t\t\tLead<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentTarget.speedMPH}} MPH<br>\r\n\t\t\t\t\t\t\t\t(Mil)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th *ngIf='showMoa' data-toggle=\"tooltip\" title=\"Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.\">\r\n\t\t\t\t\t\t\t\tLead<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentTarget.speedMPH}} MPH<br>\r\n\t\t\t\t\t\t\t\t(MoA)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th *ngIf='showIPHY' data-toggle=\"tooltip\" title=\"Amount of distance a moving target will cover during the time it takes for the bullet to travel from the muzzle to the target.\">\r\n\t\t\t\t\t\t\t\tLead<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentTarget.speedMPH}} MPH<br>\r\n\t\t\t\t\t\t\t\t(IPHY)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th class='d-none d-md-table-cell' data-toggle=\"tooltip\" title=\"Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.\">\r\n\t\t\t\t\t\t\t\tSlant<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentTarget.slantDegrees}} deg<br>\r\n\t\t\t\t\t\t\t\t(inch)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th  *ngIf='showMil' data-toggle=\"tooltip\" title=\"Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.\">\r\n\t\t\t\t\t\t\t\tSlant<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentTarget.slantDegrees}} deg<br>\r\n\t\t\t\t\t\t\t\t(Mil)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th *ngIf='showMoa' data-toggle=\"tooltip\" title=\"Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.\">\r\n\t\t\t\t\t\t\t\tSlant<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentTarget.slantDegrees}} deg<br>\r\n\t\t\t\t\t\t\t\t(MoA)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t\t<th *ngIf='showIPHY' data-toggle=\"tooltip\" title=\"Amount you will need to hold low on a target that is of either a higher or lower elevation than the shooting position.  Always aim low for both up and down slants.\">\r\n\t\t\t\t\t\t\t\tSlant<br>\r\n\t\t\t\t\t\t\t\t{{dataService.currentTarget.slantDegrees}} deg<br>\r\n\t\t\t\t\t\t\t\t(IPHY)\r\n\t\t\t\t\t\t\t</th>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</thead>\r\n\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t<tr *ngFor='let rangeRow of dataService.rangeData'>\r\n\t\t\t\t\t\t\t<td>{{rangeRow.rangeYards}}</td>\r\n\t\t\t\t\t\t\t<td>{{rangeRow.velocityFPS.toFixed(0)}}</td>\r\n\t\t\t\t\t\t\t<td class=\"d-none d-sm-table-cell\">{{rangeRow.energyFtLbs.toFixed(0)}}</td>\r\n\t\t\t\t\t\t\t<td class=\"d-none d-sm-table-cell\">{{rangeRow.timeSeconds.toFixed(3)}}</td>\r\n\t\t\t\t\t\t\t<td class=\"d-none d-sm-table-cell\">{{rangeRow.dropInches.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td class='d-none d-md-table-cell'>{{rangeRow.verticalPositionInches.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td *ngIf='showMil'>{{rangeRow.verticalPositionMil.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td *ngIf='showMoa'>{{rangeRow.verticalPositionMoA.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td *ngIf='showIPHY'>{{rangeRow.verticalPositionIPHY.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td class='d-none d-md-table-cell'>{{rangeRow.crossWindDriftInches.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td *ngIf='showMil'>{{rangeRow.crossWindDriftMil.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td *ngIf='showMoa'>{{rangeRow.crossWindDriftMoA.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td *ngIf='showIPHY'>{{rangeRow.crossWindDriftIPHY.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td class='d-none d-md-table-cell'>{{rangeRow.leadInches.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td *ngIf='showMil'>{{rangeRow.leadMil.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td *ngIf='showMoa'>{{rangeRow.leadMoA.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td *ngIf='showIPHY'>{{rangeRow.leadIPHY.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td class='d-none d-md-table-cell'>{{rangeRow.slantDropInches.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td *ngIf='showMil'>{{rangeRow.slantMil.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td *ngIf='showMoa'>{{rangeRow.slantMoA.toFixed(1)}}</td>\r\n\t\t\t\t\t\t\t<td *ngIf='showIPHY'>{{rangeRow.slantIPHY.toFixed(1)}}</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</tbody>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/ballistics-module/components/chart/chart.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/ballistics-module/components/chart/chart.component.ts ***!
  \***********************************************************************/
/*! exports provided: ChartComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartComponent", function() { return ChartComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/data.service */ "./src/app/ballistics-module/services/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ChartComponent = /** @class */ (function () {
    function ChartComponent(dataService) {
        this.dataService = dataService;
        this.isOpen = true;
        this.showMil = true;
        this.showMoA = true;
        this.showIPHY = true;
    }
    ChartComponent.prototype.ngOnInit = function () {
        // Assumes this component is not loaded until after we have a dataService with currentFirearm
        this.showMil = this.dataService.currentFirearm.turretUnits === 0 || this.dataService.currentFirearm.reticleUnits === 0;
        this.showMoA = this.dataService.currentFirearm.turretUnits === 1 || this.dataService.currentFirearm.reticleUnits === 1;
        this.showIPHY = this.dataService.currentFirearm.turretUnits === 3 || this.dataService.currentFirearm.reticleUnits === 3;
        this.dataService.getRangeData();
        // Initialize tooltips just for this component
        // $(document).ready(() => {
        // 	$('chart [data-toggle="tooltip"]').tooltip({
        // 		container: 'body',
        // 		trigger: 'hover click'
        // 	});
        // });
    };
    ChartComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-chart',
            styles: [__webpack_require__(/*! ./chart.component.css */ "./src/app/ballistics-module/components/chart/chart.component.css")],
            template: __webpack_require__(/*! ./chart.component.html */ "./src/app/ballistics-module/components/chart/chart.component.html")
        }),
        __metadata("design:paramtypes", [_services_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]])
    ], ChartComponent);
    return ChartComponent;
}());



/***/ }),

/***/ "./src/app/ballistics-module/components/d3-graph/d3-graph.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/ballistics-module/components/d3-graph/d3-graph.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".d3-default {\r\n    fill: #337ab7; /* Bootstrap success=#5cb85c, info=#5bc0de */\r\n}\r\n.d3-warning {\r\n    fill: #f0ad4e; /* Bootstrap warning=#f0ad4e, danger=#d9534f */\r\n}\r\n.d3-path {\r\n    stroke: #337ab7;\r\n    stroke-width: 2;\r\n}\r\n.d3-tooltip {\r\n    /* Only used by d3-graph directive */\r\n    background-color: #ffffff;\r\n    border-radius: 5px;\r\n    box-shadow: 4px 4px 10px rgba(0,0,0,0.5);\r\n    padding: 5px;\r\n}\r\n.d3-axis path, .d3-axis line {\r\n    fill: none;\r\n    stroke: #337ab7;\r\n}\r\n.d3-axis text {\r\n    font-family: sans-serif;\r\n    font-size: 10px;\r\n}"

/***/ }),

/***/ "./src/app/ballistics-module/components/d3-graph/d3-graph.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/ballistics-module/components/d3-graph/d3-graph.component.ts ***!
  \*****************************************************************************/
/*! exports provided: D3GraphComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "D3GraphComponent", function() { return D3GraphComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var d3__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3 */ "./node_modules/d3/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var D3GraphComponent = /** @class */ (function () {
    function D3GraphComponent(el) {
        this.el = el;
        /* ToDo Ideas (d3.v3.js)
    
            Allow width and height to be determined by containing element
    
            Leverage d3.geo.path().area()
            Maps.  See http://app.pluralsight.com/training/player?course=d3js-data-visualization-fundamentals
            Word Cloud
            Stacked Bars
            Multi-line
        */
        this.isReady = false;
        this.data = null;
        this.height = 300;
        this.labels = 'all';
        this.warningLevel = Infinity;
        this.width = 350;
        this.xToFixed = Infinity;
        this.yToFixed = Infinity;
        this.type = 'bar';
        this.xKey = 'x'; // The key within the data object that contains the x values
        this.yKey = 'y'; // The key within the data object that contains the y values
        this.xType = 'number'; // Valid options are number or date
    }
    D3GraphComponent.prototype.ngOnInit = function () {
        // Only start drawing the graphs after all inputs have been initially set and the OnInit has completed
        this.isReady = true;
        // Create a tooltip that will remain hidden until hover
        this._tooltip = d3__WEBPACK_IMPORTED_MODULE_1__["select"]('body')
            .append('div')
            .attr('class', 'd3-tooltip')
            .style('opacity', 0)
            .style('pointer-events', 'none')
            .style('position', 'absolute');
        // Set initial values from querystring if they existing
        this.draw();
    };
    D3GraphComponent.prototype.ngOnChanges = function () {
        if (this.isReady) {
            this.draw();
        }
    };
    D3GraphComponent.prototype.createBarGraph = function () {
        var _this = this;
        var padding = 2;
        // Find best fit for data to fill height
        var yMultiplier = _this.height / d3__WEBPACK_IMPORTED_MODULE_1__["max"](_this.data, function (d) { return d[_this.yKey]; });
        // Find best fit for data to fill width
        var xMultiplier = _this.width / _this.data.length;
        var svg = d3__WEBPACK_IMPORTED_MODULE_1__["select"](_this.el.nativeElement)
            .append('svg')
            .attr('width', _this.width)
            .attr('height', _this.height);
        // Bars
        svg.selectAll('rect').data(_this.data).enter().append('rect')
            .attr('x', function (d, i) { return i * xMultiplier; })
            .attr('y', function (d) { return _this.height - (d[_this.yKey] * yMultiplier); })
            .attr('width', xMultiplier - padding)
            .attr('height', function (d) { return d[_this.yKey] * yMultiplier; })
            .attr('class', function (d) { return _this.classPicker(d[_this.yKey], _this.warningLevel); })
            // Dynamic Lables
            .on('mouseover', function (d) {
            // Show tooltip at mouse pointer
            _this._tooltip.transition().duration(500).style('opacity', 0.9);
            var tip = "<strong>" + _this.xKey + ":</strong> " + _this.getValue(d[_this.xKey], _this.xToFixed) + "<br/><strong>" + _this.yKey + ":</strong> " + _this.getValue(d[_this.yKey], _this.yToFixed) + "<br/>";
            _this._tooltip.html(tip)
                .style('left', (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageX) + 'px')
                .style('top', (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageY - 28) + 'px');
            // Add y value to top of bar
            svg.append('text')
                .text(_this.getValue(d[_this.yKey], _this.yToFixed))
                .attr('x', parseFloat(d3__WEBPACK_IMPORTED_MODULE_1__["select"](this).attr('x')) + parseFloat(d3__WEBPACK_IMPORTED_MODULE_1__["select"](this).attr('width')) / 2)
                .attr('y', parseFloat(d3__WEBPACK_IMPORTED_MODULE_1__["select"](this).attr('y')) + 14) // Text 14px below the bar top, or roughly up 1em
                .attr('text-anchor', 'middle')
                .attr('id', 'hoverLabel_' + _this.getValue(d[_this.yKey], 0));
        })
            .on('mouseout', function (d) {
            // Hide tooltip
            _this._tooltip.transition().duration(500).style('opacity', 0);
            // Remove y value to top of bar
            d3__WEBPACK_IMPORTED_MODULE_1__["select"]('#hoverLabel_' + _this.getValue(d[_this.yKey], 0)).remove();
        });
        // Static Lables
        svg.selectAll('text').data(_this.data).enter().append('text')
            .text(function (d) {
            return _this.showLabels(_this.yKey, _this.getValue(d[_this.yKey], _this.yToFixed), _this.labels, true);
        })
            .attr('x', function (d, i) { return i * xMultiplier + (xMultiplier - padding) / 2; })
            .attr('y', function (d) { return _this.height - (d[_this.yKey] * yMultiplier) + 14; }) // Text 14px below the bar top, or roughly up 1em
            .attr('text-anchor', 'middle');
    };
    D3GraphComponent.prototype.createLineChart = function () {
        // Array must be sorted by x before passing to this function or the line will jump all over the place
        var _this = this;
        var padding = 36;
        var isDate = (this.xType === 'date');
        var xScale = this.scale(_this.xKey, [padding + 5, _this.width - 10], true);
        var yScale = this.scale(_this.yKey, [_this.height - padding, 10], false);
        var xAxisGen = d3__WEBPACK_IMPORTED_MODULE_1__["axisBottom"](xScale);
        if (isDate) {
            xAxisGen.tickFormat(d3__WEBPACK_IMPORTED_MODULE_1__["timeFormat"]('%b'));
        }
        var yAxisGen = d3__WEBPACK_IMPORTED_MODULE_1__["axisLeft"](yScale);
        var lineFunction = d3__WEBPACK_IMPORTED_MODULE_1__["line"]()
            // Make sure all date strings are date objects before putting them into the path
            .x(function (d) { return xScale(isDate ? new Date(d[_this.xKey]) : d[_this.xKey]); })
            .y(function (d) { return yScale(d[_this.yKey]); })
            .curve(d3__WEBPACK_IMPORTED_MODULE_1__["curveLinear"]);
        var svg = d3__WEBPACK_IMPORTED_MODULE_1__["select"](_this.el.nativeElement)
            .append('svg')
            .attr('width', _this.width)
            .attr('height', _this.height);
        // Line
        svg.append('path')
            .attr('class', 'd3-path')
            .attr('d', lineFunction(_this.data))
            .attr('fill', 'none');
        // Dots
        svg.selectAll('circle').data(_this.data).enter().append('circle')
            .attr('cx', function (d) { return xScale(isDate ? new Date(d[_this.xKey]) : d[_this.xKey]); })
            .attr('cy', function (d) { return yScale(d[_this.yKey]); })
            .attr('r', 3)
            .attr('class', function (d) { return _this.classPicker(d[_this.yKey], _this.warningLevel); })
            // Dynamic Lables
            .on('mouseover', function (d) {
            // Show tooltip at mouse pointer
            _this._tooltip.transition().duration(500).style('opacity', 0.9);
            var tip = "<strong>" + _this.xKey + ":</strong> " + _this.getValue(d[_this.xKey], _this.xToFixed) + "<br/><strong>" + _this.yKey + ":</strong> " + _this.getValue(d[_this.yKey], _this.yToFixed) + "<br/>";
            _this._tooltip.html(tip)
                .style('left', (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageX) + 'px')
                .style('top', (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageY - 28) + 'px');
        })
            .on('mouseout', function (d) {
            // Hide tooltip
            _this._tooltip.transition().duration(500).style('opacity', 0);
        });
        // Lables
        svg.selectAll('text').data(_this.data).enter().append('text')
            .text(function (d) { return _this.showLabels(_this.yKey, _this.getValue(d[_this.yKey], _this.yToFixed), _this.labels, true); })
            .attr('x', function (d) { return xScale(isDate ? new Date(d[_this.xKey]) : d[_this.xKey]); })
            .attr('y', function (d) { return yScale(d[_this.yKey]); })
            .attr('text-anchor', 'start')
            .attr('class', function (d) { return _this.classPicker(d[_this.yKey], _this.warningLevel); });
        svg.append('g').call(xAxisGen)
            .attr('class', 'd3-axis')
            .attr('transform', 'translate(0, ' + (_this.height - padding) + ')');
        svg.append('g').call(yAxisGen)
            .attr('class', 'd3-axis')
            .attr('transform', 'translate(' + padding + ', 0)');
    };
    D3GraphComponent.prototype.createPieChart = function () {
        var _this = this;
        var r = _this.width / 2;
        var vis = d3__WEBPACK_IMPORTED_MODULE_1__["select"](_this.el.nativeElement)
            .append('svg:svg') // Create the SVG element inside nativeElement
            .data([_this.data]) // Associate our data with the document
            .attr('width', r * 2) // Set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr('height', r * 2)
            .append('svg:g') // Make a group to hold our pie chart
            .attr('transform', 'translate(' + r + ',' + r + ')'); // Move the center of the pie chart from 0, 0 to radius, radius
        var pie = d3__WEBPACK_IMPORTED_MODULE_1__["pie"]() // Create arc data for us given a list of values
            .value(function (d) { return d[_this.yKey]; }); // Tell it how to access the value of each element in our data array
        var arcs = vis.selectAll('g.slice') // Selects all <g> elements with class slice (there aren't any yet)
            .data(pie) // Associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
            .enter() // This will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append('svg:g') // Create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
            .attr('class', 'slice'); // Allow us to style things in the slices (like text)
        var color = d3__WEBPACK_IMPORTED_MODULE_1__["scaleOrdinal"](d3__WEBPACK_IMPORTED_MODULE_1__["schemeCategory10"]); // builtin range of colors
        var arc = d3__WEBPACK_IMPORTED_MODULE_1__["arc"]().outerRadius(r).innerRadius(0); // Declare an arc generator function that will create <path> elements for us using arc data
        arcs.append('svg:path')
            .attr('fill', function (d, i) { return color(i); }) // Set the color for each slice to be chosen from the color function defined above
            .attr('d', function (d) { return arc(d); }) // this creates the actual SVG path using the associated data (pie) with the arc drawing function
            // Dynamic Lables
            .on('mouseover', function (d, i) {
            // Show tooltip at mouse pointer
            _this._tooltip.transition().duration(500).style('opacity', 0.9);
            var tip = "<strong>" + _this.xKey + ":</strong> " + _this.getValue(d[_this.xKey], _this.xToFixed) + "<br/><strong>" + _this.yKey + ":</strong> " + _this.getValue(d[_this.yKey], _this.yToFixed) + "<br/>";
            _this._tooltip.html(tip)
                .style('left', (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageX) + 'px')
                .style('top', (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageY - 28) + 'px');
        })
            .on('mouseout', function (d) {
            // Hide tooltip
            _this._tooltip.transition().duration(500).style('opacity', 0);
        });
        // Labels
        var isDate = (this.xType === 'date');
        var timeFormat = d3__WEBPACK_IMPORTED_MODULE_1__["timeFormat"]('%b');
        arcs.append('svg:text') // Add a label to each slice
            .attr('class', 'd3-axis')
            .attr('transform', function (d) {
            // Make sure to set these before calling arc.centroid
            d.innerRadius = 0;
            d.outerRadius = r;
            var labelR = r * 0.9;
            var c = arc.centroid(d), x = c[0], y = c[1], // Gives us a pair of coordinates like [50, 50]
            // Pythagorean theorem for hypotenuse
            h = Math.sqrt(x * x + y * y);
            return 'translate(' + (x / h * labelR) + ',' + (y / h * labelR) + ')';
        })
            .attr('text-anchor', 'middle') // Center the text on it's origin
            .text(function (d, i) {
            var max = d3__WEBPACK_IMPORTED_MODULE_1__["max"](_this.data, function (d2) { return d2[_this.yKey]; });
            var min = d3__WEBPACK_IMPORTED_MODULE_1__["min"](_this.data, function (d2) { return d2[_this.yKey]; });
            var xValue = _this.data[i][_this.xKey];
            var yValue = _this.data[i][_this.yKey];
            if ((_this.labels !== 'none') && ((_this.labels === 'minmax' && (yValue === max || yValue === min)) || (_this.labels === 'all'))) {
                return isDate ? timeFormat(new Date(xValue)) : xValue;
            }
        });
    };
    D3GraphComponent.prototype.createScatterPlot = function () {
        // Unlike LineChart, this array does not need to be sorted by x
        var _this = this;
        var padding = 26;
        var isDate = (this.xType === 'date');
        var xScale = this.scale(_this.xKey, [padding + 5, _this.width - 10], true);
        var yScale = this.scale(_this.yKey, [_this.height - padding, 10], false);
        var xAxisGen = d3__WEBPACK_IMPORTED_MODULE_1__["axisBottom"](xScale);
        if (isDate) {
            xAxisGen.tickFormat(d3__WEBPACK_IMPORTED_MODULE_1__["timeFormat"]('%b'));
        }
        var yAxisGen = d3__WEBPACK_IMPORTED_MODULE_1__["axisLeft"](yScale);
        var svg = d3__WEBPACK_IMPORTED_MODULE_1__["select"](_this.el.nativeElement)
            .append('svg')
            .attr('width', _this.width)
            .attr('height', _this.height);
        // Dots
        svg.selectAll('circle').data(_this.data).enter().append('circle')
            .attr('cx', function (d) { return xScale(isDate ? new Date(d[_this.xKey]) : d[_this.xKey]); })
            .attr('cy', function (d) { return yScale(d[_this.yKey]); })
            .attr('r', 5)
            .attr('class', function (d) { return _this.classPicker(d[_this.yKey], _this.warningLevel); })
            // Dynamic Lables
            .on('mouseover', function (d) {
            // Show tooltip at mouse pointer
            _this._tooltip.transition().duration(500).style('opacity', 0.9);
            var tip = "<strong>" + _this.xKey + ":</strong> " + _this.getValue(d[_this.xKey], _this.xToFixed) + "<br/><strong>" + _this.yKey + ":</strong> " + _this.getValue(d[_this.yKey], _this.yToFixed) + "<br/>";
            _this._tooltip.html(tip)
                .style('left', (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageX) + 'px')
                .style('top', (d3__WEBPACK_IMPORTED_MODULE_1__["event"].pageY - 28) + 'px');
        })
            .on('mouseout', function (d) {
            // Hide tooltip
            _this._tooltip.transition().duration(500).style('opacity', 0);
        });
        // Static Lables
        svg.selectAll('text').data(_this.data).enter().append('text')
            .text(function (d) { return _this.showLabels(_this.yKey, _this.getValue(d[_this.yKey], _this.yToFixed), _this.labels, true); })
            .attr('x', function (d) { return xScale(isDate ? new Date(d[_this.xKey]) : d[_this.xKey]); })
            .attr('y', function (d) { return yScale(d[_this.yKey]); })
            .attr('text-anchor', 'start')
            .attr('class', function (d) { return _this.classPicker(d[_this.yKey], _this.warningLevel); });
        svg.append('g').call(xAxisGen)
            .attr('class', 'd3-axis')
            .attr('transform', 'translate(0, ' + (_this.height - padding) + ')');
        svg.append('g').call(yAxisGen)
            .attr('class', 'd3-axis')
            .attr('transform', 'translate(' + padding + ', 0)');
    };
    D3GraphComponent.prototype.classPicker = function (value, warningLevel) {
        // Returns a warning class that can be styles through CSS to make data above the warningLevel stand out
        if (value >= warningLevel) {
            return 'd3-warning';
        }
        else {
            return 'd3-default';
        }
    };
    D3GraphComponent.prototype.draw = function () {
        // Remove any existing SVG content before re-drawing
        d3__WEBPACK_IMPORTED_MODULE_1__["select"](this.el.nativeElement).selectAll('*').remove();
        switch (this.type) {
            case 'bar':
                this.createBarGraph();
                break;
            case 'line':
                this.createLineChart();
                break;
            case 'pie':
                this.createPieChart();
                break;
            case 'scatter':
                this.createScatterPlot();
                break;
        }
    };
    D3GraphComponent.prototype.getValue = function (inputValue, toFixed) {
        if (toFixed === Infinity) {
            return inputValue;
        }
        else {
            return inputValue.toFixed(toFixed);
        }
    };
    D3GraphComponent.prototype.scale = function (key, range, useMin) {
        if (useMin === void 0) { useMin = false; }
        // Scale to use to best fit data into viewable space
        // Size refers to the x or y pixel size
        var _this = this;
        var min, max, scale;
        if (this.xType === 'date') {
            min = new Date(d3__WEBPACK_IMPORTED_MODULE_1__["min"](_this.data, function (d) { return d[key]; }));
            max = new Date(d3__WEBPACK_IMPORTED_MODULE_1__["max"](_this.data, function (d) { return d[key]; }));
            scale = d3__WEBPACK_IMPORTED_MODULE_1__["scaleTime"]();
        }
        else {
            if (useMin) {
                min = d3__WEBPACK_IMPORTED_MODULE_1__["min"](_this.data, function (d) { return d[key]; });
            }
            else {
                min = 0;
            }
            max = d3__WEBPACK_IMPORTED_MODULE_1__["max"](_this.data, function (d) { return d[key]; });
            scale = d3__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"]();
        }
        return scale.domain([min, max]).range(range);
    };
    D3GraphComponent.prototype.showLabels = function (key, value, type, useMin) {
        if (useMin === void 0) { useMin = true; }
        // Allows for either showing no labels, just the min and max labels, or all labels
        var _this = this;
        var max = d3__WEBPACK_IMPORTED_MODULE_1__["max"](_this.data, function (d) { return d[key]; });
        var min = 0;
        if (useMin) {
            min = d3__WEBPACK_IMPORTED_MODULE_1__["min"](_this.data, function (d) { return d[key]; });
        }
        if ((type !== 'none') && ((type === 'minmax' && (value === max || value === min)) || (type === 'all'))) {
            return value;
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array)
    ], D3GraphComponent.prototype, "data", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], D3GraphComponent.prototype, "height", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], D3GraphComponent.prototype, "labels", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], D3GraphComponent.prototype, "warningLevel", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], D3GraphComponent.prototype, "width", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], D3GraphComponent.prototype, "xToFixed", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], D3GraphComponent.prototype, "yToFixed", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], D3GraphComponent.prototype, "type", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], D3GraphComponent.prototype, "xKey", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], D3GraphComponent.prototype, "yKey", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], D3GraphComponent.prototype, "xType", void 0);
    D3GraphComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            selector: './d3-graph',
            styles: [__webpack_require__(/*! ./d3-graph.component.css */ "./src/app/ballistics-module/components/d3-graph/d3-graph.component.css")],
            template: ''
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], D3GraphComponent);
    return D3GraphComponent;
}());



/***/ }),

/***/ "./src/app/ballistics-module/components/firearm/firearm.component.css":
/*!****************************************************************************!*\
  !*** ./src/app/ballistics-module/components/firearm/firearm.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input.ng-valid { border-left: 5px solid #42A948; /* green */}\r\ninput.ng-invalid { border-left: 5px solid #a94442; /* red */}\r\n/*\r\nBelow settings compact vertical forms\r\n*/\r\nlabel.control-label {\r\n    margin-bottom: 0;\r\n}\r\n.form-group {\r\n    margin-bottom: 5px;\r\n    text-align: left;\r\n}\r\n.card-footer  {\r\n    padding: 10px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/ballistics-module/components/firearm/firearm.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/ballistics-module/components/firearm/firearm.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf='editedFirearm' class=\"card\">\r\n    <div class=\"card-heading bg-dark text-light d-flex p-2\">\r\n\t\t<span *ngIf=\"_mode==='add'\">Add Firearm</span>\r\n\t\t<span *ngIf=\"_mode==='edit'\">Firearm - {{ editedFirearm.name }}</span>\r\n\t\t<i class=\"fa fa-fw ml-auto\" [class.fa-chevron-right]=\"!isOpen\" [class.fa-chevron-down]=\"isOpen\" (click)=\"isOpen=!isOpen\"></i>\r\n\t</div>\r\n\t<div class=\"card-body\" [class.collapse]=\"!isOpen\">\r\n\t\t<form #form=\"ngForm\" novalidate (change)='change(form.valid);'>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"nameControl.invalid && nameControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\">Name</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-file-o fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"text\" name=\"name\" [(ngModel)]=\"editedFirearm.name\" #nameControl=\"ngModel\" [disabled]=\"_mode==='view'\" class=\"form-control\" placeholder=\"Name\" required minlength=\"3\"  maxlength=\"50\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"_mode==='view' || nameControl.valid || nameControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tName is required and must be between 3 and 50 characters\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"sightHeightInchesControl.invalid && sightHeightInchesControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Measured form bore centerline to scope centerline\">Sight Height (inches)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-crosshairs fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"sightHeightInches\" [(ngModel)]=\"editedFirearm.sightHeightInches\" #sightHeightInchesControl=\"ngModel\" class=\"form-control\" placeholder=\"Sight Height (inches)\" required min=\"0\" max=\"20\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"_mode==='view' || sightHeightInchesControl.valid || sightHeightInchesControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tSight height is required.  Common heights are 1.5 to 2 inches\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"zeroRangeYardsControl.invalid && zeroRangeYardsControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Range at which scope has been adjusted for point of aim = point of impact\">Zero Range (yards)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-circle-o fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"zeroRangeYards\" [(ngModel)]=\"editedFirearm.zeroRangeYards\" #zeroRangeYardsControl=\"ngModel\" class=\"form-control\" placeholder=\"Zero Range (yards)\" required min=\"25\" max=\"3000\" >\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"_mode==='view' || zeroRangeYardsControl.valid || zeroRangeYardsControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tZero range is required, so bullet drop can be calculated properly\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"reticleUnitsControl.invalid && reticleUnitsControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Scope crosshair hash mark separation.  Usually Minutes of Angle (MoA), Milliradian (Mil), or Inch Per Hundred Yards (IPHY)\">Reticle Units</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-spinner fa-fw\"></i></div></div>\r\n\t\t\t\t\t<select name=\"reticleUnits\" [(ngModel)]=\"editedFirearm.reticleUnits\" #reticleUnitsControl=\"ngModel\" class=\"form-control\" required>\r\n\t\t\t\t\t\t<option value='0'>Mil</option>\r\n\t\t\t\t\t\t<option value='1'>MoA</option>\r\n\t\t\t\t\t\t<option value='2'>IPHY</option>\r\n\t\t\t\t\t</select>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"_mode==='view' || reticleUnitsControl.valid || reticleUnitsControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\t\tReticle units are required rangeing and hold overs\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"turretUnitsControl.invalid && turretUnitsControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Scope turret hash mark separation.  Usually Minutes of Angle (MoA), Milliradian (Mil), or Inch Per Hundred Yards (IPHY)\">Turret Units</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-circle-thin fa-fw\"></i></div></div>\r\n\t\t\t\t\t<select name=\"turretUnits\" [(ngModel)]=\"editedFirearm.turretUnits\" #turretUnitsControl=\"ngModel\" class=\"form-control\" required>\r\n\t\t\t\t\t\t<option value='0'>Mil</option>\r\n\t\t\t\t\t\t<option value='1'>MoA</option>\r\n\t\t\t\t\t\t<option value='2'>IPHY</option>\r\n\t\t\t\t\t</select>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"_mode==='view' || turretUnitsControl.valid || turretUnitsControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\t\tTurret units are required for rangeing and hold overs\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"elevationTurretGradientsControl.invalid && elevationTurretGradientsControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Number of elevation (up/down) turret clicks per turret unit.  Usually refered to as a fraction (ex: 1/4 MoA = 4 clicks per MoA)\">Elevation Turret Gradients</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-align-center fa-fw\"></i></div></div>\r\n\t\t\t\t\t<select name=\"elevationTurretGradients\" [(ngModel)]=\"editedFirearm.elevationTurretGradients\" #elevationTurretGradientsControl=\"ngModel\" class=\"form-control\" required>\r\n\t\t\t\t\t\t<option *ngIf='editedFirearm.turretUnits!=0' value='1'>1</option>\r\n\t\t\t\t\t\t<option *ngIf='editedFirearm.turretUnits!=0' value='2'>2</option>\r\n\t\t\t\t\t\t<option *ngIf='editedFirearm.turretUnits!=0' value='4'>4</option>\r\n\t\t\t\t\t\t<option *ngIf='editedFirearm.turretUnits==0' value='10'>10</option>\r\n\t\t\t\t\t</select>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"_mode==='view' || elevationTurretGradientsControl.valid || elevationTurretGradientsControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\t\tElevation turret gradients allows values 1,2,4 or 10 (# clicks per turret unti 1,2,4 for MoA and IPHY, and 10 for Mil)\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"windageTurretGradientsControl.invalid && windageTurretGradientsControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Number of windage (up/down) turret clicks per turret unit.  Usually refered to as a fraction (ex: 1/4 MoA = 4 clicks per MoA)\">Windage Turret Gradients</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-repeat fa-fw\"></i></div></div>\r\n\t\t\t\t\t<select name=\"windageTurretGradients\" [(ngModel)]=\"editedFirearm.windageTurretGradients\" #windageTurretGradientsControl=\"ngModel\" class=\"form-control\" required>\r\n\t\t\t\t\t\t<option *ngIf='editedFirearm.turretUnits!=0' value='1'>1</option>\r\n\t\t\t\t\t\t<option *ngIf='editedFirearm.turretUnits!=0' value='2'>2</option>\r\n\t\t\t\t\t\t<option *ngIf='editedFirearm.turretUnits!=0' value='4'>4</option>\r\n\t\t\t\t\t\t<option *ngIf='editedFirearm.turretUnits==0' value='10'>10</option>\r\n\t\t\t\t\t</select>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"_mode==='view' || windageTurretGradientsControl.valid || windageTurretGradientsControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\t\tWindage turret gradients allows values 1,2,4 or 10 (# clicks per turret unti 1,2,4 for MoA and IPHY, and 10 for Mil)\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t</div>\r\n\t<div class=\"card-footer\" [class.collapse]=\"!isOpen\">\r\n\t\t<div *ngIf=\"_mode==='add'\">\r\n\t\t\t<button type=\"submit\" class=\"btn btn-success\" [disabled]=\"form.pristine || form.invalid\" (click)='save()'><i class=\"fa fa-check\"></i> Save</button>&nbsp;\r\n\t\t\t<button class='btn btn-danger' (click)='close();'> Cancel</button>\r\n\t\t</div>\r\n\t\t<div *ngIf=\"_mode=='edit'\">\r\n\t\t\t<button type=\"submit\" class=\"btn btn-success\" [disabled]=\"form.pristine || form.invalid\" (click)='save()'><i class=\"fa fa-check\"></i> Save</button>&nbsp;\r\n\t\t\t<button *ngIf='isPristine' class='btn btn-warning' (click)='close();'> Close</button>&nbsp;\r\n\t\t\t<button *ngIf='isPristine' class='btn btn-danger' mwlConfirmationPopover [popoverTitle]=\"'Confirm Delete'\" [popoverMessage]=\"'Delete this firearm?'\" placement=\"top\" (confirm)=\"delete()\"> Delete</button>\r\n\t\t\t<button *ngIf='!isPristine' class='btn btn-warning' (click)='cancel();'> Cancel</button>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/ballistics-module/components/firearm/firearm.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/ballistics-module/components/firearm/firearm.component.ts ***!
  \***************************************************************************/
/*! exports provided: FirearmComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FirearmComponent", function() { return FirearmComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FirearmComponent = /** @class */ (function () {
    function FirearmComponent() {
        this.editedFirearm = null;
        this.isOpen = true;
        this.isPristine = true;
        this._firearm = null;
        this._mode = 'add';
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onClose = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onDelete = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(FirearmComponent.prototype, "firearm", {
        set: function (firearm) {
            if (firearm) {
                this.editedFirearm = {
                    id: firearm.id,
                    name: firearm.name,
                    elevationTurretGradients: firearm.elevationTurretGradients,
                    reticleUnits: firearm.reticleUnits,
                    rounds: firearm.rounds,
                    sightHeightInches: firearm.sightHeightInches,
                    turretUnits: firearm.turretUnits,
                    windageTurretGradients: firearm.windageTurretGradients,
                    zeroRangeYards: firearm.zeroRangeYards,
                };
            }
            else {
                // Setup defaults
                this.editedFirearm = {
                    id: null,
                    name: null,
                    elevationTurretGradients: null,
                    reticleUnits: null,
                    rounds: [],
                    sightHeightInches: null,
                    turretUnits: null,
                    windageTurretGradients: null,
                    zeroRangeYards: null,
                };
            }
            // Save the initial settings so we can reset if requested
            this._firearm = firearm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FirearmComponent.prototype, "mode", {
        set: function (mode) {
            // Acceptable modes are 'add' or 'edit'
            this._mode = mode;
        },
        enumerable: true,
        configurable: true
    });
    FirearmComponent.prototype.ngOnInit = function () {
        // Initialize tooltips just for this component
        // $(document).ready(() => {
        // 	$('firearm [data-toggle="tooltip"]').tooltip({ container: 'body' });
        // });
    };
    FirearmComponent.prototype.cancel = function (form) {
        // Reset the form back to the original object
        this.firearm = this._firearm;
        this.isPristine = true;
    };
    FirearmComponent.prototype.change = function (isValid) {
        if (isValid) {
            this.onChange.emit(this.editedFirearm);
        }
        this.isPristine = false;
    };
    FirearmComponent.prototype.close = function (isDirty) {
        if (isDirty === void 0) { isDirty = false; }
        this.onClose.emit();
    };
    FirearmComponent.prototype.delete = function () {
        this.onDelete.emit(this._firearm);
    };
    FirearmComponent.prototype.save = function () {
        // Save changes to this firearm
        this.onSave.emit(this.editedFirearm);
        this.isPristine = true;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], FirearmComponent.prototype, "firearm", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], FirearmComponent.prototype, "mode", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FirearmComponent.prototype, "onChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FirearmComponent.prototype, "onClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FirearmComponent.prototype, "onDelete", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FirearmComponent.prototype, "onSave", void 0);
    FirearmComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-firearm',
            styles: [__webpack_require__(/*! ./firearm.component.css */ "./src/app/ballistics-module/components/firearm/firearm.component.css")],
            template: __webpack_require__(/*! ./firearm.component.html */ "./src/app/ballistics-module/components/firearm/firearm.component.html")
        })
    ], FirearmComponent);
    return FirearmComponent;
}());



/***/ }),

/***/ "./src/app/ballistics-module/components/firearms/firearms.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/ballistics-module/components/firearms/firearms.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".active {\r\n    background-color: #555555;\r\n    color: #ffffff;\r\n}\r\nli.card {\r\n    cursor: pointer;\r\n    width: 100%;\r\n}\r\n.card-footer  {\r\n    padding: 10px;\r\n}\r\n.well {\r\n    font-size: 1.3em;\r\n    margin-bottom: 10px;\r\n    overflow: hidden;\r\n    padding: 10px;\r\n    text-align: center;\r\n}\r\n"

/***/ }),

/***/ "./src/app/ballistics-module/components/firearms/firearms.component.html":
/*!*******************************************************************************!*\
  !*** ./src/app/ballistics-module/components/firearms/firearms.component.html ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf='_firearms' class=\"card\">\r\n    <div class=\"card-heading bg-dark text-light d-flex p-2\">\r\n\t\tSelect Firearm\r\n\t\t<i class=\"fa fa-fw ml-auto\" [class.fa-chevron-right]=\"!isOpen\" [class.fa-chevron-down]=\"isOpen\" (click)=\"isOpen=!isOpen\"></i>\r\n\t</div>\r\n\t<div class=\"card-body\" [class.collapse]=\"!isOpen\">\r\n\t\t<ul class=\"list-inline\">\r\n\t\t\t<li *ngFor='let firearm of _firearms' (click)='select(firearm);' class='card'>\r\n\t\t\t\t<div class=\"well\" [class.active]='currentFirearm===firearm'>\r\n\t\t\t\t\t{{ firearm.name }}\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\t</div>\r\n\t<div class=\"card-footer\" [class.collapse]=\"!isOpen\">\r\n\t\t<button class=\"btn btn-default\" (click)='add();'><span class=\"fa fa-plus\"></span> Add Firearm</button>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "./src/app/ballistics-module/components/firearms/firearms.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/ballistics-module/components/firearms/firearms.component.ts ***!
  \*****************************************************************************/
/*! exports provided: FirearmsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FirearmsComponent", function() { return FirearmsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FirearmsComponent = /** @class */ (function () {
    function FirearmsComponent() {
        this.isOpen = true;
        this.currentFirearm = null;
        this._firearms = null;
        this.onAdd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(FirearmsComponent.prototype, "firearms", {
        set: function (firearms) {
            if (firearms) {
                this._firearms = firearms;
            }
            else {
                this.firearms = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    FirearmsComponent.prototype.add = function () {
        this.onAdd.emit();
    };
    FirearmsComponent.prototype.select = function (firearm) {
        this.currentFirearm = firearm;
        this.onSelect.emit(this.currentFirearm);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], FirearmsComponent.prototype, "firearms", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FirearmsComponent.prototype, "onAdd", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], FirearmsComponent.prototype, "onSelect", void 0);
    FirearmsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-firearms',
            styles: [__webpack_require__(/*! ./firearms.component.css */ "./src/app/ballistics-module/components/firearms/firearms.component.css")],
            template: __webpack_require__(/*! ./firearms.component.html */ "./src/app/ballistics-module/components/firearms/firearms.component.html")
        })
    ], FirearmsComponent);
    return FirearmsComponent;
}());



/***/ }),

/***/ "./src/app/ballistics-module/components/home/home.component.css":
/*!**********************************************************************!*\
  !*** ./src/app/ballistics-module/components/home/home.component.css ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".graph-inline {\r\n    display: inline-block;\r\n    padding: 0;\r\n}\r\n.home {\r\n    padding-top: 5px;\r\n    text-align: center;\r\n    width: 100%;\r\n}\r\n.card {\r\n    display: inline-block;\r\n    margin: 0 auto;\r\n    vertical-align: top;\r\n    width: 100%;\r\n}\r\n@media screen and (min-width: 576px) {\r\n    .card {\r\n        width: 49%;\r\n    }\r\n}\r\n@media screen and (min-width: 768px) {\r\n    .card {\r\n        width: 32%;\r\n    }\r\n}\r\n@media screen and (min-width: 992px) {\r\n    .card {\r\n        width: 24%;\r\n    }\r\n}\r\n"

/***/ }),

/***/ "./src/app/ballistics-module/components/home/home.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/ballistics-module/components/home/home.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class='home'>\r\n    <div>\r\n        <div class='card'><app-weather (onChange)='changeWeather();'></app-weather></div>\r\n        <div class='card'><app-target (onChange)='changeTarget();'></app-target></div>\r\n        <div *ngIf=\"dataService.firearms && !dataService.currentFirearm && this.firearmMode!=='add'\" class='card'><app-firearms [firearms]='dataService.firearms' (onAdd)='addFirearm();' (onSelect)='selectFirearm($event);'></app-firearms></div>\r\n        <div *ngIf=\"dataService.currentFirearm || this.firearmMode==='add'\" class='card'><app-firearm [firearm]='firearm' [mode]='firearmMode' (onChange)='changeFirearm($event);' (onClose)='closeFirearm();' (onDelete)='deleteFirearm($event);' (onSave)='saveFirearm($event);'></app-firearm></div>\r\n        <div *ngIf=\"dataService.currentFirearm && !dataService.currentRound && this.roundMode!=='add'\" class='card'><app-rounds [rounds]='dataService.currentFirearm.rounds' (onAdd)='addRound();' (onSelect)='selectRound($event);'></app-rounds></div>\r\n        <div *ngIf=\"dataService.currentFirearm && (dataService.currentRound || this.roundMode==='add')\" class='card'><app-round [round]='dataService.currentRound' [mode]='roundMode' (onChange)='changeRound($event);' (onClose)='closeRound();' (onDelete)='deleteRound($event);' (onSave)='saveRound($event);'></app-round></div>\r\n    </div>\r\n    <div *ngIf='dataService.rangeData'>\r\n\t\t<br/>\r\n        <app-chart></app-chart>\r\n\t\t<br/>\r\n        <button class='btn btn-success'(click)=\"graphType==='line' ? graphType='bar' : graphType='line'\">Change Graph Type</button>\r\n        <div>\r\n            <div class=\"graph-inline\">\r\n                <h3>Velocity (feet/sec)</h3>\r\n                <d3-graph [type]=\"graphType\" [data]=\"dataService.rangeData\" xKey=\"rangeYards\" yKey=\"velocityFPS\" [width]=\"graphWidth\" [height]=\"graphHeight\" [labels]='all' [yToFixed]='0'></d3-graph>\r\n            </div>\r\n            <div class=\"graph-inline\">\r\n                <h3>Energy (foot pounds)</h3>\r\n                <d3-graph [type]=\"graphType\" [data]=\"dataService.rangeData\" xKey=\"rangeYards\" yKey=\"energyFtLbs\" [width]=\"graphWidth\" [height]=\"graphHeight\" [labels]='all' [yToFixed]='0'></d3-graph>\r\n            </div>\r\n            <div class=\"graph-inline\">\r\n                <h3>Time (seconds)</h3>\r\n                <d3-graph [type]=\"graphType\" [data]=\"dataService.rangeData\" xKey=\"rangeYards\" yKey=\"timeSeconds\" [width]=\"graphWidth\" [height]=\"graphHeight\" [labels]='all' [yToFixed]='2'></d3-graph>\r\n            </div>\r\n            <div class=\"graph-inline\">\r\n                <h3>Drop (inches)</h3>\r\n                <d3-graph [type]=\"graphType\" [data]=\"dataService.rangeData\" xKey=\"rangeYards\" yKey=\"dropInches\" [width]=\"graphWidth\" [height]=\"graphHeight\" [labels]='all' [yToFixed]='1'></d3-graph>\r\n            </div>\r\n            <div class=\"graph-inline\">\r\n                <h3>Elevation (inches)</h3>\r\n                <d3-graph [type]=\"graphType\" [data]=\"dataService.rangeData\" xKey=\"rangeYards\" yKey=\"verticalPositionInches\" [width]=\"graphWidth\" [height]=\"graphHeight\" [labels]='all' [yToFixed]='1'></d3-graph>\r\n            </div>\r\n            <div class=\"graph-inline\">\r\n                <h3>Cross Wind Drift (inches)</h3>\r\n                <d3-graph [type]=\"graphType\" [data]=\"dataService.rangeData\" xKey=\"rangeYards\" yKey=\"crossWindDriftInches\" [width]=\"graphWidth\" [height]=\"graphHeight\" [labels]='all' [yToFixed]='1'></d3-graph>\r\n            </div>\r\n            <div class=\"graph-inline\">\r\n                <h3>Lead (inches)</h3>\r\n                <d3-graph [type]=\"graphType\" [data]=\"dataService.rangeData\" xKey=\"rangeYards\" yKey=\"leadInches\" [width]=\"graphWidth\" [height]=\"graphHeight\" [labels]='all' [yToFixed]='1'></d3-graph>\r\n            </div>\r\n            <div class=\"graph-inline\">\r\n                <h3>Slant Hold (inches - hold low)</h3>\r\n                <d3-graph [type]=\"graphType\" [data]=\"dataService.rangeData\" xKey=\"rangeYards\" yKey=\"slantDegrees\" [width]=\"graphWidth\" [height]=\"graphHeight\" [labels]='all' [yToFixed]='1'></d3-graph>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "./src/app/ballistics-module/components/home/home.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/ballistics-module/components/home/home.component.ts ***!
  \*********************************************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/data.service */ "./src/app/ballistics-module/services/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = /** @class */ (function () {
    function HomeComponent(dataService) {
        this.dataService = dataService;
        this.firearm = null;
        this.firearmMode = 'select'; // Valid modes are 'add', 'edit', or 'select'
        this.graphHeight = 300;
        this.graphType = 'line';
        this.graphWidth = 300;
        this.roundMode = 'select'; // Valid modes are 'add', 'edit', or 'select'
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataService.getFirearms().subscribe(function (firearms) {
            if (firearms && firearms.length > 0) {
                _this.firearmMode = 'select';
            }
            else {
                _this.firearmMode = 'add';
            }
        });
    };
    HomeComponent.prototype.addFirearm = function () {
        this.firearmMode = 'add';
    };
    HomeComponent.prototype.addRound = function () {
        this.roundMode = 'add';
    };
    HomeComponent.prototype.changeFirearm = function (firearm) {
        this.dataService.currentFirearm = firearm;
        this.dataService.getRangeData();
    };
    HomeComponent.prototype.changeRound = function (round) {
        this.dataService.currentRound = round;
        this.dataService.getRangeData();
    };
    HomeComponent.prototype.closeFirearm = function () {
        // Reset the selected round and firearm to null
        this.closeRound();
        this.dataService.currentFirearm = this.firearm = null;
        this.firearmMode = 'select';
    };
    HomeComponent.prototype.closeRound = function () {
        this.dataService.currentRound = null;
        this.roundMode = 'select';
        this.dataService.getRangeData();
    };
    HomeComponent.prototype.deleteFirearm = function (firearm) {
        console.log('Home - deleteFirearm');
        if (this.dataService.deleteFirearm(firearm)) {
            toastr.info('Firearm deleted');
            this.closeFirearm();
        }
    };
    HomeComponent.prototype.deleteRound = function (round) {
        console.log(round);
        if (this.dataService.deleteRound(this.dataService.currentFirearm, round)) {
            toastr.info('Round deleted');
            this.closeRound();
        }
    };
    HomeComponent.prototype.saveFirearm = function (firearm) {
        if (this.firearmMode === 'add') {
            if (this.dataService.insertFirearm(firearm)) {
                toastr.info('Firearm added');
                this.selectFirearm(firearm);
            }
        }
        else {
            if (this.dataService.updateFirearm(firearm)) {
                toastr.info('Firearm updated');
            }
        }
    };
    HomeComponent.prototype.saveRound = function (round) {
        if (this.roundMode === 'add') {
            if (this.dataService.insertRound(this.dataService.currentFirearm, round)) {
                toastr.info('Round added');
                this.selectRound(round);
            }
        }
        else {
            if (this.dataService.updateRound(this.dataService.currentFirearm, round)) {
                toastr.info('Round updated');
            }
        }
    };
    HomeComponent.prototype.selectFirearm = function (firearm) {
        this.dataService.currentFirearm = this.firearm = firearm;
        this.firearmMode = 'edit';
        if (firearm.rounds && firearm.rounds.length > 0) {
            this.roundMode = 'select';
        }
        else {
            this.roundMode = 'add';
        }
    };
    HomeComponent.prototype.selectRound = function (round) {
        this.dataService.currentRound = round;
        this.roundMode = 'edit';
        this.dataService.getRangeData();
    };
    HomeComponent.prototype.changeTarget = function () {
        this.dataService.getRangeData();
    };
    HomeComponent.prototype.changeWeather = function () {
        this.dataService.getRangeData();
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/ballistics-module/components/home/home.component.css")],
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/ballistics-module/components/home/home.component.html")
        }),
        __metadata("design:paramtypes", [_services_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/ballistics-module/components/round/round.component.css":
/*!************************************************************************!*\
  !*** ./src/app/ballistics-module/components/round/round.component.css ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input.ng-valid { border-left: 5px solid #42A948; /* green */}\r\ninput.ng-invalid { border-left: 5px solid #a94442; /* red */}\r\n/*\r\nBelow settings compact vertical forms\r\n*/\r\nlabel.control-label {\r\n    margin-bottom: 0;\r\n}\r\n.form-group {\r\n    margin-bottom: 5px;\r\n    text-align: left;\r\n}\r\n.card-footer  {\r\n    padding: 10px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/ballistics-module/components/round/round.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/ballistics-module/components/round/round.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf='editedRound' class=\"card\">\r\n    <div class=\"card-heading bg-dark text-light d-flex p-2\">\r\n\t\t<span *ngIf=\"_mode==='add'\">Add Round</span>\r\n\t\t<span *ngIf=\"_mode==='edit'\">Round - {{ editedRound.name }}</span>\r\n\t\t<i class=\"fa fa-fw ml-auto\" [class.fa-chevron-right]=\"!isOpen\" [class.fa-chevron-down]=\"isOpen\" (click)=\"isOpen=!isOpen\"></i>\r\n\t</div>\r\n\t<div class=\"card-body\" [class.collapse]=\"!isOpen\">\r\n\t\t<form #form=\"ngForm\" novalidate (change)='change(form.valid);'>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"nameControl.invalid && nameControl.dirty\">\r\n\t\t\t\t\t<label class=\"control-label\">Name</label>\r\n\t\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-text-o fa-fw\"></i></div></div>\r\n\t\t\t\t\t\t<input type=\"text\" name=\"name\" [(ngModel)]=\"editedRound.name\" #nameControl=\"ngModel\" class=\"form-control\" placeholder=\"Name\" required minlength=\"3\"  maxlength=\"50\">\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<div [hidden]=\"_mode==='view' || nameControl.valid || nameControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\t\tName is required and must be between 3 and 50 characters\r\n\t\t\t\t\t</div>\r\n\t\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"bulletDiameterInchesControl.invalid && bulletDiameterInchesControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Bullet diameter is required so wind resistance can be calculated properly\">Bullet Diameter (inches)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-superpowers fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"bulletDiameterInches\" [(ngModel)]=\"editedRound.bulletDiameterInches\" #bulletDiameterInchesControl=\"ngModel\" class=\"form-control\" placeholder=\"Bullet Diameter (inches)\" required min=\"0.010\" max=\"1\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"_mode==='view' || bulletDiameterInchesControl.valid || bulletDiameterInchesControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tBullet diameter is required so wind resistance can be calculated.  Common diameters are 0.022 to 0.050 inches\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"bulletWeightGrainsControl.invalid && bulletWeightGrainsControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Bullet weight is required, so inertia can be calculated properly\">Bullet Weight (grains)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-balance-scale fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"bulletWeightGrains\" [(ngModel)]=\"editedRound.bulletWeightGrains\" #bulletWeightGrainsControl=\"ngModel\" class=\"form-control\" placeholder=\"Bullet Weight (grains)\" required min=\"10\" max=\"1000\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"_mode==='view' || bulletWeightGrainsControl.valid || bulletWeightGrainsControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tBullet weight is required, so bullet drop can be calculated properly\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"muzzleVelocityFPSControl.invalid && muzzleVelocityFPSControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Muzzle velocity is required, so bullet deceleration can be calculated properly\">Muzzle Velocity (FPS)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-signal fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"muzzleVelocityFPS\" [(ngModel)]=\"editedRound.muzzleVelocityFPS\" #muzzleVelocityFPSControl=\"ngModel\" class=\"form-control\" placeholder=\"Muzzle Velocity (FPS)\" required min=\"100\" max=\"5000\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"_mode==='view' || muzzleVelocityFPSControl.valid || muzzleVelocityFPSControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tMuzzle velocity is required, so bullet drop can be calculated properly\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"bulletBCControl.invalid && bulletBCControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Bullet ballistic cooefficient is the aerodynamics of the bullet's ability to resist atmospheric density related deceleration\">Bullet Ballistic Cooefficient</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-google-wallet fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"bulletBC\" [(ngModel)]=\"editedRound.bulletBC\" #bulletBCControl=\"ngModel\" class=\"form-control\" placeholder=\"Bullet Ballistic Cooefficient\" required min=\"0.010\" max=\"1\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"_mode==='view' || bulletBCControl.valid || bulletBCControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tBullet ballistic cooefficient is required, so wind resistance can be calculated properly\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t</div>\r\n\t<div class=\"card-footer\" [class.collapse]=\"!isOpen\">\r\n\t\t<div *ngIf=\"_mode==='add'\">\r\n\t\t\t<button type=\"submit\" class=\"btn btn-success\" [disabled]=\"form.pristine || form.invalid\" (click)='save()'><i class=\"fa fa-check\"></i> Save</button>&nbsp;\r\n\t\t\t<button class='btn btn-danger' (click)='close();'> Cancel</button>\r\n\t\t</div>\r\n\t\t<div *ngIf=\"_mode=='edit'\">\r\n\t\t\t<button type=\"submit\" class=\"btn btn-success\" [disabled]=\"form.pristine || form.invalid\" (click)='save()'><i class=\"fa fa-check\"></i> Save</button>&nbsp;\r\n\t\t\t<button *ngIf='isPristine' class='btn btn-warning' (click)='close();'> Close</button>&nbsp;\r\n\t\t\t<button *ngIf='isPristine' class='btn btn-danger' mwlConfirmationPopover [popoverTitle]=\"'Confirm Delete'\" [popoverMessage]=\"'Delete this firearm?'\" placement=\"top\" (confirm)=\"delete()\"> Delete</button>\r\n\t\t\t<button *ngIf='!isPristine' class='btn btn-warning' (click)='cancel();'> Cancel</button>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/ballistics-module/components/round/round.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/ballistics-module/components/round/round.component.ts ***!
  \***********************************************************************/
/*! exports provided: RoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoundComponent", function() { return RoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RoundComponent = /** @class */ (function () {
    function RoundComponent() {
        this.editedRound = null;
        this.isOpen = true;
        this.isPristine = true;
        this._mode = 'add';
        this._round = null;
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onClose = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onDelete = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onSave = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(RoundComponent.prototype, "mode", {
        set: function (mode) {
            // Acceptable modes are 'add' and 'edit'
            this._mode = mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RoundComponent.prototype, "round", {
        set: function (round) {
            if (round) {
                this.editedRound = {
                    id: round.id,
                    name: round.name,
                    bulletBC: round.bulletBC,
                    bulletDiameterInches: round.bulletDiameterInches,
                    bulletWeightGrains: round.bulletWeightGrains,
                    muzzleVelocityFPS: round.muzzleVelocityFPS
                };
            }
            else {
                // Setup defaults
                this.editedRound = {
                    id: null,
                    name: null,
                    bulletBC: null,
                    bulletDiameterInches: null,
                    bulletWeightGrains: null,
                    muzzleVelocityFPS: null
                };
            }
            // Save the initial settings so we can reset if requested
            this._round = round;
        },
        enumerable: true,
        configurable: true
    });
    RoundComponent.prototype.ngOnInit = function () {
        // Initialize tooltips just for this component
        // $(document).ready(() => {
        // 	$('round [data-toggle="tooltip"]').tooltip({ container: 'body' });
        // });
    };
    RoundComponent.prototype.change = function (isValid) {
        if (isValid) {
            this.onChange.emit(this.editedRound);
        }
    };
    RoundComponent.prototype.cancel = function () {
        // Reset the form back to the original object
        this.round = this._round;
        this.isPristine = true;
    };
    RoundComponent.prototype.close = function (isDirty) {
        if (isDirty === void 0) { isDirty = false; }
        // Change to another firearm
        if (isDirty) {
            toastr.error('Round not saved');
        }
        this.onClose.emit();
    };
    RoundComponent.prototype.delete = function () {
        this.onDelete.emit(this._round);
    };
    RoundComponent.prototype.save = function () {
        // Save changes to this round
        this.onSave.emit(this.editedRound);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], RoundComponent.prototype, "mode", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], RoundComponent.prototype, "round", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RoundComponent.prototype, "onChange", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RoundComponent.prototype, "onClose", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RoundComponent.prototype, "onDelete", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RoundComponent.prototype, "onSave", void 0);
    RoundComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-round',
            styles: [__webpack_require__(/*! ./round.component.css */ "./src/app/ballistics-module/components/round/round.component.css")],
            template: __webpack_require__(/*! ./round.component.html */ "./src/app/ballistics-module/components/round/round.component.html")
        })
    ], RoundComponent);
    return RoundComponent;
}());



/***/ }),

/***/ "./src/app/ballistics-module/components/rounds/rounds.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/ballistics-module/components/rounds/rounds.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".active {\r\n    background-color: #555555;\r\n    color: #eeeeee;}\r\nli.card {\r\n    cursor: pointer;\r\n    width: 100%;\r\n}\r\n.card-footer  {\r\n    padding: 10px;\r\n}\r\n.well {\r\n    font-size: 1.3em;\r\n    margin-bottom: 10px;\r\n    overflow: hidden;\r\n    padding: 10px;\r\n    text-align: center;\r\n}"

/***/ }),

/***/ "./src/app/ballistics-module/components/rounds/rounds.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/ballistics-module/components/rounds/rounds.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf='_rounds' class=\"card\">\r\n    <div class=\"card-heading bg-dark text-light d-flex p-2\">\r\n\t\tSelect Round\r\n\t\t<i class=\"fa fa-fw ml-auto\" [class.fa-chevron-right]=\"!isOpen\" [class.fa-chevron-down]=\"isOpen\" (click)=\"isOpen=!isOpen\"></i>\r\n\t</div>\r\n\t<div class=\"card-body\" [class.collapse]=\"!isOpen\">\r\n\t\t<ul class=\"list-inline\">\r\n\t\t\t<li *ngFor='let round of _rounds' (click)='select(round);' class='card' >\r\n\t\t\t\t<div class=\"well\" [class.active]='currentRound===round'>\r\n\t\t\t\t\t{{ round.name }}\r\n\t\t\t\t</div>\r\n\t\t\t</li>\r\n\t\t</ul>\r\n\t</div>\r\n\t<div class=\"card-footer\" [class.collapse]=\"!isOpen\">\r\n\t\t<button class=\"btn btn-default\" (click)='add();'><span class=\"fa fa-plus\"></span> Add Round</button>\r\n\t</div>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/ballistics-module/components/rounds/rounds.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/ballistics-module/components/rounds/rounds.component.ts ***!
  \*************************************************************************/
/*! exports provided: RoundsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoundsComponent", function() { return RoundsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var RoundsComponent = /** @class */ (function () {
    function RoundsComponent() {
        this.currentRound = null;
        this.isOpen = true;
        this._rounds = [];
        this.onAdd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onSelect = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(RoundsComponent.prototype, "rounds", {
        set: function (rounds) {
            if (rounds) {
                this._rounds = rounds;
            }
            else {
                this._rounds = [];
            }
        },
        enumerable: true,
        configurable: true
    });
    RoundsComponent.prototype.add = function () {
        this.onAdd.emit();
    };
    RoundsComponent.prototype.select = function (round) {
        this.currentRound = round;
        this.onSelect.emit(this.currentRound);
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], RoundsComponent.prototype, "rounds", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RoundsComponent.prototype, "onAdd", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], RoundsComponent.prototype, "onSelect", void 0);
    RoundsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-rounds',
            styles: [__webpack_require__(/*! ./rounds.component.css */ "./src/app/ballistics-module/components/rounds/rounds.component.css")],
            template: __webpack_require__(/*! ./rounds.component.html */ "./src/app/ballistics-module/components/rounds/rounds.component.html")
        })
    ], RoundsComponent);
    return RoundsComponent;
}());



/***/ }),

/***/ "./src/app/ballistics-module/components/target/target.component.css":
/*!**************************************************************************!*\
  !*** ./src/app/ballistics-module/components/target/target.component.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input.ng-valid { border-left: 5px solid #42A948; /* green */}\r\ninput.ng-invalid { border-left: 5px solid #a94442; /* red */}\r\n/*\r\nBelow settings compact vertical forms\r\n*/\r\nlabel.control-label {\r\n    margin-bottom: 0;\r\n}\r\n.form-group {\r\n    margin-bottom: 5px;\r\n    text-align: left;\r\n}"

/***/ }),

/***/ "./src/app/ballistics-module/components/target/target.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/ballistics-module/components/target/target.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf='dataService.currentTarget' class=\"card\">\r\n    <div class=\"card-heading bg-dark text-light d-flex p-2\">\r\n        Target\r\n\t\t<i class=\"fa fa-fw ml-auto\" [class.fa-chevron-right]=\"!isOpen\" [class.fa-chevron-down]=\"isOpen\" (click)=\"isOpen=!isOpen\"></i>\r\n    </div>\r\n\t<div class=\"card-body\" [class.collapse]=\"!isOpen\">\r\n\t\t<form #form=\"ngForm\" novalidate (change)='change(form.valid);'>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"distanceYardsControl.invalid && distanceYardsControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Distance in yards measured from the muzzle to the target\">Distance (yards)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-bullseye fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"distanceYards\" [(ngModel)]=\"dataService.currentTarget.distanceYards\" #distanceYardsControl=\"ngModel\" class=\"form-control\" placeholder=\"Distance (yards)\" required min=\"0\" max=\"5000\" step=\"5\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"distanceYardsControl.valid || distanceYardsControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tDistance is required to determine how far out to calculate ballistics data\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"chartSteppingControl.invalid && chartSteppingControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Chart stepping is required to determine how many rows to calculate\">Chart Stepping (yards)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-bars fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"chartStepping\" [(ngModel)]=\"dataService.currentTarget.chartStepping\" #chartSteppingControl=\"ngModel\" class=\"form-control\" placeholder=\"Chart Stepping (yards)\" required min=\"10\" max=\"500\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"chartSteppingControl.valid || chartSteppingControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tChart stepping is required to determine how many rows to calculate\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"slantDegreesControl.invalid && slantDegreesControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"The angle versus horizontal as measured between the muzzle and target.  Slant degrees is required to determine vertical hold over or angle scope adjustments needed.  Both up and down slant angles result in the need to aim low.\">Slant (degrees)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-location-arrow fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"slantDegrees\" [(ngModel)]=\"dataService.currentTarget.slantDegrees\" #slantDegreesControl=\"ngModel\" class=\"form-control\" placeholder=\"Slant (degrees)\" required min=\"10\" max=\"500\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"slantDegreesControl.valid || slantDegreesControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tSlant degrees is required to determine vertical hold over or angle scope adjustments needed.  Both up and down slant angles result in the need to aim low.\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"speedMPHControl.invalid && speedMPHControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"The speed the target is moving perpendicular to the line between the muzzle and target.  Target speed is required to determine horizontal lead hold or scope adjustments needed.\">Speed (MPH)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-car fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"speedMPH\" [(ngModel)]=\"dataService.currentTarget.speedMPH\" #speedMPHControl=\"ngModel\" class=\"form-control\" placeholder=\"Speed (MPH)\" required min=\"10\" max=\"500\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"speedMPHControl.valid || speedMPHControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tTarget speed is required to determine horizontal lead hold or scope adjustments needed.\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "./src/app/ballistics-module/components/target/target.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/ballistics-module/components/target/target.component.ts ***!
  \*************************************************************************/
/*! exports provided: TargetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TargetComponent", function() { return TargetComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/data.service */ "./src/app/ballistics-module/services/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var TargetComponent = /** @class */ (function () {
    function TargetComponent(dataService) {
        this.dataService = dataService;
        this.isOpen = true;
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    TargetComponent.prototype.ngOnInit = function () {
        this.dataService.getTarget().subscribe();
        // Initialize tooltips just for this component
        // $(document).ready(() => {
        // 	$('target [data-toggle="tooltip"]').tooltip({ container: 'body' });
        // });
    };
    TargetComponent.prototype.change = function (isValid) {
        if (isValid) {
            this.onChange.emit();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], TargetComponent.prototype, "onChange", void 0);
    TargetComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-target',
            styles: [__webpack_require__(/*! ./target.component.css */ "./src/app/ballistics-module/components/target/target.component.css")],
            template: __webpack_require__(/*! ./target.component.html */ "./src/app/ballistics-module/components/target/target.component.html")
        }),
        __metadata("design:paramtypes", [_services_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]])
    ], TargetComponent);
    return TargetComponent;
}());



/***/ }),

/***/ "./src/app/ballistics-module/components/weather/weather.component.css":
/*!****************************************************************************!*\
  !*** ./src/app/ballistics-module/components/weather/weather.component.css ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input.ng-valid { border-left: 5px solid #42A948; /* green */}\r\ninput.ng-invalid { border-left: 5px solid #a94442; /* red */}\r\n/*\r\nBelow settings compact vertical forms\r\n*/\r\nlabel.control-label {\r\n    margin-bottom: 0;\r\n}\r\n.form-group {\r\n    margin-bottom: 5px;\r\n    text-align: left;\r\n}"

/***/ }),

/***/ "./src/app/ballistics-module/components/weather/weather.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/ballistics-module/components/weather/weather.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf='dataService.currentWeather' class=\"card\">\r\n    <div class=\"card-heading bg-dark text-light d-flex p-2\">\r\n        Weather\r\n\t\t<i class=\"fa fa-fw ml-auto\" [class.fa-chevron-right]=\"!isOpen\" [class.fa-chevron-down]=\"isOpen\" (click)=\"isOpen=!isOpen\"></i>\r\n    </div>\r\n\t<div class=\"card-body\" [class.collapse]=\"!isOpen\">\r\n\t\t<form #form=\"ngForm\" novalidate (change)='change(form.valid);'>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"altitudeFeetControl.invalid && altitudeFeetControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Distance above sea level. Altitude is used to determine atmospheric density.\">Altitude (feet)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-globe fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"altitudeFeet\" [(ngModel)]=\"dataService.currentWeather.altitudeFeet\" #altitudeFeetControl=\"ngModel\" class=\"form-control\" placeholder=\"Altitude (feet)\" required min=\"0\" max=\"50000\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"altitudeFeetControl.valid || altitudeFeetControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tAltitude is required to determine atmospheric density\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"temperatureDegreesFahrenheitControl.invalid && temperatureDegreesFahrenheitControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Distance above sea level. Altitude is used to determine atmospheric density.\">Temperature (fahrenheit)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-snowflake-o fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"temperatureDegreesFahrenheit\" [(ngModel)]=\"dataService.currentWeather.temperatureDegreesFahrenheit\" #temperatureDegreesFahrenheitControl=\"ngModel\" class=\"form-control\" placeholder=\"Temperature (fahrenheit)\" required min=\"0\" max=\"200\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"temperatureDegreesFahrenheitControl.valid || temperatureDegreesFahrenheitControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tTemperature is required to determine atmospheric density\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"barometericPressureInchesHgControl.invalid && barometericPressureInchesHgControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Distance above sea level. Altitude is used to determine atmospheric density.\">Barometeric Pressure (in Hg)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-cloud fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"barometericPressureInchesHg\" [(ngModel)]=\"dataService.currentWeather.barometericPressureInchesHg\" #barometericPressureInchesHgControl=\"ngModel\" class=\"form-control\" placeholder=\"Barometeric Pressure (in Hg)\" required min=\"0\" max=\"100\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"barometericPressureInchesHgControl.valid || barometericPressureInchesHgControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tBarometeric Pressure is required to determine atmospheric density\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"relativeHumidityPercentControl.invalid && relativeHumidityPercentControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"The amount of moisture in the atmosphere impacts density\">Relative Humidity (%)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-tint fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"relativeHumidityPercent\" [(ngModel)]=\"dataService.currentWeather.relativeHumidityPercent\" #relativeHumidityPercentControl=\"ngModel\" class=\"form-control\" placeholder=\"Relative Humidity (%)\" required min=\"0\" max=\"100\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"relativeHumidityPercentControl.valid || relativeHumidityPercentControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tRelative Humidity is required to determine atmospheric density\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"windVelocityMPHControl.invalid && windVelocityMPHControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Wind velocity is required to calculate bullet drift\">Wind Velocity (MPH)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-flag fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"windVelocityMPH\" [(ngModel)]=\"dataService.currentWeather.windVelocityMPH\" #windVelocityMPHControl=\"ngModel\" class=\"form-control\" placeholder=\"Wind Velocity (MPH)\" required min=\"0\" max=\"200\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"windVelocityMPHControl.valid || windVelocityMPHControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tWind Velocity is required to calculate bullet drift\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t<div class=\"form-group\" [class.has-error]=\"windAngleDegreesControl.invalid && windAngleDegreesControl.dirty\">\r\n\t\t\t\t<label class=\"control-label\" data-toggle=\"tooltip\" title=\"Wind Angle is required to determine the winds vector impact on bullet drift.  Allowed values are 0-90 degrees.\">Wind Angle (degrees)</label>\r\n\t\t\t\t<div class=\"input-group margin-bottom-sm\">\r\n\t                <div class=\"input-group-prepend\"><div class=\"input-group-text\"><i class=\"fa fa-line-chart fa-fw\"></i></div></div>\r\n\t\t\t\t\t<input type=\"number\" name=\"windAngleDegrees\" [(ngModel)]=\"dataService.currentWeather.windAngleDegrees\" #windAngleDegreesControl=\"ngModel\" class=\"form-control\" placeholder=\"Wind Angle (degrees)\" required min=\"0\" max=\"90\">\r\n\t\t\t\t</div>\r\n\t\t\t\t<div [hidden]=\"windAngleDegreesControl.valid || windAngleDegreesControl.pristine\" class=\"alert alert-danger\">\r\n\t\t\t\t\tWind Angle is required to determine the winds vector impact on bullet drift.  Allowed values are 0-90 degrees.\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t</form>\r\n\t</div>\r\n</div>"

/***/ }),

/***/ "./src/app/ballistics-module/components/weather/weather.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/ballistics-module/components/weather/weather.component.ts ***!
  \***************************************************************************/
/*! exports provided: WeatherComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeatherComponent", function() { return WeatherComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _services_data_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/data.service */ "./src/app/ballistics-module/services/data.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var WeatherComponent = /** @class */ (function () {
    function WeatherComponent(dataService) {
        this.dataService = dataService;
        this.isOpen = true;
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    WeatherComponent.prototype.ngOnInit = function () {
        this.dataService.getWeather().subscribe();
        // Initialize tooltips just for this component
        // $(document).ready(() => {
        // 	$('weather [data-toggle="tooltip"]').tooltip({ container: 'body' });
        // });
    };
    WeatherComponent.prototype.change = function (isValid) {
        if (isValid) {
            this.onChange.emit();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], WeatherComponent.prototype, "onChange", void 0);
    WeatherComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-weather',
            styles: [__webpack_require__(/*! ./weather.component.css */ "./src/app/ballistics-module/components/weather/weather.component.css")],
            template: __webpack_require__(/*! ./weather.component.html */ "./src/app/ballistics-module/components/weather/weather.component.html")
        }),
        __metadata("design:paramtypes", [_services_data_service__WEBPACK_IMPORTED_MODULE_1__["DataService"]])
    ], WeatherComponent);
    return WeatherComponent;
}());



/***/ }),

/***/ "./src/app/ballistics-module/data/conditions.data.ts":
/*!***********************************************************!*\
  !*** ./src/app/ballistics-module/data/conditions.data.ts ***!
  \***********************************************************/
/*! exports provided: TARGET, WEATHER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TARGET", function() { return TARGET; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEATHER", function() { return WEATHER; });
var TARGET = {
    distanceYards: 1000,
    chartStepping: 50,
    slantDegrees: 45,
    speedMPH: 3
};
var WEATHER = {
    altitudeFeet: 0,
    temperatureDegreesFahrenheit: 59,
    barometericPressureInchesHg: 29.53,
    relativeHumidityPercent: 78,
    windVelocityMPH: 10,
    windAngleDegrees: 90
};


/***/ }),

/***/ "./src/app/ballistics-module/data/firearms.data.ts":
/*!*********************************************************!*\
  !*** ./src/app/ballistics-module/data/firearms.data.ts ***!
  \*********************************************************/
/*! exports provided: FIREARMS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FIREARMS", function() { return FIREARMS; });
var FIREARMS = [
    {
        id: '8f331a2c-ef70-4a64-a028-276bf27523c4',
        name: '10/22',
        elevationTurretGradients: 2,
        reticleUnits: 1,
        rounds: [
            {
                id: 'e67e903e-2a22-4cfc-a1a9-e9c92adf6e5b',
                name: 'Federal',
                bulletBC: 0.13,
                bulletDiameterInches: 0.22,
                bulletWeightGrains: 40,
                muzzleVelocityFPS: 1255
            }
        ],
        sightHeightInches: 1.5,
        turretUnits: 1,
        windageTurretGradients: 2,
        zeroRangeYards: 50
    },
    {
        id: '8a6b05a9-ecb7-4f62-8a73-c07df86209e5',
        name: 'CTR',
        elevationTurretGradients: 10,
        reticleUnits: 0,
        rounds: [
            {
                id: 'ba665537-7653-43c0-82a6-6410972fee09',
                name: 'FGMM 69',
                bulletBC: 0.301,
                bulletDiameterInches: 0.224,
                bulletWeightGrains: 69,
                muzzleVelocityFPS: 2810
            },
            {
                id: '0cd716e3-a485-481c-addd-c96b70d43b4d',
                name: 'FGMM 77',
                bulletBC: 0.372,
                bulletDiameterInches: 0.224,
                bulletWeightGrains: 77,
                muzzleVelocityFPS: 2580
            },
            {
                id: 'a931c049-7771-45f6-8ede-5ea9d7674a2d',
                name: 'Handload 77',
                bulletBC: 0.372,
                bulletDiameterInches: 0.224,
                bulletWeightGrains: 77,
                muzzleVelocityFPS: 2680
            },
            {
                id: 'fe7c8d3e-3ed2-4614-832d-9dd4833fe4db',
                name: 'TAP 5.56',
                bulletBC: 0.354,
                bulletDiameterInches: 0.224,
                bulletWeightGrains: 75,
                muzzleVelocityFPS: 2680
            }
        ],
        sightHeightInches: 2,
        turretUnits: 0,
        windageTurretGradients: 10,
        zeroRangeYards: 100
    },
    {
        id: '7d7f9e4d-7c33-4e04-ad1e-602e6f5d35f9',
        name: 'OBR',
        elevationTurretGradients: 10,
        reticleUnits: 0,
        rounds: [
            {
                id: 'fb97d392-97cc-4289-80ad-fc1fc50e4ab3',
                name: 'FGGM 168',
                bulletBC: 0.462,
                bulletDiameterInches: 0.308,
                bulletWeightGrains: 168,
                muzzleVelocityFPS: 2650
            },
            {
                id: '0dadbe8f-599e-4fce-8a1f-0e273e5ab535',
                name: 'FGMM 175',
                bulletBC: 0.505,
                bulletDiameterInches: 0.308,
                bulletWeightGrains: 175,
                muzzleVelocityFPS: 2600
            }
        ],
        sightHeightInches: 2,
        turretUnits: 0,
        windageTurretGradients: 10,
        zeroRangeYards: 100
    },
    {
        id: '479a565e-cfe9-4ddf-8bf2-292cf1b0ca4f',
        name: 'SPR',
        elevationTurretGradients: 10,
        reticleUnits: 0,
        rounds: [
            {
                id: '93a7b0dc-c106-4fd5-8c68-16aa0caa7165',
                name: 'FGMM 69',
                bulletBC: 0.301,
                bulletDiameterInches: 0.224,
                bulletWeightGrains: 69,
                muzzleVelocityFPS: 2950
            },
            {
                id: 'abe8f65c-9e6b-4adf-8625-4f4ceab8cb1f',
                name: 'FGMM 77',
                bulletBC: 0.372,
                bulletDiameterInches: 0.224,
                bulletWeightGrains: 77,
                muzzleVelocityFPS: 2720
            },
            {
                id: '1f3303a9-8bd9-4e0b-bc4b-002073c2edf8',
                name: 'Handload 77',
                bulletBC: 0.372,
                bulletDiameterInches: 0.224,
                bulletWeightGrains: 77,
                muzzleVelocityFPS: 2823
            },
            {
                id: '98949310-8370-4807-af7a-16711831d7d7',
                name: 'TAP 5.56',
                bulletBC: 0.354,
                bulletDiameterInches: 0.224,
                bulletWeightGrains: 75,
                muzzleVelocityFPS: 2821
            }
        ],
        sightHeightInches: 2,
        turretUnits: 0,
        windageTurretGradients: 10,
        zeroRangeYards: 100
    }
];


/***/ }),

/***/ "./src/app/ballistics-module/data/ingals.data.ts":
/*!*******************************************************!*\
  !*** ./src/app/ballistics-module/data/ingals.data.ts ***!
  \*******************************************************/
/*! exports provided: INGALS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INGALS", function() { return INGALS; });
var INGALS = {
    v: [
        5000, 4980, 4960, 4940, 4920, 4900, 4880, 4860, 4840, 4820, 4800, 4780, 4760, 4740, 4720, 4700, 4680, 4660, 4640, 4620, 4600, 4580, 4560, 4540, 4520, 4500, 4480, 4460, 4440, 4420, 4400, 4380, 4360, 4340, 4320, 4300, 4280, 4260, 4240, 4220, 4200, 4180, 4160, 4140, 4120, 4100, 4080, 4060, 4040, 4020, 4000, 3980, 3960, 3940, 3920, 3900, 3880, 3860, 3840, 3820, 3800, 3780, 3760, 3740, 3720, 3700, 3680, 3660, 3640, 3620, 3600, 3580, 3560, 3540, 3520, 3500, 3480, 3460, 3440, 3420, 3400, 3390, 3380, 3370, 3360, 3350, 3340, 3330, 3320, 3310, 3300, 3290, 3280, 3270, 3260, 3250, 3240, 3230, 3220, 3210, 3200, 3190, 3180, 3170, 3160, 3150, 3140, 3130, 3120, 3110, 3100, 3090, 3080, 3070, 3060, 3050, 3040, 3030, 3020, 3010, 3000, 2990, 2980, 2970, 2960, 2950, 2940, 2930, 2920, 2910, 2900, 2890, 2880, 2870, 2860, 2850, 2840, 2830, 2820, 2810, 2800, 2790, 2780, 2770, 2760, 2750, 2740, 2730, 2720, 2710, 2700, 2690, 2680, 2670, 2660, 2650, 2640, 2630, 2620, 2610, 2600, 2590, 2580, 2570, 2560, 2550, 2540, 2530, 2520, 2510, 2500, 2490, 2480, 2470, 2460, 2450, 2440, 2430, 2420, 2410, 2400, 2390, 2380, 2370, 2360, 2350, 2340, 2330, 2320, 2310, 2300, 2290, 2280, 2270, 2260, 2250, 2240, 2230, 2220, 2210, 2200, 2190, 2180, 2170, 2160, 2150, 2140, 2130, 2120, 2110, 2100, 2090, 2080, 2070, 2060, 2050, 2040, 2030, 2020, 2010, 2000, 1990, 1980, 1970, 1960, 1950, 1940, 1930, 1920, 1910, 1900, 1890, 1880, 1870, 1860, 1850, 1840, 1830, 1820, 1810, 1800, 1790, 1780, 1770, 1760, 1750, 1740, 1730, 1720, 1710, 1700, 1690, 1680, 1670, 1660, 1650, 1640, 1630, 1620, 1610, 1600, 1595, 1590, 1585, 1580, 1575, 1570, 1565, 1560, 1555, 1550, 1545, 1540, 1535, 1530, 1525, 1520, 1515, 1510, 1505, 1500, 1495, 1490, 1485, 1480, 1475, 1470, 1465, 1460, 1455, 1450, 1445, 1440, 1435, 1430, 1425, 1420, 1415, 1410, 1405, 1400, 1395, 1390, 1385, 1380, 1375, 1370, 1365, 1360, 1355, 1350, 1345, 1340, 1335, 1330, 1325, 1320, 1315, 1310, 1305, 1300, 1298, 1296, 1294, 1292, 1290, 1288, 1286, 1284, 1282, 1280, 1278, 1276, 1274, 1272, 1270, 1268, 1266, 1264, 1262, 1260, 1258, 1256, 1254, 1252, 1250, 1248, 1246, 1244, 1242, 1240, 1238, 1236, 1234, 1232, 1230, 1228, 1226, 1224, 1222, 1220, 1218, 1216, 1214, 1212, 1210, 1208, 1206, 1204, 1202, 1200, 1198, 1196, 1194, 1192, 1190, 1188, 1186, 1184, 1182, 1180, 1178, 1176, 1174, 1172, 1170, 1168, 1166, 1164, 1162, 1160, 1158, 1156, 1154, 1152, 1150, 1148, 1146, 1144, 1142, 1140, 1138, 1136, 1134, 1132, 1130, 1128, 1126, 1124, 1122, 1120, 1118, 1116, 1114, 1112, 1110, 1108, 1106, 1104, 1102, 1100, 1099, 1098, 1097, 1096, 1095, 1094, 1093, 1092, 1091, 1090, 1089, 1088, 1087, 1086, 1085, 1084, 1083, 1082, 1081, 1080, 1079, 1078, 1077, 1076, 1075, 1074, 1073, 1072, 1071, 1070, 1069, 1068, 1067, 1066, 1065, 1064, 1063, 1062, 1061, 1060, 1059, 1058, 1057, 1056, 1055, 1054, 1053, 1052, 1051, 1050, 1049, 1048, 1047, 1046, 1045, 1044, 1043, 1042, 1041, 1040, 1039, 1038, 1037, 1036, 1035, 1034, 1033, 1032, 1031, 1030, 1029, 1028, 1027, 1026, 1025, 1024, 1023, 1022, 1021, 1020, 1019, 1018, 1017, 1016, 1015, 1014, 1013, 1012, 1011, 1010, 1009, 1008, 1007, 1006, 1005, 1004, 1003, 1002, 1001, 1000, 999, 998, 997, 996, 995, 994, 993, 992, 991, 990, 989, 988, 987, 986, 985, 984, 983, 982, 981, 980, 979, 978, 977, 976, 975, 974, 973, 972, 971, 970, 969, 968, 967, 966, 965, 964, 963, 962, 961, 960, 959, 958, 957, 956, 955, 954, 953, 952, 951, 950, 949, 948, 947, 946, 945, 944, 943, 942, 941, 940, 939, 938, 937, 936, 935, 934, 933, 932, 931, 930, 929, 928, 927, 926, 925, 924, 923, 922, 921, 920, 919, 918, 917, 916, 915, 914, 913, 912, 911, 910, 909, 908, 907, 906, 905, 904, 903, 902, 901, 900, 899, 898, 897, 896, 895, 894, 893, 892, 891, 890, 889, 888, 887, 886, 885, 884, 883, 882, 881, 880, 879, 878, 877, 876, 875, 874, 873, 872, 871, 870, 869, 868, 867, 866, 865, 864, 863, 862, 861, 860, 859, 858, 857, 856, 855, 854, 853, 852, 851, 850, 849, 848, 847, 846, 845, 844, 843, 842, 841, 840, 839, 838, 837, 836, 835, 834, 833, 832, 831, 830, 829, 828, 827, 826, 825, 824, 823, 822, 821, 820, 819, 818, 817, 816, 815, 814, 813, 812, 811, 810, 809, 808, 807, 806, 805, 804, 803, 802, 801, 800, 799, 798, 797, 796, 795, 794, 793, 792, 791, 790, 789, 788, 787, 786, 785, 784, 783, 782, 781, 780, 779, 778, 777, 776, 775, 774, 773, 772, 771, 770, 769, 768, 767, 766, 765, 764, 763, 762, 761, 760, 759, 758, 757, 756, 755, 754, 753, 752, 751, 750, 749, 748, 747, 746, 745, 744, 743, 742, 741, 740, 739, 738, 737, 736, 735, 734, 733, 732, 731, 730, 729, 728, 727, 726, 725, 724, 723, 722, 721, 720, 719, 718, 717, 716, 715, 714, 713, 712, 711, 710, 709, 708, 707, 706, 705, 704, 703, 702, 701, 700, 699, 698, 697, 696, 695, 694, 693, 692, 691, 690, 689, 688, 687, 686, 685, 684, 683, 682, 681, 680, 679, 678, 677, 676, 675, 674, 673, 672, 671, 670, 669, 668, 667, 666, 665, 664, 663, 662, 661, 660, 659, 658, 657, 656, 655, 654, 653, 652, 651, 650, 649, 648, 647, 646, 645, 644, 643, 642, 641, 640, 639, 638, 637, 636, 635, 634, 633, 632, 631, 630, 629, 628, 627, 626, 625, 624, 623, 622, 621, 620, 619, 618, 617, 616, 615, 614, 613, 612, 611, 610, 609, 608, 607, 606, 605, 604, 603, 602, 601, 600, 599, 598, 597, 596, 595, 594, 593, 592, 591, 590, 589, 588, 587, 586, 585, 584, 583, 582, 581, 580, 579, 578, 577, 576, 575, 574, 573, 572, 571, 570, 569, 568, 567, 566, 565, 564, 563, 562, 561, 560, 559, 558, 557, 556, 555, 554, 553, 552, 551, 550, 549, 548, 547, 546, 545, 544, 543, 542, 541, 540, 539, 538, 537, 536, 535, 534, 533, 532, 531, 530, 529, 528, 527, 526, 525, 524, 523, 522, 521, 520, 519, 518, 517, 516, 515, 514, 513, 512, 511, 510, 509, 508, 507, 506, 505, 504, 503, 502, 501, 500, 499, 498, 497, 496, 495, 494, 493, 492, 491, 490, 489, 488, 487, 486, 485, 484, 483, 482, 481, 480, 479, 478, 477, 476, 475, 474, 473, 472, 471, 470, 469, 468, 467, 466, 465, 464, 463, 462, 461, 460, 459, 458, 457, 456, 455, 454, 453, 452, 451, 450, 449, 448, 447, 446, 445, 444, 443, 442, 441, 440, 439, 438, 437, 436, 435, 434, 433, 432, 431, 430, 429, 428, 427, 426, 425, 424, 423, 422, 421, 420, 419, 418, 417, 416, 415, 414, 413, 412, 411, 410, 409, 408, 407, 406, 405, 404, 403, 402, 401, 400, 399, 398, 397, 396, 395, 394, 393, 392, 391, 390, 389, 388, 387, 386, 385, 384, 383, 382, 381, 380, 379, 378, 377, 376, 375, 374, 373, 372, 371, 370, 369, 368, 367, 366, 365, 364, 363, 362, 361, 360, 359, 358, 357, 356, 355, 354, 353, 352, 351, 350, 349, 348, 347, 346, 345, 344, 343, 342, 341, 340, 339, 338, 337, 336, 335, 334, 333, 332, 331, 330, 329, 328, 327, 326, 325, 324, 323, 322, 321, 320, 319, 318, 317, 316, 315, 314, 313, 312, 311, 310, 309, 308, 307, 306, 305, 304, 303, 302, 301, 300, 299, 298, 297, 296, 295, 294, 293, 292, 291, 290, 289, 288, 287, 286, 285, 284, 283, 282, 281, 280, 279, 278, 277, 276, 275, 274, 273, 272, 271, 270, 269, 268, 267, 266, 265, 264, 263, 262, 261, 260, 259, 258, 257, 256, 255, 254, 253, 252, 251, 250, 249, 248, 247, 246, 245, 244, 243, 242, 241, 240, 239, 238, 237, 236, 235, 234, 233, 232, 231, 230, 229, 228, 227, 226, 225, 224, 223, 222, 221, 220, 219, 218, 217, 216, 215, 214, 213, 212, 211, 210, 209, 208, 207, 206, 205, 204, 203, 202, 201, 200, 199, 198, 197, 196, 195, 194, 193, 192, 191, 190, 189, 188, 187, 186, 185, 184, 183, 182, 181, 180, 179, 178, 177, 176, 175, 174, 173, 172, 171, 170, 169, 168, 167, 166, 165, 164, 163, 162, 161, 160, 159, 158, 157, 156, 155, 154, 153, 152, 151, 150, 149, 148, 147, 146, 145, 144, 143, 142, 141, 140, 139, 138, 137, 136, 135, 134, 133, 132, 131, 130, 129, 128, 127, 126, 125, 124, 123, 122, 121, 120, 119, 118, 117, 116, 115, 114, 113, 112, 111, 110, 109, 108, 107, 106, 105, 104, 103, 102, 101, 100
    ],
    s: [
        -3740, -3424.5, -3378.9, -3333.2, -3287.4, -3241.4, -3195.4, -3149.3, -3103.1, -3056.8, -3010.3, -2963.8, -2917.2, -2870.4, -2823.6, -2776.6, -2729.5, -2682.3, -2635, -2587.6, -2540.1, -2492.4, -2444.7, -2396.8, -2348.9, -2300.7, -2252.5, -2204.1, -2155.7, -2107.1, -2058.4, -2009.6, -1960.6, -1911.5, -1862.3, -1813, -1763.6, -1714, -1664.3, -1614.5, -1564.5, -1514.3, -1464.1, -1413.7, -1363.2, -1312.7, -1261.9, -1211, -1160, -1108, -1057.5, -1006.1, -954.5, -902.8, -850.9, -798.8, -746.6, -694.4, -641.8, -589.2, -536.4, -483.5, -430.4, -377.2, -323.8, -270.2, -216.5, -162.6, -108.6, -54.4, 0, 54.5, 109.2, 164.1, 219.2, 274.4, 329.8, 385.3, 441.1, 497, 553.1, 581.3, 609.4, 637.6, 665.8, 794.1, 722.5, 750.9, 779.3, 807.8, 836.4, 865, 893.6, 922.3, 951, 979.8, 1008.6, 1037.5, 1066.4, 1095.4, 1124.4, 1153.5, 1182.6, 1211.8, 1241, 1270.3, 1299.6, 1329, 1358.4, 1387.9, 1417.4, 1447, 1476.6, 1506.3, 1536.1, 1565.9, 1595.7, 1625.6, 1655.6, 1685.6, 1715.7, 1745.8, 1776, 1806.2, 1836.5, 1866.8, 1897.2, 1927.7, 1958.2, 1988.8, 2019.4, 2050.1, 2080.9, 2111.7, 2142.6, 2173.5, 2204.5, 2235.6, 2266.7, 2297.9, 2329.1, 2360.4, 2391.7, 2423.1, 2454.6, 2486.1, 2517.7, 2549.4, 2581.1, 2612.9, 2644.8, 2676.7, 2708.7, 2740.8, 2772.9, 2805.1, 2837.4, 2869.7, 2902.1, 2934.6, 2967.1, 2999.7, 3032.4, 3065.3, 3098.2, 3131.2, 3164.3, 3197.5, 3230.8, 3264.1, 3297.6, 3331.2, 3364.8, 3398.6, 3432.4, 3466.4, 3500.4, 3534.6, 3568.8, 3603.1, 3637.6, 3672.1, 3706.7, 3741.5, 3776.3, 3811.3, 3846.3, 3881.5, 3916.8, 3952.1, 3987.6, 4023.2, 4058.9, 4094.7, 4130.6, 4166.6, 4202.8, 4239, 4275.4, 4311.8, 4348.4, 4385.1, 4422, 4458.9, 4496, 4533.2, 4570.5, 4607.9, 4645.5, 4683.1, 4720.9, 4758.9, 4797, 4835.2, 4873.5, 4911.9, 4950.5, 4989.2, 5028.1, 5067, 5106.1, 5145.3, 5184.7, 5224.3, 5263.9, 5303.7, 5343.7, 5383.8, 5424, 5464.4, 5505, 5545.7, 5586.5, 5627.5, 5668.6, 5709.9, 5751.4, 5793, 5834.8, 5876.7, 5918.8, 5961.1, 6003.7, 6046.5, 6089.6, 6132.9, 6176.4, 6220.2, 6264.3, 6308.6, 6353.1, 6397.9, 6443, 6488.4, 6534.1, 6580, 6626.2, 6672.7, 6719.4, 6766.5, 6813.8, 6837.6, 6861.5, 6885.4, 6909.4, 6933.5, 6957.6, 6981.9, 7006.2, 7030.6, 7055.1, 7079.7, 7104.3, 7129, 7153.8, 7178.7, 7203.6, 7228.6, 7253.7, 7278.9, 7304.2, 7329.7, 7355.2, 7380.8, 7406.4, 7432.1, 7457.9, 7483.8, 7509.8, 7535.9, 7562, 7588.3, 7614.6, 7641, 7667.5, 7694.2, 7720.9, 7747.7, 7774.6, 7801.5, 7828.5, 7855.7, 7883, 7910.4, 7937.9, 7965.5, 7993.1, 8021, 8049.1, 8077.5, 8106.1, 8134.9, 8163.9, 8193.1, 8222.5, 8252.1, 8282, 8312.1, 8342.4, 8373, 8403.8, 8416.2, 8428.6, 8441.1, 8453.6, 8466.1, 8478.7, 8491.3, 8504, 8516.7, 8529.4, 8542.2, 8555, 8567.9, 8580.8, 8593.7, 8606.7, 8619.7, 8632.8, 8645.9, 8659, 8672.2, 8685.4, 8698.6, 8711.9, 8725.3, 8738.7, 8752.1, 8765.6, 8779.1, 8792.7, 8806.3, 8820, 8833.7, 8847.5, 8861.3, 8875.1, 8889, 8903, 8917.1, 8931.3, 8945.6, 8960, 8974.5, 8989.1, 9003.8, 9018.5, 9033.4, 9048.4, 9063.4, 9078.6, 9093.9, 9109.3, 9124.7, 9140.3, 9156, 9171.8, 9187.7, 9203.7, 9219.8, 9236, 9252.3, 9268.8, 9285.3, 9302, 9318.8, 9335.7, 9352.7, 9369.9, 9387.1, 9404.5, 9422, 9439.6, 9457.3, 9475.2, 9493.2, 9511.3, 9529.5, 9547.9, 9566.4, 9585, 9603.7, 9622.6, 9641.6, 9660.8, 9680.1, 9699.5, 9719.1, 9738.8, 9758.6, 9778.6, 9798.7, 9819, 9839.4, 9860, 9880.7, 9901.6, 9922.6, 9943.8, 9965.1, 9986.6, 9997.4, 10008.3, 10019.2, 10030.1, 10041, 10052, 10063, 10074.1, 10085.2, 10096.4, 10107.6, 10118.8, 10130.1, 10141.4, 10152.7, 10164.1, 10175.6, 10187.1, 10198.6, 10210.2, 10221.8, 10233.5, 10245.2, 10257, 10268.8, 10280.6, 10292.5, 10304.4, 10316.4, 10328.4, 10340.5, 10352.6, 10364.7, 10376.9, 10389.2, 10401.5, 10413.8, 10426.2, 10438.6, 10451.1, 10463.6, 10476.2, 10488.8, 10501.5, 10514.2, 10527, 10539.8, 10550.6, 10565.5, 10578.5, 10591.5, 10604.5, 10617.6, 10630.8, 10644, 10657.2, 10670.5, 10683.9, 10697.3, 10710.8, 10724.3, 10737.9, 10751.5, 10765.2, 10779, 10792.8, 10806.6, 10820.5, 10834.4, 10848.4, 10862.4, 10876.5, 10890.7, 10904.9, 10919.1, 10933.4, 10947.8, 10962.2, 10976.7, 10991.3, 11005.9, 11020.6, 11035.3, 11050.1, 11064.9, 11079.8, 11094.8, 11109.8, 11124.9, 11140, 11155.2, 11170.4, 11185.7, 11201.1, 11216.5, 11232, 11247.6, 11263.2, 11278.9, 11294.7, 11310.5, 11326.4, 11342.4, 11358.4, 11374.5, 11390.6, 11406.8, 11423.1, 11439.4, 11455.8, 11472.3, 11488.8, 11505.4, 11522, 11538.7, 11555.5, 11572.4, 11589.3, 11606.3, 11623.4, 11640.6, 11657.8, 11675.1, 11692.4, 11709.8, 11727.3, 11744.9, 11762.6, 11780.3, 11798.1, 11816, 11834, 11852, 11870, 11888.1, 11906.2, 11924.3, 11942.5, 11960.7, 11979, 11997.3, 12015.6, 12034, 12052.4, 12070.8, 12089.3, 12107.9, 12126.4, 12145, 12163.7, 12182.4, 12201.1, 12219.9, 12238.7, 12257.5, 12276.4, 12295.4, 12314.3, 12333.3, 12352.4, 12371.5, 12390.6, 12409, 12429, 12448.2, 12467.5, 12486.8, 12506.2, 12525.6, 12545.1, 12564.6, 12584.2, 12603.8, 12623.4, 12643.1, 12662.8, 12682.6, 12702.4, 12722.2, 12742.1, 12762, 12782, 12802, 12822, 12842.1, 12862.3, 12882.5, 12902.7, 12923, 12943.3, 12963.7, 12984.1, 13004.5, 13025, 13045.6, 13066.2, 13086.8, 13107.5, 13128.2, 13149, 13169.8, 13190.7, 13211.6, 13232.6, 13253.6, 13274.7, 13295.8, 13316.9, 13338.1, 13359.4, 13380.7, 13402, 13423.4, 13444.9, 13466.4, 13487.9, 13509.5, 13531.1, 13552.8, 13574.5, 13596.3, 13618.1, 13640, 13661.9, 13683.9, 13705.9, 13728, 13750.1, 13772.3, 13794.5, 13816.8, 13839.1, 13861.5, 13883.9, 13906.4, 13929, 13951.6, 13974.2, 13996.9, 14019.7, 14042.5, 14065.4, 14088.3, 14111.3, 14134.3, 14157.4, 14180.5, 14203.7, 14226.9, 14250.2, 14273.5, 14296.9, 14320.4, 14343.9, 14367.5, 14391.1, 14414.8, 14438.5, 14462.3, 14486.2, 14510.1, 14534, 14558, 14582.1, 14606.2, 14630.4, 14654.7, 14679, 14703.4, 14727.8, 14752.3, 14776.8, 14801.4, 14826.1, 14850.8, 14875.6, 14900.5, 14925.4, 14950.4, 14975.4, 15000.5, 15025.6, 15050.8, 15076.1, 15101.5, 15126.9, 15152.4, 15177.9, 15203.5, 15229.1, 15254.8, 15280.6, 15306.4, 15332.3, 15358.3, 15384.3, 15410.4, 15436.6, 15462.8, 15489.1, 15515.5, 15541.9, 15568.4, 15594.9, 15621.5, 15648.2, 15675, 15701.8, 15728.7, 15755.6, 15782.7, 15809.8, 15836.9, 15864.1, 15891.3, 15918.6, 15945.9, 15973.2, 16000.6, 16028, 16055.4, 16082.9, 16110.4, 16137.9, 16165.5, 16193.1, 16220.7, 16248.4, 16276.1, 16303.9, 16331.7, 16359.5, 16387.4, 16415.3, 16443.2, 16471.2, 16499.2, 16527.3, 16555.4, 16583.5, 16611.6, 16639.8, 16668, 16696.3, 16724.6, 16752.9, 16781.3, 16809.7, 16838.2, 16866.7, 16895.2, 16923.8, 16952.4, 16981.1, 17009.8, 17038.5, 17067.3, 17096.1, 17124.9, 17153.8, 17182.7, 17211.7, 17240.7, 17269.7, 17298.8, 17327.9, 17357, 17386.2, 17415.4, 17444.7, 17474, 17503.3, 17532.7, 17562.2, 17591.7, 17621.2, 17650.7, 17680.3, 17710, 17739.7, 17769.5, 17799.3, 17829.1, 17859, 17888.9, 17918.9, 17948.9, 17978.9, 18009, 18039.1, 18069.2, 18099.3, 18129.5, 18159.8, 18190.1, 18220.4, 18250.8, 18281.2, 18311.7, 18342.2, 18372.8, 18403.4, 18434, 18464.7, 18495.5, 18526.3, 18557.1, 18588, 18618.9, 18649.9, 18680.9, 18711.9, 18743, 18774.1, 18805.3, 18836.6, 18867.9, 18899.2, 18930.6, 18962, 18993.5, 19025, 19056.6, 19088.2, 19119.9, 19151.6, 19183.3, 19215.1, 19247, 19278.9, 19310.8, 19342.8, 19374.8, 19406.9, 19439, 19471.2, 19503.4, 19535.7, 19568, 19600.4, 19632.8, 19665.3, 19697.8, 19730.4, 19736, 19795.7, 19828.4, 19861.2, 19894, 19926.9, 19959.8, 19992.8, 20025.8, 20058.9, 20092, 20125.2, 20158.5, 20191.8, 20225.1, 20258.5, 20291.9, 20325.4, 20359, 20392.6, 20426.2, 20459.9, 20493.7, 20527.5, 20561.4, 20595.3, 20629.3, 20663.3, 20697.4, 20731.5, 20765.7, 20800, 20834.3, 20868.6, 20903, 20937.5, 20972, 21006.6, 21041.2, 21075.9, 21110.6, 21145.4, 21180.3, 21215.2, 21250.2, 21285.2, 21320.3, 21355.4, 21390.6, 21425.9, 21416.2, 21496.6, 21532, 21567.5, 21603.1, 21638.7, 21674.4, 21710.1, 21745.9, 21781.7, 21817.6, 21853.6, 21889.6, 21925.7, 21961.9, 21998.1, 22034.4, 22070.7, 22107.1, 22143.5, 22180, 22216.6, 22253.3, 22290, 22326.8, 22363.6, 22400.5, 22437.5, 22474.5, 22511.6, 22548.7, 22585.9, 22623.2, 22660.6, 22698, 22735.5, 22773.1, 22810.7, 22848.4, 22886.1, 22924, 22961.9, 22999.8, 23037.8, 23075.9, 23114.1, 23152.3, 23190.6, 23228.9, 23267.3, 23305.8, 23344.4, 23383.1, 23421.8, 23460.5, 23499.4, 23538.3, 23577.3, 23616.4, 23655.5, 23694.7, 23734, 23773.3, 23812.7, 23852.2, 23891.8, 23931.4, 23971.1, 24010.9, 24050.8, 24090.7, 24130.7, 24170.8, 24210.9, 24251.2, 24291.5, 24331.9, 24372.4, 24412.9, 24453.5, 24494.2, 24535, 24575.9, 24616.8, 24657.8, 24698.9, 24740, 24781.2, 24822.5, 24863.9, 24905.4, 24946.9, 24988.6, 25030.3, 25072.1, 25114, 25156, 25198, 25240.2, 25282.4, 25324.7, 25367.1, 25409.6, 25452.2, 25494.9, 25537.6, 25580.4, 25623.3, 25666.3, 25709.3, 25752.5, 25795.7, 25839.1, 25882.5, 25926, 25969.6, 26013.3, 26057.1, 26100.9, 26144.9, 26188.9, 26233.1, 26277.3, 26321.7, 26366.1, 26410.6, 26455.2, 26499.9, 26544.6, 26589.5, 26634.5, 26679.5, 26724.7, 26770, 26815.3, 26860.8, 26906.3, 26952, 26997.7, 27043.6, 27089.5, 27135.5, 27181.7, 27227.9, 27274.3, 27320.7, 27367.2, 27413.9, 27460.6, 27507.4, 27554.4, 27601.4, 27648.6, 27695.8, 27743.2, 27790.7, 27838.3, 27885.9, 27933.7, 27981.6, 28029.6, 28077.7, 28125.9, 28174.3, 28222.7, 28271.3, 28320, 28368.7, 28417.6, 28466.6, 28515.7, 28565, 28614.3, 28663.7, 28713.3, 28763, 28812.8, 28862.6, 28912.6, 28962.8, 29013, 29063.4, 29113.9, 29164.5, 29215.2, 29266.1, 29317.1, 29368.2, 29419.4, 29470.7, 29522.2, 29573.8, 29625.6, 29677.4, 29729.4, 29781.5, 29833.7, 29886, 29938.5, 29991.1, 30043.8, 30096.7, 30149.7, 30202.8, 30256.1, 30309.5, 30363, 30416.7, 30470.5, 30524.4, 30578.5, 30632.7, 30687, 30741.5, 30796.1, 30850.9, 30905.8, 30960.9, 31016.1, 31071.4, 31126.9, 31182.5, 31238.2, 31294.1, 31350.2, 31406.4, 31462.7, 31519.2, 31575.9, 31632.7, 31689.6, 31746.7, 31804, 31861.4, 31919, 31976.7, 32034.6, 32092.6, 32150.8, 32209.1, 32267.6, 32326.3, 32385.1, 32444.1, 32503.3, 32562.6, 32622.1, 32681.8, 32741.6, 32801.6, 32861.8, 32922.1, 32982.6, 33043.3, 33104.1, 33165.1, 33226.3, 33287.7, 33349.2, 33410.9, 33472.8, 33534.9, 33597.2, 33659.6, 33722.2, 33785, 33848, 33911.2, 33974.5, 34038, 34101.8, 34165.7, 34229.9, 34294.2, 34358.7, 34423.4, 34488.3, 34553.4, 34618.7, 34684.2, 34749.9, 34815.9, 34882, 34948.3, 35014.8, 35081.5, 35148.4, 35215.6, 35282.9, 35350.5, 35418.3, 35486.3, 35554.5, 35622.9, 35691.5, 35760.4, 35829.5, 35898.8, 35968.3, 36038.1, 36108.1, 36178.3, 36248.8, 36319.5, 36390.4, 36461.6, 36533, 36604.7, 36676.6, 36748.7, 36821.1, 36893.7, 36966.5, 37039.6, 37113, 37186.6, 37260.5, 37334.6, 37409, 37483.6, 37558.5, 37633.7, 37709.1, 37784.8, 37860.8, 37937, 38013.5, 38090.3, 38167.3, 38244.7, 38322.3, 38400.2, 38478.4, 38556.9, 38635.6, 38714.7, 38794.1, 38873.7, 38953.7, 39033.9, 39114.5, 39195.3, 39276.5, 39357.9, 39439.7, 39521.8, 39604.2, 39686.9, 39770, 39853.4, 39937.1, 40021.1, 40105.4, 40190.1, 40275.1, 40360.5, 40446.2, 40532.3, 40618.7, 40705.5, 40792.6, 40880, 40967.8, 41056, 41144.6, 41233.5, 41322.8, 41412.5, 41502.5, 41592.9, 41683.7, 41774.9, 41866.5, 41958.5, 42050.9, 42143.7, 42236.9, 42330.6, 42424.6, 42519.1, 42613.9, 42709, 42804.6, 42900.7, 42997.2, 43094.2, 43191.6, 43289.5, 43387.9, 43486.7, 43585.9, 43685.6, 43785.8, 43886.4, 43987.5, 44089.1, 44191.2, 44293.7, 44396.8, 44500.3, 44604.4, 44708.9, 44814, 44919.6, 45025.7, 45132.4, 45239.6, 45347.4, 45455.7, 45564.5, 45673.9, 45783.9, 45894.4, 46005.5, 46117.1, 46229.4, 46342.2, 46455.7, 46569.8, 46684.4, 46799.7, 46915.6, 47032.1, 47149.3, 47267.1, 47385.6, 47504.8, 47624.6, 47745.1, 47866.2, 47988, 48110.4, 48233.6, 48357.6, 48482.4, 48607.9, 48734.1, 48861, 48988.6, 49117.1, 49246.3, 49376.3, 49507.1, 49638.8, 49771.2, 49904.4, 50038.5, 50173.4, 50309.2, 50445.8, 50583.3, 50721.7, 50861, 51001.2, 51142.4, 51284.5, 51427.6, 51571.6, 51716.6, 51862.5, 52009.5, 52157.5, 52306.5, 52456.6, 52607.7, 52759.9, 52913.2, 53067.6, 53223.1, 53379.8, 53537.6, 53696.6, 53856.8, 54018.2, 54180.8, 54344.7, 54509.9, 54676.3, 54844.1, 55013.1, 55183.5, 55355.2, 55528.4, 55702.9, 55878.9, 56056.4, 56235.4, 56415.9, 56597.9, 56781.5, 56966.6, 57153.4, 57341.8, 57531.9, 57723.7, 57917.2, 58112.5, 58309.6, 58508.5, 58709.3, 58912, 59116.7, 59323.3, 59531.9, 59742.6, 59955.4
    ],
    t: [
        -0.818, -0.809, -0.8, -0.791, -0.781, -0.722, -0.762, -0.753, -0.743, -0.734, -0.724, -0.714, -0.705, -0.695, -0.685, -0.675, -0.665, -0.655, -0.645, -0.634, -0.624, -0.614, -0.604, -0.593, -0.583, -0.572, -0.561, -0.55, -0.539, -0.528, -0.517, -0.506, -0.495, -0.484, -0.472, -0.461, -0.449, -0.438, -0.426, -0.414, -0.402, -0.39, -0.378, -0.366, -0.354, -0.342, -0.33, -0.317, -0.305, -0.292, -0.279, -0.266, -0.253, -0.24, -0.226, -0.213, -0.2, -0.186, -0.173, -0.159, -0.145, -0.131, -0.117, -0.103, -0.088, -0.074, -0.059, -0.045, -0.03, -0.015, 0, 0.015, 0.03, 0.046, 0.062, 0.077, 0.093, 0.109, 0.125, 0.142, 0.158, 0.166, 0.175, 0.183, 0.192, 0.2, 0.208, 0.217, 0.225, 0.234, 0.243, 0.251, 0.26, 0.269, 0.278, 0.286, 0.295, 0.304, 0.313, 0.322, 0.331, 0.34, 0.349, 0.359, 0.368, 0.377, 0.386, 0.396, 0.405, 0.415, 0.424, 0.434, 0.443, 0.453, 0.463, 0.472, 0.482, 0.492, 0.502, 0.512, 0.522, 0.532, 0.542, 0.552, 0.563, 0.573, 0.583, 0.593, 0.604, 0.614, 0.625, 0.635, 0.646, 0.657, 0.668, 0.679, 0.69, 0.701, 0.712, 0.723, 0.734, 0.745, 0.756, 0.767, 0.779, 0.79, 0.802, 0.813, 0.825, 0.837, 0.849, 0.86, 0.872, 0.884, 0.896, 0.908, 0.921, 0.933, 0.945, 0.957, 0.97, 0.983, 0.995, 1.008, 1.021, 1.034, 1.047, 1.06, 1.073, 1.087, 1.1, 1.113, 1.127, 1.141, 1.154, 1.168, 1.182, 1.196, 1.21, 1.225, 1.239, 1.253, 1.268, 1.282, 1.297, 1.312, 1.327, 1.342, 1.357, 1.373, 1.388, 1.403, 1.419, 1.435, 1.45, 1.466, 1.482, 1.499, 1.515, 1.531, 1.548, 1.565, 1.581, 1.598, 1.615, 1.633, 1.65, 1.667, 1.685, 1.703, 1.721, 1.739, 1.757, 1.776, 1.794, 1.813, 1.832, 1.851, 1.87, 1.889, 1.909, 1.929, 1.948, 1.968, 1.989, 2.009, 2.03, 2.05, 2.071, 2.093, 2.114, 2.135, 2.157, 2.179, 2.201, 2.223, 2.246, 2.263, 2.291, 2.315, 2.338, 2.362, 2.386, 2.41, 2.434, 2.458, 2.483, 2.508, 2.534, 2.56, 2.586, 2.612, 2.639, 2.666, 2.693, 2.721, 2.749, 2.777, 2.806, 2.835, 2.865, 2.88, 2.895, 2.91, 2.926, 2.941, 2.956, 2.972, 2.987, 3.003, 3.019, 3.035, 3.051, 3.067, 3.083, 3.099, 3.115, 3.132, 3.148, 3.165, 3.182, 3.199, 3.216, 3.233, 3.251, 3.268, 3.286, 3.303, 3.321, 3.339, 3.357, 3.375, 3.393, 3.412, 3.43, 3.449, 3.467, 3.486, 3.506, 3.525, 3.544, 3.563, 3.583, 3.603, 3.623, 3.643, 3.663, 3.683, 3.704, 3.725, 3.746, 3.767, 3.789, 3.811, 3.833, 3.855, 3.878, 3.901, 3.924, 3.947, 3.971, 3.98, 3.99, 4, 4.009, 4.019, 4.029, 4.038, 4.048, 4.058, 4.068, 4.078, 4.088, 4.098, 4.108, 4.118, 4.128, 4.139, 4.149, 4.159, 4.17, 4.18, 4.191, 4.202, 4.212, 4.223, 4.234, 4.244, 4.255, 4.266, 4.277, 4.288, 4.299, 4.311, 4.322, 4.333, 4.344, 4.356, 4.367, 4.378, 4.39, 4.402, 4.413, 4.425, 4.437, 4.449, 4.461, 4.474, 4.486, 4.498, 4.511, 4.524, 4.537, 4.55, 4.563, 4.576, 4.589, 4.603, 4.616, 4.63, 4.644, 4.658, 4.672, 4.686, 4.7, 4.714, 4.729, 4.743, 4.758, 4.773, 4.788, 4.803, 4.819, 4.834, 4.849, 4.865, 4.881, 4.897, 4.913, 4.929, 4.945, 4.962, 4.978, 4.995, 5.012, 5.029, 5.046, 5.063, 5.081, 5.098, 5.116, 5.134, 5.152, 5.171, 5.189, 5.208, 5.227, 5.246, 5.265, 5.284, 5.304, 5.314, 5.324, 5.333, 5.343, 5.353, 5.363, 5.374, 5.384, 5.394, 5.404, 5.414, 5.425, 5.435, 5.445, 5.456, 5.466, 5.477, 5.488, 5.498, 5.509, 5.52, 5.531, 5.541, 5.552, 5.563, 5.574, 5.586, 5.597, 5.608, 5.619, 5.63, 5.642, 5.653, 5.664, 5.676, 5.687, 5.699, 5.71, 5.722, 5.734, 5.746, 5.758, 5.77, 5.782, 5.794, 5.806, 5.818, 5.83, 5.843, 5.855, 5.867, 5.88, 5.892, 5.905, 5.917, 5.93, 5.942, 5.955, 5.968, 5.981, 5.994, 6.007, 6.02, 6.033, 6.047, 6.06, 6.073, 6.087, 6.1, 6.114, 6.128, 6.141, 6.155, 6.169, 6.183, 6.197, 6.211, 6.226, 6.24, 6.254, 6.268, 6.283, 6.297, 6.311, 6.326, 6.341, 6.355, 6.37, 6.385, 6.4, 6.415, 6.43, 6.445, 6.461, 6.476, 6.491, 6.507, 6.522, 6.538, 6.554, 6.57, 6.586, 6.602, 6.618, 6.634, 6.65, 6.667, 6.683, 6.699, 6.716, 6.733, 6.749, 6.766, 6.783, 6.8, 6.817, 6.834, 6.851, 6.869, 6.886, 6.903, 6.921, 6.939, 6.957, 6.974, 6.992, 7.01, 7.029, 7.047, 7.065, 7.084, 7.102, 7.121, 7.14, 7.158, 7.177, 7.196, 7.215, 7.234, 7.253, 7.272, 7.291, 7.31, 7.329, 7.349, 7.368, 7.387, 7.407, 7.426, 7.446, 7.466, 7.485, 7.505, 7.525, 7.545, 7.565, 7.585, 7.606, 7.626, 7.646, 7.666, 7.687, 7.707, 7.728, 7.748, 7.769, 7.789, 7.81, 7.831, 7.852, 7.873, 7.894, 7.915, 7.936, 7.958, 7.979, 8, 8.022, 8.043, 8.065, 8.087, 8.108, 8.13, 8.152, 8.174, 8.196, 8.218, 8.241, 8.263, 8.285, 8.307, 8.33, 8.352, 8.375, 8.397, 8.42, 8.443, 8.466, 8.489, 8.512, 8.535, 8.558, 8.582, 8.605, 8.628, 8.652, 8.676, 8.699, 8.723, 8.747, 8.771, 8.795, 8.819, 8.843, 8.808, 8.892, 8.916, 8.941, 8.965, 8.99, 9.015, 9.04, 9.065, 9.09, 9.115, 9.14, 9.166, 9.191, 9.216, 9.242, 9.268, 9.293, 9.319, 9.345, 9.371, 9.397, 9.423, 9.449, 9.475, 9.502, 9.529, 9.555, 9.582, 9.609, 9.636, 9.663, 9.69, 9.717, 9.745, 9.772, 9.799, 9.827, 9.855, 9.882, 9.91, 9.938, 9.966, 9.994, 10.023, 10.051, 10.079, 10.108, 10.136, 10.165, 10.194, 10.223, 10.252, 10.281, 10.311, 10.34, 10.369, 10.399, 10.429, 10.459, 10.489, 10.519, 10.549, 10.579, 10.609, 10.64, 10.671, 10.701, 10.732, 10.763, 10.795, 10.826, 10.857, 10.889, 10.92, 10.952, 10.984, 11.016, 11.048, 11.08, 11.112, 11.144, 11.177, 11.209, 11.242, 11.275, 11.308, 11.341, 11.374, 11.407, 11.441, 11.474, 11.508, 11.542, 11.576, 11.61, 11.644, 11.679, 11.713, 11.748, 11.782, 11.817, 11.852, 11.887, 11.922, 11.957, 11.992, 12.027, 12.063, 12.098, 12.133, 12.169, 12.205, 12.241, 12.277, 12.313, 12.349, 12.386, 12.422, 12.458, 12.495, 12.532, 12.568, 12.605, 12.642, 12.679, 12.716, 12.753, 12.791, 12.828, 12.865, 12.903, 12.941, 12.978, 13.016, 13.054, 13.092, 13.13, 13.168, 13.207, 13.245, 13.284, 13.322, 13.361, 13.4, 13.439, 13.478, 13.517, 13.557, 13.596, 13.635, 13.675, 13.715, 13.755, 13.795, 13.835, 13.875, 13.916, 13.956, 13.996, 14.037, 14.078, 14.119, 14.16, 14.201, 14.242, 14.283, 14.325, 14.366, 14.408, 14.449, 14.491, 14.533, 14.576, 14.618, 14.66, 14.702, 14.745, 14.788, 14.83, 14.873, 14.916, 14.959, 15.003, 15.046, 15.09, 15.134, 15.177, 15.221, 15.266, 15.31, 15.354, 15.399, 15.443, 15.488, 15.533, 15.578, 15.623, 15.669, 15.714, 15.759, 15.805, 15.851, 15.897, 15.943, 15.989, 16.035, 16.082, 16.128, 16.175, 16.221, 16.286, 16.316, 16.363, 16.41, 16.458, 16.506, 16.554, 16.602, 16.65, 16.698, 16.747, 16.795, 16.844, 16.893, 16.942, 16.991, 17.04, 17.09, 17.139, 17.189, 17.239, 17.289, 17.339, 17.389, 17.44, 17.491, 17.542, 17.593, 17.644, 17.696, 17.747, 17.799, 17.851, 17.903, 17.955, 18.007, 18.06, 18.112, 18.165, 18.218, 18.271, 18.324, 18.378, 18.431, 18.485, 18.539, 18.593, 18.647, 18.701, 18.756, 18.811, 18.866, 18.921, 18.976, 19.032, 19.088, 19.144, 19.2, 19.256, 19.313, 19.369, 19.426, 19.483, 19.541, 19.598, 19.655, 19.713, 19.771, 19.829, 19.887, 19.946, 20.005, 20.064, 20.123, 20.182, 20.241, 20.301, 20.361, 20.421, 20.481, 20.542, 20.603, 20.664, 20.725, 20.786, 20.847, 20.909, 20.971, 21.033, 21.096, 21.158, 21.221, 21.284, 21.347, 21.411, 21.475, 21.539, 21.603, 21.667, 21.732, 21.796, 21.861, 21.927, 21.992, 22.058, 22.124, 22.19, 22.257, 22.323, 22.39, 22.457, 22.525, 22.592, 22.66, 22.728, 22.796, 22.865, 22.934, 23.003, 23.072, 23.141, 23.211, 23.281, 23.351, 23.422, 23.493, 23.564, 23.635, 23.707, 23.779, 23.851, 23.923, 23.996, 24.069, 24.142, 24.215, 24.289, 24.363, 24.437, 24.512, 24.587, 24.662, 24.737, 24.813, 24.889, 24.965, 25.042, 25.119, 25.196, 25.273, 25.351, 25.429, 25.507, 25.586, 25.665, 25.774, 25.824, 25.904, 25.984, 26.065, 26.146, 26.227, 26.308, 26.39, 26.472, 26.554, 26.637, 26.72, 26.803, 26.887, 26.971, 27.055, 27.14, 27.225, 27.31, 27.396, 27.482, 27.568, 27.655, 27.742, 27.83, 27.918, 28.006, 28.094, 28.183, 28.272, 28.362, 28.452, 28.542, 28.633, 28.742, 28.815, 28.907, 28.999, 29.092, 29.185, 29.278, 29.372, 29.466, 29.561, 29.656, 29.751, 29.847, 29.943, 30.04, 30.137, 30.235, 30.333, 30.431, 30.53, 30.629, 30.729, 30.829, 30.929, 31.03, 31.131, 31.233, 31.335, 31.438, 31.541, 31.644, 31.748, 31.853, 31.958, 32.063, 32.169, 32.275, 32.382, 32.489, 32.597, 32.705, 32.814, 32.923, 33.033, 33.143, 33.254, 33.365, 33.477, 33.589, 33.702, 33.815, 33.929, 34.043, 34.158, 34.273, 34.389, 34.505, 34.622, 34.74, 34.858, 34.977, 35.096, 35.216, 35.336, 35.457, 35.579, 35.701, 35.824, 35.947, 36.071, 36.195, 36.32, 36.446, 36.572, 36.699, 36.827, 36.955, 37.084, 37.213, 37.343, 37.474, 37.605, 37.737, 37.87, 38.003, 38.137, 38.272, 38.407, 38.543, 38.68, 38.818, 38.956, 39.095, 39.234, 39.374, 39.515, 39.657, 39.799, 39.942, 40.086, 40.231, 40.376, 40.522, 40.669, 40.817, 40.966, 41.115, 41.265, 41.416, 41.568, 41.72, 41.873, 42.027, 42.182, 42.338, 42.495, 42.652, 42.81, 42.969, 43.129, 43.29, 43.452, 43.615, 43.778, 43.943, 44.108, 44.275, 44.442, 44.61, 44.78, 44.95, 45.121, 45.293, 45.466, 45.64, 45.815, 45.991, 46.168, 46.346, 46.526, 46.706, 46.887, 47.069, 47.253, 47.437, 47.622, 47.809, 47.997, 48.186, 48.376, 48.567, 48.759, 48.953, 49.147, 49.343, 49.54, 49.738, 49.937, 50.138, 50.34, 50.543, 50.749, 50.953, 51.16, 51.368, 51.577, 51.788, 52, 52.214, 52.429, 52.645, 52.863, 53.082, 53.302, 53.524, 53.747, 53.972, 54.198, 54.426, 54.655, 54.886, 55.118, 55.352, 55.587, 55.824, 56.062, 56.302, 56.544, 56.787, 57.032, 57.279, 57.527, 57.777, 58.029, 58.282, 58.537, 58.794, 59.052, 59.313, 59.575, 59.839, 60.105, 60.373, 60.643, 60.915, 61.189, 61.465, 61.742, 62.022, 62.304, 62.588, 62.874, 63.162, 63.452, 63.744, 64.038, 64.335, 64.634, 64.935, 65.238, 65.544, 65.852, 66.162, 66.475, 66.79, 67.108, 67.428, 67.75, 68.075, 68.403, 68.733, 69.066, 69.401, 69.739, 70.08, 70.424, 70.77, 71.12, 71.427, 71.826, 72.184, 72.545, 72.908, 73.275, 73.644, 74.016, 74.392, 74.771, 75.153, 75.538, 75.927, 76.319, 76.715, 77.114, 77.517, 77.923, 78.333, 78.746, 79.163, 79.584, 80.009, 80.437, 80.869, 81.305, 81.745, 82.189, 82.637, 83.089, 83.545, 84.006, 84.471, 84.94, 85.413, 85.891, 86.374, 86.861, 87.353, 87.849, 88.35, 88.857, 89.368, 89.885, 90.406, 90.933, 91.465, 92.002, 92.545, 93.093, 93.647, 94.207, 94.772, 95.343, 95.921, 96.504, 97.093, 97.689, 98.291, 98.899, 99.514, 100.13, 100.76, 101.4, 102.04, 102.69, 103.35, 104.01, 104.68, 105.36, 106.05, 106.74, 107.44, 108.15, 108.87, 109.6, 110.33, 111.08, 11.83, 112.59, 113.37, 114.15, 114.94, 115.74, 116.55, 117.37, 118.2, 119.04, 119.89, 120.75, 121.62, 122.51, 123.4, 124.31, 125.23, 126.16, 127.11, 128.06, 129.03, 130.02, 131.01, 132.02, 133.05, 134.09, 135.14, 136.21, 137.29, 138.39, 139.5, 140.63, 141.78, 142.95, 144.13, 145.33, 146.55, 147.78, 149.04, 150.31, 151.61, 152.93, 154.26, 155.62, 157, 158.4, 159.83, 161.28, 162.75, 164.25, 165.77, 167.32, 168.89, 170.5, 172.13, 173.79, 175.48, 177.2, 178.95, 180.73, 182.55, 184.4, 186.29, 188.21, 190.16, 192.16, 194.2, 196.27, 198.39
    ]
};


/***/ }),

/***/ "./src/app/ballistics-module/services/atmospheric.service.ts":
/*!*******************************************************************!*\
  !*** ./src/app/ballistics-module/services/atmospheric.service.ts ***!
  \*******************************************************************/
/*! exports provided: AtmosphericService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AtmosphericService", function() { return AtmosphericService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AtmosphericService = /** @class */ (function () {
    function AtmosphericService() {
        // Altitude Adjustment Factor At Altitude (Feet / 1000)
        this.altitudeAdjustmentFactorTable = [1, 1.031, 1.062, 1.095, 1.128, 1.163, 1.199, 1.236, 1.273, 1.313, 1.353, 1.394, 1.437, 1.481, 1.527, 1.573];
        // Standard Barometric Pressure (Inches Hg) At Altitude (Feet / 1000)
        this.barometricPressureTable = [29.53, 28.45, 27.41, 26.41, 25.45, 24.52, 23.62, 22.75, 21.91, 21.11, 20.33, 19.58, 18.85, 18.16, 17.48, 16.83];
        // Drop table = currentVelocity/muzzleVelocity (Feet Per Second / 1000)
        this.dropTable = [113, 114, 115, 115.5, 116, 117, 118, 118.5, 119, 120, 121, 121.5, 122, 123, 124, 124.5, 125, 126, 127, 127.5, 128, 129, 130, 130.5, 131, 131, 133, 133.5, 134, 135, 136, 136.5, 137, 138, 139, 140.5, 142, 143, 144, 144.5, 145, 146.5, 148, 149, 150, 151, 152, 153, 154, 155, 156, 156.5, 157, 158.5, 160, 160.5, 161, 161.5, 162, 163, 164, 165, 166, 166.5, 167, 168, 169, 169.5, 170, 171, 172, 173, 174, 174.5, 175, 175.5, 176, 177, 178, 179, 180, 180.5, 181, 181.5, 182, 183, 184, 184.5, 185, 185.5, 186, 196.5, 187, 188.5, 190, 190.5, 191, 191.5, 192, 192.5, 193];
        this.speedOfSoundAtSeaLevel = 1120.27; // Feet Per Second
        // Temperature table = Standard Temperature (Degrees F) At Altitude (Feet / 1000)
        this.temperatureTable = [59, 55.4, 51.9, 48.3, 44.7, 41.2, 37.6, 34.1, 30.5, 26.9, 23.4, 19.8, 16.2, 12.7, 9.1, 5.5];
        // Vapor Pressure Of Water (Inches Hg) At Temperature (Degrees F / 2)
        this.vaporPressureOfWaterTable = [0.04, 0.04, 0.05, 0.05, 0.06, 0.06, 0.07, 0.08, 0.08, 0.09, 0.1, 0.11, 0.12, 0.14, 0.15, 0.16, 0.18, 0.2, 0.21, 0.23, 0.25, 0.27, 0.29, 0.31, 0.34, 0.36, 0.39, 0.42, 0.45, 0.49, 0.52, 0.56, 0.6, 0.64, 0.69, 0.74, 0.79, 0.85, 0.9, 0.97, 1.03, 1.1, 1.18, 1.25, 1.34, 1.42, 1.51, 1.61, 1.71, 1.82, 1.93, 2.05, 2.18, 2.31, 2.45, 2.6, 2.75, 2.91, 3.08, 3.26, 3.45, 3.64];
        this.weightDensityOfAirAtSeaLevel = 0.0751; // Pounds Per Cubic Foot
    }
    AtmosphericService.prototype.altitudeAdjustmentFactor = function (altitude) {
        // Used to adjust from the standard altitude (sea level) to the current altitude.
        return this.interpolateArray(this.altitudeAdjustmentFactorTable, altitude / 1000);
    };
    AtmosphericService.prototype.barometricPressureAdjustmentFactor = function (altitude, barometricPressure) {
        // The Barometric Pressure Adjustment Factor Compares The Barometric Pressure (Inches Hg)
        //     At A Given altitude (Feet) To The Standard Barometric Pressure At That altitude.
        var standardBarometricPressure = this.interpolateArray(this.barometricPressureTable, altitude / 1000);
        return (barometricPressure - standardBarometricPressure) / standardBarometricPressure;
    };
    AtmosphericService.prototype.interpolateArray = function (array, arrayIndex) {
        // -----------------------------------------------------------------------------------------------------
        // Takes the nearest 2 numbers in a lookup table and returns a number between them
        // Need way to keep from exceeding the maximum value.
        // -----------------------------------------------------------------------------------------------------
        var maxIndex = array.length;
        var minIndex = 0;
        var result = 0;
        if (arrayIndex <= minIndex) {
            result = array[minIndex];
        }
        else if (arrayIndex >= maxIndex) {
            result = array[maxIndex];
        }
        else {
            var integerPartOfArrayIndex = Math.floor(arrayIndex);
            var decimalPartOfArrayIndex = arrayIndex - integerPartOfArrayIndex;
            var rangeSpread = array[integerPartOfArrayIndex + 1] - array[integerPartOfArrayIndex];
            result = array[integerPartOfArrayIndex] + (rangeSpread * decimalPartOfArrayIndex);
        }
        return result;
    };
    AtmosphericService.prototype.relativeHumidityAdjustmentFactor = function (altitude, temperature, barometricPressure, relativeHumidity) {
        // The Relative Humidity Adjustment Factor Compares The Relative Humidity (Percentage)
        //     At A Given altitude (Feet) To The Standard Relative Humidity At That altitude.
        var standardVaporPressureOfWater = this.interpolateArray(this.vaporPressureOfWaterTable, temperature / 2);
        return 0.995 * (barometricPressure / (barometricPressure - 0.3783 * relativeHumidity * standardVaporPressureOfWater));
    };
    AtmosphericService.prototype.speedOfSound = function (altitude) {
        // Speed Of Sound (Feet Per Second) At A Given Altitude (Feet).
        return this.speedOfSoundFactor(altitude) * this.speedOfSoundAtSeaLevel;
    };
    AtmosphericService.prototype.speedOfSoundFactor = function (altitude) {
        // The Speed Of Sound Factor Compares The Speed Of Sound (Feet Per Second)
        //     At A Given altitude (Feet) To The Standard Speed Of Sound At Sea Level.
        return 1 - 0.00001126666 * altitude - 0.00000000006753074 * Math.pow(altitude, 2);
    };
    AtmosphericService.prototype.standardRelativeHumidity = function (altitude) {
        // The Relative Humidity Adjustment Factor Compares The Relative Humidity (Percentage)
        //     At A Given altitude (Feet) To The Standard Relative Humidity At That altitude.
        var standardTemperature = this.interpolateArray(this.temperatureTable, altitude / 1000);
        var standardVaporPressureOfWater = this.interpolateArray(this.vaporPressureOfWaterTable, standardTemperature / 2);
        var standardBarometricPressure = this.interpolateArray(this.barometricPressureTable, altitude / 1000);
        return (standardBarometricPressure - (0.995 * standardBarometricPressure)) / (0.3783 * standardVaporPressureOfWater);
    };
    AtmosphericService.prototype.temperatureAdjustmentFactor = function (altitude, temperature) {
        // The temperature Adjustment Factor Compares The temperature (Degrees F)
        //     At A Given altitude (Feet) To The Standard temperature At That altitude.
        var standardTemperature = this.interpolateArray(this.temperatureTable, altitude / 1000);
        return (temperature - standardTemperature) / (459.6 + standardTemperature);
    };
    AtmosphericService.prototype.weightDensityOfAir = function (altitude) {
        // Barometric Pressure (Inches Hg) At A Given Altitude (Feet)
        return this.weightDensityOfAirAtSeaLevel * Math.exp(-0.0000302149 * altitude);
    };
    AtmosphericService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], AtmosphericService);
    return AtmosphericService;
}());



/***/ }),

/***/ "./src/app/ballistics-module/services/ballistics.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/ballistics-module/services/ballistics.service.ts ***!
  \******************************************************************/
/*! exports provided: BallisticsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BallisticsService", function() { return BallisticsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _conversion_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./conversion.service */ "./src/app/ballistics-module/services/conversion.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BallisticsService = /** @class */ (function () {
    function BallisticsService(conversionService) {
        this.conversionService = conversionService;
    }
    BallisticsService.prototype.computeRange = function (range) {
        range.verticalPositionMil = this.conversionService.inchesToMil(range.verticalPositionInches(), range.rangeYards());
        range.verticalPositionMoA = this.conversionService.inchesToMinutesOfAngle(range.verticalPositionInches(), range.rangeYards());
        range.verticalPositionIPHY = this.conversionService.inchesToIPHY(range.verticalPositionInches(), range.rangeYards());
        range.crossWindDriftMil = this.conversionService.inchesToMil(range.crossWindDriftInches(), range.rangeYards());
        range.crossWindDriftMoA = this.conversionService.inchesToMinutesOfAngle(range.crossWindDriftInches(), range.rangeYards());
        range.crossWindDriftIPHY = this.conversionService.inchesToIPHY(range.crossWindDriftInches(), range.rangeYards());
        range.leadMil = this.conversionService.inchesToMil(range.leadInches(), range.rangeYards());
        range.leadMoA = this.conversionService.inchesToMinutesOfAngle(range.leadInches(), range.rangeYards());
        range.leadIPHY = this.conversionService.inchesToIPHY(range.leadInches(), range.rangeYards());
        range.slantDropInches = range.dropInches() * (1 - Math.cos(this.conversionService.degreesToRadians(range.slantDegrees())));
        range.slantMil = this.conversionService.inchesToMil(range.slantDropInches(), range.rangeYards());
        range.slantMoA = this.conversionService.inchesToMinutesOfAngle(range.slantDropInches(), range.rangeYards());
        range.slantIPHY = this.conversionService.inchesToIPHY(range.slantDropInches(), range.rangeYards());
    };
    BallisticsService.prototype.getDefaultTurretGradients = function (turretUnits) {
        // TurretUnits 0=Mil, 1=MoA, 2=IPHY
        if (turretUnits === 0) {
            // Mils turrets are usually 1/10 mil per gradient
            return 10;
        }
        else {
            // MoA and IPHY turrets are usually 1/4 MoA per gradient
            return 4;
        }
    };
    BallisticsService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_conversion_service__WEBPACK_IMPORTED_MODULE_1__["ConversionService"]])
    ], BallisticsService);
    return BallisticsService;
}());



/***/ }),

/***/ "./src/app/ballistics-module/services/conversion.service.ts":
/*!******************************************************************!*\
  !*** ./src/app/ballistics-module/services/conversion.service.ts ***!
  \******************************************************************/
/*! exports provided: ConversionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConversionService", function() { return ConversionService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var ConversionService = /** @class */ (function () {
    function ConversionService() {
        this.minuteOfAngle = 1.04719755119; // Inches at 100 yards
        this.mil = 3.6; // Inches at 100 yards
        this.pi = 3.14159265358979;
    }
    ConversionService.prototype.degreesToRadians = function (degrees) {
        // Converts from a Degree To A Radian Angle.
        return degrees * this.pi / 180;
    };
    ConversionService.prototype.inchesToIPHY = function (inches, currentRange) {
        // Converts from Inches ToInches per 100 Yards
        return (inches * 100 / currentRange);
    };
    ConversionService.prototype.inchesToMil = function (inches, currentRange) {
        // Converts from Inches To MinutesOfAngle.
        return (inches * 100 / this.mil / currentRange);
    };
    ConversionService.prototype.inchesToMinutesOfAngle = function (inches, currentRange) {
        // Converts from Inches To MinutesOfAngle.
        return (inches * 100 / this.minuteOfAngle / currentRange);
    };
    ConversionService.prototype.isEven = function (input) {
        // Returns true if the inputed integer is an even number
        if (input / 2 * 2 === input) {
            return true;
        }
        else {
            return false;
        }
    };
    ConversionService.prototype.milesPerHourToInchesPerSecond = function (inputVelocityMPH) {
        // Converts from a Miles Per Hour To Inches Per Second.
        return inputVelocityMPH * 17.6004;
    };
    ConversionService.prototype.radiansToDegrees = function (radians) {
        // Converts from a Radian To A Degree Angle.
        return radians * 180 / this.pi;
    };
    ConversionService.prototype.sec = function (angle) {
        // Secant
        return 1 / Math.cos(angle);
    };
    ConversionService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])()
    ], ConversionService);
    return ConversionService;
}());



/***/ }),

/***/ "./src/app/ballistics-module/services/data.service.ts":
/*!************************************************************!*\
  !*** ./src/app/ballistics-module/services/data.service.ts ***!
  \************************************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _data_firearms_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data/firearms.data */ "./src/app/ballistics-module/data/firearms.data.ts");
/* harmony import */ var _data_conditions_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data/conditions.data */ "./src/app/ballistics-module/data/conditions.data.ts");
/* harmony import */ var _atmospheric_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./atmospheric.service */ "./src/app/ballistics-module/services/atmospheric.service.ts");
/* harmony import */ var _conversion_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./conversion.service */ "./src/app/ballistics-module/services/conversion.service.ts");
/* harmony import */ var _drag_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./drag.service */ "./src/app/ballistics-module/services/drag.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var DataService = /** @class */ (function () {
    function DataService(_atmosphericService, _conversionService, _dragService) {
        this._atmosphericService = _atmosphericService;
        this._conversionService = _conversionService;
        this._dragService = _dragService;
        // Public variables
        this.firearms = null;
        this.currentFirearm = null;
        this.currentRound = null;
        this.currentTarget = null;
        this.rangeData = null;
        this.currentWeather = null;
        this.minRangeDataRows = 6;
        this.maxRangeDataRows = 20;
    }
    DataService.prototype.getFirearms = function () {
        // Check to see if firearms are stored in localstorage before getting from API or mock data
        var firearmsJson = localStorage.getItem('firearms');
        if (firearmsJson) {
            this.firearms = JSON.parse(firearmsJson);
        }
        else {
            // We already have the data so simulate an async call
            this.firearms = _data_firearms_data__WEBPACK_IMPORTED_MODULE_2__["FIREARMS"];
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(this.firearms);
    };
    DataService.prototype.getTarget = function (force) {
        if (force === void 0) { force = false; }
        // We already have the data so simulate an async call
        if (force || !this.currentTarget) {
            this.currentTarget = {
                distanceYards: _data_conditions_data__WEBPACK_IMPORTED_MODULE_3__["TARGET"].distanceYards,
                chartStepping: _data_conditions_data__WEBPACK_IMPORTED_MODULE_3__["TARGET"].chartStepping,
                slantDegrees: _data_conditions_data__WEBPACK_IMPORTED_MODULE_3__["TARGET"].slantDegrees,
                speedMPH: _data_conditions_data__WEBPACK_IMPORTED_MODULE_3__["TARGET"].speedMPH
            };
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(this.currentTarget);
    };
    DataService.prototype.getWeather = function (force) {
        if (force === void 0) { force = false; }
        // We already have the data so simulate an async call
        if (force || !this.currentWeather) {
            this.currentWeather = {
                altitudeFeet: _data_conditions_data__WEBPACK_IMPORTED_MODULE_3__["WEATHER"].altitudeFeet,
                temperatureDegreesFahrenheit: _data_conditions_data__WEBPACK_IMPORTED_MODULE_3__["WEATHER"].temperatureDegreesFahrenheit,
                barometericPressureInchesHg: _data_conditions_data__WEBPACK_IMPORTED_MODULE_3__["WEATHER"].barometericPressureInchesHg,
                relativeHumidityPercent: _data_conditions_data__WEBPACK_IMPORTED_MODULE_3__["WEATHER"].relativeHumidityPercent,
                windVelocityMPH: _data_conditions_data__WEBPACK_IMPORTED_MODULE_3__["WEATHER"].windVelocityMPH,
                windAngleDegrees: _data_conditions_data__WEBPACK_IMPORTED_MODULE_3__["WEATHER"].windAngleDegrees
            };
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(this.currentWeather);
    };
    DataService.prototype.getDistanceYards = function (actualTargetSizeInches, reticleViewedTargetSizeMils) {
        return Math.round((actualTargetSizeInches / 36) * 1000 / reticleViewedTargetSizeMils);
    };
    DataService.prototype.getRangeData = function () {
        var rangeData = null;
        if (this.currentFirearm && this.currentRound && this.currentTarget && this.currentWeather) {
            rangeData = [];
            // Loop through from Range = 0 to the maximum range and display the ballistics table at each chart stepping range.
            var currentBallisticCoefficient = this._dragService.modifiedBallisticCoefficient(this.currentRound.bulletBC, this.currentWeather.altitudeFeet, this.currentWeather.temperatureDegreesFahrenheit, this.currentWeather.barometericPressureInchesHg, this.currentWeather.relativeHumidityPercent);
            var muzzleAngleDegrees = this._dragService.muzzleAngleDegreesForZeroRange(this.currentRound.muzzleVelocityFPS, this.currentFirearm.zeroRangeYards, this.currentFirearm.sightHeightInches, currentBallisticCoefficient);
            var currentCrossWindDriftInches = void 0, currentDropInches = void 0, currentEnergyFtLbs = void 0, currentLeadInches = void 0, currentTimeSeconds = void 0, currentVelocityFPS = void 0, currentVerticalPositionInches = void 0;
            // Skip the first row
            var currentRangeYards = this.currentTarget.chartStepping;
            /*
                Here is a method that auto determines the maximum distance based on when the round goes subsonic, but takes control away from user
                while ((currentVelocityFPS == null) || (currentVelocityFPS > this._atmosphericService.speedOfSoundAtSeaLevel)) {
            */
            while (currentRangeYards <= this.currentTarget.distanceYards) {
                currentVelocityFPS = this._dragService.velocityFromRange(currentBallisticCoefficient, this.currentRound.muzzleVelocityFPS, currentRangeYards);
                currentEnergyFtLbs = this._dragService.energy(this.currentRound.bulletWeightGrains, currentVelocityFPS);
                currentTimeSeconds = this._dragService.time(currentBallisticCoefficient, this.currentRound.muzzleVelocityFPS, currentVelocityFPS);
                currentDropInches = this._dragService.drop(this.currentRound.muzzleVelocityFPS, currentVelocityFPS, currentTimeSeconds);
                currentVerticalPositionInches = this._dragService.verticalPosition(this.currentFirearm.sightHeightInches, muzzleAngleDegrees, currentRangeYards, currentDropInches);
                // Cross Winds take on full range value regardless of Slant To Target
                currentCrossWindDriftInches = this._dragService.crossWindDrift(currentRangeYards, currentTimeSeconds, this.currentWeather.windAngleDegrees, this.currentWeather.windVelocityMPH, muzzleAngleDegrees, this.currentRound.muzzleVelocityFPS);
                currentLeadInches = this._dragService.lead(this.currentTarget.speedMPH, currentTimeSeconds);
                var slantDropInches = currentDropInches * (1 - Math.cos(this._conversionService.degreesToRadians(this.currentTarget.slantDegrees)));
                var range = {
                    rangeYards: currentRangeYards,
                    velocityFPS: currentVelocityFPS,
                    energyFtLbs: currentEnergyFtLbs,
                    timeSeconds: currentTimeSeconds,
                    dropInches: currentDropInches,
                    verticalPositionInches: -currentVerticalPositionInches,
                    crossWindDriftInches: currentCrossWindDriftInches,
                    leadInches: currentLeadInches,
                    slantDegrees: this.currentTarget.slantDegrees,
                    // //Al the remaining properties are computed
                    verticalPositionMil: this._conversionService.inchesToMil(-currentVerticalPositionInches, currentRangeYards),
                    verticalPositionMoA: this._conversionService.inchesToMinutesOfAngle(-currentVerticalPositionInches, currentRangeYards),
                    verticalPositionIPHY: this._conversionService.inchesToIPHY(-currentVerticalPositionInches, currentRangeYards),
                    crossWindDriftMil: this._conversionService.inchesToMil(currentCrossWindDriftInches, currentRangeYards),
                    crossWindDriftMoA: this._conversionService.inchesToMinutesOfAngle(currentCrossWindDriftInches, currentRangeYards),
                    crossWindDriftIPHY: this._conversionService.inchesToIPHY(currentCrossWindDriftInches, currentRangeYards),
                    leadMil: this._conversionService.inchesToMil(currentLeadInches, currentRangeYards),
                    leadMoA: this._conversionService.inchesToMinutesOfAngle(currentLeadInches, currentRangeYards),
                    leadIPHY: this._conversionService.inchesToIPHY(currentLeadInches, currentRangeYards),
                    slantDropInches: slantDropInches,
                    slantMil: this._conversionService.inchesToMil(slantDropInches, currentRangeYards),
                    slantMoA: this._conversionService.inchesToMinutesOfAngle(slantDropInches, currentRangeYards),
                    slantIPHY: this._conversionService.inchesToIPHY(slantDropInches, currentRangeYards)
                };
                rangeData.push(range);
                currentRangeYards += this.currentTarget.chartStepping;
            }
            /*
                Below is methods to ensure the table is neither too short or too long, but takes control away from user
            */
            // if(rangeData.length < this.minRangeDataRows) {
            // 	// Reduce the stepping to ensure we have a good sample of data between muzzle and subsonic
            // 	this.currentTarget.chartStepping = Math.floor(this.currentTarget.chartStepping / 2);
            // 	rangeData = this.getRangeData();
            // } else if(rangeData.length > this.maxRangeDataRows) {
            // 	// Increase the stepping to ensure we do not have too large of a chart
            // 	this.currentTarget.chartStepping = this.currentTarget.chartStepping * 2;
            // 	rangeData = this.getRangeData();
            // }
        }
        this.rangeData = rangeData;
        return rangeData;
    };
    DataService.prototype.guid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    DataService.prototype.deleteFirearm = function (firearm) {
        var deleted = false;
        for (var i = 0; i < this.firearms.length; i++) {
            if (this.firearms[i].id === firearm.id) {
                this.firearms.splice(i, 1);
                deleted = true;
                break;
            }
        }
        if (deleted) {
            localStorage.setItem('firearms', JSON.stringify(this.firearms));
        }
        return deleted;
    };
    DataService.prototype.deleteRound = function (firearm, round) {
        var deleted = false;
        for (var i = 0; i < firearm.rounds.length; i++) {
            if (firearm.rounds[i].id === round.id) {
                firearm.rounds.splice(i, 1);
                deleted = true;
                break;
            }
        }
        if (deleted) {
            localStorage.setItem('firearms', JSON.stringify(this.firearms));
        }
        return deleted;
    };
    DataService.prototype.insertFirearm = function (firearm) {
        // Gernerate new id
        firearm.id = this.guid();
        this.firearms.push(firearm);
        this.firearms.sort(this.nameSort);
        localStorage.setItem('firearms', JSON.stringify(this.firearms));
        return true;
    };
    DataService.prototype.insertRound = function (firearm, round) {
        // Gernerate new id
        round.id = this.guid();
        firearm.rounds.push(round);
        firearm.rounds.sort(this.nameSort);
        localStorage.setItem('firearms', JSON.stringify(this.firearms));
        return true;
    };
    DataService.prototype.nameSort = function (a, b) {
        if (a.name < b.name) {
            return -1;
        }
        else if (b.name < a.name) {
            return 1;
        }
        else {
            return 0;
        }
    };
    DataService.prototype.updateFirearm = function (firearm) {
        var updated = false;
        var nameChanged = false;
        for (var i = 0; i < this.firearms.length; i++) {
            if (this.firearms[i].id === firearm.id) {
                nameChanged = (this.firearms[i].name !== firearm.name);
                this.firearms[i] = firearm;
                updated = true;
                break;
            }
        }
        if (updated) {
            if (nameChanged) {
                // Name may have been changed
                this.firearms.sort(this.nameSort);
            }
            localStorage.setItem('firearms', JSON.stringify(this.firearms));
        }
        return updated;
    };
    DataService.prototype.updateRound = function (firearm, round) {
        var updated = false;
        var nameChanged = false;
        for (var i = 0; i < firearm.rounds.length; i++) {
            if (firearm.rounds[i].id === round.id) {
                nameChanged = (firearm.rounds[i].name !== round.name);
                firearm.rounds[i] = round;
                updated = true;
                break;
            }
        }
        if (updated) {
            if (nameChanged) {
                // Name may have been changed
                firearm.rounds.sort(this.nameSort);
            }
            localStorage.setItem('firearms', JSON.stringify(this.firearms));
        }
        return updated;
    };
    DataService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_atmospheric_service__WEBPACK_IMPORTED_MODULE_4__["AtmosphericService"], _conversion_service__WEBPACK_IMPORTED_MODULE_5__["ConversionService"], _drag_service__WEBPACK_IMPORTED_MODULE_6__["DragService"]])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/ballistics-module/services/drag.service.ts":
/*!************************************************************!*\
  !*** ./src/app/ballistics-module/services/drag.service.ts ***!
  \************************************************************/
/*! exports provided: DragService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DragService", function() { return DragService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _atmospheric_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./atmospheric.service */ "./src/app/ballistics-module/services/atmospheric.service.ts");
/* harmony import */ var _conversion_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./conversion.service */ "./src/app/ballistics-module/services/conversion.service.ts");
/* harmony import */ var _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../data/ingals.data */ "./src/app/ballistics-module/data/ingals.data.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DragService = /** @class */ (function () {
    function DragService(atmosphericService, conversionService) {
        this.atmosphericService = atmosphericService;
        this.conversionService = conversionService;
        this.gravity = 32.176; // Feet Per Second Per Second
    }
    DragService.prototype.clicksToReachMaximumPointBlankRangeZero = function (ballisticCoefficient, scopeHeightInches, scopeElevationClicksPerMOA, maximumOrdinate, muzzleVelocityFPS, muzzleAngleDegrees) {
        // Calculates how many up or down clicks to adjust the scope to change from the current zero to the maximum point blank range zero.  Maximum point blank range is the maximum range at
        //     which the user can shoot, without holdover or scope adjustment, while not exceeding a pre-determined maximum ordinate (target radius).
        // Calculate the range you need to zero the rifle to obtain a maximum point blank range
        var maxPointBlankRangeZeroYards = this.maximumPointBlankRangeZero(ballisticCoefficient, muzzleVelocityFPS, maximumOrdinate);
        // Calculate the velocity (feet per second) of the bullet at the new zero
        var velocityAtMaxPointBlankRangeZero = this.velocityFromRange(ballisticCoefficient, muzzleVelocityFPS, maxPointBlankRangeZeroYards);
        // Calculate the time (seconds) of flight of the bullet at the new velocity
        var timeAtMaxPointBlankRangeZero = this.time(ballisticCoefficient, muzzleVelocityFPS, velocityAtMaxPointBlankRangeZero);
        // Calculate the drop (inches) of the bullet at the new time and velocity
        var dropAtMaxPointBlankRangeZero = this.drop(muzzleVelocityFPS, velocityAtMaxPointBlankRangeZero, timeAtMaxPointBlankRangeZero);
        // Calculate the vertical position (inches) of the bullet at the given drop
        var verticalPositionAtMaxPointBlankRangeZero = (-scopeHeightInches / 12) + ((dropAtMaxPointBlankRangeZero / 12) + (maxPointBlankRangeZeroYards * 3) * Math.tan(this.conversionService.degreesToRadians(muzzleAngleDegrees))) * 12;
        // Calculate the number of scope clicks needed to correct the above calculated vertical position making the new vertical position zero.
        return -(this.conversionService.inchesToMinutesOfAngle(verticalPositionAtMaxPointBlankRangeZero, maxPointBlankRangeZeroYards) * scopeElevationClicksPerMOA);
    };
    DragService.prototype.crossWindDrift = function (currentRangeYards, currentTimeSeconds, crossWindAngleDegrees, crossWindVelocityMPH, muzzleAngleDegrees, muzzleVelocityFPS) {
        // Calculates how far the bullet drifts (inches) due to wind.
        return (Math.sin(this.conversionService.degreesToRadians(crossWindAngleDegrees)) * this.conversionService.milesPerHourToInchesPerSecond(crossWindVelocityMPH) / 12 * (currentTimeSeconds - (currentRangeYards * 3) / (muzzleVelocityFPS * Math.cos(this.conversionService.degreesToRadians(muzzleAngleDegrees))))) * 12;
    };
    DragService.prototype.drop = function (muzzleVelocityFPS, currentVelocityFPS, currentTimeSeconds) {
        // Calculates how far the bullet falls (inches) due to gravity, if their were no angle at the muzzle.
        var falls = this.atmosphericService.dropTable[Math.floor((currentVelocityFPS / muzzleVelocityFPS) * 100 + 0.5)];
        return -(falls * Math.pow(currentTimeSeconds, 2));
    };
    DragService.prototype.energy = function (bulletWeightGrains, currentVelocityFPS) {
        // Calculates the kinetic energy (foot pounds) retained in the bullet.
        return bulletWeightGrains * Math.pow(currentVelocityFPS, 2) / (this.gravity * 7000 * 2);
    };
    DragService.prototype.ingalsSpaceFromVelocity = function (currentVelocity) {
        // Returns the space value from the Ingals table at the given velocity.
        var counter = 0;
        while (_data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter] > currentVelocity) {
            counter++;
        }
        var spaceFromVelocity;
        if (_data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter] === currentVelocity) {
            spaceFromVelocity = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].s[counter];
        }
        else {
            // Interoperlate Array
            var differenceBetweenVelocityIndexes = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter - 1] - _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter];
            var distanceFromVelocityIndex = currentVelocity - _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter];
            var differenceBetweenSpaceIndexes = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].s[counter] - _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].s[counter - 1];
            var percentage = distanceFromVelocityIndex / differenceBetweenVelocityIndexes;
            spaceFromVelocity = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].s[counter] - (differenceBetweenSpaceIndexes * percentage);
        }
        return spaceFromVelocity;
    };
    DragService.prototype.ingalsTimeFromVelocity = function (currentVelocity) {
        // Returns the Time value from the Ingals table at the given Velocity.
        var counter = 0;
        while (_data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter] > currentVelocity) {
            counter++;
        }
        var timeFromVelocity;
        if (_data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter] === currentVelocity) {
            timeFromVelocity = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].t[counter];
        }
        else {
            // Interoperlate Array
            var differenceBetweenVelocityIndexes = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter - 1] - _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter];
            var distanceFromVelocityIndex = currentVelocity - _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter];
            var differenceBetweenTimeIndexes = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].t[counter] - _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].t[counter - 1];
            var percentage = distanceFromVelocityIndex / differenceBetweenVelocityIndexes;
            timeFromVelocity = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].t[counter] - (differenceBetweenTimeIndexes * percentage);
        }
        return timeFromVelocity;
    };
    DragService.prototype.ingalsVelocityFromSpace = function (currentSpace) {
        // Returns the Velocity value from the Ingals table at the given Space.
        var counter = 0;
        while (_data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].s[counter] < currentSpace) {
            counter++;
        }
        var velocityFromSpace;
        if (_data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].s[counter] === currentSpace) {
            velocityFromSpace = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter];
        }
        else {
            // Interoperlate Array
            var differenceBetweenSpaceIndexes = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].s[counter] - _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].s[counter - 1];
            var distanceFromSpaceIndex = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].s[counter] - currentSpace;
            var differenceBetweenVelocityIndexes = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter - 1] - _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter];
            var percentage = distanceFromSpaceIndex / differenceBetweenSpaceIndexes;
            velocityFromSpace = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter] + (differenceBetweenVelocityIndexes * percentage);
        }
        return velocityFromSpace;
    };
    DragService.prototype.ingalsVelocityFromTime = function (currentTime) {
        // Returns the Velocity value from the Ingals table at the given Time.
        var counter = 0;
        while (_data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].t[counter] < currentTime) {
            counter++;
        }
        var velocityFromTime;
        if (_data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].t[counter] === currentTime) {
            velocityFromTime = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter];
        }
        else {
            // Interoperlate Array
            var differenceBetweenTimeIndexes = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].t[counter] - _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].t[counter - 1];
            var distanceFromTimeIndex = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].t[counter] - currentTime;
            var differenceBetweenVelocityIndexes = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter - 1] - _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter];
            var percentage = distanceFromTimeIndex / differenceBetweenTimeIndexes;
            velocityFromTime = _data_ingals_data__WEBPACK_IMPORTED_MODULE_3__["INGALS"].v[counter] + (differenceBetweenVelocityIndexes * percentage);
        }
        return velocityFromTime;
    };
    DragService.prototype.lead = function (targetSpeedMPH, currentTimeSeconds) {
        // Calculates how far the user needs to lead (inches) a moving target.
        return this.conversionService.milesPerHourToInchesPerSecond(targetSpeedMPH) * currentTimeSeconds;
    };
    DragService.prototype.maximumPointBlankRange = function (ballisticCoefficient, muzzleVelocityFPS, maximumOrdinate) {
        // Calculate the maximum range at which the user can shoot, without holdover or scope adjustment, while not exceeding a pre-determined maximum ordinate (target radius).
        // Time (seconds)it takes to reach the range having a maximum ordinate supplied above
        var timeToMaximumOrdinate = 0.25 * Math.pow(maximumOrdinate / 3, 0.5);
        // Velocity (feet per second) of the bullet at the above calculated time
        var velocityAtTimeToMaximumOrdinate = this.velocityFromTime(ballisticCoefficient, muzzleVelocityFPS, timeToMaximumOrdinate);
        // Drop (inches) of the bullet at the above given time and velocity***
        var dropAtMaximumPointBlankRangeZero = this.drop(muzzleVelocityFPS, velocityAtTimeToMaximumOrdinate, timeToMaximumOrdinate);
        // The bullet may drop the radius of the target below zero at the true maximum point blank range
        var dropAtMaximumPointBlankRange = dropAtMaximumPointBlankRangeZero - maximumOrdinate;
        // Loop through dropping velocity until Drop = DropAtMaximumPointBlankRange to find the velocity at the true point blank range
        var velocityAtMaximumPointBlankRange = velocityAtTimeToMaximumOrdinate;
        while (this.drop(muzzleVelocityFPS, velocityAtMaximumPointBlankRange, this.time(ballisticCoefficient, muzzleVelocityFPS, velocityAtMaximumPointBlankRange)) > dropAtMaximumPointBlankRange) {
            velocityAtMaximumPointBlankRange -= 0.1;
        }
        // Given the velocity at the point blank range, calculate the actual range
        return this.range(ballisticCoefficient, muzzleVelocityFPS, velocityAtMaximumPointBlankRange);
    };
    DragService.prototype.maximumPointBlankRangeZero = function (ballisticCoefficient, muzzleVelocityFPS, maximumOrdinate) {
        // Maximum Point Blank Range Zero (yards) is the range that the user should zero his/her rifle to obtain their maximum point blank range.
        // This range allows a user to shoot, without holdover or scope adjustment, while not exceeding a pre-determined maximum ordinate (target radius).
        // Time (seconds)it takes to reach the range having a maximum ordinate supplied above
        var timeToMaximumOrdinate = 0.25 * Math.pow(maximumOrdinate / 3, 0.5);
        // Velocity (feet per second) of the bullet at the above calculated time
        var velocityAtTimeToMaximumOrdinate = this.velocityFromTime(ballisticCoefficient, muzzleVelocityFPS, timeToMaximumOrdinate);
        // Given the velocity at the point blank range zero, calculate the actual range to zero the rifle
        return this.range(ballisticCoefficient, muzzleVelocityFPS, velocityAtTimeToMaximumOrdinate);
    };
    DragService.prototype.modifiedBallisticCoefficient = function (ballisticCoefficient, altitudeFeet, temperatureFahrenheit, barometricPressureInchesHg, relativeHumidityPercent) {
        // Takes the bullets ballistic coefficient at standard atmospheric conditions (sea level), and converts it to a new ballistic coefficient at the current altitudeFeet and conditions.
        var altitudeAdjustmentFactor = this.atmosphericService.altitudeAdjustmentFactor(altitudeFeet);
        var temperatureAdjustmentFactor = this.atmosphericService.temperatureAdjustmentFactor(altitudeFeet, temperatureFahrenheit);
        var barometricPressureAdjustmentFactor = this.atmosphericService.barometricPressureAdjustmentFactor(altitudeFeet, barometricPressureInchesHg);
        var relativeHumidityAdjustmentFactor = this.atmosphericService.relativeHumidityAdjustmentFactor(altitudeFeet, temperatureFahrenheit, barometricPressureInchesHg, relativeHumidityPercent / 100);
        return ballisticCoefficient * (altitudeAdjustmentFactor * (1 + temperatureAdjustmentFactor - barometricPressureAdjustmentFactor) * relativeHumidityAdjustmentFactor);
    };
    DragService.prototype.muzzleAngleDegreesForZeroRange = function (muzzleVelocityFPS, zeroRangeYards, scopeHeightInches, ballisticCoefficient) {
        // Calculates the neccessary angle (degrees) of the muzzle to obtain the requested zero range.
        // This is done by looping through vertical position with different muzzle angles at the given range until a muzzle angle is found that produces a vertical position of 0.
        var velocityAtZeroRange = this.velocityFromRange(ballisticCoefficient, muzzleVelocityFPS, zeroRangeYards);
        var timeAtZeroRange = this.time(ballisticCoefficient, muzzleVelocityFPS, velocityAtZeroRange);
        var dropAtZeroRange = this.drop(muzzleVelocityFPS, velocityAtZeroRange, timeAtZeroRange);
        var muzzleAngleDegreesForZeroRange = 0;
        while (this.verticalPosition(scopeHeightInches, muzzleAngleDegreesForZeroRange, zeroRangeYards, dropAtZeroRange) < 0) {
            muzzleAngleDegreesForZeroRange += 0.00001;
        }
        return muzzleAngleDegreesForZeroRange;
    };
    DragService.prototype.optimalRiflingTwist = function (bulletDiameterInches, bulletLengthInches) {
        // Calculates the best rifling twist rate (inches per twist) to stabalize the length of bullet being used.
        return bulletDiameterInches * 150 / (bulletLengthInches / bulletDiameterInches);
    };
    DragService.prototype.range = function (ballisticCoefficient, muzzleVelocityFPS, currentVelocityFPS) {
        // Calculates the range (yards) of the bullet at a given velocity.
        return ballisticCoefficient * (this.ingalsSpaceFromVelocity(currentVelocityFPS) - this.ingalsSpaceFromVelocity(muzzleVelocityFPS)) / 3;
    };
    DragService.prototype.rifleRecoilVelocity = function (bulletWeightGrains, muzzleVelocityFPS, powderWeightGrains, rifleWeightPounds) {
        // Calculates the amount of rearward velocity (feet per second) of the rifle upon firing.
        return (bulletWeightGrains * muzzleVelocityFPS + powderWeightGrains * 4000) / (rifleWeightPounds * 7000);
    };
    DragService.prototype.rifleRecoilEnergy = function (bulletWeightGrains, muzzleVelocityFPS, powderWeightGrains, rifleWeightPounds) {
        // Calculates the amount of rearward force (foot pounds) of the rifle upon firing.
        return rifleWeightPounds * Math.pow(this.rifleRecoilVelocity(bulletWeightGrains, muzzleVelocityFPS, powderWeightGrains, rifleWeightPounds), 2) / (this.gravity * 2);
    };
    DragService.prototype.sectionalDensity = function (bulletWeightGrains, bulletDiameterInches) {
        // Calculates the mass per given diameter of the bullet.  Used in determining form factor.
        return bulletWeightGrains / (7000 * Math.pow(bulletDiameterInches, 2));
    };
    DragService.prototype.time = function (ballisticCoefficient, muzzleVelocityFPS, currentVelocityFPS) {
        // Calculates the amount of time (seconds) it takes the bullet to slow from the initial velocity to a specific lower velocity.
        return ballisticCoefficient * (this.ingalsTimeFromVelocity(currentVelocityFPS) - this.ingalsTimeFromVelocity(muzzleVelocityFPS));
    };
    DragService.prototype.velocityFromRange = function (ballisticCoefficient, muzzleVelocityFPS, currentRangeYards) {
        // Calculates the velocity (feet per second) remaining in the bullet at a given range (yards).
        var currentSpace = this.ingalsSpaceFromVelocity(muzzleVelocityFPS) + ((currentRangeYards * 3) / ballisticCoefficient);
        return this.ingalsVelocityFromSpace(currentSpace);
    };
    DragService.prototype.velocityFromTime = function (ballisticCoefficient, muzzleVelocityFPS, currentTimeSeconds) {
        // Calculates the velocity (feet per second) remaining in the bullet at a given time (seconds).
        return this.ingalsVelocityFromTime(currentTimeSeconds / ballisticCoefficient + this.ingalsTimeFromVelocity(muzzleVelocityFPS));
    };
    DragService.prototype.verticalPosition = function (scopeHeightInches, muzzleAngleDegrees, currentRangeYards, currentDropInches) {
        // Calculates how far the bullet falls (inches) due to gravity, taking into account the angle of the muzzle.
        return (currentDropInches + (currentRangeYards * 36) * Math.tan(this.conversionService.degreesToRadians(muzzleAngleDegrees))) - scopeHeightInches;
    };
    DragService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_atmospheric_service__WEBPACK_IMPORTED_MODULE_1__["AtmosphericService"], _conversion_service__WEBPACK_IMPORTED_MODULE_2__["ConversionService"]])
    ], DragService);
    return DragService;
}());



/***/ }),

/***/ "./src/app/shared-module/pipes/filter-objects.pipe.ts":
/*!************************************************************!*\
  !*** ./src/app/shared-module/pipes/filter-objects.pipe.ts ***!
  \************************************************************/
/*! exports provided: FilterObjectsPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterObjectsPipe", function() { return FilterObjectsPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var FilterObjectsPipe = /** @class */ (function () {
    function FilterObjectsPipe() {
    }
    // Filters out any object where none of its properties contain the passed in search string
    FilterObjectsPipe.prototype.transform = function (input, query) {
        if (input != null && query != null && query.length > 0) {
            return input.filter(function (item) {
                for (var key in item) {
                    if (typeof item[key] === 'string') {
                        var inputLower = item[key].toLowerCase();
                        var queryLower = query.toLowerCase();
                        if (inputLower.indexOf(queryLower) !== -1) {
                            return true;
                        }
                    }
                }
            });
        }
        else {
            return input;
        }
    };
    FilterObjectsPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'filterObjects' })
    ], FilterObjectsPipe);
    return FilterObjectsPipe;
}());



/***/ }),

/***/ "./src/app/shared-module/pipes/sort-objects.pipe.ts":
/*!**********************************************************!*\
  !*** ./src/app/shared-module/pipes/sort-objects.pipe.ts ***!
  \**********************************************************/
/*! exports provided: SortObjectsPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortObjectsPipe", function() { return SortObjectsPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SortObjectsPipe = /** @class */ (function () {
    function SortObjectsPipe() {
    }
    // Currently can only sort where (typeof input[field] === "string")
    // Will enhance later to support numbers and dates
    SortObjectsPipe.prototype.transform = function (input, field, desc) {
        if (desc === void 0) { desc = false; }
        if (input && field) {
            return input.sort(function (a, b) {
                if (a[field] < b[field]) {
                    return desc ? 1 : -1;
                }
                if (b[field] < a[field]) {
                    return desc ? -1 : 1;
                }
                return 0;
            });
        }
        return input;
    };
    SortObjectsPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'sortObjects' })
    ], SortObjectsPipe);
    return SortObjectsPipe;
}());



/***/ }),

/***/ "./src/app/shared-module/shared.module.ts":
/*!************************************************!*\
  !*** ./src/app/shared-module/shared.module.ts ***!
  \************************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _pipes_filter_objects_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pipes/filter-objects.pipe */ "./src/app/shared-module/pipes/filter-objects.pipe.ts");
/* harmony import */ var _pipes_sort_objects_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pipes/sort-objects.pipe */ "./src/app/shared-module/pipes/sort-objects.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            exports: [
                _pipes_filter_objects_pipe__WEBPACK_IMPORTED_MODULE_2__["FilterObjectsPipe"],
                _pipes_sort_objects_pipe__WEBPACK_IMPORTED_MODULE_3__["SortObjectsPipe"]
            ],
            declarations: [
                _pipes_filter_objects_pipe__WEBPACK_IMPORTED_MODULE_2__["FilterObjectsPipe"],
                _pipes_sort_objects_pipe__WEBPACK_IMPORTED_MODULE_3__["SortObjectsPipe"]
            ],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
            ],
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\source\ballistics\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map