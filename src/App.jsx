import './App.scss';
import Form from './components/Form';
import Header from './components/Header';
import Intro from './components/Intro';
import Users from './components/Users';

function App() {


  return (
    <>
      <Header />
      <main>
        <Intro />
        <Users />
        <Form />
      </main>
    </>
  )
}

export default App
