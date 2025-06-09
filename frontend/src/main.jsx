import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProviderWrapper } from './Theme/ThemeProviderWrapper.jsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './Shell/Store.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProviderWrapper>
        <StrictMode>
          <App />
        </StrictMode>
      </ThemeProviderWrapper>
    </PersistGate>
  </Provider>




)
