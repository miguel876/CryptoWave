import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Header from 'structure/Header';
import translation from 'assets/translation/assets/en/translation.json';
import { ThemeProvider } from '@mui/material';
import theme from 'theme/theme';
import Homepage from 'pages/homepage';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, useLocation, useRoutes } from 'react-router-dom';
import CoinDetails from 'pages/coin-details';

/* 
Adicionar loadings
colocar responsivo e com acessabilidade
fazer testes unitários

NTH
colocar um dark mode
Adicionar font

*/

function App() {
  i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    resources: {
      en: {
        translation,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ['en'],
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Header />
          <Main />
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  )
}

const Main = () => {
  const location = useLocation()
  const routes = useRoutes([
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/:id',
        element: <CoinDetails />,
      },
      
    ], location);

    return <main>{routes}</main>
}

export default App

