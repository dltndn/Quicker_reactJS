export class SendDataToAndroid {
    private address:string
    private addressScheme: string = "quicker://link?walletAddress="
    private isDeliveringScheme: string = "quicker://link?isDelivering="
    private isMatchedOrderScheme: string = "quicker://link?isMatchedOrder="

    constructor(walletAddress: string | undefined) {
        if (walletAddress) {
            this.address = walletAddress
        } else {
            this.address = ""
        }
    }

    public sendWalletAddress() {
        window.location.href = this.addressScheme + this.address
    }

    public sendIsDelivering(bool: boolean) {
        window.location.href = this.addressScheme + this.address
        window.location.href = this.isDeliveringScheme + bool.toString()
    }

    public sendIsMatchedOrder(bool: boolean) {
        window.location.href = this.addressScheme + this.address
        window.location.href = this.isMatchedOrderScheme + bool.toString()
    }
}