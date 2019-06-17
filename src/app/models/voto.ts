export class firma_votante {
    k_pub_firmada_censo: string;
    k_pub_votante: string;

    constructor(k_pub_firmada_censo, k_pub_votante) {
        this.k_pub_firmada_censo = String(k_pub_firmada_censo);
        this.k_pub_votante = String(k_pub_votante);
    }
}