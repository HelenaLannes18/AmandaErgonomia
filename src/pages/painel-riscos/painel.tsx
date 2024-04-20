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
import { Risco } from "@prisma/client"
import { Pagination } from "../../components/Pagination"
import { format } from 'date-fns';
import { Loader } from "../../components/Loader"
import { MdSearch } from "react-icons/md"
import NextLink from 'next/link'


interface RiscoData {
    riscos: Array<Risco>
}

//@ts-ignore
export default function Home({ riscos }) {
    const [creatingRisco, setCreatingRisco] = useState(false);
    const [deletingRisco, setDeletingRisco] = useState(false)

    const router = useRouter();
    const { empresaId } = router.query;

    const { data } = useSWR<RiscoData>(
        `/api/risco?empresaId=${empresaId}`,
        fetcher,
    )

    async function createRisco() {
        router.push(`/painel-riscos/create?empresaId=${empresaId}`)
    }

    const [currentPage, setCurrentPage] = useState<number>(0)

    const handlePageClick = (data: any) => {
        setCurrentPage(data.selected)
    }

    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;
    //@ts-ignore
    const pageCount = Math.ceil(data?.riscos?.length / PER_PAGE);

    const items = data?.riscos?.slice(offset, offset + PER_PAGE);

    async function deleteRisco(riscoId: string) {
        setDeletingRisco(true);
        try {
            const response = await fetch(`/api/risco?riscoId=${riscoId}`, {
                method: HttpMethod.DELETE
            })
        } catch (error) {
            console.error(error)
        } finally {
            setDeletingRisco(false);
            window.location.reload()
        }
    }

    const handleDeleteClick = (iba: string) => {
        if (!window.confirm('Tem certeza que deseja excluir essa risco?')) {
            return
        }
        //@ts-ignore
        deleteRisco(iba);
        //toast
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(items);

    useEffect(() => {
        const searchApi = async () => {
            const response = await fetch(`/api/risco?search=${searchTerm}&empresaId=${empresaId}`);
            const data = await response.json();
            setSearchResults(data)
        }

        if (searchTerm) {
            searchApi();
        } else {
            setSearchResults(riscos)
        }
    }, [searchTerm])

    const EditRedirect = (riscoId: string) => {
        router.push(`/painel-riscos/${riscoId}?empresaId=${empresaId}`)
    }

    return (
        <Main title2={"Painel Administrativo de Riscos"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>


            <HStack
                justify={"space-between"}
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

                <ButtonAd text={"Cadastrar novo Risco"} mt={"10%"} onClick={() => {
                    setCreatingRisco(true)
                    createRisco()
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
                                <Th color={"#8898AA"} >ID do Risco</Th>
                                <Th color={"#8898AA"} textAlign={"center"}>Fonte</Th>
                                <Th color={"#8898AA"} textAlign={"center"}>Data de Elaboração</Th>
                                <Th color={"#8898AA"} textAlign={"center"}>Ações</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {searchTerm ? (
                                searchResults?.map((item) => (
                                    <Tr color={"#E9ECEF"} fontSize={'14px'} key={item.id}>
                                        <Td color={"#525F7F"}>
                                            <Link href={`/painel-riscos/${item.id}`}>{item.id}</Link>
                                        </Td>
                                        <Td
                                            textAlign={"center"}
                                            color={"#525F7F"}
                                        >
                                            {item.sugestacao_recomendacao}
                                        </Td>
                                        <Td color={"#525F7F"} textAlign={"center"}>
                                            {format(item.createdAt, 'yyyy-MM-dd HH:mm:ss')}
                                        </Td>
                                        <Td color={"#525F7F"} textAlign={"center"}><ButtonActions as={FiEye}
                                        // onClick={EditRedirect(item.id)} 
                                        /> <ButtonActions as={FiEdit2}
                                            //  onClick={EditRedirect(item.id)}
                                            /> <ButtonActions as={FiTrash2} onClick={() => handleDeleteClick(item.id)} /></Td>
                                    </Tr>
                                ))
                            ) : items ? (
                                items.length > 0 ? (
                                    items.map((item) => (
                                        <Tr color={"#E9ECEF"} fontSize={'14px'} key={item.id}>
                                            <Td color={"#525F7F"}>
                                                <Link href={`/painel-riscos/${item.id}`}>{item.id}</Link>
                                            </Td>
                                            <Td
                                                textAlign={"center"}
                                                color={"#525F7F"}
                                            >
                                                {item.sugestacao_recomendacao}
                                            </Td>
                                            <Td color={"#525F7F"} textAlign={"center"}>
                                                {format(item.createdAt, 'dd-MM-yyyy HH:mm:ss')}
                                            </Td>
                                            <Td color={"#525F7F"} textAlign={"center"}><ButtonActions as={FiEye}
                                                onClick={() => EditRedirect(item.id)}
                                            /> <ButtonActions as={FiEdit2}
                                                onClick={() => EditRedirect(item.id)}
                                                /> <ButtonActions as={FiTrash2} onClick={() => handleDeleteClick(item.id)} /></Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <p>
                                        Clique em Novo Risco para criar um
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
