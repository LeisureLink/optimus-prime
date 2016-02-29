# Optimus Prime [![Coverage Status](https://coveralls.io/repos/github/LeisureLink/optimus-prime/badge.svg?branch=master)](https://coveralls.io/github/LeisureLink/optimus-prime?branch=master)

Npm module for transforming the Relations / AppliesTo arrays to their respective formates depending on whether they're going to storage or coming back out of storage.

## Usage

```
let transform = require('optimus-prime');

//Transforms appliesTo to Relations for storage
transform.toStorage(appliesTo);

//Transforms Relations to appliesTo when coming out of storage
transform.forStorage(relations);
```

