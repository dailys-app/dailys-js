import RestfulResource from '../lib/RestfulResource';

class InvoiceResource extends RestfulResource {
    /**
     * Create a new InvoiceResource instance with the request property.
     *
     * @param {Request} request - An instance of the request class.
     * @param {string} version - The api version to use.
     */
    constructor(request, version) {
        super(request, version + 'invoices');
    }

    /**
     * Update the status of the existing invoice.
     *
     * @param {string} index - The invoice id.
     * @param {string} status - The invoice status.
     * @param {object} params - The URL query parameters for the request.
     * @returns {Promise}
     */
    status(index, status, params = {}) {
        return this.update(`${index}/status`, {status}, params);
    }
}

export { InvoiceResource as default }