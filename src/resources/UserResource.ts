import RestfulResource from '../lib/RestfulResource';

class UserResource extends RestfulResource {
    times: {
        get: any,
        overview: any,
        fetch: any
    };

    /**
     * Create a new UserResource instance with the request property.
     *
     * @param {Request} request - An instance of the request class.
     * @param {string} version - The api version to use.
     */
    constructor(request, version) {
        super(request, version + 'users');
        this.times = {

            /**
             * Get the index of the resource.
             *
             * @param {string} index - The resource id.
             * @param {object} params - The URL query parameters for the request.
             * @returns {Promise}
             */
            get(index, params = {}) {
                return request.get(version + `users/${index}/times`, params);
            },

            /**
             * Get the index of the resource.
             *
             * @param {string} index - The resource id.
             * @param {object} params - The URL query parameters for the request.
             * @returns {Promise}
             */
            overview(index, params = {}) {
                return request.get(version + `users/${index}/times/overview`, params);
            },

            /**
             * Get the index of the resource.
             *
             * @param {string} index - The resource id.
             * @param {string} time - The sub-resource id.
             * @param {object} params - The URL query parameters for the request.
             * @returns {Promise}
             */
            fetch(index, time, params = {}) {
                return request.get(version + `users/${index}/times/${time}`, params);
            }
        };
    }

    /**
     * Get the index of the resource.
     *
     * @param {string} index - The resource id.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    expenses(index, params = {}) {
        return this.fetch(`${index}/expenses`, params);
    }

    /**
     * Get the index of the resource.
     *
     * @param {string} index - The resource id.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    projects(index, params = {}) {
        return this.fetch(`${index}/projects`, params);
    }
}

export { UserResource as default }