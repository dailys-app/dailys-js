import Resource from './Resource';
import Request from './Request';

class RestfulResource extends Resource {
    resource: string;

    /**
     * Create a new SingleResource instance with the request property, and resource type.
     *
     * @param {Request} request - An instance of the request class.
     * @param {string} resource - The resource sub URI.
     * @param {array} additional - Additional get resources.
     */
    constructor(request: Request, resource: string, additional = []) {
        super(request);
        this.resource = resource;

        let _self = this;

        for (let subResource of additional) {
            _self[subResource] = (index, params = {}) => {
                return _self.fetch(`${index}/${subResource}`, params);
            };
        }
    }

    /**
     * Get the index of the resource.
     *
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    get(params = {}) {
        return this.request.get(this.resource, params);
    }

    /**
     * Get the an single resource.
     *
     * @param {string} index - The resource id.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    fetch(index, params = {}) {
        return this.request.get(`${this.resource}/${index}`, params);
    }

    /**
     * Store a new resource.
     *
     * @param {object} data - The request data payload.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    store(data = {}, params = {}) {
        return this.request.post(this.resource, data, params);
    }

    /**
     * Update existing resource.
     *
     * @param {string} index - The resource id.
     * @param {object} data - The request data payload.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    update(index, data = {}, params = {}) {
        return this.request.put(`${this.resource}/${index}`, data, params);
    }

    /**
     * Delete an existing resource.
     *
     * @param {string} index - The resource id.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    destroy(index, params = {}) {
        return this.request.delete(`${this.resource}/${index}`, params);
    }
}

export { RestfulResource as default }