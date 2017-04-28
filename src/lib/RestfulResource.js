import Resource from '../lib/Resource';

class RestfulResource extends Resource {
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
    fetch(index, params = {}) {
        return this._request(
            'get',
            `${this._resource}/${index}`,
            {},
            params
        );
    }
    store(data = {}, params = {}) {
        return this._request(
            'get',
            this._resource,
            data,
            params
        );
    }
    update(index, data = {}, params = {}) {
        return this._request(
            'get',
            `${this._resource}/${index}`,
            data,
            params
        );
    }
    destroy(index, params = {}) {
        return this._request(
            'delete',
            `${this._resource}/${index}`,
            {},
            params
        );
    }
}

export { RestfulResource as default }