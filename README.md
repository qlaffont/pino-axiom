# pino-axiom

A simple library to add log from Pino to Axiom.

# How to use


```typescript
import pino from 'pino';

const logger = pino({
  transport: {
    target: 'pino-axiom',
    options: {
      orgId: 'YOUR-ORG-ID', // Can be found on settings page
      token: 'YOUR-TOKEN', // Can be generated on settings > API Tokens
      dataset: 'YOUR-DATASET', // Can be created on /datasets
    },
  },
});
```

## Tests

To execute jest tests (all errors, type integrity test)

```
pnpm test
```

## Maintain

This package use [TSdx](https://github.com/jaredpalmer/tsdx). Please check documentation to update this package.
