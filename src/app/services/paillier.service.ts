import { Injectable } from '@angular/core';
import * as PaillierCryptoUtils from 'paillier-bigint';
import * as BigIntCryptoUtils from 'bigint-crypto-utils';

@Injectable()
export class PaillierService {

    private _publicExponent: Number = 65537;
    private paillierCryptoUtils: PaillierCryptoUtils;
    private bigIntCryptoUtils: BigIntCryptoUtils;

    n: any;
    //publick key
    e: any;
    //private key
    d: any;
    //random number
    r: any;

    constructor() {
        this.paillierCryptoUtils = PaillierCryptoUtils;
        this.bigIntCryptoUtils = BigIntCryptoUtils;
        this.generateKeys();
    }

    sign(m) {
        return this.encrypt(m);
    };

    verify(k) {
        return this.decrypt(k);
    };

    encrypt(m) {
        return this.e.encrypt(m);
    };

    decrypt(k) {
        return this.d.decrypt(k)
    };

    blind(m){
        if(this.r = null){
            this.bigIntCryptoUtils.randBetween(this.bigIntCryptoUtils.BigInt(2) ** this.bigIntCryptoUtils.BigInt(256));
        }
        var b = this.bigIntCryptoUtils.modPow(this.r, this.e, this.n);
        var blinded_msg = m*b % this.n;

        return blinded_msg;
    }

    unblind(s){
        var unblinded_msg = s * this.bigIntCryptoUtils.modInv(this.r, this.n) % this.n
        return unblinded_msg;
    }
    private generateKeys() {
        var paillierResponse = this.paillierCryptoUtils.generateRandomKeys(3072);
        this.e = paillierResponse['publicKey'];
        this.d = paillierResponse['privateKey'];
    };   
}

