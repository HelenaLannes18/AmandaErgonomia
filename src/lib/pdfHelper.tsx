import { renderToStaticMarkup } from 'react-dom/server';
//@ts-ignore
import pdf from 'html-pdf';

//@ts-ignore
const componentToPDFBuffer = (component) => {
    return new Promise((resolve, reject) => {
        const html = renderToStaticMarkup(component);

        const options = {
            format: 'A4',
            orientation: 'portrait',
            border: '10mm',
            footer: {
                height: '10mm',
            },
            type: 'pdf',
            timeout: 30000,
        };
        //@ts-ignore
        const buffer = pdf.create(html, options).toBuffer((err, buffer) => {
            if (err) {
                return reject(err);
            }

            return resolve(buffer);
        });
    });
}

export default {
    componentToPDFBuffer
}