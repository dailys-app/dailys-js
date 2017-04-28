import RestfulResource from '../lib/RestfulResource';

class CategoryResource extends RestfulResource {
    charges(index, params = {}) {
        return this._request(
            'get',
            `${this._resource}/${index}/charges`,
            {},
            params
        );
    }
    tasks(index, params = {}) {
        return this._request(
            'get',
            `${this._resource}/${index}/tasks`,
            {},
            params
        );
    }
}

export { CategoryResource as default }