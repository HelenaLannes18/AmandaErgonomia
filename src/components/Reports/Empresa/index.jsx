import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

function empresasPDF(empresas) {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const dados = empresas.empresas.map((empresa) => {
    return [
      { text: empresa.id, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: empresa.name, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: empresa.email, fontSize: 9, margin: [0, 2, 0, 2] },
      { text: empresa.email, fontSize: 9, margin: [0, 2, 0, 2] },
    ];
  });

  const details = [
    {
      table: {
        headerRows: 1,
        widths: ['*', '*', '*', '*'],
        body: [
          [
            { text: 'Código', style: 'tableHeader', fontSize: 10 },
            { text: 'Nome', style: 'tableHeader', fontSize: 10 },
            { text: 'E-mail', style: 'tableHeader', fontSize: 10 },
            { text: 'Telefone', style: 'tableHeader', fontSize: 10 },
          ],
          ...dados,
        ],
      },
      layout: 'lightHorizontalLines', // headerLineOnly
    },
  ];

  function Rodape(currentPage, pageCount) {
    return [
      {
        text: currentPage + ' / ' + pageCount,
        alignment: 'right',
        fontSize: 9,
        margin: [0, 10, 20, 0], // left, top, right, bottom
      },
    ];
  }

  const docDefinitios = {
    pageSize: 'A4',
    pageMargins: [15, 50, 15, 40],

    content: [
      // Seu conteúdo aqui...
      {
        text: 'Administração Guaíra, Almoxarifado',
        fontSize: 16,
        bold: true,
        margin: [60, 0, 0, 0], // paddingLeft, paddingTop, paddingRight, paddingBottom
        alignment: 'left',
      },
      {
        text: 'Almoxarifado Manutenção Primária',
        fontSize: 16,
        margin: [63, 0, 0, 0], // paddingLeft, paddingTop, paddingRight, paddingBottom
        alignment: 'left',
      },
      {
        text: '\n', // Adiciona uma quebra de linha
        margin: [0, 10, 0, 0], // Aumenta a distância entre os textos
      },
      {
        text: 'Vigência: 03/2023 a 03/2025',
        fontSize: 14,
        bold: true,
        margin: [109, 0, 0, 0], // paddingLeft, paddingTop, paddingRight, paddingBottom
        alignment: 'center',
      },
      {
        text: '\n', // Adiciona uma quebra de linha
        margin: [0, 10, 0, 0], // Aumenta a distância entre os textos
      },
      {
        text: 'AVALIAÇÃO ERGONÔMICA PRELIMINAR – NR-17',
        fontSize: 22,
        bold: true,
        margin: [1, 0, 0, 0], // paddingLeft, paddingTop, paddingRight, paddingBottom
        alignment: 'left',
      },
      {
        // Adiciona o parágrafo com o estilo especificado
        text: [
          {
            text: '\n',
            margin: [0, 10, 0, 0],
          },
          {
            // Adiciona o parágrafo com o estilo especificado
            margin: [342, 0, 0, 0],
            text: [
              {
                text: '\n',
              },
            ],
          },
        ],
      },
      {
        // Adiciona a tabela com a imagem
        table: {
          border: [0],
          body: [
            [
              {
                image: 'logo.png', // Insira a URL da imagem aqui
                width: 238,
                height: 114,
              },
            ],
          ],
        },
      },
      //   {
      //     // Adiciona o parágrafo com o estilo especificado
      //     text: [
      //       {
      //         text: '\n',
      //         margin: [0, 10, 0, 0],
      //       },
      //       {
      //         // Adiciona o parágrafo com o estilo especificado
      //         margin: [94, 0, 0, 0],
      //         text: [
      //           {
      //             text: '\n',
      //           },
      //         ],
      //       },
      //     ],
      //   },
      //   {
      //     // Adiciona a tabela com a imagem
      //     table: {
      //       border: [0],
      //       body: [
      //         [
      //           {
      //             image: '', // Insira a URL da imagem aqui
      //             width: 467,
      //             height: 52,
      //           },
      //         ],
      //       ],
      //     },
      //   },
    ],
    footer: Rodape,
  };

  pdfMake.createPdf(docDefinitios).download();
}

export default empresasPDF;
