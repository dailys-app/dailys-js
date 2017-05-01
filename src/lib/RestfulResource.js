import Resource from '../lib/Resource';

class RestfulResource extends Resource {
    _additional(additional = []) {
        let _this = this;
        for (let resource in additional) {
            _this[additional[resource]] = function(index, params = {}) {
                return _this.fetch(`${index}/${resource}`, params);
            };
        }
    }
    constructor(dailys, resource, additional = []) {
        super(dailys);
        this._resource = resource;
        this._additional = additional;
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
            'post',
            this._resource,
            data,
            params
        );
    }
    update(index, data = {}, params = {}) {
        return this._request(
            'put',
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