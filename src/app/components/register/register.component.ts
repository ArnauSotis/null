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

    //He puesto un 1 porque salía 0, se puede volver a poner 0.
  

    this.username = username;
    this.pass = pass;
    var pubKey = new PubKey(this.rsaService.e, this.rsaService.n);
    var privKey = new PrivKey(this.rsaService.d, this.rsaService.n);

     var blindedPubKey = String(this.rsaService.blind(pubKey.n));
   // var blindedPubKey = String(this.rsaService.blind(pubKey.n));
    pubKey.e = String(pubKey.e);
    pubKey.n = String(pubKey.n);
   // this.user.blindedPubKey = blindedPubKey;
   this.user = new User(username, pass, pubKey, privKey,blindedPubKey);

    this.censoService.getVoterId(selectedElection, this.user).subscribe(response => {
      this.user.voterId = response['voter_id'];
      this.user.voterId =this.rsaService.unblind(this.user.voterId).toString();
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