export class UserBase {
  constructor(username, password, role) {
    this.username = username;
    this.password = password;
    this.role = role;
  }

  login() {
    return true;
  }

  logout() {
    console.log(`${this.username} Logged out successful!`);
  }
} 