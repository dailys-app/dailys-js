import RestfulResource from '../lib/RestfulResource';

class ProjectResource extends RestfulResource {
    times: {
        get: (string, object) => Promise<object>,
        summary: (string, object) => Promise<object>,
    };
    users: object;

    /**
     * Create a new ProjectResource instance with the request property.
     *
     * @param {Request} request - An instance of the request class.
     * @param {string} version - The api version to use.
     */
    constructor(request, version) {
        super(request, version + 'projects');

        this.times = {
            /**
             * Get the index of the resource.
             *
             * @param {string} index - The resource id.
             * @param {object} params - The URL query parameters for the request.
             * @returns {Promise}
             */
            get(index, params = {}) {
                return request.get(version + `projects/${index}/times`, params);
            },

            /**
             * Get a summary of the resource.
             *
             * @param {string} index - The resource id.
             * @param {object} params - The URL query parameters for the request.
             * @returns {Promise}
             */
            summary(index, params = {}) {
                return request.get(version + `projects/${index}/times/summary`, params);
            }
        };

        this.users = {
            /**
             * Get the index of the resource.
             *
             * @param {string} index - The resource id.
             * @param {object} params - The URL query parameters for the request.
             * @returns {Promise}
             */
            get(index, params = {}) {
                return request.get(version + `projects/${index}/users`, params);
            },

            /**
             * Get the index of the resource.
             *
             * @param {string} index - The resource id.
             * @param {string} user - The sub-resource id.
             * @param {object} params - The URL query parameters for the request.
             * @returns {Promise}
             */
            expenses(index, user, params = {}) {
                return request.get(version + `projects/${index}/users/${user}/expenses`, params);
            },

            /**
             * Get the index of the resource.
             *
             * @param {string} index - The resource id.
             * @param {string} user - The sub-resource id.
             * @param {object} params - The URL query parameters for the request.
             * @returns {Promise}
             */
            times(index, user, params = {}) {
                return request.get(version + `projects/${index}/users/${user}/times`, params);
            },
            tasks: {
                /**
                 * Get the index of the resource.
                 *
                 * @param {string} index - The resource id.
                 * @param {string} user - The sub-resource id.
                 * @param {string} task - The sub-sub-resource id.
                 * @param {object} params - The URL query parameters for the request.
                 * @returns {Promise}
                 */
                times(index, user, task, params = {}) {
                    return request.get(version + `projects/${index}/users/${user}/tasks/${task}/times`, params);
                },
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
    categories(index, params = {}) {
        return this.fetch(`${index}/categories`, params);
    }

    /**
     * Get the index of the resource.
     *
     * @param {string} index - The resource id.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    charges(index, params = {}) {
        return this.fetch(`${index}/charges`, params);
    }

    /**
     * Get the expenses of the resource.
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
    invoices(index, params = {}) {
        return this.fetch(`${index}/invoices`, params);
    }

    /**
     * Update the status of the resource.
     *
     * @param {string} index - The resource id.
     * @param {object} data - The data payload for the request.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    status(index, data = {}, params = {}) {
        return this.update(`${index}/status`, data, params);
    }

    /**
     * Get the index of the resource.
     *
     * @param {string} index - The resource id.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    tasks(index, params = {}) {
        return this.fetch(`${index}/tasks`, params);
    }

    /**
     * Get the index of the resource.
     *
     * @param {string} index - The resource id.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    total(index, params = {}) {
        return this.fetch(`${index}/total`, params);
    }
}

export { ProjectResource as default }