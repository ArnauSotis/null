import { Component } from '@angular/core';
import { CensoService } from '../../services/censo.service';
import { RSAService } from '../../services/rsa.service';
import { User, PubKey } from '../../models/user';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})

export class Register {

  infoSended: Boolean;
  user: User;
  username: string;
  dni: string;

  constructor(private censoService: CensoService, private rsaService: RSAService) {
    this.infoSended = false;
  };

  private send(username, dni) {

    this.username = username;
    this.dni = dni;
    var byteNameArray = this.stringToAscii(this.username);
    var byteDniArray = this.stringToAscii(this.dni);

    this.user = new User(byteNameArray, byteDniArray, new PubKey(this.rsaService.e, this.rsaService.n) );
    
    this.censoService.getVoterId(3, this.user).subscribe(response => {
      this.user.blindedPubKey = response['blinded_pub_key'];
      alert(JSON.stringify(response));
    });
  }

  private reset() {
    this.infoSended = null;
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