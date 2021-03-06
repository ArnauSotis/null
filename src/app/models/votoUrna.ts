export class VotoUrna {
    firma_votante: FirmaVotante;
    voto: Voto;

    constructor(firma_votante, voto) {
        this.firma_votante = firma_votante;
        this.voto = voto;
    }
}

export class FirmaVotante {
    k_pub_firmada_censo: String;
    k_pub_votante: String;

    constructor(k_pub_firmada_censo, k_pub_votante) {
        this.k_pub_firmada_censo = k_pub_firmada_censo;
        this.k_pub_votante = k_pub_votante;
    }
}

export class Voto {
    en_vote: String;
    signed_hash_en_vote: String;

    constructor(en_vote, signed_hash_en_vote) {
        this.en_vote = String(en_vote);
        this.signed_hash_en_vote = String(signed_hash_en_vote);
    }
}

/*
class publicKeyVotantePaillier {
    g:String;
    n:String;
    _n2:String;

    constructor(g, n, _n2){
        this.g = g.toString()
        this.n = n.toString()
        this._n2 = _n2.toString()
    }
}
*/