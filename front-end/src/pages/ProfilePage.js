import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

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

function ProfilePage() {
  const [data, setData] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const firstName = user.name || '';
  const [name, setName] = useState(firstName);

  useEffect(() => {
    async function getUser() {
      await fetch('http://localhost:3001/user', { headers: { authorization: user.token } })
        .then((res) => res.json())
        .then((result) => setData(result));
    }
    getUser();
  }, []);

  if (data.message) return <Redirect to='/login'/>;
  if (!data) return <div>Loading...</div>;
  console.log(data)
  return (
    <div>
      <form onSubmit={(e) => submitData(e, name, user)}>
        <label htmlFor="name">Nome</label>
        <input type="text" data-testid="profile-name-input" value={name} id="name" name="name" pattern="^[a-zA-Z]{12,40}$" onChange={(e) => setName(e.target.value)} required />
        <label htmlFor="email">Email</label>
        <input type="email" data-testid="profile-email-input" value={data.email} id="email" name="email" readOnly />
        <button data-testid="profile-save-btn" disabled={(name === firstName)}>Salvar</button>
      </form>
    </div>
  );
}

export default ProfilePage;
