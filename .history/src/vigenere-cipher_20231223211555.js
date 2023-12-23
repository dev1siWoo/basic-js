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
      throw new Error("Missing arguments for encryption.");
    }

    let encryptedMessage = "";
    message = message.toUpperCase();
    key = key.toUpperCase();

    for (let i = 0, j = 0; i < message.length; i++) {
      const char = message[i];
      if (char >= "A" && char <= "Z") {
        const shift = key[j % key.length].charCodeAt(0) - "A".charCodeAt(0);
        const shiftedChar = this.isDirect
          ? String.fromCharCode(
              ((char.charCodeAt(0) - "A".charCodeAt(0) + shift) % 26) +
                "A".charCodeAt(0)
            )
          : String.fromCharCode(
              ((char.charCodeAt(0) - "A".charCodeAt(0) - shift + 26) % 26) +
                "A".charCodeAt(0)
            );

        encryptedMessage += shiftedChar;
        j++;
      } else {
        encryptedMessage += char;
      }
    }

    return encryptedMessage;
  }

  decrypt(encryptedMessage, key) {
    if (!encryptedMessage || !key) {
      throw new Error("Missing arguments for decryption.");
    }

    let decryptedMessage = "";
    encryptedMessage = encryptedMessage.toUpperCase();
    key = key.toUpperCase();

    for (let i = 0, j = 0; i < encryptedMessage.length; i++) {
      const char = encryptedMessage[i];
      if (char >= "A" && char <= "Z") {
        const shift = key[j % key.length].charCodeAt(0) - "A".charCodeAt(0);
        const shiftedChar = this.isDirect
          ? String.fromCharCode(
              ((char.charCodeAt(0) - "A".charCodeAt(0) - shift + 26) % 26) +
                "A".charCodeAt(0)
            )
          : String.fromCharCode(
              ((char.charCodeAt(0) - "A".charCodeAt(0) + shift) % 26) +
                "A".charCodeAt(0)
            );

        decryptedMessage += shiftedChar;
        j++;
      } else {
        decryptedMessage += char;
      }
    }

    return decryptedMessage;
  }
}

module.exports = {
  VigenereCipheringMachine,
};
