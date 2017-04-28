import Axios from 'axios';
import SingleResource from './lib/SingleResource';
import RestfulResource from './lib/RestfulResource';

import CategoryResource from './resources/CategoryResource';
import ChargeResource from './resources/ChargeResource';

class Dailys {
    _initialise(baseURL) {
        this._http = Axios.create({ baseURL });
        this.onSuccess();
        this.onError();
    }
    _singleResources() {
        this.permissions = new SingleResource(this, 'permissions');
        this.organisation = new SingleResource(this, 'organisation');
        this.user = new SingleResource(this, 'user');
    }
    _restfulResources() {
        this.roles = new RestfulResource(this, 'roles');
        this.users = new RestfulResource(this, 'users');
        this.expenses = new RestfulResource(this, 'expenses');
    }
    _customResources() {
        this.tasks = new RestfulResource(this, 'tasks');
        this.charges = new ChargeResource(this, 'charges');
        this.categories = new CategoryResource(this, 'categories');
    }
    constructor(uri = 'https://dailys.nz/api/v1') {
        this._initialise(uri);
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
    authorizeToken(token) {
        this._http.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return this;
    }
}

export { Dailys as default }