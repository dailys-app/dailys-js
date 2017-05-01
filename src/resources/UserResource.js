import RestfulResource from '../lib/RestfulResource';

class UserResource extends RestfulResource {
    _times() {
        return {
            get(index, params = {}) {
                return this.fetch(`${index}/times`, params);
            },
            overview(index, params = {}) {
                return this.fetch(`${index}/times/overview`, params);
            },
            fetch(index, time, params = {}) {
                return this.fetch(`${index}/times/${time}`, params);
            }
        };
    }
    constructor(dailys) {
        super(dailys, 'users');
        this.times = this._times();
    }
    expenses(index, params = {}) {
        return this.fetch(`${index}/expenses`, params);
    }
    projects(index, params = {}) {
        return this.fetch(`${index}/projects`, params);
    }
}

export { UserResource as default }