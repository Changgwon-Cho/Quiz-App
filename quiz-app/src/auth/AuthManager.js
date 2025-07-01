import { RegularUser } from "../models/RegularUser";
import { AdminUser } from "../models/AdminUser";

export class AuthManager {
  // 로그인
  static login(username, password) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const match = users.find( // 각 유저 객체(u)에 대해 비교하여 조건을 만족하는 첫 번째 요소만 반환
      (u) => u.username === username && u.password === password
    );

    if (!match) {
      alert("Invalid ID or Password.");
      return null;
    }

    let user;
    if (match.role === "admin") {
      user = new AdminUser(username, password);
    } else {
      user = new RegularUser(username, password);
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    return user;
  }

  // 로그아웃
  static logout() {
    localStorage.removeItem("currentUser");
  }

  // 현재 로그인된 사용자 정보
  static getCurrentUser() {
    const data = localStorage.getItem("currentUser");
    return data ? JSON.parse(data) : null;
  }
}
