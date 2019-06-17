import { Component } from '@angular/core';
import { UrnaService } from '../../services/urna.service';
import { PaillierService } from '../../services/paillier.service';
import { VotoUrna, FirmaVotante, Voto } from '../../models/votoUrna';

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
  publicSignedCensoKey: String;
  selectedCandidate:string;

  constructor(private urnaService: UrnaService, private paillierService: PaillierService){
    this.sendedVote = false;
    //Hay que recuperarla de un Endpoint!
    this.publicSignedCensoKey = "1234"
    this.selectedCandidate = "";
  };


  private sendVote() {

    var firmaVotante = new FirmaVotante(this.publicSignedCensoKey, this.paillierService.publicKey);
    var m = parseInt(this.stringToAscii(this.selectedCandidate));
    var voto = new Voto(this.paillierService.encrypt(m), this.paillierService.sign(m));
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