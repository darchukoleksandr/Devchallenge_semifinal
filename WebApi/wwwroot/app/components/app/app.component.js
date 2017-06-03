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
var AppComponent = (function () {
    function AppComponent(http, sharedOptions) {
        this.http = http;
        this.sharedOptions = sharedOptions;
    }
    AppComponent.prototype.updateDocuments = function () {
        console.log(1);
        this.http.post('api/update/all', null).subscribe(function () { });
    };
    AppComponent.prototype.amountChanged = function () {
        this.sharedOptions.updateAmount(this.amount);
    };
    AppComponent.prototype.pageChanged = function () {
        this.sharedOptions.updatePage(this.page);
    };
    AppComponent.prototype.getDeletedDocuments = function () {
        this.sharedOptions.updateDeleted(this.deleted);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        moduleId: module.id,
        templateUrl: 'app.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http,
        sharedOptions_service_1.SharedOptionsService])
], AppComponent);
exports.AppComponent = AppComponent;
