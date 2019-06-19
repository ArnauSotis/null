import { Component } from '@angular/core';
import { CensoService } from '../../services/censo.service';
import { RSAService } from '../../services/rsa.service';
import { User, PubKey, PrivKey } from '../../models/user';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})

export class Register {

  infoSended: Boolean;
  user: User;
  username: string;
  pass: string;
  electionsToRequest: any;

  constructor(private censoService: CensoService, private rsaService: RSAService) {
    this.infoSended = false;
    var electionsResponse = {
      "elections": [
        {
          "id": 1,
          "name": "Elecciones a Cortes Generales 2019"
        },
        {
          "id": 2,
          "name": "Elecciones Municipales 2019"
        },
        {
          "id": 3,
          "name": "Eleccions Rectorat UPC"
        }
      ]
    };

    this.electionsToRequest = electionsResponse["elections"];
  };

  private send(username,pass, selectedElection) {

    var selectedElectionId = 0;
    this.electionsToRequest.forEach(election => {
      if(election.name == selectedElection){
        selectedElectionId = parseInt(election.id);
      }
    });

    this.username = username;
    this.pass = pass;
    var pubKey = new PubKey(this.rsaService.e, this.rsaService.n);
    var privKey = new PrivKey(this.rsaService.e, this.rsaService.n);

    this.user = new User(username, pass, pubKey, privKey);
    this.user.blindedPubKey = String(this.rsaService.blind("public_key"));

    this.censoService.getVoterId(selectedElectionId, this.user).subscribe(response => {
      this.user.voterId = response['voter_id'];
      this.infoSended = true;
    });
  }

  private reset() {
    this.infoSended = null;
  };

  private stringToAscii(m: string) {
    var newMessage = ""
    for (let index = 0; index < m.length; index++) {
      const element = m[index];
      var ascii = element.charCodeAt(0);
      newMessage += ascii.toString();
    }
    return newMessage;
  }
}