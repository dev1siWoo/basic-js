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
  constructor(isEncryption = true) {
    this.isEncryption = isEncryption;
    this.cipherTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  encrypt(plaintext, key) {
    if (!plaintext || !key) {
      throw new Error("Missing arguments for encryption.");
    }

    let cipherText = "";
    plaintext = plaintext.toUpperCase();
    key = key.toUpperCase();

    for (let i = 0, j = 0; i < plaintext.length; i++) {
      const plainChar = plaintext[i];
      if (plainChar >= "A" && plainChar <= "Z") {
        const keyChar = key[j % key.length];
        const cipherChar = this.cipher(plainChar, keyChar);
        cipherText += cipherChar;
        j++;
      } else {
        cipherText += plainChar;
      }
    }

    return this.isEncryption
      ? cipherText
      : cipherText.split("").reverse().join("");
  }

  decrypt(ciphertext, key) {

    let plainText = "";
    ciphertext = ciphertext.toUpperCase();
    key = key.toUpperCase();

    for (let i = 0, j = 0; i < ciphertext.length; i++) {
      const cipherChar = ciphertext[i];
      if (cipherChar >= "A" && cipherChar <= "Z") {
        const keyChar = key[j % key.length];
        const plainChar = this.cipher(cipherChar, keyChar, false);
        plainText += plainChar;
        j++;
      } else {
        plainText += cipherChar;
      }
    }

    return this.isEncryption
      ? plainText
      : plainText.split("").reverse().join("");
  }

  cipher(inputChar, keyChar, isEncryption = true) {
    const base = this.cipherTable.charCodeAt(0);
    const inputIndex = inputChar.charCodeAt(0) - base;
    const keyIndex = keyChar.charCodeAt(0) - base;
    const outputIndex = isEncryption
      ? (inputIndex + keyIndex) % this.cipherTable.length
      : (inputIndex - keyIndex + this.cipherTable.length) %
        this.cipherTable.length;
    return String.fromCharCode(base + outputIndex);
  }
}

module.exports = {
  VigenereCipheringMachine,
};
