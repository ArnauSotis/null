// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {  
  production: true,
  developer: false
};

export class EnvironmentHelper {

  readonly urlbase: string = environment.developer ? 'api' : 'http://localhost:5000';

public readonly censoDictionary = {
    getPublicKey: `${this.urlbase}/pubkey`,
    postVoterId: `${this.urlbase}/get_voter_id`,    
    postGetSignedBlindKey: `${this.urlbase}/get_signed_blind_key`,

  };

  private readonly urnaDictionary = {
    getEncryptedVotes: `${this.urlbase}/encrypted_votes`,
    getEncryptedTally: `${this.urlbase}/encrypted_tally`,
    sendVote: `${this.urlbase}/votar`
  };

  public readonly urls = {
    censo: this.censoDictionary,
    urna : this.urnaDictionary
  }
}
