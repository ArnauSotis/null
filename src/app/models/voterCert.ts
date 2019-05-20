export class VoterCert {
    //pubKey: clave publica votante
    pubKey: Number;

    //signature: firma del censo
    signature: Number;
  
    constructor(encryptedVote, signature) {
      this.pubKey = encryptedVote;
      this.signature = signature;
    }
  }