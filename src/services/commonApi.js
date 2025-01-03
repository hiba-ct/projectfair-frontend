 import axios from 'axios';

export const commonApi = async (httpMethod, url, reqBody, reqHeader) => {
  
  const reqConfig = {
    method: httpMethod,
    url,
    data: reqBody, // Use reqBody as the data
    headers: reqHeader ?reqHeader: { "Content-Type": "application/json" } // Corrected Content-Type header
  };
return await axios(reqConfig).then(res=>{
  return res
}).catch(err=>{
  return err
})
  
};

export default commonApi;


/* import axios from "axios";

export const commonApi = async (httpMethod, url, reqBody, reqHeader) => {
    try {
        const response = await axios({
            method: httpMethod,
            url,
            data: reqBody,
            headers: reqHeader || { "Content-Type": "application/json" },
        });
        return response;
    } catch (err) {
        console.error("API Error:", err);
        throw err.response || err.message;
    }
};

export default commonApi;
 */