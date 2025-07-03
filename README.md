# 🧠 React Quiz App

## 📝 Overview
**React Quiz App** is a Single Page Application (SPA) built with React. Users can register, log in, take quizzes from selected categories, and view their quiz history. All data is stored in the browser using `localStorage`, so no backend setup is required.

---

## 🎯 Key Features

### ✅ Quiz Functionality
- Select number of questions (1–50) and category  
- Multiple choice interface with randomized answer order  
- Score calculated automatically after final submission  
- Decodes special HTML entities for clean readability  

### 👤 User System
- Register and login functionality  
- Logged-in users have their own quiz history  
- Uses `localStorage` for storing sessions and results  

### 🛡️ Admin Features
- Admin dashboard with user and question management  
- Separate components for managing users and quiz questions

### 📊 Dashboard & History
- Dashboard shows:  
  - Total quizzes taken  
  - Total correct answers  
  - Average score  
  - Most recent quiz summary  
- Quiz log page lists all past quizzes  
- Each log entry links to a detailed breakdown per question  

### 📂 Quiz Detail View
- Shows each question, your answer, and the correct answer  
- Green highlight for correct, red for wrong  
- Uses `useParams` to fetch quiz data by index  

### 💾 Local Storage Persistence
- `currentUser`: the logged-in user object  
- `quizHistory_<username>`: quiz records per user  
- `lastResult`: result data for result screen  
- `currentQuiz`: active quiz data  

---

## 🛠 Tech Stack

| Feature       | Technology           |
|---------------|----------------------|
| Frontend      | React                |
| Routing       | React Router DOM     |
| HTTP Client   | Axios                |
| Styling       | Tailwind CSS         |
| Data Storage  | Browser localStorage |

---

## 🚀 Getting Started

### 1. Clone this repository

```bash
git clone https://github.com/your-username/react-quiz-app.git
cd react-quiz-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

✅ This app works completely offline — all logic is handled in the browser.

---

## 📂 File Structure

```
quiz-app/
├── node_modules/
├── public/
├── src/
│   ├── auth/
│   │   ├── AuthManager.js
│   │   └── PrivateRoute.jsx
│   ├── components/
│   │   └── Navbar.jsx
│   ├── models/
│   │   ├── AdminUser.js
│   │   ├── RegularUser.js
│   │   └── UserBase.js
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── ManageQuestions.jsx
│   │   ├── ManageUsers.jsx
│   │   ├── QuizDetail.jsx
│   │   ├── QuizLog.jsx
│   │   ├── QuizPage.jsx
│   │   ├── QuizResult.jsx
│   │   ├── QuizSession.jsx
│   │   ├── Register.jsx
│   │   └── UserDashboard.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
```

---

## 🌐 API Used

**Open Trivia DB**  
- **Endpoint:**  
  `https://opentdb.com/api.php?amount=${parsedAmount}&category=${category}` 
- **Example:**  
  `https://opentdb.com/api.php?amount=10&category=9`  
- **Response structure:**  
  - `response_code: 0` means success  
  - `results`: array of question objects  

---

## 📌 Notes
- Quiz answers are shuffled using a custom `shuffle()` function  
- Questions are stored with user-selected answers  
- Optional chaining is used to avoid accessing undefined values  
- The app checks if the user is logged in before saving quiz history  
- If not logged in, data is saved under `quizHistory_guest`  

---

## 🪪 License

This project is open source under the **MIT License**.  
Feel free to use, modify, and share for personal or educational purposes.