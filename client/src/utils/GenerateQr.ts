var QRCode = require("qrcode");

export const generateQRCode = async (url: string) => {
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      return qrCodeDataUrl;
    } catch (error) {
      console.error("Failed to generate QR code:", error);
      return null;
    }
  };