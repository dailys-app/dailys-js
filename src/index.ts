import Request from './lib/Request';

import SingleResource from './lib/SingleResource';
import RestfulResource from './lib/RestfulResource';

import PermissionResource from './resources/PermissionResource';
import ProjectResource from './resources/ProjectResource';
import TimeResource from './resources/TimeResource';
import UserResource from './resources/UserResource';
import InvoiceResource from './resources/InvoiceResource';
import {AxiosRequestConfig, AxiosResponse} from "axios";

/**
 * Determine if a string ends with a suffix.
 *
 * @param {string} string
 * @param {string} suffix
 * @returns {boolean}
 */
function strEndsWith(string, suffix) {
    return string.indexOf(suffix, string.length - suffix.length) !== -1;
}

/**
 * Determine if a string starts with a prefix.
 *
 * @param {string} string
 * @param {string} prefix
 * @returns {boolean}
 */
function strStartsWith(string, prefix) {
    return string.substring(0, prefix.length) === prefix;
}

class Dailys {
    // Request data.
    request: Request;

    // Single resources.
    organisation: SingleResource;
    user: SingleResource;

    // Restful resources.
    expenses: RestfulResource;
    categories: RestfulResource;
    charges: RestfulResource;
    clients: RestfulResource;
    invites: RestfulResource;
    tasks: RestfulResource;
    roles: RestfulResource;

    // Other resources.
    permissions: PermissionResource;
    projects: ProjectResource;
    times: TimeResource;
    users: UserResource;
    invoices: InvoiceResource;

    /**
     * Create an instance of the Dailys class.
     *
     * @param {string} uri - The base URI for all of the requests.
     * @param {string} version - The api version for the requests.
     * @param {string} token - The authorization token.
     */
    constructor(uri = 'https://api.dailys.nz/', version = 'api/v1/', token = null) {
        // Sanitise the uri and versions.
        version = strEndsWith(version, '/') ? version : version + '/';
        version = strStartsWith(version, '/') ? version.substring(0, 1) : version;
        uri = strStartsWith(uri, '/') ? uri : uri + '/';

        // Create a request instance with the base URI, and
        // create a global request instance without the base uri.
        this.request = new Request(uri);

        // If the token was supplied, then we use the authorisation
        // token to authenticate the requests.
        if (!! token) {
            this.authorizeToken(token);
        }

        // Assign all of the simple single resource instances.
        this.organisation = new SingleResource(this.request, version + 'organisation');
        this.user = new SingleResource(this.request, version + 'user');

        // Assign all of the standard restful resource instances.
        this.expenses = new RestfulResource(this.request, version + 'expenses');
        this.categories = new RestfulResource(this.request, version + 'categories', ['charges', 'tasks']);
        this.charges = new RestfulResource(this.request, version + 'charges', ['categories']);
        this.clients = new RestfulResource(this.request, version + 'clients', ['invoices', 'projects']);
        this.invites = new RestfulResource(this.request, version + 'invites', ['resend']);
        this.tasks = new RestfulResource(this.request, version + 'tasks', ['categories']);
        this.roles = new RestfulResource(this.request, version + 'roles');

        // Assign all of the non-standard resources.
        this.permissions = new PermissionResource(this.request, version);
        this.projects = new ProjectResource(this.request, version);
        this.times = new TimeResource(this.request, version);
        this.users = new UserResource(this.request, version);
        this.invoices = new InvoiceResource(this.request, version);
    }

    /**
     * Set the global success handler.
     *
     * @param {function} handler - The success handler.
     * @returns {Dailys}
     */
    onSuccess(handler) {
        this.request.onSuccess(handler);

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

        return this;
    }

    /**
     * Add a global interceptor before the request is sent.
     *
     * @param {Function} onFulfilled
     * @param {Function} onRejected
     */
    before(onFulfilled: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>, onRejected?: (error: any) => any) {
        this.request.before(onFulfilled, onRejected);
    }

    /**
     * Add a global interceptor after the response is received.
     *
     * @param {Function} onFulfilled
     * @param {Function} onRejected
     */
    after(onFulfilled: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>, onRejected?: (error: any) => any) {
        this.request.after(onFulfilled, onRejected);
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