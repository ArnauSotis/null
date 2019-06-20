import { Component } from '@angular/core';
import { UrnaService } from '../../services/urna.service';
import { PaillierService } from '../../services/paillier.service';
import { VotoUrna, FirmaVotante, Voto } from '../../models/votoUrna';
import { sha256 } from 'js-sha256';
import { isNullOrUndefined } from 'util';
import { RSAService } from '../../services/rsa.service';

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

  //id random que te has generado, una vez firmada por el censo y descegada por ti
  voterId: String;
  //id random que te has generado
  publicKeyVotante: any;

  constructor(private urnaService: UrnaService, private paillierService: PaillierService, private rsaService: RSAService) {
    this.sendedVote = false;
    this.credentials = true;
    this.selectedCandidate = "";
    this.publicKeyVotante = { "n": String(this.rsaService.n), "e": String(this.rsaService.e) };
    
    //Este bigint viene dado por la MESA!!!
    this.paillierService.n = BigInt(19820282653049065013214563159144867370145454481041214549176902110729736690687190898500669715663965297502465561963483077171328097725401787682882843126366884868787749627063822721285595775406845324170965404116114486517719392173681418739848796924728369132082368351399749128151187698602634049180861453258363192774814122007021803125074714426597648587670212598980016571263043778663221043695411161584860460578097494142127088294941921255244173671031101128167186171468537234979386265714667935327527627308866264626697969523242029863245050600845429548431664207704673073876244595225450118842459783595370204107546330124042443213629);
    this.paillierService.generateKeys(this.paillierService.n, BigInt(19820282653049065013214563159144867370145454481041214549176902110729736690687190898500669715663965297502465561963483077171328097725401787682882843126366884868787749627063822721285595775406845324170965404116114486517719392173681418739848796924728369132082368351399749128151187698602634049180861453258363192774814122007021803125074714426597648587670212598980016571263043778663221043695411161584860460578097494142127088294941921255244173671031101128167186171468537234979386265714667935327527627308866264626697969523242029863245050600845429548431664207704673073876244595225450118842459783595370204107546330124042443213630));
    //this.paillierService.generateKeys(Number(n), Number(n) + 1);
  };

  private sendVote() {
   
    
    
    var firmaVotante = new FirmaVotante(String(this.rsaService.voterId), JSON.stringify(this.publicKeyVotante));
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