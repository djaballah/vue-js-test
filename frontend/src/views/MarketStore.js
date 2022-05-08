export default class Store {
  constructor() {
    this.state = {
      selectedRobots: new Map(),
    };
  }

  addRobotToCart(robot, amount) {
    let oldAmount = 0;
    if (this.state.selectedRobots.has(robot.name)) {
      oldAmount = this.state.selectedRobots.get(robot.name).amount;
    }

    this.state.selectedRobots.set(robot.name, {
      amount: oldAmount + amount,
      ...robot,
    });
  }
}
