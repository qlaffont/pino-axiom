'use strict';

const build = require('pino-abstract-transport');
const { Client } = require('@axiomhq/axiom-node');

module.exports = function (opts) {
  const client = new Client({
    token: opts?.token,
    orgId: opts?.orgId,
  });

  return build(
    function (source) {
      source.on('data', async function (obj) {
        await client.ingestEvents(opts?.dataset || '', obj);
      });
    },
    {
      parseLine: (line) => ({ ...JSON.parse(line) }),
    },
  );
};
