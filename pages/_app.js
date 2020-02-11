import React from 'react';

import App from 'next/app';

import { DefaultSeo } from 'next-seo';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import withRedux from 'next-redux-wrapper';
import ReduxToastr from 'react-redux-toastr';

import Navbar from '../components/Layouts/Navbar';

import makeStore from '../redux/store';

import SEO from '../next-seo.config';

import './_app.scss';

const theme = {
  colors: {
    primary: '#ffffff'
  }
};

class ColourItApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    return {
      pageProps,
      url: `${process.env.FIND_AND_FUND_CLIENT_URL}${ctx.asPath}`,
      pathName: ctx.asPath
    };
  }

  render() {
    const { Component, pageProps, pathName, url, store } = this.props;

    const children = (
      <Provider store={store}>
        <Navbar />
        <ReduxToastr 
          progressBar
          closeOnToastrClick
        />
        <main
          className="colour-it-app"
          id="content"
          itemProp="mainContentOfPage"
          tabIndex="-1"
        >
          <Component {...pageProps} pathName={pathName} currentUrl={url} />
        </main>
      </Provider>
    );

    return (
      <>
        <DefaultSeo {...SEO} />
        <ThemeProvider theme={theme}>
          {typeof window === 'undefined' && children}
          {typeof window !== 'undefined' && (
            <PersistGate persistor={store.__PERSISTOR} loading={null}>
              {children}
            </PersistGate>
          )}
        </ThemeProvider>
      </>
    );
  }
}

export default withRedux(makeStore)(ColourItApp);
