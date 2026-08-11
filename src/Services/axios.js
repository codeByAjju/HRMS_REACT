import axios from "axios";
export const APIrequest = async ({
    method,
    url,
    baseURL,
    bodyData,
}) => {
    try {
        console.log(bodyData);
        const axiosConfig = {
            method: method || "GET",
            baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
            headers: {
                "content-type": "application/json",
            },
        };
        if (baseURL) {
            axiosConfig.baseURL = baseURL;
        }
        if (url) {
            axiosConfig.url = url;
        }
        if (bodyData) {
            const bodyPayload = {};
            for (const key in bodyData) {
                if (Object.hasOwnProperty.call(bodyData, key)) {
                    let element = bodyData[key];
                    if (typeof element === "string") {
                        element = element.trim();
                    }
                    if (![null, undefined, NaN].includes(element)) {
                        bodyPayload[key] = element;
                    }
                }
            }
            axiosConfig.data = bodyPayload;
        }
        const res = await axios(axiosConfig);
        return res;
    }
    catch (error) {
        console.log(error);
    }
}