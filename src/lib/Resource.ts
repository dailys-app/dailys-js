import Request from "./Request";

class Resource {
    protected request: Request;

    /**
     * Create a new Resource instance with the request property.
     *
     * @param {Request} request - An instance of the request class.
     */
    constructor(request: Request) {
        this.request = request;
    }
}

export { Resource as default }