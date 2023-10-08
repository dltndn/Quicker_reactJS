export class TwilioApi {
  private messageTemplate = `\n[Quicker]\n\n반갑습니다, 고객님.\n고객님의 소중한 상품이 배송 예정입니다.\n\n※ 실시간 배송정보\n`;
  private client
  private phonenumber

  constructor({sid , token , phonenumber } : {[key : string] : string}) {
    this.client = require("twilio")(sid, token);
    this.phonenumber = phonenumber
  }

  async sendURLToReceiver (phoneNumber: string, url : string) {
    try {
      const message = await this.sendMessage(phoneNumber, url)
      console.log(message);
    } catch (error) {
      console.error(error);
    }
  } 

  private async sendMessage(phoneNumber: string, url : string) {
    return await this.client.messages.create({
      body: this.messageTemplate + url,
      from: this.phonenumber,
      to: "+82" + phoneNumber,
    });  
  }
}

// export default sendURLToReceiver;