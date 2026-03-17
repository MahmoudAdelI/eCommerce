export default class Component {
  async render() {
    throw new Error("render() must be implemented");
  }

  cleanup() {
    // optional, override if needed
  }
}
