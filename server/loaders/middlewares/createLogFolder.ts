import { mkdir } from "node:fs/promises";

export const createLogFolder = async () => {
  try {
    await mkdir("./logs");
  } catch (error: any) {
    if (isAlreadyExistFolder(error)) {
      console.error(error);
      throw new Error(error);
    }
  }
};

const isAlreadyExistFolder = (error : any) => error?.errno !== -17
