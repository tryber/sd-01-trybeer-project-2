export async function validateLogin(setIsAdmin, setIsLoged) {
  if (!JSON.parse(localStorage.getItem('user'))) return setIsLoged(false);
  const result = await fetch('http://localhost:3001/user', { method: 'GET', headers: { authorization: JSON.parse(localStorage.getItem('user')).token }})
  .then(res => res.json());
  if (!result || result.message === "jwt expired") {
    setIsLoged(false);
    return false;
  }
  if (result.role) setIsAdmin(true);
  setIsLoged(true);
  return true;
}

export async function sendData(event, data, url, setIsAdmin, setIsLoged) {
  const result = await fetch(`http://localhost:3001/${url}`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json());
  if (result.message) return alert('Email já cadastrado');
  localStorage.setItem('user', JSON.stringify(result));
  if(result.role) setIsAdmin(true);
  setIsLoged(true);
}

export function userLogout() {
  return localStorage.removeItem('user');
}
