export default class Store {
  constructor() {
    this.state = {
      selectedRobots: new Map(),
    };
  }

  addRobotToCart(robot, amount) {
    if (
      this.state.selectedRobots.size == 5 &&
      !this.state.selectedRobots.has(robot.name)
    ) {
      alert("You can't buy more than different 5 robots");
      return;
    }

    let oldAmount = 0;
    if (this.state.selectedRobots.has(robot.name)) {
      oldAmount = this.state.selectedRobots.get(robot.name).amount;
    }

    this.state.selectedRobots.set(robot.name, {
      amount: oldAmount + amount,
      ...robot,
    });
  }

  increaseSelectedRobot(robotName) {
    const selectedRobot = this.state.selectedRobots.get(robotName);

    if (selectedRobot.stock == 0) {
      alert("The quantity you requested is not available in stock");
      return;
    }
    selectedRobot.amount += 1;
    selectedRobot.stock -= 1;
  }

  decreaseSelectedRobot(robotName) {
    const selectedRobot = this.state.selectedRobots.get(robotName);

    selectedRobot.amount -= 1;
    selectedRobot.stock += 1;
    if (selectedRobot.amount == 0) {
      this.state.selectedRobots.delete(robotName);
    }
  }
}
