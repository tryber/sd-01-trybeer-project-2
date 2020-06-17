export function validateLogin(setIsAdmin, setIsLoged) {
  const user = localStorage.getItem('user');
  if (!user) return;
  async function getUserData() {
    const result = await fetch('http://localhost:3001/user', { method: 'GET', headers: user }).then(res => res.json());
    if (!result) return false;
    if (result.role) setIsAdmin(true);
    setIsLoged(true);
  }
  getUserData();
}

export async function sendData(event, data, setShouldRedirect) {
  event.preventDefault();
  const result = await fetch(`http://localhost:3001/user`, { method: 'POST', headers: data }).then(res => res.json());
  localStorage.setItem('user', JSON.stringify(result));
  setShouldRedirect(true);
}
