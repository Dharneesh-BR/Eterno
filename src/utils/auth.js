// Simple auth utility for demo; in real app, use secure storage and backend validation
export function setUser(user) {
  localStorage.setItem('eterno_user', JSON.stringify(user));
}

export function getUser() {
  const data = localStorage.getItem('eterno_user');
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem('eterno_user');
}
