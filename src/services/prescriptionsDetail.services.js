import axios from 'axios';

const endpoint = 'http://localhost:8080/detail';

async function getDetail() {
  try {
    const detail = await axios.get(endpoint+'/all');
    return detail.data;
  } catch (error) {
    console.log(error);
  }
};

async function createDetail(dataPost) {
    try {
        const response= await axios.post(endpoint+'/save', dataPost);
        return response.data;
    }catch(error){
      console.log(error);
    }
};

async function updateDetail(dataPost) {
    try {
        const updateDetail = {
            "idDetail": dataPost.idDetail,
          }
        const response= await axios.post(endpoint+'/save', updateDetail);
        return response.data;
    }catch(error){
      console.log(error);
    }
}

async function deletePatient(id){
    try {
        await axios.delete(endpoint+"/delete/"+id);
        
    } catch (error) {
    console.log(error);
    }
}

export {
    getDetail,
    createDetail,    
    updateDetail,
    deletePatient,
};
