import RestfulResource from '../lib/RestfulResource';

class TimeResource extends RestfulResource {
    /**
     * Create a new TimeResource instance with the request property.
     *
     * @param {Request} request - An instance of the request class.
     * @param {string} version - The api version to use.
     */
    constructor(request, version) {
        super(request, version + 'times');
    }

    /**
     * Get the overview of the resource.
     *
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    overview(params = {}) {
        return this.fetch('overview', params);
    }
}

export { TimeResource as default }