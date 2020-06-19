export function validateLogin(setIsAdmin, setIsLoged) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return;
  async function getUserData() {
    const result = await fetch('http://localhost:3001/user', { method: 'GET', headers: { authorization: user.token }}).then(res => res.json());
    if (!result || result.message === "jwt expired") return false;
    if (result.response.role) setIsAdmin(true);
    setIsLoged(true);
  }
  getUserData();
}

export async function sendData(event, data, url, setIsAdmin, setIsLoged) {
  event.preventDefault();
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
