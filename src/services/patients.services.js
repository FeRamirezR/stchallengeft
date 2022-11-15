import axios from 'axios';

const endpoint = 'http://localhost:8080/patients';

async function getPatients() {
  try {
    const patients = await axios.get(endpoint+'/all');
    return patients.data;
  } catch (error) {
    console.log(error);
  }
};

async function createPatients(dataPost) {
    try {
        var fecha = new Date(dataPost.birthDate);
        var dias = 1;
        fecha.setDate(fecha.getDate() + dias);
        dataPost.birthDate=fecha.toISOString().substring(0, 10);
        if(dataPost.gender==='') dataPost.gender='MALE';
        const response= await axios.post(endpoint+'/save', dataPost);
        return response.data;
    }catch(error){
      console.log(error);
    }
};

async function updatePatients(dataPost) {
    try {
        var fecha = new Date(dataPost.birthDate);
        var dias = 1;
        fecha.setDate(fecha.getDate() + dias);
        dataPost.birthDate=fecha.toISOString().substring(0, 10);
        const updatePatient = {
            "idUser": dataPost.idUser,
            "name": dataPost.name,
            "lastName": dataPost.lastName,
            "email": dataPost.email,
            "phone": dataPost.phone,
            "idDocType": "f4d1a125-e3bb-4187-88b9-08ebf98dc423",
            "doc": dataPost.doc,
            "gender": dataPost.gender,
            "birthDate": dataPost.birthDate
          }
        const response= await axios.post(endpoint+'/save', updatePatient);
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
    getPatients,
    createPatients,    
    updatePatients,
    deletePatient,
};
