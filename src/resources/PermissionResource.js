import Resource from '../lib/Resource';

class PermissionResource extends Resource {
    constructor(dailys) {
        super(dailys);
        this._resource = 'permissions';
    }
    get(params = {}) {
        return this._request('get', this._resource, {}, params);
    }
    fetch(index, params = {}) {
        return this._request('get', `${this._resource}/${index}`, {}, params);
    }
}

export { PermissionResource as default }