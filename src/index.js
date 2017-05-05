"use strict";
exports.__esModule = true;
var Request_1 = require("./lib/Request");
var SingleResource_1 = require("./lib/SingleResource");
var RestfulResource_1 = require("./lib/RestfulResource");
var PermissionResource_1 = require("./resources/PermissionResource");
var ProjectResource_1 = require("./resources/ProjectResource");
var TimeResource_1 = require("./resources/TimeResource");
var UserResource_1 = require("./resources/UserResource");
var InvoiceResource_1 = require("./resources/InvoiceResource");
var Dailys = (function () {
    /**
     * Create an instance of the Dailys class.
     *
     * @param {string} uri - The base URI for all of the requests.
     * @param {string} token - The authorization token.
     */
    function Dailys(uri, token) {
        if (uri === void 0) { uri = 'https://dailys.nz/api/v1'; }
        if (token === void 0) { token = null; }
        // Create a request instance with the base URI, and
        // create a global request instance without the base uri.
        this.request = new Request_1["default"](uri);
        this.global = new Request_1["default"]();
        // If the token was supplied, then we use the authorisation
        // token to authenticate the requests.
        if (!!token) {
            this.authorizeToken(token);
        }
        // Assign all of the simple single resource instances.
        this.organisation = new SingleResource_1["default"](this.request, 'organisation');
        this.user = new SingleResource_1["default"](this.request, 'user');
        // Assign all of the standard restful resource instances.
        this.expenses = new RestfulResource_1["default"](this.request, 'expenses');
        this.categories = new RestfulResource_1["default"](this.request, 'categories', ['charges', 'tasks']);
        this.charges = new RestfulResource_1["default"](this.request, 'charges', ['categories']);
        this.clients = new RestfulResource_1["default"](this.request, 'clients', ['invoices', 'projects']);
        this.invites = new RestfulResource_1["default"](this.request, 'invites', ['resend']);
        this.tasks = new RestfulResource_1["default"](this.request, 'tasks', ['categories']);
        this.roles = new RestfulResource_1["default"](this.request, 'roles');
        // Assign all of the non-standard resources.
        this.permissions = new PermissionResource_1["default"](this.request);
        this.projects = new ProjectResource_1["default"](this.request);
        this.times = new TimeResource_1["default"](this.request);
        this.users = new UserResource_1["default"](this.request);
        this.invoices = new InvoiceResource_1["default"](this.request);
    }
    /**
     * Set the global success handler.
     *
     * @param {function} handler - The success handler.
     * @returns {Dailys}
     */
    Dailys.prototype.onSuccess = function (handler) {
        this.request.onSuccess(handler);
        this.global.onSuccess(handler);
        return this;
    };
    /**
     * Set the global error handler.
     *
     * @param {function} handler - The success handler.
     * @returns {Dailys}
     */
    Dailys.prototype.onError = function (handler) {
        this.request.onError(handler);
        this.global.onError(handler);
        return this;
    };
    /**
     * Add a global header to the request.
     *
     * @param {string} header - The header key.
     * @param {string} value - The header value.
     * @returns {Dailys}
     */
    Dailys.prototype.header = function (header, value) {
        this.request.header(header, value);
        this.global.header(header, value);
        return this;
    };
    /**
     * Add the authorization Bearer token.
     *
     * @param {string} token - The token value.
     * @returns {Dailys}
     */
    Dailys.prototype.authorizeToken = function (token) {
        return this.header('Authorization', "Bearer " + token);
    };
    /**
     * Add the csrf token authentication.
     *
     * @param {string} token - The token value.
     * @returns {Dailys}
     */
    Dailys.prototype.authorizeCsrf = function (token) {
        return this
            .header('X-CSRF-TOKEN', token)
            .header('X-Requested-With', 'XMLHttpRequest');
    };
    return Dailys;
}());
exports["default"] = Dailys;
