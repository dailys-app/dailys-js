# Dailys JS

The official javascript library for dailys application.

## Installation

Use either NPM or Yarn to install this library.

### NPM

```bash
npm install -s dailys-js
```

### Yarn

```bash
yarn add dailys-js
```

## Usage

To get started with the library, you will need to import and instantiate `dailys-js`.

```js
// Import the library.
import Dailys from 'dailys-js';

// Define the baseURI and the authorisation token.
let baseURI = 'https://dailys.nz/api/v1';
let authorizationToken = '...';

// Create the new instance.
let dailys = new Dailys(baseURI, authorizationToken);

// Make api calls.
```

## Reference

Below is a reference of all of the methods within the library.

### Restful Resources
These resources have common REST methods:
* `get([params])` - index the resource. 
    * `params (optional)` - an object of key-value query params.
* `fetch(index, [params])` - get the resource with the specified index.
    * `index` - the index of the resource (i.e., its ID).
    * `params (optional)` - an object of key-value query params.
* `store(data, [params])` - store a resource with the given data.
    * `data` - an object representing the resource.
    * `params (optional)` - an object of key-value query params.
* `update(index, data, [params])` - store a resource with the given data.
    * `index` - the index of the resource (i.e., its ID).
    * `data` - an object representing the resource.
    * `params (optional)` - an object of key-value query params.
* `destroy(index, [params])` - destroy the resource with the specified index.
    * `index` - the index of the resource (i.e., its ID).
    * `params (optional)` - an object of key-value query params.

These can be accessed using `Dailys.resource.get`, for example. 

Some of these resources also have convenience methods to get related resources, 
for example `Dailys.categories.charges(11)` will get all of the charges for category 11.

The resources with these methods are:
* `expenses` 
* `categories`, related: `charges`, `tasks`
* `charges`, related: `categories`
* `clients`, related: `invoices`, `projects`
* `invites`, related: `resend` (this simply hits the resend route of the invite)
* `tasks`, related: `categories`
* `roles`

### Single Resources

Single Resources are a special type, as there is only ever one of them for the currently authenticated user.
These are the `user` and `organisation` route.

These resources only have the `fetch` and `update` methods as above.

### Special Resources

There are a few resources in Dailys that aren't strictly Restful, and as such there are extra routes for them.

#### Projects

Projects has the standard Restful resources plus the following:  
* `project.categories(index, [params])` - get the categories for the project
* `project.charges(index, [params])` - get the charges for the project
* `project.invoices(index, [params])` - get the invoices for the project
* `project.tasks(index, [params])` - get the tasks for the project
* `project.total(index, [params])` - get the total cost for the project
* `project.status(index, data, [params])` - update the status for the project
    * `data.status`: the status for the project - `complete`, `incomplete`, or `invoiced`
* `project.times.get(index, [params])` - get all the times for a project
* `project.times.summary(index, [params])` - get a summary of the project's times
* `project.users.get(index, [params])` - get the users for a project
* `project.users.expenses(index, user, [params])` - get the expenses for the specified user for the specified project
* `project.users.times(index, user, [params])` - get the times for the specified user for the specified project
* `project.users.tasks.times(index, user, task, [params])` - get the times for the specified user for the specified project for the specified task
   
#### Users

Users has the standard Restful resources plus the following:  
* `users.times.get(index, [params])` - get the times for the specified user
* `users.times.overview(index, [params])` - get the times overview for the specified user
* `users.times.fetch(index, time, [params])` - get the specified time for the specified user
* `users.expenses(index, [params])` - get the expenses for the specified user
* `users.projects(index, [params])` - get the projects for the specified user
   
#### Invoices

Projects has the standard Restful resources plus the following:  
* `invoices.status(index, status, [params])` - update the status for the invoice
    * `status`: the status for the project - `final` or `draft`

#### Times

Times has the standard Restful resources plus the following:  
* `times.overview([params])` - get the times overview for the current user

#### Permissions

Permissions _only_ has the following:
* `permissions.get([params])` - get the permissions
* `permissions.fetch(index, [params])` - fetch the specified permission

## Building 

1. `yarn install` or `npm install`
2. `npm run build`
