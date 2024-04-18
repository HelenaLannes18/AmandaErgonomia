import { HStack, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { ButtonPagination } from "../Button";
import ReactPaginate from "react-paginate";


interface PaginationProps {
    children?: ReactNode;
    pageCount: any;
    handlePageClick: any;
    align?: any
}

export function Pagination({ children, pageCount, handlePageClick, align }: PaginationProps) {
    return (
        <Stack spacing={2} justify="end">
            <ReactPaginate
                pageCount={pageCount}
                onPageChange={handlePageClick}
                pageClassName="border border-gray-200 px-4 py-2 mx-1 rounded-lg fontSize=14px"
                activeClassName="bg-blue-500 text-white border-blue-500"
                previousLabel={
                    <ButtonPagination button={<MdKeyboardArrowLeft />} fontSize={"16px"} />
                }
                nextLabel={
                    <ButtonPagination button={<MdKeyboardArrowRight />} fontSize={"16px"} />
                }
                containerClassName="horizontal-pagination" // Use uma classe personalizada
                previousClassName="pagination-previous" // Adicione a classe do botão anterior
                nextClassName="pagination-next" // Adicione a classe do botão seguinte
            />
        </Stack>
    );
}