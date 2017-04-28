import Resource from '../lib/Resource';

class SingleResource extends Resource {
    constructor(dailys, resource) {
        super(dailys);
        this._resource = resource;
    }
    get(params = {}) {
        return this._request(
            'get',
            this._resource,
            {},
            params
        );
    }
}

export { SingleResource as default }