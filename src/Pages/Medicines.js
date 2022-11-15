import React, { useEffect, useState } from "react";
import GridTable from '../components/Table';
import {
  getMedicines,
  createMedicines,
  updateMedicines,
  deleteMedicine,
} from '../services/medicines.services';

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

const Medicines = () => {

  const columns=[
    {
        title: 'Nombre del medicamento',
        field: 'nameMed'
    },
    {
        title: 'Edad minima',
        field: 'minAge',
        type:'numeric'
    },
    {
      title: 'Edad maxima',
      field: 'maxAge',
      type:'numeric'
    },
    {
      title: 'Genero',
      field: 'gender',
    }
  ];
  const styles= useStyles();
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar]= useState(false);
  const [modalEditar, setModalEditar]= useState(false);
  const [modalEliminar, setModalEliminar]= useState(false);
  const [medicamentoSeleccionado, setMedicinaSeleccionado]=useState({
    nameMed: "",
    minAge: "",
    maxAge: "",
    gender: ""
  });


  const handleChange=e=>{
    const {name, value}=e.target;
    setMedicinaSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }));
  }

  const peticionGet=async()=>{
    const patients= await getMedicines();
    setData(patients);
  }

  const peticionPost=async()=>{
    const postMedicines = await createMedicines(medicamentoSeleccionado);    
    setData(data.concat(postMedicines));
    abrirCerrarModalInsertar();
   
  };

  const peticionUpdate=async()=>{
    const updtMedicines = await updateMedicines(medicamentoSeleccionado);   
    setData(data.concat(updtMedicines));
    abrirCerrarModalEditar();
  }

  const peticionDelete=async()=>{
    await deleteMedicine(medicamentoSeleccionado.idMedicine)
    setData(data.filter(medicina=>medicina.idMedicine!==medicamentoSeleccionado.idMedicine));
    abrirCerrarModalEliminar();
  }

  const seleccionarMedicina=(medicina, caso)=>{
    setMedicinaSeleccionado(medicina);
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
        <h3>Agregar Nuevo Medicamento</h3>
        <TextField className={'inputMaterial'} label="Nombre del Medicamento" name="nameMed" onChange={handleChange}/>
        <br />
        <TextField className={'inputMaterial'} label="Edad minima" name="minAge" onChange={handleChange}/>          
        <br />
        <TextField className={'inputMaterial'} label="Edad maxima" name="maxAge" onChange={handleChange}/>
        <br />
        <label for="gend">Genero:</label>
        <br />
        <select className={'inputData'} name="gender" onChange={handleChange}>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
          <option value="">No aplica</option>
        </select>
        <br /><br />
        <div align="right">
            <Button className={styles.confirm} onClick={()=>peticionPost()}>Insertar</Button>
            <Button className={styles.cancel} onClick={()=>abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
    </div>
  );

  const bodyEditar=(
    <div className={'modal'}>
        <h3>Editar medicamento</h3>
        <TextField className={'inputMaterial'} label="Nombre del Medicamento" name="nameMed" onChange={handleChange} value={medicamentoSeleccionado&&medicamentoSeleccionado.nameMed}/>
        <br />
        <TextField className={'inputMaterial'} label="Edad minima" name="minAge" onChange={handleChange} value={medicamentoSeleccionado&&medicamentoSeleccionado.minAge}/>          
        <br />
        <TextField className={'inputMaterial'} label="Edad maxima" name="maxAge" onChange={handleChange} value={medicamentoSeleccionado&&medicamentoSeleccionado.maxAge}/>
        <br />
        <label for="gend">Genero:</label>
        <br />
        <select className={'inputData'} name="gender" onChange={handleChange} value={medicamentoSeleccionado&&medicamentoSeleccionado.gender}>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
          <option value="">No aplica</option>
        </select>
        <br /><br />
        <div align="right">
            <Button className={styles.confirm} onClick={()=>peticionUpdate()}>Editar</Button>
            <Button className={styles.cancel} onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
    </div>
  );

  const bodyEliminar=(
    <div className={'modal'}>
      <p>Estás seguro que deseas eliminar el medicamento <b>{medicamentoSeleccionado && medicamentoSeleccionado.medicina}</b>? </p>
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
      title='Medicinas'
      editAction={seleccionarMedicina}
      insertAction={abrirCerrarModalInsertar}
      deleteAction={seleccionarMedicina}
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

export default Medicines;
