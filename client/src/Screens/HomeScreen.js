import {
  Box,
  Button,
  FormLabel,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { MdCancel } from 'react-icons/md';
import UpdateScreen from './UpdateScreen';

axios.defaults.baseURL = 'http://localhost:8080/';

const Form = () => {
  const [addSec, setAddSec] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: '',
    _id: '',
  });
  const [showData, setShowData] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post('/create', formData);
    console.log(data.data);
    if (data.data.success) {
      getRetrieveData();
      alert(data.data.message);
      setAddSec(false);
    }
  };

  const getRetrieveData = async () => {
    const data = await axios.get('/');
    console.log(data);
    if (data.data.success) {
      setShowData(data.data.data);
    }
  };
  useEffect(() => {
    getRetrieveData();
  }, []);
  console.log(showData);

  const handleDelete = async (id) => {
    const data = await axios.delete('/delete/' + id);

    if (data.data.success) {
      getRetrieveData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put('/update', formDataEdit);
    if (data.data.success) {
      getRetrieveData();
      alert(data.data.message);
      setEditSection(false);
    }
  };
  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  return (
    <>
      <Box backgroundPosition='center' padding='50px' align='center'>
        <Text fontSize='50px' marginTop='2px'>
          <strong>Items list</strong>
        </Text>
      </Box>
      <Box align='center'>
        <Button
          border='2px none darkgreen'
          boxShadow='0.5px 0.5px 5px 0.2px'
          padding='10px'
          marginBottom='10px'
          fontSize='18px'
          borderRadius='10px 10px 10px 10px'
          _hover={{
            bgColor: 'green',
            transition: 'all ease 0.3s',
          }}
          onClick={() => setAddSec(true)}>
          Add Items
        </Button>
        {addSec && (
          <UpdateScreen
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={() => setAddSec(false)}
            rest={formData}
          />
        )}
        {editSection && (
          <UpdateScreen
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}
      </Box>

      {/* Table Section */}
      <Box
        border='2px solid black'
        padding='10px'
        borderRadius='10px 10px 10px 10px'>
        <Table padding='10px'>
          <Thead>
            <Tr>
              <Th
                border='3px none blue'
                boxShadow='0.5px 0.5px 5px 0.2px'
                padding='10px'
                minWidth='900px'
                margin='10px'
                fontSize='25px'
                bgColor='azure'>
                Name
              </Th>
              <Th
                border='3px none blue'
                boxShadow='0.5px 0.5px 5px 0.2px'
                bgColor='azure'
                padding='10px'
                width='400px'></Th>
            </Tr>
          </Thead>
          <Tbody align='center'>
            {showData.map((el) => {
              console.log(el);
              return (
                <Tr>
                  <Td
                    border='2px none darkred'
                    boxShadow='0.5px 0.5px 5px 0.2px'
                    padding='10px'
                    minWidth='600px'
                    _hover={{
                      bgColor: 'cyan',
                      transition: 'all ease 0.3s',
                    }}>
                    {el.name}
                  </Td>
                  <Td
                    padding='10px'
                    border='2px none darkred'
                    boxShadow='0.5px 0.5px 5px 0.2px'
                    _hover={{
                      bgColor: 'cyan',
                      transition: 'all ease 0.3s',
                    }}>
                    <Button
                      border='2px none yellow'
                      boxShadow='0.5px 0.5px 5px 0.2px'
                      onClick={() => handleEdit(el)}
                      margin='0px 30px 0px 30px'
                      borderRadius='10px 10px 10px 10px'
                      padding='10px 20px'
                      _hover={{
                        bgColor: 'yellow',
                        transition: 'all ease 0.3s',
                      }}>
                      Update
                    </Button>
                    <Button
                      border='2px none darkred'
                      boxShadow='0.5px 0.5px 5px 0.2px'
                      onClick={() => handleDelete(el._id)}
                      margin='0px 30px 0px 30px'
                      borderRadius='10px 10px 10px 10px'
                      padding='10px 20px'
                      _hover={{
                        bgColor: 'red',
                        transition: 'all ease 0.3s',
                      }}>
                      Delete
                    </Button>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default Form;
