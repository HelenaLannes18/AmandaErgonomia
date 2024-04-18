import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, useDisclosure } from "@chakra-ui/react"
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi"

import { ButtonActions } from "../Button"
import { BasicModal } from "../Modal"

export function TableIndex() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <TableContainer w={"100%"} borderRadius={"8px"}>
            <Table variant='simple'>
                <Thead
                    bg="#F6F9FC"
                >
                    <Tr>
                        <Th color={"#8898AA"} >Empresa</Th>
                        <Th color={"#8898AA"} textAlign={"center"}>CNPJ</Th>
                        <Th color={"#8898AA"} textAlign={"center"}>Data de Elaboração</Th>
                        <Th color={"#8898AA"} textAlign={"center"}>Ações</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr color={"#E9ECEF"} fontSize={'14px'}>
                        <Td color={"#525F7F"} >Lorem Ipsum</Td>
                        <Td color={"#525F7F"} textAlign={"center"}>4,569</Td>
                        <Td color={"#525F7F"} textAlign={"center"}>02/03/2024</Td>
                        <Td color={"#525F7F"} textAlign={"center"}><ButtonActions as={FiEye} /> <ButtonActions as={FiEdit2} /> <BasicModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} >
                            <ButtonActions as={FiTrash2}/>
                        </BasicModal></Td>
                    </Tr>
                    <Tr color={"#E9ECEF"} fontSize={'14px'}>
                        <Td color={"#525F7F"} >Lorem Ipsum</Td>
                        <Td color={"#525F7F"} textAlign={"center"}>4,569</Td>
                        <Td color={"#525F7F"} textAlign={"center"}>02/03/2024</Td>
                        <Td color={"#525F7F"} textAlign={"center"}><ButtonActions as={FiEye} /> <ButtonActions as={FiEdit2} /> <BasicModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} >
                            <ButtonActions as={FiTrash2}/>
                        </BasicModal></Td>
                    </Tr>
                    <Tr color={"#E9ECEF"} fontSize={'14px'}>
                        <Td color={"#525F7F"} >Lorem Ipsum</Td>
                        <Td color={"#525F7F"} textAlign={"center"}>4,569</Td>
                        <Td color={"#525F7F"} textAlign={"center"}>02/03/2024</Td>
                        <Td color={"#525F7F"} textAlign={"center"}><ButtonActions as={FiEye} /> <ButtonActions as={FiEdit2} /> <BasicModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} >
                            <ButtonActions as={FiTrash2}/>
                        </BasicModal></Td>
                    </Tr>
                    <Tr color={"#E9ECEF"} fontSize={'14px'}>
                        <Td color={"#525F7F"} >Lorem Ipsum</Td>
                        <Td color={"#525F7F"} textAlign={"center"}>4,569</Td>
                        <Td color={"#525F7F"} textAlign={"center"}>02/03/2024</Td>
                        <Td color={"#525F7F"} textAlign={"center"}><ButtonActions as={FiEye} /> <ButtonActions as={FiEdit2} /> <BasicModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} >
                            <ButtonActions as={FiTrash2}/>
                        </BasicModal></Td>
                    </Tr>
                    <Tr color={"#E9ECEF"} fontSize={'14px'}>
                        <Td color={"#525F7F"}>Lorem Ipsum</Td>
                        <Td color={"#525F7F"} textAlign={"center"}>4,569</Td>
                        <Td color={"#525F7F"} textAlign={"center"}>02/03/2024</Td>
                        <Td color={"#525F7F"} textAlign={"center"}><ButtonActions as={FiEye} /> <ButtonActions as={FiEdit2} /> <BasicModal isOpen={isOpen} onClose={onClose} onOpen={onOpen} >
                            <ButtonActions as={FiTrash2}/>
                        </BasicModal></Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}