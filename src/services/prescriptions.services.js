import axios from 'axios';

const endpoint = 'http://localhost:8080/prescriptions';

async function getPrescriptions() {
  try {
    const prescriptions = await axios.get(endpoint+'/all');
    return prescriptions.data;
  } catch (error) {
    console.log(error);
  }
};

async function createPrescriptions(dataPost) {
    try {
        const response= await axios.post(endpoint+'/save', dataPost);
        return response.data;
    }catch(error){
      console.log(error);
    }
};

async function updatePrescriptions(dataPost) {
    try {
        const updatePrescription = {
            "idPrescription": dataPost.idPrescription,
          }
        const response= await axios.post(endpoint+'/save', updatePrescription);
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
    getPrescriptions,
    createPrescriptions,    
    updatePrescriptions,
    deletePatient,
};
