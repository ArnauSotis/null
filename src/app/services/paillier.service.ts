import { Injectable } from '@angular/core';
import * as PaillierCryptoUtils from 'paillier-bigint';

@Injectable()
export class PaillierService {

    private paillierCryptoUtils: PaillierCryptoUtils;

    privateKey: any;
    publicKey: any;
    /*
    DADO UNOS PARAMETROS CONOCIDOS QUE ME PROPORCIONARA LA MESA...
    ELIMINAR g & n una vez tengamos esto de la mesa
    */
     g :BigInt;
     n :BigInt;

    constructor() {
        this.paillierCryptoUtils = PaillierCryptoUtils;
        //this.generateKeys(this.n, this.g);
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

    generateKeys(n, g) {
        
        this.publicKey = new this.paillierCryptoUtils.PublicKey(n, g)
        //this.privateKey = ??
    };


    /*
    private async generateKeys(n, g) {
        var paillierResponse = await this.paillierCryptoUtils.generateRandomKeys(3072);
        this.publicKey = new this.paillierCryptoUtils.PaillierPublicKey(n, g)
        this.privateKey = paillierResponse['privateKey'];
    };
    */
}

