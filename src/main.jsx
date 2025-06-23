import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

//redux
import { Provider } from 'react-redux'
import { store } from './redux/store'

//utils
import { initAuth } from './utils/initAuth.js'

initAuth(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
