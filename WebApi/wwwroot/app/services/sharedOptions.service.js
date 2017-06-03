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
var Observable_1 = require("rxjs/Observable");
var SharedOptionsService = (function () {
    function SharedOptionsService() {
        var _this = this;
        this.amount = new Observable_1.Observable(function (observer) { return _this.observerAmount = observer; });
        this.page = new Observable_1.Observable(function (observer) { return _this.observerPage = observer; });
        this.deleted = new Observable_1.Observable(function (observer) { return _this.observerDeleted = observer; });
    }
    SharedOptionsService.prototype.updateAmount = function (amount) {
        if (this.observerPage) {
            this.observerPage.next(1);
        }
        if (this.observerAmount) {
            this.observerAmount.next(amount);
        }
    };
    SharedOptionsService.prototype.updatePage = function (page) {
        if (this.observerPage) {
            this.observerPage.next(page);
        }
    };
    SharedOptionsService.prototype.updateDeleted = function (deleted) {
        if (this.observerDeleted) {
            this.observerDeleted.next(deleted);
        }
    };
    return SharedOptionsService;
}());
SharedOptionsService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], SharedOptionsService);
exports.SharedOptionsService = SharedOptionsService;
