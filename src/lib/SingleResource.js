import Resource from '../lib/Resource';

class SingleResource extends Resource {
    constructor(dailys, resource) {
        super(dailys);
        this._resource = resource;
    }
    fetch(params = {}) {
        return this._request(
            'get',
            this._resource,
            {},
            params
        );
    }
    update(data = {}, params = {}) {
        return this._request(
            'put',
            this._resource,
            data,
            params
        );
    }
}

export { SingleResource as default }