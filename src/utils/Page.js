export default class Page {
  async render() {
    throw new Error("render() must be implemented");
  }

  cleanup() {
    // optional, override if needed
  }
}
