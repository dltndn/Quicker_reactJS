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

    public openMapApp(sLat: number, sLng: number, sName: string, eLat: number, eLng: number, eName: string, isUsingCurrent: boolean, mapIndex: number) {
        window.location.href = this.addressScheme + this.address
        switch(mapIndex) {
            case 1: // naverMap
                if (isUsingCurrent) {
                    window.location.href=`nmap://route/public?dlat=${sLat.toString()}&dlng=${sLng.toString()}&dname=${sName}&appname=com.example.quicker`
                } else {
                    window.location.href=`nmap://route/public?slat=${sLat.toString()}&slng=${sLng.toString()}&sname=${sName}&dlat=${eLat.toString()}&dlng=${eLng.toString()}&dname=${eName}&appname=com.example.quicker`
                }
                break;
            case 2: // kakaoMap 	
                if (isUsingCurrent) {
                    window.location.href=`kakaomap://route?ep=${sLat.toString()},${sLng.toString()}&by=CAR`
                } else {
                    window.location.href=`kakaomap://route?sp=${sLat.toString()},${sLng.toString()}&ep=${eLat.toString()},${eLng.toString()}&by=CAR`
                }
                break;
            default: //naverMap
                if (isUsingCurrent) {
                    window.location.href=`nmap://route/public?dlat=${sLat.toString()}&dlng=${sLng.toString()}&dname=${sName}&appname=com.example.quicker`
                } else {
                    window.location.href=`nmap://route/public?slat=${sLat.toString()}&slng=${sLng.toString()}&sname=${sName}&dlat=${eLat.toString()}&dlng=${eLng.toString()}&dname=${eName}&appname=com.example.quicker`
                }
        }
    }
}