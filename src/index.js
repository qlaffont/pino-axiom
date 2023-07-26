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

  let toSend = [];
  let immediate = null;

  function send() {
    client.ingestEvents(opts?.dataset || '', toSend).catch(() => {});
    toSend = [];
    immediate = null;
  }

  return build(
    function (source) {
      source.on('data', function (obj) {
        toSend.push(obj);
        if (!immediate) {
          immediate = setImmediate(send);
        }
      });
    },
    {
      parseLine: (line) => ({ ...JSON.parse(line) }),
      async close() {
        if (toSend.length > 0) {
          clearImmediate(immediate);
          await client.ingestEvents(opts?.dataset || '', toSend);
        }
      },
    },
  );
};
