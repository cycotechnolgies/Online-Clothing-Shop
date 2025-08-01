# 🛍️ Online Clothing Shop

An e-commerce web application tailored for women's fashion — browse and purchase **blouses**, **skirts**, and **frocks** with size filters, secure payments, and a full-featured admin dashboard for product and order management.

---

## 🚀 Project Features

### 👩‍💼 For Buyers
- Browse products by category and size
- Add to cart, update quantities, and checkout securely
- Online payment (Card, QR, Mobile Pay)
- View order history and download receipts
- Responsive mobile-first design

### 🛠️ For Admins
- Dashboard with sales, orders, and stock alerts
- Product and inventory management
- Order processing and status tracking
- User management and sales reports

---

## 🧑‍💻 Tech Stack

| Layer         | Technology             |
|---------------|------------------------|
| Frontend      | React.js, Tailwind CSS |
| Backend       | Node.js, Express.js    |
| Database      | MongoDB                |
| Authentication| JWT or Firebase Auth   |
| Payments      | Stripe / PayHere / PayPal |
| Hosting       | Vercel (Frontend), Render/Railway (Backend) |

---

## ⚙️ Installation Guide

### 🔧 Prerequisites

- Node.js (v18+)
- MongoDB (local or cloud)
- Git
- NPM or Yarn
- Stripe / PayHere / PayPal test credentials (optional for development)

### 📦 Clone the Repository

```bash
git clone https://github.com/your-username/olly-online-clothing-shop.git
cd olly-online-clothing-shop
```

### 📁 Project Structure
```bash
olly-online-clothing-shop/
├── client/          # React Frontend
├── server/          # Node + Express Backend
├── README.md
```

### 🖥️ Frontend Setup (React + Tailwind CSS)
```bash
cd client
npm install
# or
yarn install
npm run dev
```
###🧪 Backend Setup (Node.js + Express)
```bash
cd ../server
npm install
# Setup environment variables
cp .env.example .env
# Configure: DB_URI, JWT_SECRET, PAYMENT_KEYS, etc.
npm run dev
```
🔐 Environment Variables

Create .env in /server with:
```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
FRONTEND_URL=http://localhost:5173
```
- use MongoDB compass for Database in localhost
(Optional) For frontend: create .env in /client if using environment-specific configs.

###👥 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

- Create your branch (git checkout -b feature/feature-name)
- Commit your changes (git commit -m 'Add some feature')
- Push to the branch (git push origin feature/feature-name)
- Open a Pull Request

