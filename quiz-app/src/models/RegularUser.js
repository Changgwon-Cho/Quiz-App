import { UserBase } from './UserBase';

export class RegularUser extends UserBase {
  constructor(username, password) {
    super(username, password, 'user');
  }

  viewScoreHistory() {
    // Later
  }

  startQuiz() {
    // Later
  }
}