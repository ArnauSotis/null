import { Component } from '@angular/core';
import { UrnaService } from '../../services/urna.service';
import { PaillierService } from '../../services/paillier.service';
import { VotoUrna, FirmaVotante, Voto } from '../../models/votoUrna';
import { sha256 } from 'js-sha256';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'urna',
  templateUrl: 'urna.component.html',
  styleUrls: ['urna.component.css'],
})

export class Urna {

  candidates = [
    { name: "Voto en blanco" },
    { name: "Candidato 1" },
    { name: "Candidato 2" },
    { name: "Candidato 3" }
  ];

  sendedVote: Boolean;
  credentials: Boolean;
  selectedCandidate: string;

  publicSignedCensoKey: String;
  publicKeyVotante: String;

  constructor(private urnaService: UrnaService, private paillierService: PaillierService) {
    this.sendedVote = false;
    this.credentials = false;
    this.selectedCandidate = "";

    //Es el id random que te has generado, una vez firmada por el censo y descegada por ti (RSA)
    this.publicSignedCensoKey = "1611611616"
    //id random que te has generado (RSA)
    this.publicKeyVotante = "123123"

  };

  private sendPublicKeyPaillier(n, n2, g, pubKeyRSA, voterId) {
    if (!(n.length > 0 && g.length > 0 && pubKeyRSA.length > 0 && voterId.length > 0)) {
      return;
    }
    
    this.publicSignedCensoKey = voterId;
    this.publicKeyVotante = pubKeyRSA;

    this.paillierService.g = g;
    this.paillierService.n = n;

    this.paillierService.generateKeys(n, g);

    this.credentials = true;
  }

  private sendVote() {

    if(this.selectedCandidate == "")
    {
      return;
    }

    var firmaVotante = new FirmaVotante(this.publicSignedCensoKey, this.publicKeyVotante);
    var m = parseInt(this.stringToAscii(this.selectedCandidate));
    var encryptedVote = this.paillierService.encrypt(m).toString();
    var hasEncryptedVote = sha256(encryptedVote);
    var voto = new Voto(encryptedVote, hasEncryptedVote);
    var votoUrna = new VotoUrna(firmaVotante, voto);

    this.urnaService.sendVote(votoUrna).subscribe(response => {
      var message = response['message'];
      var payload = response['payload'];
      this.sendedVote = true;
    });

    this.sendedVote = true;

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