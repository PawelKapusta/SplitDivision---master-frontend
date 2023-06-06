import Document, { DocumentContext, DocumentInitialProps } from "next/document";

class CustomDocument extends Document {
    static async getInitialProps(
        context: DocumentContext,
    ): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(context);

        return initialProps;
    }
}

export default CustomDocument;
