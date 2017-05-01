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