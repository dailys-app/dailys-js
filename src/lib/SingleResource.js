import Resource from '../lib/Resource';

class SingleResource extends Resource {
    /**
     * Create a new SingleResource instance with the request property, and resource type.
     *
     * @param {Request} request - An instance of the request class.
     * @param {string} resource - The resource sub URI.
     */
    constructor(request, resource) {
        super(request);
        this.resource = resource;
    }

    /**
     * Get the single resource.
     *
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    fetch(params = {}) {
        return this.request.get(this.resource, params);
    }

    /**
     * Update the single resource.
     *
     * @param {object} data - The request data payload.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    update(data = {}, params = {}) {
        return this.request.put(this.resource, data, params);
    }
}

export { SingleResource as default }