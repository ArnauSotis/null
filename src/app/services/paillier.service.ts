import { Injectable } from '@angular/core';
import * as PaillierCryptoUtils from 'paillier-bigint';
import * as BigIntCryptoUtils from 'bigint-crypto-utils';

@Injectable()
export class PaillierService {

    private paillierCryptoUtils: PaillierCryptoUtils;

    privateKey: any;
    publicKey:any;

    constructor() {
        this.paillierCryptoUtils = PaillierCryptoUtils;
        this.generateKeys();
    }

    sign(m) {
        return this.encrypt(m);
    };

    verify(k) {
        return this.decrypt(k);
    };

    encrypt(m) {
        return this.publicKey.encrypt(m);
    };

    decrypt(k) {
        return this.privateKey.decrypt(k)
    };

    blind(m){
        //TODO?
    }

    unblind(s){
        //TODO?
    }
    private async generateKeys() {
        var paillierResponse = await this.paillierCryptoUtils.generateRandomKeys(3072);
        this.publicKey = paillierResponse['publicKey'];
        this.privateKey = paillierResponse['privateKey'];
    };   
}

