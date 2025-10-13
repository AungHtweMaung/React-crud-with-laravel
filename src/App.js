import './App.css';
import { Outlet } from 'react-router-dom';
import Sidebar from './pages/layouts/SideBar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className="App" style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ marginLeft: '200px', padding: '20px', marginTop: '50px', width: '100%' }}>
        <div className="">
          <Outlet />
        </div>
      </main>
      <ToastContainer />
    </div>
  );
}

export default App;
