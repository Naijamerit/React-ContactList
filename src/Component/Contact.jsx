import React from 'react';
import { createContext, useState } from 'react';
import '../App.css';
import { BsFillSunFill, BsFillMoonStarsFill } from 'react-icons/bs';
import ContactsTile from '../Component/contactsTile';

export const themeContext = createContext([]);

function App() {
  let [contactArr, setContactArr] = useState([]);
  let [theme, setTheme] = useState('light');
  let [bool, setBool] = useState(false);
  let [index, setIndex] = useState('');
  let [inputs, setInputs] = useState({ name: '', number: '' });
  let [hiden, setHiden] = useState(true);
  let { name, number } = inputs;

  function toggleTheme() {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'));
  }

  function data(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function toggle() {
    setHiden((current) => !current);
  }

  function addContacts(e) {
    e.preventDefault();
    if (inputs.name != '' && inputs.number != '') {
      setContactArr([...contactArr, { name, number }]);
      setInputs({ name: '', number: '' });
    }
    return;
  }

  function deleteContact(i) {
    let total = [...contactArr];
    total.splice(i, 1);
    setContactArr(total);
  }

  function editContact(i) {
    let { name, number } = contactArr[i];
    setInputs({ name, number });
    setBool(true);
    setIndex(i);
  }

  function updateContact() {
    let total = [...contactArr];
    total.splice(index, 1, { name, number });
    setContactArr(total);
    setBool(false);
    setInputs({ name: '', number: '' });
  }

  return (
    <themeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <header>
          <h2>Contact list</h2>
          <button className="theme_btn" onClick={toggleTheme}>
            {theme === 'light' ? <BsFillSunFill /> : <BsFillMoonStarsFill />}
          </button>
        </header>
        <main className="container">
          <button className="btn" onClick={toggle}>
            Create Contacts{' '}
          </button>

          <div className="form" style={{ display: hiden ? 'none' : 'block' }}>
            <div className="fields">
              <input
                type="text"
                onChange={data}
                value={inputs.name || ''}
                name="name"
                placeholder="Enter Name"
              />
              <input
                type="tel"
                onChange={data}
                value={inputs.number || ''}
                name="number"
                placeholder="Enter Number"
              />
            </div>
            <div className="actions">
              <button
                className="btn"
                onClick={!bool ? addContacts : updateContact}
              >
                {!bool ? `Add Contacts` : `Update Contacts`}
              </button>
            </div>
          </div>

          <div className="results">
            {contactArr.length > 0 ? (
              contactArr.map((item, i) => (
                <ContactsTile
                  key={i}
                  id={i}
                  name={item.name}
                  number={item.number}
                  deleteContact={() => deleteContact(i)}
                  editContact={() => editContact(i)}
                />
              ))
            ) : (
              <p>No Contacts yet</p>
            )}
          </div>
        </main>
      </div>
    </themeContext.Provider>
  );
}

export default App;
