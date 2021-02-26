import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="leading-relaxed font-light bg-white dark:bg-black pt-4 px-4 pg:pt-8 lg:px-8 pb-24">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
