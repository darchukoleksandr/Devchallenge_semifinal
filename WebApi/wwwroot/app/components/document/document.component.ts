import { Component, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { Document, Version } from '../../models';

import '../../../assets/diff_match_patch.js';
declare var diff_match_patch: any;

@Component({
	selector: 'home',
	moduleId: module.id,
	templateUrl: 'document.component.html'
})
export class DocumentComponent implements OnDestroy
{ 
    private routerSubscription: Subscription;
	
    private textLeft: string = '';
    private textRight: string = '';
    private textRightHtml: string = '';
	
    private diffObj: any;

	private document: Document;
	
    constructor(
        private http: Http,
        private activateRoute: ActivatedRoute,
        private router: Router
    ) {
        this.routerSubscription = activateRoute.params.subscribe(params => {
            if (!params['sourceId'])
                this.router.navigate(['']);
            
			this.http.get('api/documents/' + params['sourceId']).subscribe(result => {
				this.document = result.json() as Document;
			});
			
        });

		this.diffObj = new diff_match_patch();
		console.log(this.diffObj);
    }
	
	updateDifference(){
		var diff = this.diffObj.diff_main(this.textLeft, this.textRight);
		this.diffObj.diff_cleanupSemantic(diff);
		this.textRightHtml = this.diffObj.diff_prettyHtml(diff);
	}
	
	ngOnDestroy(){
        this.routerSubscription.unsubscribe();
    }
}

