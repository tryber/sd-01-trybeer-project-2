import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';

async function submitData(event, name, user) {
  event.preventDefault();
  const { email, token, role } = user;
  const newUser = { name, email, token, role };
  localStorage.setItem('user', JSON.stringify(newUser));
  await fetch('http://localhost:3001/user',
  { headers:
    { authorization: user.token, 'Content-Type': 'application/json' },
    method: "PUT",
    body: JSON.stringify({ name })
  });
}

async function getUser(user, setData) {
  await fetch('http://localhost:3001/user', { headers: { authorization: user.token } })
  .then((res) => res.json())
  .then((result) => setData(result));
}

function testId(type, isAdmin) {
  if (isAdmin) {
    if (type === 'name') return 'profile-name';
    return 'profile-email';
  }
  if (type === 'name') return 'profile-name-input';
  return 'profile-email-input';
}

function inputName(isAdmin, name, setName) {
  return (
    <input
      type='text'
      data-testid={testId('name', isAdmin)}
      value={name}
      id='name'
      name='name'
      pattern='^[a-zA-Z\s]{12,40}$'
      onChange={e => setName(e.target.value)}
      readOnly={isAdmin}
      required
    />
  );
}

function inputEmail(isAdmin, data) {
  return (
    <input
      type='email'
      data-testid={testId('email', isAdmin)}
      value={data.email}
      id='email'
      name='email'
      readOnly
    />
  );
}

function labels(htmlFor, text) {
  return <label htmlFor={htmlFor}>{text} </label>;
}

// function inputForms(user, setName, name, isAdmin, savedName, setSavedName, data) {
//   return (
//     <form onSubmit={(e) => submitData(e, name, user)}>
//       <label htmlFor="name">Nome: </label>
//       <input type="text" data-testid={testId('name', isAdmin)} value={name} id="name" name="name" pattern="^[a-zA-Z\s]{12,40}$" onChange={(e) => setName(e.target.value)} readOnly={isAdmin} required />
//       <label htmlFor="email">Email: </label>
//       <input type="email" data-testid={testId('email', isAdmin)} value={data.email} id="email" name="email" readOnly />
//       {!isAdmin && <button data-testid="profile-save-btn" onClick={() => setSavedName(name)} disabled={name === savedName}>Salvar</button>}
//     </form>
//   );
// }

const user = JSON.parse(localStorage.getItem('user'));

function useffect(user, setData) {
  return useEffect(() => {
    if (user) getUser(user, setData);
  }, []);
}

function btn(setSavedName, name, savedName) {
  return (
    <button
      data-testid='profile-save-btn'
      onClick={() => setSavedName(name)}
      disabled={name === savedName}>
      Salvar
    </button>
  );
}

function ProfilePage() {
  const [data, setData] = useState('');
  let firstName, isAdmin;
  if (user) {
    firstName = user.name;
    isAdmin = user.role
  }
  const [savedName, setSavedName] = useState(firstName);
  const [name, setName] = useState(firstName);
  useffect(user, setData);
  if (data.message || !user) return <Redirect to='/login'/>;
  if (!data) return <Loading />
  return (
    <SideBar title="Cliente - Meu perfil" children={
    <div>
      <form onSubmit={(e) => submitData(e, name, user)}>
        {labels('name', 'Nome: ')}
        {inputName(isAdmin, name, setName)}
        {labels('email', 'Email: ')}
        {inputEmail(isAdmin, data)}
        {!isAdmin && btn(setSavedName, name, savedName)}
      </form>
    </div>
    }/>
  );
}

export default ProfilePage;
