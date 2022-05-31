import { HashRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Group from "./Group";
import Dashboard from "./Dashboard";
import Settle from './Settle';
import TransactionDisplay from './TransactionDisplay';
import TransactionCreate from './TransactionCreate';
import TransactionEdit from './TransactionEdit';
import MemberDisplay from './MemberDisplay';
import MemberCreate from './MemberCreate';
import MemberEdit from './MemberEdit';
import MemberInicialCreate from "./MemberInicialCreate";


function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/groups' element={ <Group /> } />
          <Route path='/groups/:group_id' element={ <Dashboard /> } />
          <Route path='/groups/:group_id/settle/new' element={ <Settle /> } />
          <Route path='/groups/:group_id/transactions' element={ <TransactionDisplay /> } />
          <Route path='/groups/:group_id/transactions/new' element={ <TransactionCreate /> } />
          <Route path='/groups/:group_id/transactions/:id' element={ <TransactionEdit /> } />
          <Route path='/groups/:group_id/members' element={ <MemberDisplay /> } />
          <Route path='/groups/:group_id/members/new' element={ <MemberCreate /> } />
          <Route path='/groups/:group_id/members/:id' element={ <MemberEdit /> } />
          <Route path='/groups/:group_id/inicialmembers' element={ <MemberInicialCreate /> } />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
