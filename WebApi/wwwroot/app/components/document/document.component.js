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
var router_1 = require("@angular/router");
require("../../../assets/diff_match_patch.js");
var DocumentComponent = (function () {
    function DocumentComponent(http, activateRoute, router) {
        var _this = this;
        this.http = http;
        this.activateRoute = activateRoute;
        this.router = router;
        this.textLeft = '';
        this.textRight = '';
        this.textRightHtml = '';
        this.routerSubscription = activateRoute.params.subscribe(function (params) {
            if (!params['sourceId'])
                _this.router.navigate(['']);
            _this.http.get('api/documents/' + params['sourceId']).subscribe(function (result) {
                _this.document = result.json();
            });
        });
        this.diffObj = new diff_match_patch();
        console.log(this.diffObj);
    }
    DocumentComponent.prototype.updateDifference = function () {
        var diff = this.diffObj.diff_main(this.textLeft, this.textRight);
        this.diffObj.diff_cleanupSemantic(diff);
        this.textRightHtml = this.diffObj.diff_prettyHtml(diff);
    };
    DocumentComponent.prototype.ngOnDestroy = function () {
        this.routerSubscription.unsubscribe();
    };
    return DocumentComponent;
}());
DocumentComponent = __decorate([
    core_1.Component({
        selector: 'home',
        moduleId: module.id,
        templateUrl: 'document.component.html'
    }),
    __metadata("design:paramtypes", [http_1.Http,
        router_1.ActivatedRoute,
        router_1.Router])
], DocumentComponent);
exports.DocumentComponent = DocumentComponent;
