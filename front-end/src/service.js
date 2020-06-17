export function validateLogin(setIsAdmin, setIsLoged) {
  const user = localStorage.getItem('user');
  if (!user) return;
  async function getUserData() {
    const result = await fetch('http://localhost/3001/login', { method: 'GET', headers: user }).then(res => res.json());
    if (!result) return false;
    if (result.role) setIsAdmin(true);
    setIsLoged(true);
  }
  getUserData();
}
