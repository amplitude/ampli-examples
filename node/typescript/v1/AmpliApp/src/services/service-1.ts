import { ampli } from '../ampli';
import { userId } from '../app';

export class Service1 {
  doAction1() {
    ampli.eventMaxIntForTest(userId, {
      intMax10: 10,
    });
  }

  async doAction2() {
    await ampli.eventWithConstTypes(userId).promise;
  }
}