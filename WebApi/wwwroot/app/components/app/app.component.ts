import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { SharedOptionsService } from './../../services/sharedOptions.service';

@Component({
	selector: 'my-app',
	moduleId: module.id,
	templateUrl: 'app.component.html'
})
export class AppComponent
{
    amount: number;
    page: number;
    deleted: boolean;
	
    constructor(
        private http: Http,
        private sharedOptions: SharedOptionsService
    ) {
    }

    updateDocuments() {
        console.log(1);
        this.http.post('api/update/all', null).subscribe(() => {});
    }
    amountChanged() {
		this.sharedOptions.updateAmount(this.amount);
    }
    pageChanged() {
		this.sharedOptions.updatePage(this.page);
    }
    getDeletedDocuments() {
        this.sharedOptions.updateDeleted(this.deleted);
    }
}
