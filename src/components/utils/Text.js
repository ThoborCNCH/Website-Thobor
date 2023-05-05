export default class Text {
  static #size = 100;
  static returnSizedText(text) {
    if (text.length > this.#size) return text.slice(0, this.#size) + "...";
    return text;
  }
}
