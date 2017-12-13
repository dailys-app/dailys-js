import Axios, {AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig} from 'axios';

/**
 * Request Class
 */
class Request {
    private axios: AxiosInstance;
    private successHandler: (AxiosResponse) => any;
    private errorHandler: (AxiosError) => any;
    private headers: object;

    /**
     *
     * @param {string} baseURL - The base URL for all of the requests.
     * @param {function} successHandler - The global success handler for a request.
     * @param {function} errorHandler - The global error handler for a request.
     */
    constructor(baseURL = '/', successHandler = $response => $response.data, errorHandler = $error => $error) {
        this.axios =  Axios.create({ baseURL });
        this.headers = {};

        this.onError(errorHandler);
        this.onSuccess(successHandler);
    }

    /**
     * Add the header to the axios instance common headers.
     *
     * @param {string} header - The header key.
     * @param {string} value - The header value.
     * @returns {Request}
     */
    header(header: string, value: string): Request {
        this.headers[header] = value;

        return this;
    }

    /**
     * Set the success handler.
     *
     * @param {function} handler - The success handler function.
     * @returns {Request}
     */
    onSuccess(handler) {
        this.successHandler = function($response) {
            let preventPropagation = handler($response);

            if (! preventPropagation) {
                return $response.data;
            }
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
        this.errorHandler = function($error) {
            let preventPropagation = handler($error);
            
            if (! preventPropagation) {
                throw $error;
            }
        };

        return this;
    }

    before(onFulfilled: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>, onRejected?: (error: any) => any) {
        return this.axios.interceptors.request.use(onFulfilled, onRejected);
    }

    after(onFulfilled: (value: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>, onRejected?: (error: any) => any) {
        return this.axios.interceptors.response.use(onFulfilled, onRejected);
    }

    /**
     * Send a GET request to the URL with the query parameters.
     *
     * @param {string} url - The URL segment for the request (without the base url).
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise} - A promise for handling the response.
     */
    get(url, params = {}) {
        return this.axios.request({ method: 'GET', url, params, headers: this.headers })
            .then(this.successHandler)
            .catch(this.errorHandler);
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
        return this.axios.request({ method: 'POST', url, data, params, headers: this.headers })
            .then(this.successHandler)
            .catch(this.errorHandler);
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
        return this.axios.request({ method: 'PUT', url, data, params, headers: this.headers })
            .then(this.successHandler)
            .catch(this.errorHandler);
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
        return this.axios.request({ method: 'PATCH', url, data, params, headers: this.headers })
            .then(this.successHandler)
            .catch(this.errorHandler);
    }

    /**
     * Send a DELETE request to the URL with the query parameters.
     *
     * @param {string} url - The URL segment for the request (without the base url).
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise} - A promise for handling the response.
     */
    delete(url, params = {}) {
        return this.axios.request({ method: 'DELETE', url, params, headers: this.headers })
            .then(this.successHandler)
            .catch(this.errorHandler);
    }
}

export { Request as default }