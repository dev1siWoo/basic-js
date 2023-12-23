const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement chainMaker object according to task description
 *
 */
const chainMaker = {
  links: [],

  getLength() {
    return this.chain.length;
  },

  addLink(value) {
    this.links.push(value);
    return this;
  },

  removeLink(position) {
    if (
      typeof position !== "number" ||
      position < 1 ||
      position > this.links.length ||
      Math.floor(position) !== position
    ) {
      throw new Error("You can't remove incorrect link!");
    }

    this.links.splice(position - 1, 1);
    return this;
  },

  reverseChain() {
    this.chain.reverse();
    return this;
  },

  finishChain() {
    const result = this.chain.join("~~");
    this.chain = [];
    return result;
  },
};

module.exports = {
  chainMaker,
};
