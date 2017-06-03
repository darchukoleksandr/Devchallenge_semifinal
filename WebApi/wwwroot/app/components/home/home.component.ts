import { Component, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { SharedOptionsService } from './../../services/sharedOptions.service';
import { Document } from '../../models';

@Component({
	selector: 'home',
	moduleId: module.id,
	templateUrl: 'home.component.html'
})
export class HomeComponent implements OnDestroy
{ 
	private sharedOptionsAmountSubscription: Subscription;
	private sharedOptionsPageSubscription: Subscription;
	private sharedOptionsDeletedSubscription: Subscription;
	
	private amount: number;
	private page: number;
	private deleted: boolean;
	
    private documents: Document[];

	constructor(
		private http: Http,
        private sharedOptions: SharedOptionsService
	) {

        this.sharedOptionsDeletedSubscription = this.sharedOptions.amount.subscribe(amount => {
	        this.amount = amount;
        });

        this.sharedOptionsAmountSubscription = this.sharedOptions.deleted.subscribe(deleted => {
            this.deleted = deleted;
	    });

	    this.sharedOptionsPageSubscription = this.sharedOptions.page.subscribe(page => {
	        this.page = page;
	        this.http.get('api/documents?amount=' + this.amount + '&page=' + this.page + '&deleted=' + this.deleted).subscribe(result => {
	            this.documents = result.json() as Document[];
	        });
	    });
		
		this.http.get('api/documents?amount='+this.amount+'&page='+this.page).subscribe(result => {
			this.documents = result.json() as Document[];
		});
	}
	
	ngOnDestroy(){
        this.sharedOptionsAmountSubscription.unsubscribe();
        this.sharedOptionsPageSubscription.unsubscribe();
        this.sharedOptionsDeletedSubscription.unsubscribe();
    }
}
