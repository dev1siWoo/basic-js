const { NotImplementedError } = require("../extensions/index.js");

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  encrypt(message, key) {
    if (!message || !key) {
      throw new Error("Incorrect arguments!");
    }

    message = message.toUpperCase();
    key = key.toUpperCase();

    let result = "";
    for (let i = 0, j = 0; i < message.length; i++) {
      const char = message[i];
      if (this.alphabet.includes(char)) {
        const shift = key[j % key.length].charCodeAt(0) - "A".charCodeAt(0);
        const shiftedChar = this.shiftChar(char, shift);
        result += shiftedChar;
        j++;
      } else {
        result += char;
      }
    }

    return this.isDirect ? result : result.split("").reverse().join("");
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error("Incorrect arguments!");
    }

    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();

    let result = "";
    for (let i = 0, j = 0; i < encryptedMessage.length; i++) {
      const char = encryptedMessage[i];
      if (this.alphabet.includes(char)) {
        const shift = key[j % key.length].charCodeAt(0) - "A".charCodeAt(0);
        const shiftedChar = this.shiftChar(char, -shift);
        result += shiftedChar;
        j++;
      } else {
        result += char;
      }
    }

    return this.isDirect ? result : result.split("").reverse().join("");
  }

  shiftChar(char, shift) {
    const charCode = char.charCodeAt(0) - "A".charCodeAt(0);
    const shiftedChar =
      String.fromCharCode(((charCode + shift + 26) % 26) + "A".charCodeAt(0));
    return shiftedChar;
  }
}

module.exports = VigenereCipheringMachine;


module.exports = {
  VigenereCipheringMachine,
};
