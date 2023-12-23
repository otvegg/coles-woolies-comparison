import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Input,
  Text,
  VStack,
  theme,
  Flex,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import axios from 'axios';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Coles } from './coles';

const MAXITEMS = 35;

export const App = () => {
  const [value, setValue] = React.useState('');
  const [colesResponse, setColesResponse] = React.useState<any[]>([]);
  const [wooliesResponse, setWooliesResponse] = React.useState<any[]>([]);

  const getWooliesResponse = (link: string, term: string, pagenum: number) => {
    axios
      .get(link, {
        params: {
          searchTerm: term,
          pageSize: MAXITEMS,
          pageNumber: pagenum,
        },
      })
      .then((response) => {
        const amountReturned = response.data.Products.length;
        setWooliesResponse([...wooliesResponse, ...response.data.Products]);

        if (amountReturned === MAXITEMS && pagenum <= 3) getWooliesResponse(link, value, ++pagenum);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getColesResponse = (link: string, term: string, pagenum: number) => {
    axios
      .get(link, {
        params: {
          searchTerm: term,
          pageSize: MAXITEMS,
          pageNumber: pagenum,
        },
      })
      .then((response) => {
        const amountReturned = response.data.Products.length;
        setWooliesResponse([...wooliesResponse, ...response.data.Products]);

        if (amountReturned === MAXITEMS && pagenum <= 3) getWooliesResponse(link, value, ++pagenum);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(Coles());

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => setValue(event.target.value);
  const handleClick = () => {
    setWooliesResponse([]);
    //'https://shop.coles.com.au/online/COLRSSearchDisplay'
    getWooliesResponse('https://www.woolworths.com.au/apis/ui/Search/products', value, 1);
  };

  return (
    <ChakraProvider theme={theme}>
      <VStack textAlign='center' fontSize='xl' w='100vw' h='100vh'>
        <Flex w='full' justifyContent={'flex-end'}>
          <ColorModeSwitcher justifySelf='flex-end' />
        </Flex>

        <VStack spacing={8}>
          <InputGroup>
            <Input placeholder='Search for a product' variant='flushed' onChange={handleChange} value={value} />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {'Search'}
              </Button>
            </InputRightElement>
          </InputGroup>

          {wooliesResponse.map((el, i) => (
            <Text key={i}>
              {el.DisplayName} - {el.Products[0].CupString}
            </Text>
          ))}
        </VStack>
      </VStack>
    </ChakraProvider>
  );
};
