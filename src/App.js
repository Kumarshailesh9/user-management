import { Route, Routes } from 'react-router-dom';
import UserList from './componant/UserList';


function App() {
  return (
    <Routes>
      <Route path='/' element={<UserList/>}/>
    </Routes>
  );
}

export default App;
