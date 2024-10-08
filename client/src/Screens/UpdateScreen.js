import React from 'react';
import { Box, FormLabel, Input, Button } from '@chakra-ui/react';
import { MdCancel } from 'react-icons/md';

const UpdateScreen = ({ handleOnChange, handleSubmit, handleClose, rest }) => {
  return (
    <Box
      border='3px none blue'
      boxShadow='0.5px 0.5px 5px 0.2px'
      margin='10px'
      bgColor='aliceblue'
      onSubmit={handleSubmit}
      display='grid'
      gridTemplateColumns='8fr 1fr 1fr'
      borderRadius='10px 10px 10px 10px'
      padding='10px'>
      <FormLabel
        htmlFor='name'
        padding='10px'
        display='flex'
        alignItems='center'>
        Item name:
        <Input
          borderRadius='10px 10px 10px 10px'
          minWidth='400px'
          type='text'
          id='name'
          name='name'
          padding='8px'
          onChange={handleOnChange}
          value={rest.name}
        />
      </FormLabel>
      <Button
        border='2px none darkgreen'
        boxShadow='0.5px 0.5px 5px 0.2px'
        fontSize='18px'
        borderRadius='10px 10px 10px 10px'
        padding='2px'
        _hover={{
          bgColor: 'green',
          transition: 'all ease 0.3s',
        }}
        onClick={handleSubmit}>
        Submit
      </Button>
      <Box fontSize='30px' onClick={handleClose} marginTop='12px'>
        <MdCancel />
      </Box>
    </Box>
  );
};

export default UpdateScreen;
