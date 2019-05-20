import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const censo = [
      { id: 1, password: 'Windstorm', blindedPublicKey: '161491604894894099161491604894894099' },
      { id: 2, password: 'Abdul', blindedPublicKey: '940410011940410011940410011' },
      { id: 3, password: 'Amstrong', blindedPublicKey: '42410792179098570254241079217909857025' },
      { id: 4, password: 'Rifone', blindedPublicKey: '000021509059000021509059000021509059' }
    ];
    return { censoPubkey: censo };
  }
}

