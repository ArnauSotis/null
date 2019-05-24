export class User {
    //encryptedVote: encriptado con pallier y la Kpub de la mesa electoral
    username: String;
    password: String;
    pubKey: PubKey;
    blindedPubKey: String;
  
    constructor(username: String, password: String, pubKey: PubKey) {
      this.username = username;
      this.password = password;
      this.pubKey = pubKey;      
    }
  }

  export class PubKey {
    e:string;
    n:string;

    constructor(e, n) {
      this.e = e;
      this.n = n;
    }
  }