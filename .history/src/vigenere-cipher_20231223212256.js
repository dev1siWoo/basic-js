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
  constructor(isEncryption) {
    this.isEncryption = isEncryption;
    this.cipherTable = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  }

  encrypt(plaintext, key) {
    let cipherText = "";
    for (let i = 0; i < plaintext.length; i++) {
      const plainChar = plaintext[i];
      const keyChar = key[i % key.length];
      const cipherChar = this.cipher(plainChar, keyChar);
      cipherText += cipherChar;
    }
    return cipherText;
  }

  decrypt(ciphertext, key) {
    const plainText = "";
    for (let i = 0; i < ciphertext.length; i++) {
      const cipherChar = ciphertext[i];
      const keyChar = key[i % key.length];
      const plainChar = this.cipher(cipherChar, keyChar);
      plainText += plainChar;
    }
    return plainText;
  }

  cipher(plainChar, keyChar) {
    const base = this.cipherTable.indexOf("ABC");
    const cipherIndex =
      this.cipherTable.indexOf(plainChar) + this.cipherTable.indexOf(keyChar);
    const cipherChar = this.cipherTable[cipherIndex % this.cipherTable.length];
    return String.fromCharCode(
      base + cipherIndex / this.cipherTable.length + (cipherChar - base) * 26
    );
  }
}

module.exports = {
  VigenereCipheringMachine,
};
