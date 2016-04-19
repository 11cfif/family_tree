import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import App from './components/App'
import './styles/app.css'
import configureStore from './store/configureStore'


let store = configureStore()

render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
