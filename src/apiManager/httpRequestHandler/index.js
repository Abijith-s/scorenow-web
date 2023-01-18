import axios from 'axios';
axios.defaults.withCredentials = true;
export const httpPOSTRequest = async(url,data) =>{
  return await axios.post(url,data);
};

export const httpGETRequest = async(url)=>{
  return await axios.get(url);
}
