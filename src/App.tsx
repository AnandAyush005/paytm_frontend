import 'react-router-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from './screens/signin';
import Signup from './screens/signup';
import Dashboard from './screens/dashborad';
import "@/index.css"
import Passbook from './screens/Passbook';

export function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/passbook" element={<Passbook />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
