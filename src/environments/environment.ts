// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {  
  production: false,
  developer: true
};

export class EnvironmentHelper {

  readonly urlbase: string = environment.developer ? 'api' : 'http://147.83.7.156:3001';
  
  public readonly censoDictionary = {
    getPublicKey: `${this.urlbase}/censoPubkey`,
    postVoterId: `${this.urlbase}/censoGet_voter_id`,    
    postGetSignedBlindKey: `${this.urlbase}/censoGet_signed_blind_key`,

  };

  private readonly urnaDictionary = {
    //getEncryptedVotes: `${this.urlbase}/urnaEncrypted_votes`,
    //getEncryptedTally: `${this.urlbase}/unraEncrypted_tally`,
    sendVote: `${this.urlbase}/urnaVoto`
  };

  public readonly urls = {
    censo: this.censoDictionary,
    urna : this.urnaDictionary
  }
}

// PROD
/*

public readonly censoDictionary = {
    getPublicKey: `${this.urlbase}/censo/pubkey`,
    postVoterId: `${this.urlbase}/censo/get_voter_id`,    
    postGetSignedBlindKey: `${this.urlbase}/censo/get_signed_blind_key`,

  };

  private readonly urnaDictionary = {
    getEncryptedVotes: `${this.urlbase}/urna/encrypted_votes`,
    getEncryptedTally: `${this.urlbase}/unra/encrypted_tally`,
    postVoto: `${this.urlbase}/urna/voto`
  };

  public readonly urls = {
    censo: this.censoDictionary,
    urna : this.urnaDictionary
  }
  */