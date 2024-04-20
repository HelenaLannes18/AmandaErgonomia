import { HStack, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import NextLink from 'next/link'

import { ButtonActions, ButtonAd, ButtonPage } from "../../components/Button"
import { CardCadastro } from "../../components/Card"
import { Main } from "../../components/Main"
import { Pagination } from "../../components/Pagination"
import Link from "next/link";
import { Empresa } from "@prisma/client"
import { useEffect, useState } from "react"
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher"
import { useRouter } from "next/router"
import { HttpMethod } from "../../../types"
import { FiEdit2, FiEye, FiTrash2 } from "react-icons/fi"
import { Loader } from "../../components/Loader"
import { format } from "date-fns"
import { MdSearch } from "react-icons/md"


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
        try {
            const res = await fetch(`/api/empresa`, {
                method: HttpMethod.POST,
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.ok) {
                const data = await res.json();
                router.push(`/empresa/${data.empresaId}`)
            }
        } catch (error) {
            console.error(error)
        }
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
            window.location.reload()
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
        router.push(`/painel-plano-de-acao/painel?empresaId=${empresaId}`)
    }
    return (
        <Main title2={"Painel Administrativo de Plano de Ação"} title="" w={undefined} path={""} altText={""} tamh={0} tamw={0}>
            <HStack
                align={"end"}
                spacing={"30%"}
            >
                <InputGroup
                    w={"50%"}
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
                <ButtonPage text={"Cadastrar novo plano"} href="/painel-plano-de-acao/plano-de-acao" w={{ xl: "23%", lg: "27%" }} mt={{ xl: "10%", lg: "14%", md: "3%", xxs: "5%" }} />

            </HStack>

            <Stack
                bg={"#fff"}
                borderRadius={"8px"}
                align={"start"}
                spacing={9}
                mt="1%"
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
                                    <Tr color={"#E9ECEF"} fontSize={'14px'} key={item.id}>
                                        <Td color={"#525F7F"}>
                                            <Link href={`/empresa/${item.id}`}>{item.name}</Link>
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
                                            onClick={EditRedirect(item.id)}
                                        /></Td>
                                    </Tr>
                                ))
                            ) : items ? (
                                items.length > 0 ? (
                                    items.map((item) => (
                                        <Tr color={"#E9ECEF"} fontSize={'14px'} key={item.id}>
                                            <Td color={"#525F7F"}>
                                                <Link href={`/empresa/${item.id}`}>{item.name}</Link>
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
                                                onClick={EditRedirect(item.id)}
                                            /> </Td>
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
                </TableContainer>
                <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
            </Stack>
        </Main>
    )
}
