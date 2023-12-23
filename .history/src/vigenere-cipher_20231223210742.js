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
  encrypt(message, key) {
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
  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error("Encrypted message and key are required");
    }

    const upperEncryptedMessage = encryptedMessage.toUpperCase();
    const upperKey = this.generateKey(upperEncryptedMessage, key.toUpperCase());

    let result = "";

    for (let i = 0, j = 0; i < upperEncryptedMessage.length; i++) {
      const char = upperEncryptedMessage[i];

      if (this.isAlphabetic(char)) {
        const encryptedCharCode = char.charCodeAt(0);
        const keyCharCode = upperKey[j % upperKey.length].charCodeAt(0);
        const decryptedCharCode =
          ((encryptedCharCode - keyCharCode + 26) % 26) + 65;

        result += String.fromCharCode(decryptedCharCode);
        j++;
      } else {
        result += char;
      }
    }

    return this.isDirect ? result : result.split("").reverse().join("");
  }

  generateKey(message, key) {
    let generatedKey = '';

    for (let i = 0, j = 0; i < message.length; i++) {
      const char = message[i];

      if (this.isAlphabetic(char)) {
        generatedKey += key[j % key.length];
        j++;
      } else {
        generatedKey += char;
      }
    }

    return generatedKey;
  }

  isAlphabetic(char) {
    return /^[A-Z]$/i.test(char);
  }
}

module.exports = {
  VigenereCipheringMachine,
};
