class Resource {
    constructor(dailys) {
        this._dailys = dailys;
    }
    _request(method, url, data = {}, params = {}) {
        return this._dailys
            ._http
            .request({ url, method, data, params })
            .then(this._dailys._successHandler)
            .catch(this._dailys._errorHandler);
    }
}

export { Resource as default }