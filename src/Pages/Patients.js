import React, { useEffect, useState } from "react";
import GridTable from '../components/Table';
import {
  getPatients,
  createPatients,
  updatePatients,
  deletePatient,
} from '../services/patients.services';

//MODAL
import {Modal, TextField, Button} from '@material-ui/core';
import '../assets/css/modalStyles.css'
import {makeStyles} from '@material-ui/core/styles';

//styles modal
const useStyles = makeStyles((theme) => ({

  confirm:{
    color:'#fee3e3',
    backgroundColor:'#ED8384',
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    padding: '2px 10px 1px',
    border: '1px solid #ED8384',
    borderRadius: '10px 10px',
    transition: 'all 0.4s ease 0s'
  },
  cancel:{
    color:'#ED8384',
    backgroundColor:'#FCE9E5',
    fontSize: '14px',
    fontWeight: 400,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    padding: '2px 10px 1px',
    border: '1px solid #ED8384',
    borderRadius: '10px 10px',
    transition: 'all 0.4s ease 0s',
    marginLeft: '5px'
  },
  iconos:{
    cursor: 'pointer'
  }, 
}));

const About = () => {

  const columns=[
    {
        title: 'Nombre',
        field: 'name'
    },
    {
        title: 'Apellido',
        field: 'lastName'
    },
    {
      title: 'Correo',
      field: 'email'
    },
    {
      title: 'Telefono',
      field: 'phone',
    },
    {
        title: 'Edad',
        field: 'age',
        type:'numeric'
    },
    {
        title: 'Documento',
        field: 'doc'
    },
    {
        title: 'Genero',
        field: 'gender'
    },
    {
      title: 'Fecha de nacimiento',
      field: 'birthDate',
      type:'date'
    }
  ];
  const styles= useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [pacienteSeleccionado, setPacienteSeleccionado]=useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    doc: "",
    gender: "",
    birthDate: ""
  });


  const handleChange=e=>{
    const {name, value}=e.target;
    setPacienteSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
    console.log('DATA',pacienteSeleccionado);
  }

  const peticionGet=async()=>{
    const patients= await getPatients();
    setData(patients);
  }

  const peticionPost=async()=>{
    console.log('POST',pacienteSeleccionado);

    const postPatients = await createPatients(pacienteSeleccionado);    
    setData(data.concat(postPatients));
    abrirCerrarModalInsertar();
   
  };

  const peticionUpdate=async()=>{
    const updtPatients = await updatePatients(pacienteSeleccionado);   
    setData(data.concat(updtPatients));
    abrirCerrarModalEditar();
  }

  const peticionDelete=async()=>{
    await deletePatient(pacienteSeleccionado.idUser)
    setData(data.filter(paciente=>paciente.idUser!==pacienteSeleccionado.idUser));
    abrirCerrarModalEliminar();
  }

  const seleccionarPaciente=(paciente, caso)=>{
    setPacienteSeleccionado(paciente);
    (caso==="Editar")?abrirCerrarModalEditar()
    :abrirCerrarModalEliminar()
  }

  useEffect(()=>{
    peticionGet();
  }, []);

  
  const abrirCerrarModalInsertar=()=>{
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar=()=>{
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar=()=>{
    setModalEliminar(!modalEliminar);
  }

  const bodyInsertar=(
    <div className={'modal'}>
        <h3>Agregar Nuevo paciente</h3>
        <TextField className={'inputMaterial'} label="Nombre" name="name" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Apellido" name="lastName" onChange={handleChange}/>          
        <br />
        <TextField className={'inputMaterial'} label="Correo" name="email" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Telefono" name="phone" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Documento" name="doc" onChange={handleChange}/>
        <br />
        <label for="gend">Genero:</label>
        <br />
        <select className={'inputData'} name="gender" onChange={handleChange}>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
        <br />
        <label for="start">Fecha de nacimiento:</label>
        <br />
        <input type="date" className={'inputData'} name="birthDate" onChange={handleChange}/>
        <br /><br />
        <div align="right">
            <Button className={styles.confirm} onClick={()=>peticionPost()}>Insertar</Button>
            <Button className={styles.cancel} onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
    </div>
  );

  const bodyEditar=(
    <div className={'modal'}>
        <h3>Editar paciente</h3>
        <TextField className={'inputMaterial'} label="Nombre" name="name" onChange={handleChange} value={pacienteSeleccionado&&pacienteSeleccionado.name}/>
        <br />
        <TextField className={'inputMaterial'} label="Apellido" name="lastName" onChange={handleChange} value={pacienteSeleccionado&&pacienteSeleccionado.lastName}/>          
        <br />
        <TextField className={'inputMaterial'} label="Correo" name="email" onChange={handleChange} value={pacienteSeleccionado&&pacienteSeleccionado.email}/>
        <br />
        <TextField className={'inputMaterial'} label="Telefono" name="phone" onChange={handleChange} value={pacienteSeleccionado&&pacienteSeleccionado.phone}/>
        <br />
        <TextField className={'inputMaterial'} label="Documento" name="doc" onChange={handleChange} value={pacienteSeleccionado&&pacienteSeleccionado.doc}/>
        <br />
        <label for="gend">Genero:</label>
        <br />
        <select className={'inputData'} name="gender" onChange={handleChange} value={pacienteSeleccionado&&pacienteSeleccionado.gender}>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
        <br />
        <label for="start">Fecha de nacimiento:</label>
        <br />
        <input type="date" className={'inputData'} name="birthDate" onChange={handleChange} value={pacienteSeleccionado&&pacienteSeleccionado.birthDate}/>
        <br /><br />
        <div align="right">
            <Button className={styles.confirm} onClick={()=>peticionUpdate()}>Editar</Button>
            <Button className={styles.cancel} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
    </div>
  );

  const bodyEliminar=(
    <div className={'modal'}>
      <p>Estás seguro que deseas eliminar al paciente <b>{pacienteSeleccionado && pacienteSeleccionado.paciente}</b>? </p>
      <div align="right">
        <Button className={styles.confirm} onClick={()=>peticionDelete()}>Sí</Button>
        <Button className={styles.cancel} onClick={()=>abrirCerrarModalEliminar()}>No</Button>

      </div>

    </div>
  );

  return (
    <>
    <GridTable
      columns={columns}
      dataApi={data}
      title='Pacientes'
      editAction={seleccionarPaciente}
      insertAction={abrirCerrarModalInsertar}
      deleteAction={seleccionarPaciente}
    />
    <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}>
          {bodyInsertar}
    </Modal>
    <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
          {bodyEditar}
    </Modal>
    <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
          {bodyEliminar}
    </Modal>
    </>
  );
};

export default About;
