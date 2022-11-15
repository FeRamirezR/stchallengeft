import axios from 'axios';

const endpoint = 'http://localhost:8080/medicines';

async function getMedicines() {
  try {
    const medicines = await axios.get(endpoint+'/all');
    return medicines.data;
  } catch (error) {
    console.log(error);
  }
};

async function createMedicines(dataPost) {
    try {
        const response= await axios.post(endpoint+'/save', dataPost);
        return response.data;
    }catch(error){
      console.log(error);
    }
};

async function updateMedicines(dataPost) {
    try {
        const updateMedicine = {
            "idMedicine": dataPost.idMedicine,
            "nameMed": dataPost.nameMed,
            "minAge": dataPost.minAge,
            "maxAge": dataPost.maxAge,
            "gender": dataPost.gender
          }
        const response= await axios.post(endpoint+'/save', updateMedicine);
        return response.data;
    }catch(error){
      console.log(error);
    }
}

async function deleteMedicine(id){
    try {
        await axios.delete(endpoint+"/delete/"+id);
        
    } catch (error) {
    console.log(error);
    }
}

export {
    getMedicines,
    createMedicines,    
    updateMedicines,
    deleteMedicine,
};
