import { UserBase } from './UserBase';

export class AdminUser extends UserBase {
  constructor(username, password) {
    super(username, password, 'admin');
  }

  manageQuestions() {
    // Later
  }

  viewAllUsers() {
    // Later
  }
}