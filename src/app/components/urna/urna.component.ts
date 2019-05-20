import { Component } from '@angular/core';
import { UrnaService } from '../../services/urna.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'urna',
  templateUrl: 'urna.component.html',
  styleUrls: ['urna.component.css'],
})

export class Urna {

  candidates = [
    { name: "Candidato 1", checked: false },
    { name: "Candidato 2", checked: false },
    { name: "Candidato 3", checked: false },
  ];
  
  sendedVote: Boolean;
  constructor() {
    this.sendedVote = false;
  };

/*
  private updateSelection = function(selectedCandidate) {
    this.candidates.forEach(item => {
        if (item.name != selectedCandidate.name)
            item.checked = false;
        }
    );
};

*/
  private sendVote() {
    this.sendedVote = true;
    /*
    this.UrnaService.sendVote(new User("a","a")).subscribe(response => {
      this.pubKey = response['blindedPublicKey'];     
      console.log(JSON.stringify(response));
    });
    */
  };

}