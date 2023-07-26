/*
* @jest-environment node
*/

import {describe,expect,it} from '@jest/globals';
import pino from 'pino';

import * as pinoAxiom from '../src/index.js';

describe('pino-axiom',() => {
  it('should be Defined',() => {
    expect(pinoAxiom).toBeDefined();
    expect(typeof pinoAxiom).toBe("function");
  });

  it('should be able to be called with required params',() => {
    try {
      pinoAxiom();
      // eslint-disable-next-line no-empty
    } catch(error) {
      expect(error).toBeDefined();
      expect(error.message).toEqual("Axiom orgId and token are required !");
    }
  });

  // TODO: See later on why coverage is not working on this test
  // TODO: Check why mocking is not working
  // it('should be able to log', (done) => {
  //   const logger = pino({
  //     transport: {
  //       target: 'pino-axiom',
  //       options: {
  //         token: '',
  //         orgId: '',
  //         dataset: '',
  //       },
  //     },
  //   });

  //   logger.info('test');

  //   setTimeout(() => {
  //     done();
  //   }, 5000);
  // }, 10000);
});
