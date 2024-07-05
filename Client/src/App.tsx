import './App.css'
import SideBar from './components/Sidebar/SideBar'
import Layout from './Layout/Layout'
function App() {
  return (
    <Layout>
      <div className='container'>
        <SideBar/>
      </div>
    </Layout>
  )
}

export default App;