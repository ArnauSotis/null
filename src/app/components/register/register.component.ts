import { Component } from '@angular/core';
import { CensoService } from '../../services/censo.service';
import { RSAService } from '../../services/rsa.service';

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css'],
})

export class Register {

  pubKey: Number;

  constructor(private censoService: CensoService, private rsaService: RSAService) {
    this.pubKey = null;
  };

  private getPubKey() {
    
    this.censoService.getPublicKey(3).subscribe(response => {
      this.pubKey = response['blindedPublicKey'];
      console.log(JSON.stringify(response));
    });
  };

  private clearPubKey() {
    this.pubKey = null;
  };
}