import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

//redux
import { Provider } from 'react-redux'
import { store } from './redux/store'

const token = localStorage.getItem('authToken');
if (token) {
  store.dispatch({ type: 'auth/setToken', payload: token });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
