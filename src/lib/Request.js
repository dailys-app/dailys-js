import Axios from 'axios';

/**
 * Create a new WeakMap for keeping properties private on the class. This works by using the instance
 * of the class as a key in the map. The privacy comes with a little overhead of having to fetch the
 * object from the request map for each method, however the class is small so this is acceptable.
 *
 * @type {WeakMap}
 */
const requestMap = new WeakMap();

/**
 * Request Class
 */
class Request {
    /**
     * Create a new instance of the request.
     *
     * @param {string} baseUrl - The base URL for all of the requests.
     * @param {function} successHandler - The global success handler for a request.
     * @param {function} errorHandler - The global error handler for a request.
     */
    constructor(baseURL = '/', successHandler = $response => $response.data, errorHandler = $error => $error) {
        requestMap.set(this, {
            axios: Axios.create({ baseURL }),
            successHandler: successHandler,
            errorHandler: errorHandler
        });
    }

    /**
     * Add the header to the axios instance common headers.
     *
     * @param {string} header - The header key.
     * @param {string} value - The header value.
     * @returns {Request}
     */
    header(header, value) {
        const properties = requestMap.get(this);

        properties.axios.defaults.headers.common[header] = value;

        return this;
    }

    /**
     * Set the success handler.
     *
     * @param {function} handler - The success handler function.
     * @returns {Request}
     */
    onSuccess(handler) {
        const properties = requestMap.get(this);

        properties.successHandler = function($response) {
            handler($response);
            return $response.data;
        };

        return this;
    }

    /**
     * Set the error handler.
     *
     * @param {function} handler - The error handler function.
     * @returns {Request}
     */
    onError(handler) {
        const properties = requestMap.get(this);

        properties.errorHandler = function($error) {
            handler($error);
            return $error;
        };

        return this;
    }

    /**
     * Send a GET request to the URL with the query parameters.
     *
     * @param {string} url - The URL segment for the request (without the base url).
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise} - A promise for handling the response.
     */
    get(url, params = {}) {
        const properties = requestMap.get(this);

        return properties.axios.request({ method: 'GET', url, params })
            .then(properties.successHandler)
            .catch(properties.errorHandler);
    }

    /**
     * Send a POST request to the URL with the query parameters and request payload.
     *
     * @param {string} url - The URL segment for the request (without the base url).
     * @param {object} data - The request data payload.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise} - A promise for handling the response.
     */
    post(url, data = {}, params = {}) {
        const properties = requestMap.get(this);

        return properties.axios.request({ method: 'POST', url, data, params })
            .then(properties.successHandler)
            .catch(properties.errorHandler);
    }

    /**
     * Send a PUT request to the URL with the query parameters and request payload.
     *
     * @param {string} url - The URL segment for the request (without the base url).
     * @param {object} data - The request data payload.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise} - A promise for handling the response.
     */
    put(url, data = {}, params = {}) {
        const properties = requestMap.get(this);

        return properties.axios.request({ method: 'PUT', url, data, params })
            .then(properties.successHandler)
            .catch(properties.errorHandler);
    }

    /**
     * Send a PATCH request to the URL with the query parameters and request payload.
     *
     * @param {string} url - The URL segment for the request (without the base url).
     * @param {object} data - The request data payload.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise} - A promise for handling the response.
     */
    patch(url, data = {}, params = {}) {
        const properties = requestMap.get(this);

        return properties.axios.request({ method: 'PATCH', url, data, params })
            .then(properties.successHandler)
            .catch(properties.errorHandler);
    }

    /**
     * Send a DELETE request to the URL with the query parameters.
     *
     * @param {string} url - The URL segment for the request (without the base url).
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise} - A promise for handling the response.
     */
    delete(url, params = {}) {
        const properties = requestMap.get(this);

        return properties.axios.request({ method: 'DELETE', url, params })
            .then(properties.successHandler)
            .catch(properties.errorHandler);
    }
}

export { Request as default }