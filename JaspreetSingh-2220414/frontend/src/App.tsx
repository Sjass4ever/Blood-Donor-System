import { useState, useRef } from "react";
import axios from "axios";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  Text,
  Center,
  useDisclosure,
  VStack,
  Select,
  SimpleGrid,
  Box,
  assignRef,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef()
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: "",
    bloodType: '',
    medicalHistory: '',
    note: ""
  });
  const [data, setData] = useState<any>({});
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async () => {
    if (!Object.values(formData).every(value => value.trim())) {
      alert("Please fill all fields");
      return
    }
    try {
      const res = await axios.post('http://localhost:3000/api/register', formData);
      setData(res.data);
      setFormData({
        name: '',
        dateOfBirth: "",
        bloodType: '',
        medicalHistory: '',
        note: ""
      })
    } catch (error) {
      alert("Error " + error);
    }
    onOpen();
  };
  return (
    <>
      <Center>
        <VStack m={4}>
          <Heading as="h3" size="xl">BloodChain: Decentralized Blood Donor Registry</Heading>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={8}
            boxShadow="md"
            bg="white"
            flex={0.6}
            m={4}
          >
            <Heading mb={4}>Donor Information Form</Heading>
            <Divider mb={2} />
            <VStack spacing={4} align="center" width="100%">
              <FormControl id="fullName" isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <SimpleGrid columns={2} spacing={6} width="100%">
                <FormControl>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                  <FormLabel>Blood Type</FormLabel>
                  <Select name="bloodType" value={formData.bloodType} onChange={handleInputChange} placeholder="Select">
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </Select>
                </FormControl>
              </SimpleGrid>
              <FormControl>
                <FormLabel>Medical History / Allergies</FormLabel>
                <Textarea
                  name="medicalHistory"
                  value={formData.medicalHistory}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Note</FormLabel>
                <Textarea
                  name="note"
                  value={formData.note}
                  onChange={handleInputChange}
                />
              </FormControl>
              <Button type="submit" colorScheme="pink" width={"100%"} onClick={handleSubmit}>
                Submit
              </Button>
            </VStack>

          </Box>
        </VStack>

      </Center>
      <Drawer
        isOpen={isOpen}
        placement='bottom'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <Box p={4}>

            <ListCard key="name" title="Name" value={data?.name} />
            <ListCard key="dateOfBirth" title="Date of Birth" value={data?.dateOfBirth} />
            <ListCard key="bloodType" title="Blood Type" value={data?.bloodType} />
            <ListCard key="medicalHistory" title="Medical History" value={data?.medicalHistory} />
            <ListCard key="note" title="Note" value={data?.note} />
            <hr />
            <ListCard title="Balance" value={data?.balance} />
            <ListCard title="Transaction" value={data?.transaction} />
          </Box>

        </DrawerContent>
      </Drawer>

    </>

  );
}

const ListCard = (props: any) => {
  return (
    <VStack spacing={1} align="flex-start" justifyContent={"flex-start"} my={2}>
      <Text as={"b"}>{props.title}</Text>
      <Text>{props.value}</Text>
    </VStack>
  );
};
export default App;
