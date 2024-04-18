import React from 'react';
import { useExcelDownloder } from 'react-xls';

function App() {
    const { ExcelDownloder, Type } = useExcelDownloder();

    const data = {
        Data1: [
            { identificacao: 'Razão Social', dado: 'ERGOGROUP-Segurança do Trabalho Ltda.' },
            { identificacao: 'CNPJ', dado: '21.135.906/00019' },
            { identificacao: 'Endereço', dado: 'Rua Santo Antônio, n145' },
            { identificacao: 'Bairro', dado: 'Centro' },
            { identificacao: 'CEP', dado: '38010-160' },
            { identificacao: 'Cidade', dado: 'Uberaba' },
            { identificacao: 'UF', dado: 'MG' },
            { identificacao: 'Telefone', dado: '(34) 3333-9987' },
            { identificacao: 'Email', dado: 'contato@ergogroup.com.br' },
        ],

        Data2: [
            { responsavel: 'Nome', info: 'Amanda Viviane Muniz Rodrigues' },
            { responsavel: 'Habilatação', info: 'Fisioterapeuta / Especialista em Ergonomia' },
            { responsavel: 'Registro', info: 'CREFITO 4/127866F' },
        ],

        Data3: [
            { Rev: 'Nome', DATA: 'Amanda Viviane Muniz Rodrigues', Executado: 'ERGOGROUP', Verificado: 'Açúcar e Álcool Oswaldo Ribeiro de Mendonça Ltda', DESCRICAOEOUFOLHASATINGIDAS: 'Emissão Inicial' },
        ],

        Data4: [
            { identificacao: 'Razão Social', dado: 'Açúcar e Álcool Oswaldo Ribeiro de Mendonça Ltda' },
            { identificacao: 'Nome Fantasia', dado: 'Usina Colorado' },
            { identificacao: 'CNPJ', dado: '21.135.906/00019' },
            { identificacao: 'Endereço', dado: 'Fazenda São José da Glória' },
            { identificacao: 'Bairro', dado: 'Zona Rural' },
            { identificacao: 'CEP', dado: '14.790-000' },
            { identificacao: 'UF', dado: 'MG' },
            { identificacao: 'Cidade', dado: 'Guaíra' },
            { identificacao: 'UF', dado: 'SP' },

            { identificacao: 'Telefone', dado: '017 3330-3385' },
            { identificacao: 'Ramo de Atividade', dado: 'Produção de Álcool' },
            { identificacao: 'CNAE', dado: '19.31-4-00' },

            { identificacao: 'Email', dado: 'valeria.jorge@colorado.com.br' },
            { identificacao: 'Atividade Principal', dado: 'Produção de Açúcar, Álcool e Energia Elétrica' },
            { identificacao: 'Grau de Risco', dado: '3' },

        ],

        Data5: [
            { Gestor: 'Nome', Dado: 'Valéria Cristina Lellis Jorge' },
            { Gestor: 'Telefone', Dado: '(17) 3330.3385' },
            { Gestor: 'Email', Dado: 'valeria.jorge@colorado.com.br' },

        ],

        Data6: [
            { Titulo: 'Empresa', Dado: 'Açúcar e Álcool Oswaldo Ribeiro de Mendonça Ltda.' },
            { Titulo: 'Unidade', Dado: 'Guaira-SP' },
            { Titulo: 'Área Avaliada', Dado: 'Agricola' },
            { Titulo: 'Data da Elaboração', Dado: '14/03/2023' },
            { Titulo: 'Revisão do Codumento', Dado: '00/2023' },

            { Titulo: 'Setor', Dado: 'Administração' },
            { Titulo: 'Cargo/Função', Dado: 'Almoxarife Jr.' },
            { Titulo: 'Tipo de Atividade', Dado: 'Operacional' },

            { Titulo: 'Jornada de Trabalho', Dado: 'De segunda a sexta das 07h as 17h' },
            { Titulo: 'Variação de Turno', Dado: 'Sim' },
            { Titulo: 'Trabalho Noturno', Dado: 'Não' },
            { Titulo: 'N de Trab. Expostos', Dado: '01 (um)' },
            { Titulo: 'Descrição do Ambiente de Trabalho', Dado: 'Lorem Ipsum' },

            { Titulo: 'Tarefa Prescrita', Dado: 'Lorem Ipsum' },
            { Titulo: 'Tarefa Real', Dado: 'Lorem Ipsum' },

            { Titulo: 'Considerações do(a) Avaliador(a)', Dado: 'Lorem Ipsum' },
            { Titulo: 'Ergonomista Responsavel/Função', Dado: 'Lorem Ipsum' },
        ],
    };

    return (
        <div>
            <h3>GeeksforGeeks - Downloadable Spreadsheet</h3>
            <ExcelDownloder
                data={data}
                filename={'book'}
                type={Type.Button} // or type={'button'} 
            >
                Download the Spreadsheet
            </ExcelDownloder>
        </div>
    );
}

export default App;