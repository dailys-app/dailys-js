import RestfulResource from '../lib/RestfulResource';

class ChargeResource extends RestfulResource {
    categories(index, params = {}) {
        return this._request(
            'get',
            `${this._resource}/${index}/categories`,
            {},
            params
        );
    }
}

export { ChargeResource as default }