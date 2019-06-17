import { Component } from '@angular/core';
import { UrnaService } from '../../services/urna.service';
import { PaillierService } from '../../services/paillier.service';
import { User, PubKey, PrivKey } from '../../models/user';

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
  user:User;

  constructor(private urnaService: UrnaService, private paillierService: PaillierService){//, private paillierService: PaillierService) {
    this.sendedVote = false;
  };


  private sendVote(candidate: String) {
    var foo = this.paillierService;

    this.urnaService.sendVote(this.user).subscribe(response => {
      var message = response['message'];
      var payload = response['payload'];
      this.sendedVote = true;
    });

  };

}