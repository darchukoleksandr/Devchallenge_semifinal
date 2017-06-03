import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SharedOptionsService {
	constructor(
    ) {
        this.amount = new Observable((observer: any) => this.observerAmount = observer);
        this.page = new Observable((observer: any) => this.observerPage = observer);
        this.deleted = new Observable((observer: any) => this.observerDeleted = observer);
    }
	
    private observerAmount: any;
    private observerPage: any;
    private observerDeleted: any;
	
	public amount: Observable<number>;
	public page: Observable<number>;
	public deleted: Observable<boolean>;
	
    public updateAmount(amount: number) {
        if (this.observerPage) {
            this.observerPage.next(1);
        }
        if (this.observerAmount) {
            this.observerAmount.next(amount);
        }
    }
	public updatePage(page: number) {
        if (this.observerPage) {
            this.observerPage.next(page);
        }
    }
    public updateDeleted(deleted: boolean) {
        if (this.observerDeleted) {
            this.observerDeleted.next(deleted);
        }
    }
}