import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
	moduleId: module.id.toString(),
	selector: 'my-app',
	styleUrls: ['app.component.css'],
	templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
	ngOnInit(): void {
		// Extend jQuery to allow for simpler animations
		$.fn.extend({
			animateCss: function (animationName: string) {
				// Remove animation if it is still an added class
				$(this).removeClass('animated ' + animationName);
				const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
				$(this).addClass('animated ' + animationName).one(animationEnd, function() {
					// Remove animation now that it is complete
					$(this).removeClass('animated ' + animationName);
				});
			}
		});
	}
 }
