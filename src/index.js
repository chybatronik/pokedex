import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import './index.css'
import App from './pages/App'
import registerServiceWorker from './registerServiceWorker'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducers from './store/reducers'
import 'bootstrap/dist/css/bootstrap.css'
import { composeWithDevTools } from 'redux-devtools-extension'

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
