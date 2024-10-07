import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AccountsPage from './AccountsPage';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';


//ReactDOM.render(<App />,document.getElementById('root'));

//Use Browser router to change the page based on the path!!!
ReactDOM.render(
	<BrowserRouter>
	  <div>
	    <Route exact path="/" component={App}/>
	    <Route path="/AccountsPage" component={AccountsPage}/>
	  </div>
	</BrowserRouter>
, document.getElementById('root'));




registerServiceWorker();
