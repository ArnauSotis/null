export class User {
    //encryptedVote: encriptado con pallier y la Kpub de la mesa electoral
    username: String;
    password: String;
    pubKey: PubKey;
  
    blindedPubKey: String;
    voterId: String
  
    constructor(username: String, password: String, pubKey: PubKey, blindedPubKey) {
      this.username = username;
      this.password = password;
      this.pubKey = pubKey;
   
      this.blindedPubKey = blindedPubKey;
    }
  }

  export class PubKey {
    e:any;
    n:any;

    constructor(e, n) {
      this.e = e;
      this.n = n;
    }
  
  }