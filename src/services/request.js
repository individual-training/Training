import request from 'umi-request';
import { history } from 'umi'

const responseFn = (result={}) => {
  if(result.success){
    return result.data;
  }else if(result.code == 401){
    console.log('[ request.js/window.location.href/7 ]  >>', window.location.href);
    history.push('/login')
  }else{
    console.log('[ request.js//12 ]  >>', 1213);
    return null;
  }
}

export default  {
  post : async (url,data) => {
    try{
      const result = await request.post(url,{data:data});
      return responseFn(result);
    }catch (e) {
      console.log(e);
    }
  },
  get : async(url, params) => {
    try{
      const result = await request.get(url,{params:params});
      return responseFn(result);
    }catch (e) {
      console.log(e);
    }
  },
  upload: async(url, formData) => {
    try{
      const result = await request(url,{
        method: 'POST',
        data: formData,
        requestType: 'form',
      });
      return responseFn(result);
    }catch (e) {
      console.log(e);
    }
  }
};

