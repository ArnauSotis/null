export class User {
    //encryptedVote: encriptado con pallier y la Kpub de la mesa electoral
    username: String;
    password: String;
    pubKey: PubKey;
    privKey: PrivKey;
    blindedPubKey: String;
    voterId: String
  
    constructor(username: String, password: String, pubKey: PubKey, privKey: PrivKey) {
      this.username = username;
      this.password = password;
      this.pubKey = pubKey;
      this.privKey = privKey;
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

  export class PrivKey {
    d:string;
    n:string;

    constructor(e, n) {
      this.d =String(e);
      this.n = String(n);
    }
  }