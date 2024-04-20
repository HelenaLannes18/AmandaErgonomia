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
import { Plano } from "@prisma/client"
import { Pagination } from "../../components/Pagination"
import { format } from 'date-fns';
import { Loader } from "../../components/Loader"
import { MdSearch } from "react-icons/md"
import NextLink from 'next/link'


interface PlanoData {
    planos: Array<Plano>
}

//@ts-ignore
export default function Home({ planos }) {
    const [creatingPlano, setCreatingPlano] = useState(false);
    const [deletingPlano, setDeletingPlano] = useState(false)

    const router = useRouter();
    const { empresaId } = router.query;

    const { data } = useSWR<PlanoData>(
        `/api/plano?empresaId=${empresaId}`,
        fetcher,
    )

    async function createPlano() {
        router.push(`/painel-plano-de-acao/create?empresaId=${empresaId}`)
    }

    const [currentPage, setCurrentPage] = useState<number>(0)

    const handlePageClick = (data: any) => {
        setCurrentPage(data.selected)
    }

    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;
    //@ts-ignore
    const pageCount = Math.ceil(data?.planos?.length / PER_PAGE);

    const items = data?.planos?.slice(offset, offset + PER_PAGE);

    async function deletePlano(planoId: string) {
        setDeletingPlano(true);
        try {
            const response = await fetch(`/api/plano?planoId=${planoId}`, {
                method: HttpMethod.DELETE
            })
        } catch (error) {
            console.error(error)
        } finally {
            setDeletingPlano(false);
            window.location.reload()
        }
    }

    const handleDeleteClick = (iba: string) => {
        if (!window.confirm('Tem certeza que deseja excluir essa plano?')) {
            return
        }
        //@ts-ignore
        deletePlano(iba);
        //toast
    }

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState(items);

    useEffect(() => {
        const searchApi = async () => {
            const response = await fetch(`/api/plano?search=${searchTerm}&empresaId=${empresaId}`);
            const data = await response.json();
            setSearchResults(data)
        }

        if (searchTerm) {
            searchApi();
        } else {
            setSearchResults(planos)
        }
    }, [searchTerm])

    const EditRedirect = (planoId: string) => {
        router.push(`/painel-plano-de-acao/${planoId}?empresaId=${empresaId}`)
    }

    return (
        <Main title2={"Painel Administrativo de Planos"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>

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


                <ButtonAd text={"Cadastrar novo Plano"} mt={"10%"} onClick={() => {
                    setCreatingPlano(true)
                    createPlano()
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
                                <Th color={"#8898AA"} >ID do Plano</Th>
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
                                            <Link href={`/painel-plano/${item.id}`}>{item.id}</Link>
                                        </Td>
                                        <Td
                                            textAlign={"center"}
                                            color={"#525F7F"}
                                        >
                                            {item.origem_demanda}
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
                                                <Link href={`/painel-plano/${item.id}`}>{item.id}</Link>
                                            </Td>
                                            <Td
                                                textAlign={"center"}
                                                color={"#525F7F"}
                                            >
                                                {item.origem_demanda}
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
                                        Clique em Novo Plano para criar um
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
