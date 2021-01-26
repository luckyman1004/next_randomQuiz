import React from 'react';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '@/styles/theme';

import GlobalStyle from '@/styles/global';

// import db from "../../db.json";

// const theme = db.theme;

export type ThemeType = typeof defaultTheme;

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
