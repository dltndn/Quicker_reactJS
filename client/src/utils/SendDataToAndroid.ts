export class SendDataToAndroid {
    private address:string
    private addressScheme: string = "quicker://link?walletAddress="
    private isDeliveringScheme: string = "quicker://link?isDelivering="
    private isMatchedOrderScheme: string = "quicker://link?isMatchedOrder="
    private isDeliveredOrderScheme: string = "quicker://link?isDeliveredOrder="
    private isCompletedOrderScheme: string = "quicker://link?isCompletedOrder="

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

    public sendIsDeliveredOrder(bool: boolean) {
        window.location.href = this.addressScheme + this.address
        window.location.href = this.isDeliveredOrderScheme + bool.toString()
    }
    
    public sendIsCompletedOrder(bool: boolean) {
        window.location.href = this.addressScheme + this.address
        window.location.href = this.isCompletedOrderScheme + bool.toString()
    }
}