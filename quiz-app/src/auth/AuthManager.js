import { RegularUser } from '../models/RegularUser';
import { AdminUser } from '../models/AdminUser';

export class AuthManager {
  static login(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const match = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!match) {
      alert('Invalid ID or Password.');
      return null;
    }

    let user;
    if (match.role === 'admin') {
      user = new AdminUser(username, password);
    } else {
      user = new RegularUser(username, password);
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }

  static logout() {
    localStorage.removeItem('currentUser');
  }

  static getCurrentUser() {
    const data = localStorage.getItem('currentUser');
    return data ? JSON.parse(data) : null;
  }
}