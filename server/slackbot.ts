import { WebClient } from "@slack/web-api";

export class SlackBot {
  private client: any;
  private channelId: string | undefined;

  constructor(token: string | undefined, channelId: string | undefined) {
    this.checkParameter(token, channelId)
  }

  private checkParameter(token: string | undefined, channelId: string | undefined) {
    if (typeof token && typeof channelId === "string") {
      this.client = new WebClient(token);
      this.channelId = channelId;    
    } else {
      console.error(".env, config 폴더 확인 필요")
    }
  }

  private messageTemplate(e: any) {
    return (
      `*에러 발생 [ ${new Date().toLocaleString("ko-KR")} ]* \n\n` +
      "*Error Message : * " +
      e.message +
      "\n\n" +
      "*Error stacktrace : *" +
      "  ```" +
      e.stack +
      "``` "
    );
  }

  public async sendMessage(e: any) {
    try {
      await this.client.chat.postMessage({
        channel: this.channelId,
        text: this.messageTemplate(e),
      });
    } catch (error) {
      console.error(error);
    }
  }
}

