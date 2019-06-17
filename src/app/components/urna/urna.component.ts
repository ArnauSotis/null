import { Component } from '@angular/core';
import { UrnaService } from '../../services/urna.service';
import { PaillierService } from '../../services/paillier.service';
import { VotoUrna, FirmaVotante, Voto } from '../../models/votoUrna';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'urna',
  templateUrl: 'urna.component.html',
  styleUrls: ['urna.component.css'],
})

export class Urna {

  candidates = [
    { name: "Candidato 1" },
    { name: "Candidato 2" },
    { name: "Candidato 3" }
  ];

  sendedVote: Boolean;
  selectedCandidate:string;

  publicSignedCensoKey: String;
  publicKeyVotante: String;

  constructor(private urnaService: UrnaService, private paillierService: PaillierService){
    this.sendedVote = false;
    this.selectedCandidate = "";

    //Es el id random que te has generado, una vez firmada por el censo y descegada por ti (RSA)
    this.publicSignedCensoKey = "1611611616"
    //id random que te has generado (RSA)
    this.publicKeyVotante = "123123"

  };


  private sendVote() {

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

  private stringToAscii(m:string){
    var newMessage = ""
    for (let index = 0; index < m.length; index++) {
      const element = m[index];
      var ascii = element.charCodeAt(0);   
      newMessage += ascii.toString();
    }
    return newMessage;
  }

}