import { ampli } from '../ampli';

export class Service1 {
  constructor(private userId: string) {}

  doAction1() {
    ampli.eventMaxIntForTest(this.userId, {
      intMax10: 10,
    });
  }

  async doAction2() {
    await ampli.eventWithConstTypes(this.userId).promise;
  }
}
