import React, { useState } from 'react';
import Editor from 'react-simple-code-editor';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';

const Welcome = ({ firstName, lastName }) => {
  return (
    <h1>
      Welcome, {firstName} {lastName} !
    </h1>
  );
};

const Menu = ({ firstName, lastName, isLogged, onLoging, onLogout }) => {
  return (
    <>
      {isLogged ? (
        <Welcome firstName={firstName} lastName={lastName} />
      ) : (
        <Welcome firstName="Stranger" />
      )}

      {isLogged
        ? onLogout && <button onClick={onLogout}>Logout</button>
        : onLoging && <button onClick={onLoging}>Login</button>}
    </>
  );
};

export default function App() {
  const [isLogged, setLogin] = useState(false);
  const login = () => {
    setLogin(true);
  };
  const logout = () => {
    setLogin(false);
  };
  return (
    <div className="App">
      <Menu
        firstName="Leonardo"
        lastName="Kuster"
        isLogged={isLogged}
        onLoging={login}
        onLogout={logout}
      />
    </div>
  );
}


//Esse codigo aqui não é pro marketplace, é pra eu salvar como aprendizado.