import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Group from "./Group";
import Dashboard from "./Dashboard";
import MemberInicialCreate from "./MemberInicialCreate";
import MemberDisplay from './MemberDisplay';
import TransactionDisplay from './TransactionDisplay';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/groups' element={ <Group /> } />
          <Route path='/groups/:id' element={ <Dashboard /> } />
          <Route path='/groups/:groups_id/inicialmembers' element={ <MemberInicialCreate /> } />
          <Route path='/groups/:groups_id/members' element={ <MemberDisplay /> } />
          <Route path='/groups/:groups_id/transactions' element={ <TransactionDisplay /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
