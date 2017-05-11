import Resource from '../lib/Resource';

class PermissionResource extends Resource {
    protected resource: String;
    /**
     * Create a new InvoiceResource instance with the request property.
     *
     * @param {Request} request - An instance of the request class.
     * @param {string} version - The api version to use.
     */
    constructor(request, version) {
        super(request);
        this.resource = version + 'permissions'
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
     * Get a single resource.
     *
     * @param {string} index - The resource id.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    fetch(index, params = {}) {
        return this.request.get(`${this.resource}/${index}`, params);
    }
}

export { PermissionResource as default }