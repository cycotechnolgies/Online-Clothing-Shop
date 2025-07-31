# 🧾 POS-MERN - Scalable POS System (MERN Stack)

**POS-MERN** is a full-stack Point of Sale (POS) system developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is designed to be scalable across multiple platforms (Web, Mobile, Desktop) and supports role-based access, real-time inventory, and comprehensive sales reporting.

---

## 🚀 Features

- 🔐 JWT Authentication (Login, Register, Logout)
- 👤 Role-based Access Control (Admin, Manager, Cashier)
- 📦 Product & Inventory Management (CRUD, Search)
- 🛒 Cart and Sales Module (Invoices, Discounts, Taxes)
- 📊 Reporting Dashboard (Daily/Monthly Sales, Top Products)
- ⚙️ Store Settings (Tax, Currency, Profile)
- 🧪 Unit & Integration Testing
- 📦 Dockerized & CI/CD Ready (GitHub Actions)

---

## 🧱 Tech Stack

| Layer     | Technology               |
|-----------|--------------------------|
| Frontend | React.js, Tailwind CSS    |
| Backend  | Node.js, Express.js       |
| Database | MongoDB, Mongoose         |
| Auth     | JWT,                      |
| DevOps   | Docker, GitHub Actions    |

---

## 📁 Folder Structure

```
/POS-MERN
├── /client          # React frontend (Vite)
├── /server          # Express backend
├── /docs            # SRS, ERD, User Stories
├── docker-compose.yml
├── README.md
└── .github/workflows # CI/CD workflows
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB (local or MongoDB Atlas)
- Docker (optional)

### Local Development
```bash
# Clone the repo
git clone https://github.com/your-username/POS-MERN.git
cd POS-MERN

# Start backend
cd server
npm install
npm run dev

# Start frontend
cd ../client
npm install
npm run dev
```

### Docker Setup
```bash
docker-compose up --build
```

---

## ✅ Roadmap

- [ ] Authentication & Role Management
- [ ] Product CRUD and Inventory
- [ ] Cart and Transaction Module
- [ ] Sales Report & Dashboard
- [ ] Printer Integration (Thermal Receipt)
- [ ] Offline Mode (IndexedDB)
- [ ] Mobile App (React Native)
- [ ] Desktop App (Electron)

---
## 📄 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

We welcome contributions via pull requests. Please follow the code style and write tests for new features. For larger contributions, open an issue to discuss before submitting a PR.

---

## 📬 Contact

Maintained by CYCO TECHNOLOGIES. For support or business inquiries, email: cycotechnologies@gmail.com
