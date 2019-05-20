import { Injectable } from '@angular/core';
import * as BigIntCryptoUtils from 'bigint-crypto-utils';

@Injectable()
export class RSAService {

    private _publicExponent: Number = 65537;
    private bigIntCryptoUtils: BigIntCryptoUtils;

    n: any;
    e: any;
    d: any;

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

