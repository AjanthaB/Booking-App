import { Injectable } from "@angular/core";
import { EmailComposer } from "@ionic-native/email-composer";
import { Observable } from "rxjs/Observable";
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class MailService {

  private email = {
    to: "ajantha.p.bandara@gmail.com",
    cc: "",
    bcc: "",
    attachments: [],
    subject: "Contact Details",
    body: "",
    isHtml: true
  };

  constructor(private emailComposer: EmailComposer) {
    console.log("Mail service");
  }

  ngOnInit() {
    this.initAndOpenEMailComposer();
  }

  // TODO: Need to refactor this method
  public initAndOpenEMailComposer(): void {
    this.isAvailable()
      .subscribe((available: boolean) => {
        this.hasPermission()
          .subscribe((has: boolean) => {
            if (has) {
              console.log("Application has permission to use email composer");
            } else {
              this.requestPermission()
                .subscribe((granted: boolean) => {
                  if (granted) {
                    console.log("permission granted");
                  } else {
                    console.log("permission denied");
                  }
                }, err => {
                  console.log("Error: ", err);
                })
            }
          }, err => {
            console.log("Error: ", err);
          })
      }, err => {
        console.log("Error: ", err);
      })
  }

  public setMailData(body: string): void {
    this.email.body = body;
  }

  public resetMailData(): void {
    this.email.body = "";
  }

  public hasPermission(): Observable<boolean> {
    return fromPromise(this.emailComposer.hasPermission()) ;
  }

  public requestPermission(): Observable<boolean> {
    return fromPromise(this.emailComposer.requestPermission());
  }

  public isAvailable(): Observable<any> {
    return fromPromise(this.emailComposer.isAvailable());
  }

  public openMail(mail: any): void {
    const details = Object.assign({}, this.email, {body: mail});
    this.emailComposer.open(details);
  }

  public getMailComposer(): EmailComposer {
    return this.emailComposer;
  }
}
