import Resource from '../lib/Resource';

class PermissionResource extends Resource {
    /**
     * Get the index of the resource.
     *
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    get(params = {}) {
        return this.request.get('permissions', params);
    }

    /**
     * Get a single resource.
     *
     * @param {string} index - The resource id.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    fetch(index, params = {}) {
        return this.request.get(`permissions/${index}`, params);
    }
}

export { PermissionResource as default }