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
  }
  encrypt() {
    if (!message || !key) {
      throw new Error("Message and key are required");
    }

    const upperMessage = message.toUpperCase();
    const upperKey = this.generateKey(upperMessage, key.toUpperCase());

    let result = "";

    for (let i = 0, j = 0; i < upperMessage.length; i++) {
      const char = upperMessage[i];

      if (this.isAlphabetic(char)) {
        const messageCharCode = char.charCodeAt(0);
        const keyCharCode = upperKey[j % upperKey.length].charCodeAt(0);
        const encryptedCharCode = ((messageCharCode + keyCharCode) % 26) + 65;

        result += String.fromCharCode(encryptedCharCode);
        j++;
      } else {
        result += char;
      }
    }

    return this.isDirect ? result : result.split("").reverse().join("");
  }
  decrypt() {
    throw new NotImplementedError("Not implemented");
    // remove line with error and write your code here
  }
}

module.exports = {
  VigenereCipheringMachine,
};
