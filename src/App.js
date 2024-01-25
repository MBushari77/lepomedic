import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import './static/css/fontello.css';

// Components
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import EditInfo from './components/EditInfo';
import AddProduct from './components/AddProduct';
import Browse from './components/Browse';
import Product from './components/Product';
import OurProducts from './components/OurProducts';
import UpdateProduct from './components/UpdateProduct';
import DashBoard from './components/dashboard/DashBoard';
import AllComp from './components/dashboard/AllComp';
import AllUsers from './components/dashboard/AllUsers';
import AllProd from './components/dashboard/AllProd';
import WaitingComp from './components/dashboard/WaitingComp';
import ShowUser from './components/dashboard/ShowUser';
import ShowWaiting from './components/dashboard/ShowWaiting';
import ShowComp from './components/dashboard/ShowComp';
import Footer from './components/widgets/Footer';
import Company from './components/Company';

function App() {
  return (
    <>
      <center>
        <Router>
          {/* header section */}
          <Header />
          {/* end of header */}
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/about' component={ About } />
            <Route path='/contact' component={ Contact } />
            <Route path='/login' component={ Login } />
            <Route path='/register' component={ Register } />
            {/* After login */}
            <Route path='/profile' component={ Profile } />
            <Route path='/editinfo' component={ EditInfo } />
            <Route path='/addproduct' component={ AddProduct } />
            <Route path='/browse' component={ Browse } />
            <Route path='/product/:id' component={ Product } />
            <Route path='/ourproducts' component={ OurProducts } />
            <Route path='/updateproduct/:id' component={ UpdateProduct } />
            <Route path='/company/:id' component={ Company } />
            {/* Admin */}
            <Route exact path='/dashboard' component={ DashBoard } />
            <Route path='/dashboard/allcompanies' component={ AllComp } />
            <Route path='/dashboard/allusers' component={ AllUsers } />
            <Route path='/dashboard/allproducts' component={ AllProd } />
            <Route path='/dashboard/witingcompanies' component={ WaitingComp } />
            <Route path="/dashboard/user/:id" component={ ShowUser } />
            <Route path='/dashboard/company/:id' component={ ShowComp}/>
            <Route path='/dashboard/waitingcompany' component={ ShowWaiting } />
          </Switch>
          <Footer />
        </Router>
      </center>
    </>
  );
}

export default App;
