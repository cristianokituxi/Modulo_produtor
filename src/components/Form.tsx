import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Stack } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useAuthContext } from '../context/auth/AuthContext';

interface FormValues {
  segmento:  string,
  produto: string
}

const Forms: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    segmento: '',
    produto: ''
  });

  const { user } = useAuthContext()
  console.log(user);

 
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataEnv = { ...formValues,  nome: user[0]?.nome, usuario_id: user[0]?.usuario_id}
    
    try {
      const resp = await axios.post("https://apisisges.vercel.app/insumos/add", dataEnv);
      if (resp) {
      toast.success(resp.data);
     }
    } catch (error) {
      console.error(error);
    }
  };

  return (
   <>
    <ToastContainer
          toastStyle={{ width: "100%" }}
          bodyStyle={{ width: "100%" }}
          closeButton={false}
          // icon= {false}
          theme="colored"
        />
    <form >
      <TextField
        name="segmento"
        label="Digite a area do plantio"
        value={formValues.segmento}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        name="produto"
        label="produto"
        value={formValues.produto}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
    </form>
     <Stack className='mt-3'>
     <Button variant="contained" onClick={handleSubmit} >Planejar</Button>
   </Stack>
   </>
  )
};

export default Forms;
