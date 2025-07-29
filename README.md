# Mobile Banking App – Spring Boot & React Native

A modern full-stack **mobile banking application** built with a secure Java backend (**Spring Boot + MySQL**) and a polished cross-platform mobile frontend (**React Native + Expo Go**). The app supports authentication, account management, money transfers, bill payments, QR-based transactions, loan management, feedback, and more.

## 🚀 Features

- **User Registration & Authentication**: Secure signup/login with hashed passwords and JWT.
- **Account Management**: Add, view, and manage multiple bank accounts.
- **Fund Transfer**: Send money to your own or others’ accounts.
- **Bill Payments**: Pay electricity, water, and rent bills securely.
- **QR Payments**: Generate/scan QR codes for payments and receipts.
- **Loan Application**: Apply for loans with eligibility checks.
- **Feedback & Rating**: Collect user feedback and app ratings.
- **Transaction History**: Track all past transfers and bill payments.
- **Profile & Language**: View personal info.
- **Highly Secure**: Implements JWT authentication, password encryption, error handling, and input validation.

## 🗂️ Directory Structure

```
MBA/
├── MBA_backend/        # Spring Boot Backend (REST API, DB)
└── MBA_frontend/       # React Native (Expo Go) Frontend (Mobile App)
```

## 💻 Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3+**
  - Spring Data JPA (Hibernate, ORM)
  - Spring Security + JWT
- **MySQL** (production or local dev)
- **H2** (optional, for development)
- **Maven** (build tool)

### Frontend
- **React Native** (JavaScript)
- **Expo Go** (for instant dev/test)
- **React Navigation** (navigation/drawer)
- **Axios** (API requests)
- **AsyncStorage** (device storage for tokens)
- **@expo/vector-icons, Expo Camera** (icons, QR scanner)
- **Global CSS-in-JS styling** (GlobalStyles.js)

## ⚙️ Getting Started

### Backend Setup

1. **Prerequisites**
   - Java 17 installed
   - Maven installed
   - MySQL installed/running (or use H2 for dev)

2. **Run the Backend**
   ```bash
   cd MBA_backend/bankapp/bankapp
   mvn spring-boot:run
   ```
   - The backend starts at `http://0.0.0.0:8080`.

3. **Database Setup**
   - The backend auto-creates tables in MySQL database `bankappdb`.
   - Update DB credentials in:
     ```
     MBA_backend/bankapp/bankapp/src/main/resources/application.properties
     ```

### Frontend Setup

1. **Prerequisites**
   - Node.js and npm installed
   - **Expo Go app** installed on your mobile (App Store/Play Store)
   - Mobile device and PC must be on the **same WiFi/LAN**.

2. **Install Dependencies**
   ```bash
   cd MBA_frontend
   npm install
   ```

3. **Configure Backend API Endpoint**
   - Run `npm start` to see the Expo CLI local URL (e.g., `http://192.168.1.7:8080`).
   - Copy your **local IP address** from the Expo dashboard (do NOT use `localhost`).
   - Edit:
     ```
     MBA_frontend/src/config/config.js
     ```
     Set:
     ```javascript
     apiBaseURL: 'http://YOUR_IP_ADDRESS:8080'
     ```
     - Replace `YOUR_IP_ADDRESS` with your local IP. Keep port `8080`.

4. **Start the Frontend**
   ```bash
   npm start
   ```
   - The **Expo CLI dashboard** opens in your terminal.

5. **View the App**
   - Open **Expo Go** on your phone.
   - Scan the QR code in the Expo CLI dashboard.
   - The app will load on your device (requires WiFi/LAN).

## 🧑‍💻 Usage – Common User Flows

- **Register/Login**: Create or sign in with JWT-based authentication.
- **Add/View Accounts**: Manage multiple bank accounts.
- **Send Money**: Transfer funds to self or others (with balance validation).
- **Bill Payment**: Pay electricity, rent, or water bills.
- **QR Payments**: Generate/scan QR codes for sending/receiving money.
- **Loan Application**: Apply for loans with eligibility checks.
- **Rating & Feedback**: Share feedback and rate the app.
- **Profile & Transactions**: View personal info and transaction history.

## 📝 Notes & Best Practices

- **Avoid `localhost` or `127.0.0.1`** for `apiBaseURL` when testing on a phone—use your local IP.
- For remote testing, consider port forwarding or ngrok (advanced).
- Backend errors return friendly messages; frontend displays success/error notifications.
- Customize UI using included global styles and components.
- Database tables/relationships are auto-managed by Hibernate/JPA.

## 📜 Sample Configuration

**MBA_frontend/src/config/config.js**
```javascript
const config = {
  development: {
    apiBaseURL: 'http://192.168.xx.xx:8080' // Update with your local IP
  },
  production: {
    apiBaseURL: 'https://<your-production-server>:8080'
  }
};
```

## 🔑 Security

- Passwords encrypted with BCrypt.
- JWT tokens are short-lived for secure API calls.
- SQL/ORM uses safe practices (no raw queries).
- Input validation on both frontend and backend.

## ❓ FAQ

**Q: Can I run just the frontend or backend?**  
A: Both must run for full functionality.

**Q: Does it support Android and iOS?**  
A: Yes, Expo Go enables instant testing on both platforms.

**Q: Is this production-ready?**  
A: Suitable for demo/learning. For production, add HTTPS, logging, and scalable DB.

**Q: How can I test as an admin?**  
A: Use seeded demo user (`test@example.com` / `Password123`) or register new users.

## 👥 Core Project Structure

- **Backend**: Spring Boot REST APIs, ORM entities, JWT security, service/repository layers.
- **Frontend**: React Native screens, navigation, global styles, Expo Go integration.

## 🧾 License

This project is licensed under the [MIT License](LICENSE).