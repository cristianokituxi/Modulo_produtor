import * as React from 'react';
import Paper from '@mui/material/Paper';
import moment from"moment";
import 'moment/locale/pt-br';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Checkbox, MenuItem, Select } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from './Spinner';
import { useAuthContext } from '../context/auth/AuthContext';

import { SelectChangeEvent } from '@mui/material/Select';




interface DataTableProps {
  data: []; // Replace YourDataType with the actual type of your data
}

interface materia {
  mat_id: string;
  nome: string;
}




const DataTable: React.FC<DataTableProps> = ({ data }) => {
  
  const [checked, setChecked] = React.useState<[boolean, boolean, boolean, boolean,boolean]>([false, false, false, false,false]);
  const [loading, setLoading] = React.useState<boolean>(false)
  const [materias, setmaterias] = React.useState<materia[]>([]);
  const { user } = useAuthContext()
  const [input1Value, setInput1Value] = React.useState<string>('');
  const [input2Value, setInput2Value] = React.useState<string>('200kg');

  // Event handler to update the value of the first input
  const handleChange = (event: SelectChangeEvent<string>) => {
    setInput1Value(event.target.value);
  };

  // Event handler to update the value of the second input
  const handleInput2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput2Value(event.target.value);
  };

  const handleCheckboxChange = (index: number) => {
    setChecked((prevChecked: [boolean, boolean, boolean, boolean,boolean]) => {
      const newChecked = [...prevChecked];
      newChecked[index] = !newChecked[index];
      return newChecked as [boolean, boolean, boolean, boolean, boolean];
    });
  };

  const isButtonDisabled = checked.every((isChecked) => isChecked);


  const fetchDataMaterial = async () => {
    try {
      const response = await axios.get("https://api-rust-six.vercel.app/material/get");
      setmaterias(
        response?.data?.rows.sort((a: { nome: number; }, b: { nome: number; }) => (a.nome > b.nome ? 1 : -1))
      );
    } catch (error) {
      console.error(error);
    }
  };
  const d = new Date();
  const hora = d.toLocaleTimeString();
  const dateFull = new Date();
  const date = dateFull.toLocaleDateString();

  const onSubmit = async () => {
    try {
      // https://api-rust-six.vercel.app
      
      setLoading(true);
      const resp = await axios.post("https://api-rust-six.vercel.app/relatorio/add", {
        funcionario: user[0]?.nome,
        materia_prima: input1Value ,
        peso_fardo: input2Value,
        data_envio: date,
        hora_envio: hora 
      });

      if (resp) {
        setLoading(false);
        toast.success(resp.data);

      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }

  };


  React.useEffect(() => {
    fetchDataMaterial();
  }, [])
  moment.locale('pt-br');
  moment.updateLocale
  console.log( moment.locale('pt-br'))
 
  return (
    <>
      <ToastContainer
        toastStyle={{ width: "100%" }}
        bodyStyle={{ width: "100%" }}
        closeButton={false}
        // icon= {false}
        theme="light"
      />
      {data.map((index: any) => (
        <>
          <Paper
            key={index.funcionario}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 323 }}
            className='mt-1'

          >
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
              <Checkbox checked={checked[0]} onChange={() => handleCheckboxChange(0)} />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            oprador:
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ 'aria-label': 'search google maps' }} value={user[0]?.nome} />
          </Paper>

          <Paper
            key={index.data_envio}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 323 }}
            className='mt-1'
          >
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
              <Checkbox checked={checked[1]} onChange={() => handleCheckboxChange(1)} />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            data:
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              // placeholder={index.data}
              inputProps={{ 'aria-label': 'search google maps' }} value={date} disabled />
          </Paper>

          <Paper
            key={index.data_envio}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 323 }}
            className='mt-1'
          >
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
              <Checkbox checked={checked[4]} onChange={() => handleCheckboxChange(4)} />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            Hora:
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              // placeholder={index.data}
              inputProps={{ 'aria-label': 'search google maps' }} value={hora} disabled />
          </Paper>


          <Paper
            key={index.peso_fardo}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 323 }}
            className='mt-1'
          >
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
              <Checkbox checked={checked[2]} onChange={() => handleCheckboxChange(2)} />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            Peso:
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ 'aria-label': 'search google maps' }}  onChange={handleInput2Change} value={input2Value} />
          </Paper>
          <Paper
            key={index.materia_prima}
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 323 }}
            className='mt-1'
          >
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
              <Checkbox checked={checked[3]} onChange={() => handleCheckboxChange(3)} />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            Material
            <Select
              label="mat_id"
              labelId="mat_id"
              onChange={handleChange}
            >
              <MenuItem value="insira o material" ></MenuItem>
              {materias.map((materia) => (
                <MenuItem key={materia.mat_id} value={materia.nome}>
                  {materia.nome}
                </MenuItem>
              ))}
            </Select>
          </Paper>
        </>

      ))}

      <Stack className='mt-3'>
        <Button variant="contained" onClick={() => onSubmit()} disabled={!isButtonDisabled}>enviar para aprovacão</Button>
      </Stack>
      {loading && <Spinner />}
    </>
  );
}
export default DataTable