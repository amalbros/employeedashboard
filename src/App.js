import { BrowserRouter as Router, Route} from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Employee from './components/Employee';

const App = () => {
	return (
		<Router>
			<Route exact path='/' component={Dashboard} />
			<Route exact path='/employee/:id' component={Employee} />
		</Router>
	);
}

export default App;
