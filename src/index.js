import Axios from 'axios';

import SingleResource from './lib/SingleResource';
import RestfulResource from './lib/RestfulResource';

import PermissionResource from './resources/PermissionResource';
import ProjectResource from './resources/ProjectResource';
import TimeResource from './resources/TimeResource';
import UserResource from './resources/UserResource';

class Dailys {
    _initialise(baseURL, token) {
        this._http = Axios.create({ baseURL });
        this.onSuccess();
        this.onError();

        if (!! token) {
            this.authorizeToken(token);
        }
    }
    _singleResources() {
        this.organisation = new SingleResource(this, 'organisation');
        this.user = new SingleResource(this, 'user');
    }
    _restfulResources() {
        this.expenses = new RestfulResource(this, 'expenses');
        this.categories = new RestfulResource(this, 'categories', ['charges', 'tasks']);
        this.charges = new RestfulResource(this, 'charges', ['categories']);
        this.clients = new RestfulResource(this, 'clients', ['invoices', 'projects']);
        this.invites = new RestfulResource(this, 'invites', ['resend']);
        this.invoices = new RestfulResource(this, 'invoices', ['status']);
        this.tasks = new RestfulResource(this, 'tasks', ['categories']);
        this.roles = new RestfulResource(this, 'roles');
    }
    _customResources() {
        this.permissions = new PermissionResource(this);
        this.projects = new ProjectResource(this);
        this.times = new TimeResource(this);
        this.users = new UserResource(this);
    }
    constructor(uri = 'https://dailys.nz/api/v1', token = null) {
        this._initialise(uri, token);
        this._singleResources();
        this._restfulResources();
        this._customResources();
    }
    onSuccess(handler = function() {}) {
        this._successHandler = $response => {
            handler($response);

            return $response.data;
        };

        return this;
    }
    onError(handler = function() {}) {
        this._errorHandler = $response => {
            handler($response);

            return $response;
        };

        return this;
    }
    header(header, value) {
        this._http.defaults.headers.common[header] = value;

        return this;
    }
    authorizeToken(token) {
        return this.header('Authorization', `Bearer ${token}`);
    }
    authorizeCsrf(token) {
        return this
            .header('X-CSRF-TOKEN', token)
            .header('X-Requested-With', 'XMLHttpRequest');
    }
}

export { Dailys as default }