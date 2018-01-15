import { Injectable } from "@angular/core";
import { Network } from '@ionic-native/network'


@Injectable()
export class OfflieDetectionService {
  
  private offline = false;
  private onConnect;
  private onDisConnect;

  constructor( private network: Network) {}

  ionViewDidEnter() {
    this.onConnect = this.network.onConnect().subscribe(data => {
      console.log(data)
      this.offline = false;
    }, error => console.error(error));
   
    this.onDisConnect = this.network.onDisconnect().subscribe(data => {
      console.log(data)
      this.offline = true;
    }, error => console.error(error));
  }

  public isOnline(): boolean {
    return this.offline;
  }

  public getOnConnectState(): any {
    return this.onConnect;
  }

  public getOnDisConnectState(): any {
    return this.onDisConnect;
  }
}