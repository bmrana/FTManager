/// <reference types="crypto-js" />

import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';

@Injectable()
export class CryptoService {

  constructor() { }

  getEncString(stringToEncrypt): string {
    const cipherText = CryptoJS.AES.encrypt(stringToEncrypt, 'LukeIAmYourFather');
    return cipherText.toString();
  }

  decrypt(stringToDecrypt): string {
    const bytes = CryptoJS.AES.decrypt(stringToDecrypt, 'LukeIAmYourFather');
    const plainText = bytes.toString(CryptoJS.enc.Utf8);
    return plainText;
  }
}
