import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Group from "./Group";
import Dashboard from "./Dashboard";
import Member from "./Member";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/groups' element={ <Group /> } />
          <Route path='/groups/:id' element={ <Dashboard /> } />
          <Route path='/groups/:groups_id/members' element={ <Member /> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
