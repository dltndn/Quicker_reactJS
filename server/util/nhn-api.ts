import CryptoJS from "crypto-js";

interface Body {
  type: "SMS" | "MMS" | "LMS";
  from: string;
  content: string;
  messages: {
      to: string;
  }[];
}

interface Keys {
  [key : string] : string
}

export class NHNAPI {
  private method = "POST";
  private accessKey;
  private secretKey;
  private url;

  constructor({accessKey , secretKey , serviceId } : Keys) {
    this.accessKey = accessKey
    this.secretKey = secretKey
    this.url = `/sms/v2/services/${serviceId}/messages`
  }

  public async send (body: Body) {
    const timestamp = new Date().getTime().toString()
    const hmac = this.makeSignature(timestamp)
    const headers = {
      "Content-Type": "application/json",
      "x-ncp-apigw-timestamp": timestamp,
      "x-ncp-iam-access-key": this.accessKey,
      "x-ncp-apigw-signature-v2": hmac,
    };
    
    return await fetch(`https://sens.apigw.ntruss.com${this.url}`, {
      method: this.method,
      headers: headers,
      body: JSON.stringify(body),
    });
  }

  private makeSignature(timestamp : string) {
    const space = " ";
    const newLine = "\n";

    const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, this.secretKey);
    hmac.update(this.method);
    hmac.update(space);
    hmac.update(this.url);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(this.accessKey);

    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  }
}