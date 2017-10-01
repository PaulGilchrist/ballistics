import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common' ;

declare let toastr:any;

@Component({
    moduleId: module.id.toString(),
    selector: 'nav-top',
    styleUrls: ['nav-top.component.css'],
    templateUrl: 'nav-top.component.html'
})
export class TopNavComponent implements OnInit {

    shrinkNavbar: boolean = false;

    user: any = {
        identity : {
            isAuthenticated : false
        }
    };

    constructor(private _location: Location, private _router: Router) {}

    onScroll(event: any): void {
        // Shrink the header top and bottom padding when scrolling beyond 300px
        this.shrinkNavbar = ((window.pageYOffset || document.documentElement.scrollTop) > 300);
    }


    ngOnInit(): void {
    };

    currentPage(path: string): boolean {
        let result = false;
        let locationPath = this._location.path();
        if (path.length === 0) {
            // Root
            result = (locationPath.length === 0);
        } else {
           // Does the current path start with "path"?
           result = (locationPath.indexOf(path) === 0);
        }
        return result;
    }


}
