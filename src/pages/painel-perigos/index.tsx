import { Button, HStack, Input, InputGroup, InputLeftElement, Stack } from "@chakra-ui/react"

import { ButtonAd } from "../../components/Button"
import { ButtonPage } from "../../components/Button"
import { CardCadastro } from "../../components/Card"
import { Main } from "../../components/Main"
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Link } from "@chakra-ui/react"
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi"
import { ButtonActions } from "../../components/Button"
import { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher"
import { HttpMethod } from "../../../types"
import { useRouter } from "next/router"
import { Empresa } from "@prisma/client"
import { Pagination } from "../../components/Pagination"
import { format } from 'date-fns';
import { Loader } from "../../components/Loader"
import { MdSearch } from "react-icons/md"
import NextLink from 'next/link'


interface EmpresaData {
    empresas: Array<Empresa>
}

//@ts-ignore
export default function Home({ empresas }) {
    const [creatingEmpresa, setCreatingEmpresa] = useState(false);
    const [deletingEmpresa, setDeletingEmpresa] = useState(false)

    const router = useRouter();
    const { id: empresaId } = router.query

    const { data } = useSWR<EmpresaData>(
        `/api/empresa`,
        fetcher,
    )

    async function createEmpresa() {
        router.push(`/painel-perigos/create`)
    }

    const [currentPage, setCurrentPage] = useState<number>(0)

    const handlePageClick = (data: any) => {
        setCurrentPage(data.selected)
    }

    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;
    //@ts-ignore
    const pageCount = Math.ceil(data?.empresas?.length / PER_PAGE);

    const items = data?.empresas?.slice(offset, offset + PER_PAGE);

    async function deleteEmpresa(empresaId: string) {
        setDeletingEmpresa(true);
        try {
            const response = await fetch(`/api/empresa?empresaId=${empresaId}`, {
                method: HttpMethod.DELETE
            })
        } catch (error) {
            console.error(error)
        } finally {
            setDeletingEmpresa(false);
            // window.location.reload()
        }
    }

    const handleDeleteClick = (iba: string) => {
        if (!window.confirm('Tem certeza que deseja excluir essa empresa?')) {
            return
        }
        //@ts-ignore
        deleteEmpresa(iba);
        //toast
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(items);

    useEffect(() => {
        const searchApi = async () => {
            const response = await fetch(`/api/empresa?search=${searchTerm}`);
            const data = await response.json();
            setSearchResults(data)
        }

        if (searchTerm) {
            searchApi();
        } else {
            setSearchResults(empresas)
        }
    }, [searchTerm])

    const EditRedirect = (empresaId: string) => {
        router.push(`/empresa/${empresaId}`)
    }

    return (
        <Main title2={"Painel Administrativo de Perigos"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>

            <HStack
                justify={"end"}
                spacing={"2%"}
                w={"100%"}
            >
                <InputGroup
                    w={"50%"}
                    mt={"10%"}
                >
                    <InputLeftElement
                        // eslint-disable-next-line react/no-children-prop
                        children={<MdSearch size={"22px"} />} />
                    <Input
                        type='text'
                        bg={"white"}
                        borderRadius={"6px"}
                        fontSize={"16px"}
                        fontWeight={400}
                        boxShadow={"0px 1px 3px 0px rgba(50, 50, 93, 0.15), 0px 0px 1px 0px rgba(0, 0, 0, 0.02)"}
                        _placeholder={{
                            color: "#8898AA",
                        }}
                        placeholder='Pesquisar'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                </InputGroup>
                {/* <ButtonPage text={"Perigos"} href={"/painel-perigos/identificacao-de-perigos"} w={{ xl: "10%", lg: "15%" }} mt={{ xl: "5%", lg: "9%", md: "2%", xxs: "3%" }} />
                <ButtonPage text={"Riscos"} href={"/painel-riscos/controle-dos-riscos"} w={{ xl: "10%", lg: "15%" }} mt={{ xl: "5%", lg: "9%", md: "2%", xxs: "3%" }} /> */}
                <Link
                    as={NextLink}
                    href={"/painel-perigos"}
                >
                    <Button
                        as="button"
                        mt={"10%"}
                        w={{ md: "13%", sm: "23%" }}
                        bg={"rgba(70, 83, 100, 1.00)"}
                        borderRadius={"8px"}
                        color={"#fff"}
                        fontSize={"16px"}
                        _hover={{
                            bg: "rgba(70, 83, 100, 1.00)"
                        }}
                    >
                        Perigos
                    </Button>
                </Link>

                <Link
                    as={NextLink}
                    href={"/painel-perigos"}
                >
                    <Button
                        as="button"
                        mt={"10%"}
                        w={{ md: "13%", sm: "23%" }}
                        bg={"rgba(70, 83, 100, 1.00)"}
                        borderRadius={"8px"}
                        color={"#fff"}
                        fontSize={"16px"}
                        _hover={{
                            bg: "rgba(70, 83, 100, 1.00)"
                        }}
                    >
                        Riscos
                    </Button>

                </Link>

                <ButtonAd text={"Cadastrar novo Perigo"} mt={"10%"} onClick={() => {
                    setCreatingEmpresa(true)
                    createEmpresa()
                }} />

            </HStack>




            <Stack
                bg={"#fff"}
                borderRadius={"8px"}
                align={"start"}
                spacing={9}
                mt={"1%"}
                boxShadow={"0px 0px 32px 0px rgba(136, 152, 170, 0.15)"}
            >

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
                            {searchTerm ? (
                                searchResults?.map((item) => (
                                    <Tr color={"#E9ECEF"} fontSize={'14px'} key={"qwdwdwd"}>
                                        <Td color={"#525F7F"}>
                                            <Link href={`/empresa/qwdwdwd`}>{item.name}</Link>
                                        </Td>
                                        <Td
                                            textAlign={"center"}
                                            color={"#525F7F"}
                                        >
                                            {item.cnpj}
                                        </Td>
                                        <Td color={"#525F7F"} textAlign={"center"}>
                                            {format(item.createdAt, 'yyyy-MM-dd HH:mm:ss')}
                                        </Td>
                                        <Td color={"#525F7F"} textAlign={"center"}><ButtonActions as={FiEye}
                                        // onClick={EditRedirect(item.id)} 
                                        /> <ButtonActions as={FiEdit2}
                                            //  onClick={EditRedirect(item.id)}
                                            /> <ButtonActions as={FiTrash2} onClick={() => handleDeleteClick("qwdwdwd")} /></Td>
                                    </Tr>
                                ))
                            ) : items ? (
                                items.length > 0 ? (
                                    items.map((item) => (
                                        <Tr color={"#E9ECEF"} fontSize={'14px'} key={"qwdwdwd"}>
                                            <Td color={"#525F7F"}>
                                                <Link href={`/painel-perigos/qwdwdwd`}>{item.name}</Link>
                                            </Td>
                                            <Td
                                                textAlign={"center"}
                                                color={"#525F7F"}
                                            >
                                                {item.cnpj}
                                            </Td>
                                            <Td color={"#525F7F"} textAlign={"center"}>
                                                {format(item.createdAt, 'dd-MM-yyyy HH:mm:ss')}
                                            </Td>
                                            <Td color={"#525F7F"} textAlign={"center"}><ButtonActions as={FiEye}
                                                onClick={() => EditRedirect("qwdwdwd")}
                                            /> <ButtonActions as={FiEdit2}
                                                onClick={() => EditRedirect("qwdwdwd")}
                                                /> <ButtonActions as={FiTrash2} onClick={() => handleDeleteClick("qwdwdwd")} /></Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <p>
                                        Clique em Nova Empresa para criar uma
                                    </p>
                                )
                            ) : (
                                <Loader />
                            )}
                        </Tbody>

                    </Table>
                    <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
                </TableContainer>
            </Stack>
        </Main>
    )
}
