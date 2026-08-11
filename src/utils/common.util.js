import config from "../config";
import CryptoJS from "crypto-js";

export const setLocalStorageToken = (token) => {
  localStorage.setItem(
    `${config.NAME_KEY}:token`,
    CryptoJS.AES.encrypt(token, `${config.NAME_KEY}-token`).toString()
  );
};

export const GetLocalStorageToken = () => {
  const token = localStorage.getItem(`${config.NAME_KEY}:token`);
  if (token) {
    const bytes = CryptoJS?.AES?.decrypt(token, `${config.NAME_KEY}-token`);
    return bytes?.toString(CryptoJS.enc.Utf8);
  }
  return false;
};

export const removeLocalStorageToken = (navigate) => {
  localStorage.removeItem(`${config.NAME_KEY}:token`);

  if (navigate) {
    navigate("/login");
  }
};
