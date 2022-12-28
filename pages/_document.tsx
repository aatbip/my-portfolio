import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="favicon" href="/favicon.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Portfolio of Ananta Bipal Subedi | anantabipal.dev"
        />
        <meta name="og:title" property="og:title" content="Portfolio of Ananta Bipal Subedi | anantabipal.dev"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
