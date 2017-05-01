import RestfulResource from '../lib/RestfulResource';

class TimeResource extends RestfulResource {
    constructor(dailys) {
        super(dailys, 'times');
    }
    overview(params = {}) {
        return this.fetch('overview', params);
    }
}

export { TimeResource as default }