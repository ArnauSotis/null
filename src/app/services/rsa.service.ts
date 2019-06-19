import { Injectable } from '@angular/core';
import * as BigIntCryptoUtils from 'bigint-crypto-utils';

@Injectable()
export class RSAService {

    private _publicExponent: Number = 65537;
    private bigIntCryptoUtils: BigIntCryptoUtils;

    n: any;
    //publick key
    e: any;
    //private key
    d: any;
    //random number
    r: any;

    constructor() {
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
        return this.bigIntCryptoUtils.modPow(m, this.e, this.n)
    };

    decrypt(k) {
        return this.bigIntCryptoUtils.modPow(k, this.d, this.n)
    };

    blind(m){
        if(this.r == null){
            this.r = this.bigIntCryptoUtils.randBetween(BigInt(2) ** BigInt(256));
        }
        var b = this.bigIntCryptoUtils.modPow(this.r, this.e, this.n);
        var blinded_msg = m*b % this.n;

        return String(blinded_msg);
    }

    unblind(s){
        var unblinded_msg = s * this.bigIntCryptoUtils.modInv(this.r, this.n) % this.n
        return unblinded_msg;
    }
    private async generateKeys() {
        var firstPrime = await this.bigIntCryptoUtils.prime(2048);
        var secondPrime = await this.bigIntCryptoUtils.prime(2048);
        var firstIsPrime = await this.bigIntCryptoUtils.isProbablyPrime(firstPrime);
        var secondIsPrime = await this.bigIntCryptoUtils.isProbablyPrime(secondPrime);

        if (firstIsPrime && secondIsPrime) {
            var publicModulus = firstPrime * secondPrime;
            firstPrime--;
            secondPrime--;
            var totient = firstPrime * secondPrime;
            var privateExponent = this.bigIntCryptoUtils.modInv(this._publicExponent, totient)

            this.loadKeys(publicModulus, this._publicExponent, privateExponent);
        }
    };

    private loadKeys(n: Number, e: Number, d: Number) {

        this.n = n;
        this.e = e;
        this.d = d;
    };
}

