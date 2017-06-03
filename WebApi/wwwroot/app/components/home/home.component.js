"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var sharedOptions_service_1 = require("./../../services/sharedOptions.service");
var HomeComponent = (function () {
    function HomeComponent(http, sharedOptions) {
        var _this = this;
        this.http = http;
        this.sharedOptions = sharedOptions;
        this.sharedOptionsDeletedSubscription = this.sharedOptions.amount.subscribe(function (amount) {
            _this.amount = amount;
        });
        this.sharedOptionsAmountSubscription = this.sharedOptions.deleted.subscribe(function (deleted) {
            _this.deleted = deleted;
        });
        this.sharedOptionsPageSubscription = this.sharedOptions.page.subscribe(function (page) {
            _this.page = page;
            _this.http.get('api/documents?amount=' + _this.amount + '&page=' + _this.page + '&deleted=' + _this.deleted).subscribe(function (result) {
                _this.documents = result.json();
            });
        });
        this.http.get('api/documents?amount=' + this.amount + '&page=' + this.page).subscribe(function (result) {
            _this.documents = result.json();
        });
    }
    HomeComponent.prototype.ngOnDestroy = function () {
        this.sharedOptionsAmountSubscription.unsubscribe();
        this.sharedOptionsPageSubscription.unsubscribe();
        this.sharedOptionsDeletedSubscription.unsubscribe();
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        moduleId: module.id,
        templateUrl: 'home.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http,
        sharedOptions_service_1.SharedOptionsService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
