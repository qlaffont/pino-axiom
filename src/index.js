const build = require('pino-abstract-transport');
const { Client } = require('@axiomhq/axiom-node');

module.exports = function (opts) {
  if (!opts?.token || !opts?.orgId) {
    throw new Error('Axiom orgId and token are required !');
  }
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
