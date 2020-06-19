import React, { useState, useEffect } from 'react';

function ProfilePage() {
  const [data, setData] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user')).token;
    async function getUser() {
      await fetch('http://localhost:3001/user', { headers: { authorization: token } })
      .then((res) => res.json())
      .then((result) => setData(result.response));
    }
    getUser();
  }, []);

  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <label htmlFor="name">Nome</label>
      <input type="text" data-testid="profile-name-input" value={data.name} id="name" name="name" pattern="^[a-zA-Z]{12,40}$" onChange={(e) => setName(e.target.value)} required />
      <label htmlFor="email">Email</label>
      <input type="email" data-testid="profile-email-input" value={data.email} id="email" name="email" readOnly />
      <button data-testid="profile-save-btn">Salvar</button>
    </div>
  );
}

export default ProfilePage;
