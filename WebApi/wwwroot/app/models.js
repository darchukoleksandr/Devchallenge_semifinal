"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Document = (function () {
    function Document(sourceId, name, versions, deleted) {
        this.sourceId = sourceId;
        this.name = name;
        this.deleted = deleted;
        this.versions = versions;
    }
    return Document;
}());
exports.Document = Document;
var Version = (function () {
    function Version(id, sourceId, text, updated) {
        this.id = id;
        this.sourceId = sourceId;
        this.text = text;
        this.updated = updated;
    }
    return Version;
}());
exports.Version = Version;
