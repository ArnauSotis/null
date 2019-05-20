export class Vote {
    //encryptedVote: encriptado con pallier y la Kpub de la mesa electoral
    encryptedVote: Number;
    signature: Number;
  
    constructor(encryptedVote, signature) {
      this.encryptedVote = encryptedVote;
      this.signature = signature;
    }
  }