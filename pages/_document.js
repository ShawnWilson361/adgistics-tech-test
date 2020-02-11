import React from 'react';

import { ServerStyleSheet } from 'styled-components';
import { map } from 'lodash';
import Document, { Head, Html, Main, NextScript } from 'next/document';

// import Favicon from '../public/favicon.ico';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {/* <link
            href={Favicon}
            rel="icon"
            type="image/x-icon"
          /> */}
          <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet"></link>
        </Head>
        <body itemScope itemType="http://schema.org/WebPage">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
