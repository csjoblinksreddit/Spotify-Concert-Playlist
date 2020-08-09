import CryptoJS  from 'crypto-js';

export const encode = (string, key) => {
    const encrypted = CryptoJS.AES.encrypt(string, key);
    return encrypted.toString();
}

export const decode = (encryptedString, key) => {
    const bytes = CryptoJS.AES.decrypt(encryptedString, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted
}

