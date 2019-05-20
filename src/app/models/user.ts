export class User {
    //encryptedVote: encriptado con pallier y la Kpub de la mesa electoral
    username: String;
    password: String;
  
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
  }