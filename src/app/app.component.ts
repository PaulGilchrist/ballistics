import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    ngOnInit(): void {
        // Extend jQuery to allow for simpler animations
        $.fn.extend({
            animateCss: (animationName: string) => {
                // Remove animation if it is still an added class
                $(this).removeClass('animated ' + animationName);
                const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
                $(this).addClass('animated ' + animationName).one(animationEnd, () => {
                    // Remove animation now that it is complete
                    $(this).removeClass('animated ' + animationName);
                });
            }
        });
    }
}
