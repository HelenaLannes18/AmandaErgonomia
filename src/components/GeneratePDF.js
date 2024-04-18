import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default function GeneratePDF({ person }) {
  function generate() {
    const doc = new jsPDF();

    <h1>Iba</h1>;

    doc.autoTable({
      head: [['Razão Social', 'CNPJ', 'IE', 'Endereço', 'Bairro']],
      body: person.map(({ razao_social, cnpj, ie, endereco, bairro }) => {
        return [razao_social, cnpj, ie, endereco, bairro];
      }),
    });

    doc.autoTable({
      head: [['Iba', 'CNPJ', 'IE', 'Endereço', 'Bairro']],
      body: person.map(({ razao_social, cnpj, ie, endereco, bairro }) => {
        return [razao_social, cnpj, ie, endereco, bairro];
      }),
    });

    //doc.text('Hello World', 10, 10);

    // doc.text('Página 1 - Estática', 10, 10);
    // doc.addPage();
    // doc.text('Página 2 - Estática', 10, 10);

    doc.save('empresa.pdf');
  }

  return (
    <div>
      <button onClick={generate} type="primary">
        Download PDF
      </button>
    </div>
  );
}
