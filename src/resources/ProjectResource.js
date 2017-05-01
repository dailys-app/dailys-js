import RestfulResource from '../lib/RestfulResource';

class ProjectResource extends RestfulResource {
    _times(_this) {
        return {
            get(index, params = {}) {
                return _this.fetch(`${index}/times`, params);
            },
            summary(index, params = {}) {
                return _this.fetch(`${index}/times/summary`, params);
            }
        };
    }
    _users(_this) {
        return {
            get(index, params = {}) {
                return _this.fetch(`${index}/users`, params);
            },
            expenses(index, user, params = {}) {
                return _this.fetch(`${index}/users/${user}/expenses`, params);
            },
            times(index, user, params = {}) {
                return _this.fetch(`${index}/users/${user}/times`, params);
            },
            tasks: {
                times(index, user, task, params = {}) {
                    return _this.fetch(`${index}/users/${user}/tasks/${task}/times`, params);
                },
            }
        };
    }
    constructor(dailys) {
        super(dailys, 'projects');
        this.times = this._times(this);
        this.users = this._users(this);
    }
    categories(index, params = {}) {
        return this.fetch(`${index}/categories`, params);
    }
    charges(index, params = {}) {
        return this.fetch(`${index}/charges`, params);
    }
    expenses(index, params = {}) {
        return this.fetch(`${index}/expenses`, params);
    }
    invoices(index, params = {}) {
        return this.fetch(`${index}/invoices`, params);
    }
    status(index, params = {}) {
        return this.fetch(`${index}/status`, params);
    }
    tasks(index, params = {}) {
        return this.fetch(`${index}/tasks`, params);
    }
    total(index, params = {}) {
        return this.fetch(`${index}/times`, params);
    }
}

export { ProjectResource as default }