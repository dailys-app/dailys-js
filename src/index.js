import Request from './lib/Request';

import SingleResource from './lib/SingleResource';
import RestfulResource from './lib/RestfulResource';

import PermissionResource from './resources/PermissionResource';
import ProjectResource from './resources/ProjectResource';
import TimeResource from './resources/TimeResource';
import UserResource from './resources/UserResource';

class Dailys {
    /**
     * Create an instance of the Dailys class.
     *
     * @param {string} uri - The base URI for all of the requests.
     * @param {string} token - The authorization token.
     */
    constructor(uri = 'https://dailys.nz/api/v1', token = null) {
        // Create a request instance with the base URI, and
        // create a global request instance without the base uri.
        this.request = new Request(uri)
        this.global = new Request();

        // If the token was supplied, then we use the authorisation
        // token to authenticate the requests.
        if (!! token) {
            this.authorizeToken(token);
        }

        // Assign all of the simple single resource instances.
        this.organisation = new SingleResource(this.request, 'organisation');
        this.user = new SingleResource(this.request, 'user');

        // Assign all of the standard restful resource instances.
        this.expenses = new RestfulResource(this.request, 'expenses');
        this.categories = new RestfulResource(this.request, 'categories', ['charges', 'tasks']);
        this.charges = new RestfulResource(this.request, 'charges', ['categories']);
        this.clients = new RestfulResource(this.request, 'clients', ['invoices', 'projects']);
        this.invites = new RestfulResource(this.request, 'invites', ['resend']);
        this.invoices = new RestfulResource(this.request, 'invoices', ['status']);
        this.tasks = new RestfulResource(this.request, 'tasks', ['categories']);
        this.roles = new RestfulResource(this.request, 'roles');

        // Assign all of the non-standard resources.
        this.permissions = new PermissionResource(this.request);
        this.projects = new ProjectResource(this.request);
        this.times = new TimeResource(this.request);
        this.users = new UserResource(this.request);
    }

    /**
     * Set the global success handler.
     *
     * @param {function} handler - The success handler.
     * @returns {Dailys}
     */
    onSuccess(handler) {
        this.request.onSuccess(handler);
        this.global.onSuccess(handler);

        return this;
    }

    /**
     * Set the global error handler.
     *
     * @param {function} handler - The success handler.
     * @returns {Dailys}
     */
    onError(handler) {
        this.request.onError(handler);
        this.global.onError(handler);

        return this;
    }

    /**
     * Add a global header to the request.
     *
     * @param {string} header - The header key.
     * @param {string} value - The header value.
     * @returns {Dailys}
     */
    header(header, value) {
        this.request.header(header, value);
        this.global.header(header, value);

        return this;
    }

    /**
     * Add the authorization Bearer token.
     *
     * @param {string} token - The token value.
     * @returns {Dailys}
     */
    authorizeToken(token) {
        return this.header('Authorization', `Bearer ${token}`);
    }

    /**
     * Add the csrf token authentication.
     *
     * @param {string} token - The token value.
     * @returns {Dailys}
     */
    authorizeCsrf(token) {
        return this
            .header('X-CSRF-TOKEN', token)
            .header('X-Requested-With', 'XMLHttpRequest');
    }
}

export { Dailys as default }