# 🐾 PawMart Viva Prep — Part 1 (Weeks 1 to 4)

> **How to use:** Every day has 4 things:
> - 📖 **What it is** (simple explanation)
> - 🖥️ **Show it in the app** (open this page)
> - 💻 **The code** (this file, this snippet)
> - 🗣️ **Say this in the viva** (copy-paste ready answer)

---

## 📅 WEEK 1 — Orientation, Setup & JavaScript Basics

### Jan 12 — Company Orientation

🗣️ **Say this:**
> "On the first day I attended orientation where I learned about the company's culture and ongoing projects. I met my mentor and we discussed my current skills in HTML, CSS and JavaScript. Together we set a goal to build a full pet e-commerce website called PawMart using React on the frontend and Node.js with PostgreSQL on the backend."

---

### Jan 13 — Setting Up the Development Environment

📖 **What it is — think of it like setting up a kitchen before cooking:**
- **Node.js** = the engine that lets JavaScript run on your computer (not just in the browser)
- **npm** = comes with Node.js — it's like an app store for code packages
- **Git** = saves every version of your code — like "Save Checkpoint" in a game
- **VS Code** = the text editor where you write code

🗣️ **Say this:**
> "I installed Node.js which is the JavaScript runtime we need to use npm and run our backend server. I installed Git for version control so every code change is tracked and can be undone. VS Code was our code editor with extensions like ESLint to catch errors while typing."

---

### Jan 14 — HTML5 & CSS3 Review

📖 **HTML5 Semantic Elements — instead of just `<div>` everywhere, you use meaningful tags:**
```html
<header>  → top of the page (logo, navbar)
<nav>     → navigation links
<main>    → the main content
<section> → a grouped part of the page
<footer>  → bottom of the page
```

📖 **Flexbox — lines things up in a row (or column):**
```css
.navbar {
  display: flex;
  justify-content: space-between; /* left side and right side */
  align-items: center;            /* vertically centered */
}
```

📖 **CSS Grid — makes a grid like a spreadsheet:**
```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 equal columns */
  gap: 1rem;
}
```

🖥️ **Show in app:** Open `/products` → the product cards are in a Grid layout. The Navbar uses Flexbox.

🗣️ **Say this:**
> "HTML5 semantic elements like `nav`, `main`, and `footer` make the page structure meaningful and accessible. Flexbox is for one-directional layout — I used it for the Navbar to push the logo left and links right. Grid is for two-directional layout — I used it for the product card grid on the Products page, which changes from 1 column on mobile to 4 columns on desktop."

---

### Jan 15 — Project Goals Discussion

🗣️ **Say this:**
> "We planned PawMart as a full-stack pet e-commerce platform. The features we needed were: product browsing with filters, user registration and login, a shopping cart, an order system, a user dashboard for viewing orders and favorites, and an admin panel for managing the whole store. The tech stack is React plus Vite for the frontend, Node.js and Express for the backend API, and PostgreSQL for the database."

---

### Jan 16 — ES6 Features (Modern JavaScript)

📖 **`let` and `const` — think of them as different types of boxes:**
```javascript
const name = "PawMart";  // 🔒 Locked box — value never changes
let count = 0;           // 📦 Normal box — value can change later
```

📖 **Arrow Functions — a shorter way to write functions:**
```javascript
// Old way
function greet(name) { return "Hello " + name; }

// Arrow function (same thing, shorter)
const greet = (name) => "Hello " + name;

// Used EVERYWHERE in the project, like in Cart.jsx:
const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
```

📖 **Template Literals — stick variables inside a string with backticks:**
```javascript
const name = "Buddy";
// Old way:  "Welcome " + name + "!"
// New way:
console.log(`Welcome ${name}!`); // → "Welcome Buddy!"

// Used in Login.jsx:
toast.success(`Welcome back, ${res.data.user.name.split(' ')[0]}!`);
```

📖 **Array Methods — the most useful ones:**
```javascript
const products = [{ name: "Dog Food", price: 450 }, { name: "Cat Toy", price: 200 }];

// .map() → transform each item (used to render product cards)
products.map(p => <ProductCard product={p} />)

// .filter() → keep only matching items
products.filter(p => p.price > 300) // → only Dog Food

// .find() → get first match
cart.find(item => item.id === product.id)

// .reduce() → combine into one value (used for cart total!)
cart.reduce((total, item) => total + item.price * item.quantity, 0)
```

📖 **async/await — waiting for slow things (like API calls) without freezing the app:**
```javascript
// Without async/await (messy .then chains)
api.get('/products').then(res => setProducts(res.data)).catch(err => console.error(err));

// With async/await (reads like normal code, used throughout app)
const fetchProducts = async () => {
  const res = await api.get('/products'); // wait here until we get data
  setProducts(res.data);
};
```

🖥️ **Show in app:** The entire app uses these. Open any file in `src/pages/` to see arrow functions, template literals, and async/await everywhere.

🗣️ **Say this:**
> "ES6 features are the foundation of all modern React code. I use `const` for everything that doesn't change, arrow functions for all event handlers and callbacks, template literals for dynamic strings like toast messages, `.map()` to render lists of products, `.filter()` for filtering data, `.reduce()` to calculate the cart total, and `async/await` for all API calls throughout the project."

---

### Jan 17 — Practice & Presentation

🗣️ **Say this:**
> "I practised all the ES6 concepts through exercises and then presented my weekly progress to my mentor. The feedback I received was to use `const` consistently and to write cleaner async code using try/catch blocks — which I then applied throughout the entire project."

---

## 📅 WEEK 2 — React Basics

### Jan 19 — React & Vite Docs

📖 **What is React? — think of it like LEGO:**
In normal HTML you have one big page. React lets you break the UI into small reusable **components** — like LEGO bricks. You snap them together to build the full app. When data changes, React automatically updates only the parts that need to change — you don't manually touch the HTML.

📖 **What is Vite?**
Vite is the tool that runs your React project in development. It's super fast — changes appear in the browser instantly when you save a file. Old versions of React used Create React App (CRA) which was much slower.

📖 **What is Tailwind CSS?**
Instead of writing a separate CSS file, you add short class names directly on your HTML/JSX elements. Tailwind is a huge collection of these short classes.
```jsx
// Traditional CSS file approach
<button class="submit-btn">Click</button>
/* submit-btn { background: blue; padding: 12px; border-radius: 8px; } */

// Tailwind approach — styling right in the JSX
<button className="bg-blue-500 p-3 rounded-lg text-white font-bold">Click</button>
```

🗣️ **Say this:**
> "React is a JavaScript library for building UIs using reusable components. Vite was chosen as the build tool because it starts up almost instantly and hot-reloads changes without a full page refresh. Tailwind CSS was chosen because it lets me style components directly in JSX without maintaining separate CSS files, which speeds up development."

---

### Jan 20 — Project Setup + Navbar Component

📖 **How we created the project:**
```bash
npm create vite@latest client -- --template react
cd client
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev    # starts the app at http://localhost:5173
```

🖥️ **Show in app:** The Navbar is visible on top of every page. It has the PawMart logo, Animals/Categories dropdowns, a cart icon with a badge showing item count, and the user's avatar when logged in.

💻 **File: `src/components/Navbar.jsx`** — Key parts:
```jsx
import { Link } from 'react-router-dom';     // for navigation without reload
import { useState } from 'react';             // for mobile menu open/close
import useStore from '../store/useStore';     // to get cart count and user

export default function Navbar() {
  const { user, cart, logout } = useStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Count all items in cart (quantity matters, not just number of products)
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between h-16 items-center px-6">
        <Link to="/">PawMart</Link>          {/* Logo → goes home */}
        <Link to="/cart" className="relative">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
```

🗣️ **Say this:**
> "The Navbar is a reusable component that renders on every page. It uses `Link` from React Router to navigate without page reloads. The cart badge dynamically shows the total item count by reading from the Zustand global store — so when you add a product anywhere in the app, the badge instantly updates."

---

### Jan 21 — JSX Syntax + Static ProductCard

📖 **What is JSX? — HTML inside JavaScript:**
JSX is a special syntax that looks like HTML but lives inside your JavaScript/React files. React compiles it into actual JavaScript behind the scenes.

```jsx
// This LOOKS like HTML but it's JSX inside a .jsx file
const card = (
  <div className="bg-white p-4 rounded-lg shadow">
    <h3>Dog Food</h3>
    <p>Rs 450</p>
  </div>
);
```

📖 **JSX rules to remember:**
| HTML | JSX |
|---|---|
| `class="..."` | `className="..."` |
| `for="..."` | `htmlFor="..."` |
| `<br>` | `<br />` (must close!) |
| Expressions | `{2 + 2}` or `{userName}` |
| Comments | `{/* like this */}` |

🗣️ **Say this:**
> "JSX is a syntax extension that lets us write HTML-like code inside JavaScript. It's not real HTML — React compiles it to JavaScript. The main difference from HTML is that we use `className` instead of `class`, all tags must be self-closed, and we can embed any JavaScript expression inside curly braces `{}`."

---

### Jan 22 — Props: Making Components Dynamic

📖 **What are Props? — think of a component like a function, props are its arguments:**

Imagine you have a pizza shop. Instead of baking a "Margherita Component" and a "Pepperoni Component" separately, you bake one "Pizza Component" and pass the toppings as props!

```jsx
// Parent gives data to child via props
<ProductCard product={{ name: "Dog Food", price: 450, stock: 10 }} />
<ProductCard product={{ name: "Cat Toy", price: 200, stock: 0 }} />

// Child receives and uses the props
export default function ProductCard({ product }) {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>Rs {product.price}</p>
      <button disabled={product.stock <= 0}>
        {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
}
```

🖥️ **Show in app:** Open `/` (home page). The Best Sellers section has 4 different cards, but they all use the SAME `ProductCard` component — just different props.

💻 **File: `src/pages/Landing.jsx`** — how we use ProductCard with props:
```jsx
// .map() loops over the array and renders one ProductCard per product
{bestSelling.slice(0, 4).map((product, i) => (
  <ProductCard key={i} product={product} />
))}
```

💻 **File: `src/components/ProductCard.jsx`** — receiving props:
```jsx
export default function ProductCard({ product }) {
  const isOutOfStock = parseInt(product.stock) <= 0;
  const isBestSeller = (parseInt(product.sold) || 0) > 300;

  return (
    <div className="bg-white rounded-lg border shadow-md">
      <img src={product.image_url} alt={product.name}
           className="w-full h-56 object-cover" />
      <div className="p-4">
        {isBestSeller && <span className="text-green-600 text-xs font-bold">Best Seller</span>}
        <h3 className="font-bold text-lg">{product.name}</h3>
        <p className="text-green-600 font-black">Rs {parseFloat(product.price).toFixed(2)}</p>
        <button disabled={isOutOfStock}>
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
```

🗣️ **Say this:**
> "Props are how React components receive data from their parent. Instead of making a separate card for each product, I made one `ProductCard` component and pass a different `product` object as props each time. This makes the component fully reusable. Props are read-only — the child component cannot modify them."

---

### Jan 23 — useState Hook

📖 **What is useState? — it's memory for a component:**

Imagine a light switch. It's either ON or OFF. When you flip it, the room (component) responds immediately. That's exactly what `useState` does — it stores a value, and when that value changes, the component automatically re-renders.

```jsx
import { useState } from 'react';

// Syntax: const [theValue, theSetterFunction] = useState(startingValue)
const [count, setCount] = useState(0);
const [isOpen, setIsOpen] = useState(false);
const [email, setEmail] = useState('');
```

🖥️ **Show in app — useState is used everywhere:**

1. **Mobile menu toggle** (`Navbar.jsx`) — open and close the hamburger menu
```jsx
const [mobileOpen, setMobileOpen] = useState(false);
<button onClick={() => setMobileOpen(!mobileOpen)}>Menu</button>
{mobileOpen && <div className="mobile-menu">...</div>}
```

2. **Login form** (`Login.jsx`) — track what user types
```jsx
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
<input value={email} onChange={e => setEmail(e.target.value)} />
```

3. **Quantity selector** (`ProductDetail.jsx`) — + and - buttons
```jsx
const [quantity, setQuantity] = useState(1);
<button onClick={() => setQuantity(quantity - 1)}>-</button>
<span>{quantity}</span>
<button onClick={() => setQuantity(quantity + 1)}>+</button>
```

4. **Dashboard tabs** (`Dashboard.jsx`) — which tab is active
```jsx
const [activeTab, setActiveTab] = useState('orders');
<button onClick={() => setActiveTab('favorites')}>Favorites</button>
{activeTab === 'favorites' && <FavoritesTab />}
```

🗣️ **Say this:**
> "`useState` is the most used React hook in the project. It gives a component memory. I call `useState(initialValue)` which returns the current value and a setter function. Calling the setter triggers a re-render with the new value. I use it for form inputs in Login and Signup, for the mobile menu toggle in Navbar, for the quantity picker in Product Detail, and to control which tab is visible in the Dashboard."

---

### Jan 24 — Combining Everything + Git Commit Messages

📖 **Good Git commit messages (convention):**
```bash
git commit -m "feat: add ProductCard with props and image"
git commit -m "fix: cart badge count now shows correctly"
git commit -m "style: make Navbar responsive for mobile"
git commit -m "refactor: extract ProductCard into separate component"
```
- `feat` = new feature
- `fix` = bug fix
- `style` = styling change
- `refactor` = code cleanup

🗣️ **Say this:**
> "My mentor taught me conventional commit messages — using prefixes like `feat:`, `fix:`, `style:` to make the git history readable. This is a professional practice in real teams so anyone can quickly read the history and understand what changed."

---

## 📅 WEEK 3 — Building the Landing Page

### Jan 26 — Agile Meeting + Layout Sketching

📖 **What is Agile?**
Agile is how software teams plan work. Every week (called a "sprint") starts with a meeting where you review last week and plan this week. No one codes blindly — tasks are clear before development starts.

🗣️ **Say this:**
> "We follow an agile workflow where every week begins with a meeting to review progress and plan new tasks. I sketch a rough layout of the page on paper before writing any code — this saves time because you don't redesign halfway through coding."

---

### Jan 27 — Hero Section

🖥️ **Show in app:** Go to `/` — the big "Your Pet Deserves the Best" heading with the two buttons and the pet photos on the right.

💻 **File: `src/pages/Landing.jsx`**
```jsx
<section className="max-w-[1400px] mx-auto px-4 pt-12 pb-16">
  <div className="flex flex-col lg:flex-row items-center gap-12">

    {/* Left side: text and buttons */}
    <div className="flex-1 text-center lg:text-left">
      <h1 className="text-5xl lg:text-[72px] font-black text-[#2d2217]">
        Your Pet<br/>Deserves the Best
      </h1>
      <div className="flex gap-4 mt-8">
        <Link to="/products" className="bg-[#bf6f3a] text-white px-8 py-4 rounded-full font-extrabold">
          Shop Now
        </Link>
        {/* Only show "Create Account" if user is NOT logged in */}
        {!user && (
          <Link to="/signup" className="bg-[#2d2217] text-white px-8 py-4 rounded-full font-extrabold">
            Create Account
          </Link>
        )}
      </div>
    </div>

    {/* Right side: pet images */}
    <div className="flex-1">
      <img src="https://images.unsplash.com/..." alt="Happy cat"
           className="w-[85%] rounded-[40px] border-8 border-white shadow-2xl" />
    </div>

  </div>
</section>
```

🗣️ **Say this:**
> "The Hero section uses Tailwind's responsive system — `flex-col` stacks things vertically on mobile, `lg:flex-row` puts them side-by-side on desktop. The 'Create Account' button uses conditional rendering — `{!user && <Link>}` — it only appears when no user is logged in. This is because a logged-in user doesn't need to create an account again."

---

### Jan 28 — Lucide React Icons

📖 **What are icons? — Lucide React gives you icons as React components:**
```bash
npm install lucide-react
```
```jsx
import { Cat, Dog, ShoppingCart, Heart, Menu } from 'lucide-react';

// Use them like regular HTML elements
<ShoppingCart size={22} />                // small cart icon
<Dog size={36} className="text-orange-500" />  // bigger orange dog
```

🖥️ **Show in app:** Home page (`/`) → the round circular buttons row (Cat, Dog, Fish, Rabbit, Bird). Also the cart icon and hamburger menu in the Navbar.

💻 **File: `src/pages/Landing.jsx`**
```jsx
import { Cat, Dog, Fish, Bird, Rabbit } from 'lucide-react';

// Store each icon component in an array
const PET_TYPES = [
  { name: 'Cat',    icon: Cat },
  { name: 'Dog',    icon: Dog },
  { name: 'Fish',   icon: Fish },
  { name: 'Rabbit', icon: Rabbit },
  { name: 'Bird',   icon: Bird },
];

// Loop through and render each as a clickable link
{PET_TYPES.map((type, i) => (
  <Link key={i} to={`/products?pet_type=${type.name}`}
        className="flex flex-col items-center gap-3 group">
    <div className="w-20 h-20 rounded-full bg-[#fcf8f0] group-hover:bg-[#f3ead8]
                    flex items-center justify-center transition-colors">
      {/* type.icon IS the component (Cat, Dog, etc.) — we render it dynamically */}
      <type.icon size={36} className="text-[#bf6f3a] group-hover:scale-110 transition-transform" />
    </div>
    <span className="font-bold text-sm">{type.name}</span>
  </Link>
))}
```

🗣️ **Say this:**
> "Lucide React provides SVG icons as React components. Instead of image files, icons are rendered as scalable vectors — they look sharp at any size. I store the icon references in an array with the pet names, and use `.map()` to render all five dynamically. The Tailwind `group` and `group-hover:` classes apply hover effects on the parent that animate the child icon."

---

### Jan 29 — Best Sellers & New Arrivals Sections

📖 **This is where `useState` holds the product data and the grid shows it:**

🖥️ **Show in app:** Home page → scroll down. Two sections: "Best Selling" (4 cards) and "New Arrivals" (4 cards). These are real products from the database.

💻 **File: `src/pages/Landing.jsx`**
```jsx
// useState starts as empty arrays — no products yet
const [bestSelling, setBestSelling] = useState([]);
const [newArrivals, setNewArrivals] = useState([]);

// The grid — only shows if we have data (not empty array)
{bestSelling.length > 0 && (
  <section className="mb-24">
    <h2 className="text-3xl font-black text-center uppercase">Best Selling</h2>
    {/* Responsive grid: 1 col mobile → 2 col tablet → 4 col desktop */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {bestSelling.slice(0, 4).map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </div>
  </section>
)}
```

🗣️ **Say this:**
> "The grid uses conditional rendering — `{bestSelling.length > 0 && ...}`. If the array is still empty (data hasn't loaded yet), the section doesn't render at all. Once the API returns products and `setBestSelling(data)` is called, React re-renders and the grid appears. The grid itself is responsive using Tailwind's `md:` and `lg:` prefixes."

---

### Jan 30 — Footer

🖥️ **Show in app:** Scroll to the bottom of the home page or products page.

💻 **File: `src/components/Footer.jsx`**
```jsx
export default function Footer() {
  return (
    <footer className="bg-[#2d2217] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-black mb-3">PawMart</h3>
          <p className="text-[#a89080] text-sm">Everything your pet needs.</p>
        </div>
        <div>
          <h4 className="font-bold mb-4 uppercase text-xs tracking-widest">Shop</h4>
          <ul className="space-y-2 text-sm text-[#a89080]">
            <li><a href="/products?category=Food">Food</a></li>
            <li><a href="/products?category=Toys">Toys</a></li>
          </ul>
        </div>
        {/* more columns... */}
      </div>
    </footer>
  );
}
```

---

### Jan 31 — Responsiveness

📖 **Tailwind's responsive system — mobile first:**
```
(default) = mobile phones
sm:  = tablets in portrait (640px+)
md:  = tablets in landscape (768px+)
lg:  = laptops (1024px+)
xl:  = desktops (1280px+)
```
```jsx
// 1 column on mobile, 2 on tablet, 4 on desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">

// Text hidden on mobile, visible from md onwards
<div className="hidden md:flex">
```

🗣️ **Say this:**
> "Tailwind follows a mobile-first approach — the default style is for the smallest screen, and breakpoint prefixes like `md:` and `lg:` override it for larger screens. I tested by resizing the browser. For example the product grid is `grid-cols-1` on phone, `grid-cols-2` on tablet, and `grid-cols-4` on desktop."

---

## 📅 WEEK 4 — useEffect, React Router & Axios

### Feb 3 — Studying Axios

📖 **What is Axios? — it's the mailman for your app:**
Your React frontend needs to get data from the backend server. Axios is the tool that sends that request and brings back the response.

```bash
npm install axios
```

```javascript
// Without Axios (using built-in fetch)
const res = await fetch('http://localhost:5000/api/products');
const data = await res.json(); // have to manually convert

// With Axios (cleaner, auto-converts JSON)
const res = await axios.get('http://localhost:5000/api/products');
const data = res.data; // data is already ready
```

💻 **File: `src/lib/api.js`** — we made a custom Axios instance:
```javascript
import axios from 'axios';
import useStore from '../store/useStore';

// Create an Axios instance with the base URL pre-configured
const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Interceptor: runs before EVERY request automatically
// This attaches the user's login token to every API call
api.interceptors.request.use((config) => {
  const token = useStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

🗣️ **Say this:**
> "Instead of writing the full URL every time and manually adding auth headers, I created a custom Axios instance in `src/lib/api.js`. It has the base URL pre-set, so I just write `api.get('/products')` instead of the full URL. More importantly, it has an interceptor — a piece of code that automatically runs before every single request and attaches the user's JWT token. So I never have to manually add auth headers anywhere."

---

### Feb 4 — useEffect Deep Dive

📖 **What is useEffect? — code that runs AFTER the page loads:**
Think of it like a "do this once the page is ready" instruction. You can't fetch data before the page exists, so useEffect waits until the component is on screen, then runs your code.

```jsx
import { useEffect } from 'react';

// Pattern 1: Run ONCE when page loads (empty array)
useEffect(() => {
  fetchProducts(); // load products on page open
}, []); // ← empty [] means "only run once"

// Pattern 2: Run when something changes
useEffect(() => {
  fetchProduct(id); // re-fetch if the product ID changes
}, [id]); // ← runs again whenever 'id' changes
```

🖥️ **Show in app:** Open `/` — the Best Sellers load automatically. Open `/products/1` then navigate to `/products/2` — the product data updates without a page reload.

💻 **File: `src/pages/Landing.jsx`**
```jsx
// Runs once when the home page loads — fetches both product sections
useEffect(() => {
  api.get('/products/bestsellers').then(res => setBestSelling(res.data));
  api.get('/products/new').then(res => setNewArrivals(res.data));
}, []); // empty [] = run once on mount
```

💻 **File: `src/pages/ProductDetail.jsx`**
```jsx
// Runs every time `:id` in the URL changes
useEffect(() => {
  const fetchProduct = async () => {
    setLoading(true);
    const res = await api.get(`/products/${id}`); // e.g. /products/5
    setProduct(res.data);
    setLoading(false);
  };
  fetchProduct();
}, [id]); // re-runs if user clicks a different product
```

🗣️ **Say this:**
> "`useEffect` runs code after the component renders. The dependency array at the end controls when it re-runs. An empty `[]` means 'run once when the page loads' — perfect for initial data fetching on the home page. Passing `[id]` means 'run again when `id` changes' — so when you navigate from one product page to another, `useEffect` automatically fetches the new product's data."

---

### Feb 5 — React Router DOM

📖 **What is React Router? — it's GPS navigation for your app:**
React is a Single Page Application (SPA) — there's actually only ONE HTML file. React Router fakes different "pages" by swapping out components based on the URL. No real page reload happens.

📖 **Why NOT use regular `<a>` tags?**
```jsx
// ❌ Bad — causes a FULL page reload, app restarts, all state is gone
<a href="/products">Shop</a>

// ✅ Good — swaps the component instantly, state is kept
<Link to="/products">Shop</Link>
```

💻 **File: `src/App.jsx`** — all routes defined in one place:
```jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>       {/* wraps the entire app */}
      <Routes>
        <Route path="/"             element={<Landing />} />
        <Route path="/login"        element={<Login />} />
        <Route path="/signup"       element={<Signup />} />
        <Route path="/products"     element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />  {/* :id is dynamic! */}
        <Route path="/cart"         element={<Cart />} />
        <Route path="/dashboard"    element={<Dashboard />} />
        <Route path="/admin"        element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
```

📖 **`/products/:id` — dynamic route:**
The `:id` is a wildcard. When you go to `/products/5`, React Router extracts `5` as the `id` parameter. When you go to `/products/42`, it extracts `42`. Same component, different data.

🗣️ **Say this:**
> "React Router DOM makes our app feel like a multi-page website but it's actually one page. I define all routes in `App.jsx` using `<Route path="..." element={...} />`. When you click a `<Link>`, React Router swaps the component without a page reload. The `/products/:id` route is dynamic — the `:id` part can be any number, and React Router gives it to the component via `useParams()`."

---

### Feb 7 — Products Page with Filters & useSearchParams

🖥️ **Show in app:** Go to `/products` → click "Dog" in the sidebar. Notice the URL changes to `/products?pet_type=Dog`. This is `useSearchParams` in action.

📖 **What is `useSearchParams`? — it syncs filters WITH the URL:**
`useSearchParams` is like `useState` but for the URL query string. When you change a filter, it updates the URL. This means filter state is shareable and bookmarkable.

💻 **File: `src/pages/Products.jsx`**
```jsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Read filter values from the URL
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';  // reads ?category=Food
  const petTypeParam  = searchParams.get('pet_type') || '';  // reads ?pet_type=Dog

  // Re-fetches products whenever the URL filter changes
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (categoryParam) params.append('category', categoryParam);
    if (petTypeParam)  params.append('pet_type', petTypeParam);
    api.get(`/products?${params.toString()}`).then(res => {
      setProducts(res.data);
      setLoading(false);
    });
  }, [categoryParam, petTypeParam]); // watch URL params

  // When user clicks a filter radio button — update the URL
  const handleFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) newParams.set(key, value); else newParams.delete(key);
    setSearchParams(newParams); // this updates the URL bar!
  };

  // Pagination: show 12 products per page
  const PAGE_SIZE = 12;
  const [page, setPage] = useState(1);
  const paginated = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <aside>
        {['Dog', 'Cat', 'Bird', 'Fish'].map(type => (
          <label key={type}>
            <input type="radio" checked={petTypeParam === type}
                   onChange={e => handleFilter('pet_type', e.target.value)} value={type} />
            {type}
          </label>
        ))}
      </aside>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {paginated.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
```

🗣️ **Say this:**
> "The Products page has filters that are stored in the URL — not just in component state. When you click 'Dog', `setSearchParams` updates the URL to `?pet_type=Dog`. The `useEffect` watches for this URL change and automatically fetches filtered products from the Express API. This makes filters bookmarkable — you can share the URL and someone else sees the same filtered results. Pagination is done by slicing the full array into chunks of 12."

---
# 🐾 PawMart Viva Prep — Part 2 (Weeks 5 to 8)

---

## 📅 WEEK 5 — Product Detail Page, Dynamic Routing & Toast Notifications

### Nov 30 & Dec 1 — Research: Dynamic Routing & Toast

📖 **What is Dynamic Routing? — same page, different data:**
Think of a YouTube video page. The URL is `youtube.com/watch?v=abc123`. If you change the ID to `xyz789` in the URL, you get a completely different video — but the SAME page layout. That's dynamic routing.

In PawMart:
```
/products/1   → shows Dog Food product
/products/42  → shows Cat Toy product
/products/99  → shows Bird Cage product
```
All three use the SAME `ProductDetail.jsx` — only the ID changes.

---

### Dec 1-2 — Building the Product Detail Page

🖥️ **Show in app:** Click on ANY product card anywhere in the app → you land on `/products/5` (or whatever ID). You see: image, name, category badge, price, stock status, quantity picker, Add to Cart and Favorite buttons.

💻 **File: `src/pages/ProductDetail.jsx`**
```jsx
import { useParams } from 'react-router-dom'; // extracts :id from URL

export default function ProductDetail() {
  // useParams reads the :id from the URL
  // If URL is /products/5, then id = "5"
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Fetch THIS specific product from the backend
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const res = await api.get(`/products/${id}`); // e.g. GET /api/products/5
      setProduct(res.data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]); // re-runs if user navigates to a different product

  // Show spinner while loading
  if (loading) return <div className="flex justify-center py-32"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <img src={getImageUrl(product.image_url)} alt={product.name}
               className="object-cover w-full h-full rounded-[1.5rem] hover:scale-105 transition-transform" />
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2">
          <span className="bg-secondary px-3 py-1 rounded-full text-xs font-bold uppercase">
            {product.category}
          </span>
          <h1 className="text-3xl font-extrabold mt-4">{product.name}</h1>
          <p className="text-2xl font-black text-primary mt-2">
            Rs {parseFloat(product.price).toFixed(2)}
          </p>
          {/* Show green "In Stock" or red "Out of Stock" */}
          <p className="mt-2">
            {parseInt(product.stock) > 0
              ? <span className="text-green-600">✓ In Stock</span>
              : <span className="text-red-500">✗ Out of Stock</span>}
          </p>
          {/* Quantity Picker */}
          <div className="flex items-center gap-4 mt-6">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          {/* Add to Cart + Favorite buttons */}
          <div className="flex gap-3 mt-6">
            <button onClick={handleAddToCartClick} className="flex-[2] bg-primary text-white py-3 rounded-xl font-bold">
              Add to Cart
            </button>
            <button onClick={handleFavorite}
              className={`flex-1 py-3 rounded-xl border ${isLiked ? 'bg-red-50 text-red-500' : ''}`}>
              <Heart fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

🗣️ **Say this:**
> "`useParams()` reads the dynamic part of the URL. If the URL is `/products/5`, it gives me `id = '5'`. I then use this ID in a `useEffect` to call `api.get('/products/5')` and get that specific product's data from the database. The same component works for EVERY product — React Router just extracts a different ID each time."

---

### Dec 3 — React Hot Toast Notifications

📖 **What is React Hot Toast? — it's popup notifications for your app:**
After doing something (adding to cart, logging in, getting an error), the user should see a quick message. Toast notifications are small popups that appear then disappear automatically.

```bash
npm install react-hot-toast
```

📖 **Setup once in App.jsx:**
```jsx
import { Toaster } from 'react-hot-toast';

// <Toaster /> placed once — shows all toasts from anywhere in the app
function App() {
  return (
    <Router>
      <AppContent />
      <Toaster position="bottom-right" />  {/* toasts appear bottom-right */}
    </Router>
  );
}
```

📖 **Using toast anywhere in the app:**
```jsx
import toast from 'react-hot-toast';

toast.success('Added to cart! 🎉');              // green
toast.error('Please login first');               // red
toast('Removed from favorites', { icon: '💔' }); // custom icon
```

🖥️ **Show in app:**
- Add a product to cart → green success toast appears bottom-right
- Try to favorite without logging in → red error toast
- Log out → "You have been logged out" toast

💻 **File: `src/pages/ProductDetail.jsx`**
```jsx
const handleFavorite = async () => {
  if (!user) {
    toast.error('Please login to save favorites'); // red popup
    return;
  }
  try {
    if (isLiked) {
      await api.delete(`/users/${user.id}/favourites/${product.id}`);
      removeFavorite(product.id);
      toast('Removed from favorites', { icon: '💔' }); // disappears after 3s
    } else {
      await api.post(`/users/${user.id}/favourites`, { product_id: product.id });
      addFavorite(product);
      toast.success('Added to favorites! ❤️'); // green popup
    }
  } catch (err) {
    toast.error('Something went wrong'); // shows if API call fails
  }
};
```

🗣️ **Say this:**
> "React Hot Toast gives users instant visual feedback. I set it up once in `App.jsx` using `<Toaster />`, and then from any component I can call `toast.success()`, `toast.error()`, or `toast()`. It's really important for UX — otherwise users don't know if their action worked. For example when you add to cart, you get a green popup, and if you're not logged in, you get a red one."

---

### Dec 4-5 — Image Polish & Hover States

📖 **`object-cover` — fills the box without stretching:**
```jsx
// The image fills its container exactly, gets cropped if needed — never stretched/squished
<img src={product.image_url} alt={product.name}
     className="w-full h-full object-cover" />

// hover scale effect — card zooms in slightly on hover
<img className="object-cover w-full h-full
                group-hover:scale-105 transition-transform duration-500" />
```

---

## 📅 WEEK 6 — Zustand Global State, Auth & Shopping Cart

### Feb 17 — Studying Zustand

📖 **The problem without Zustand — imagine passing a note through 10 people:**
If you have cart data in your `App` component and you need it in a `ProductCard` that's 5 levels deep, you have to pass it as props through EVERY component in between — even components that don't care about it. This is called "prop drilling" and it's a nightmare.

Zustand solves this: any component can directly reach into the global store and get or update data. No middlemen.

📖 **What is Zustand? — a shared box anyone can access:**
Think of Zustand as a shared whiteboard in an office. Any team member (component) can read what's on it or write to it directly — without needing someone to relay the message.

```bash
npm install zustand
```

---

### Feb 18 — Building the Zustand Store

💻 **File: `src/store/useStore.js`** — the entire global store:
```javascript
import { create } from 'zustand';

const useStore = create((set) => ({
  // ---- DATA (the whiteboard contents) ----
  // Load user & token from localStorage so they survive page refresh
  user:      JSON.parse(localStorage.getItem('user') || 'null'),
  token:     localStorage.getItem('token') || null,
  cart:      [],       // list of cart items { ...product, quantity }
  favorites: [],       // list of favorited products

  // ---- ACTIONS (functions that update the whiteboard) ----

  // Save user + token after login (also saves to localStorage for persistence)
  setAuth: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({ user, token }); // tell Zustand to update
  },

  // Wipe everything on logout
  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null, cart: [], favorites: [] });
  },

  // Smart add: if product already in cart → increase quantity. If new → add it.
  addToCart: (product, quantity = 1) => set((state) => {
    const existing = state.cart.find(item => item.id === product.id);
    if (existing) {
      return {
        cart: state.cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity }] };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item.id !== productId)
  })),

  clearCart: () => set({ cart: [] }),

  setFavorites:   (favorites) => set({ favorites }),
  addFavorite:    (product)   => set((state) => ({ favorites: [...state.favorites, product] })),
  removeFavorite: (productId) => set((state) => ({
    favorites: state.favorites.filter(p => p.id !== productId)
  })),
}));

export default useStore;
```

📖 **How any component uses the store:**
```jsx
// In Navbar.jsx — reads cart count
const { cart, user, logout } = useStore();

// In ProductCard.jsx — adds to cart
const { addToCart, favorites, addFavorite } = useStore();

// In Login.jsx — saves user after login
const setAuth = useStore((state) => state.setAuth);
```

🗣️ **Say this:**
> "Zustand is a global state manager. I store the `user`, `token`, `cart`, and `favorites` in one central store in `src/store/useStore.js`. Any component can access this with one line: `const { cart } = useStore()`. The `addToCart` action is smart — if the product already exists in the cart, it just increases the quantity instead of adding a duplicate. `user` and `token` are also saved to localStorage so they persist when you refresh the page."

---

### Feb 19 — Login Page

📖 **JWT — think of it like a wristband at an event:**
When you enter an event, the staff gives you a wristband. You show the wristband at the rides and activities — they trust it without asking your name again. A JWT (JSON Web Token) works the same way. You log in once, get a token, and show that token on every subsequent request.

🖥️ **Show in app:** Go to `/login`. Type in email and password. On success you're redirected home (or to `/admin` if you're an admin).

💻 **File: `src/pages/Login.jsx`**
```jsx
export default function Login() {
  // These states track what the user types into the form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const setAuth = useStore((state) => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();  // stops browser from doing a full page refresh
    setLoading(true);    // show "Signing in..." on the button

    try {
      // Send email + password to the backend server
      const res = await api.post('/auth/login', { email, password });

      // Backend sends back: { user: {...}, token: "eyJhbGci..." }
      // We save both globally in Zustand + localStorage
      setAuth(res.data.user, res.data.token);

      toast.success(`Welcome back, ${res.data.user.name.split(' ')[0]}!`);

      // Admin users go to the admin panel, regular users go home
      if (res.data.user.role === 'admin') navigate('/admin');
      else navigate('/');

    } catch (err) {
      // If wrong password, show the backend's error message
      toast.error(err.response?.data?.error || 'Login failed.');
    } finally {
      setLoading(false); // always hide the spinner at the end
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email}    onChange={e => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      {/* Button disabled while loading — prevents double-clicking */}
      <button type="submit" disabled={loading}>
        {loading ? 'Signing in...' : 'Login'}
      </button>
    </form>
  );
}
```

🗣️ **Say this:**
> "The Login form is a 'controlled form' — each input field's value is tied to a state variable. On submit we POST to `/api/auth/login`. If successful, the backend returns a JWT token and user object. We store both in Zustand using `setAuth()`, which also saves them to `localStorage` so the login persists on page refresh. Admins are redirected to `/admin`, regular users to `/`."

---

### Feb 20 — Signup Page

🖥️ **Show in app:** Go to `/signup`. Fill in name, email, password. Creates a new account and logs in immediately.

💻 **File: `src/pages/Signup.jsx`**
```jsx
export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const setAuth = useStore((state) => state.setAuth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      setAuth(res.data.user, res.data.token); // log in immediately after signup
      toast.success(`Welcome to PawMart, ${name.split(' ')[0]}! 🐾`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };
  // ...form JSX same structure as Login
}
```

---

### Feb 21 — Axios Interceptor + Cart Page

📖 **Axios Interceptor — the automatic token attacher:**
Without an interceptor, every API call would need:
```javascript
// Without interceptor — have to manually repeat this EVERY TIME
const res = await api.get('/orders', {
  headers: { Authorization: `Bearer ${token}` }
});
```
With the interceptor in `api.js`:
```javascript
// With interceptor — just write this, token is auto-added
const res = await api.get('/orders');
```

💻 **File: `src/lib/api.js`** — the interceptor (add this once, works everywhere):
```javascript
api.interceptors.request.use((config) => {
  const token = useStore.getState().token; // get token from Zustand
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // attach it
  }
  return config; // send the request
});
```

🖥️ **Show Cart in app:** Click the cart icon in the Navbar → `/cart`. Shows all your added products, quantities, subtotal, 8% tax, and the total. Has Remove and Checkout buttons.

💻 **File: `src/pages/Cart.jsx`**
```jsx
export default function Cart() {
  const { cart, removeFromCart, clearCart, user } = useStore();

  // .reduce() adds up: price × quantity for each item
  const totalAmount = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    // Turn cart items into the format the backend expects
    const items = cart.map(i => ({ product_id: i.id, quantity: i.quantity, price: i.price }));
    await api.post('/orders', { items, total_amount: totalAmount * 1.08 }); // 8% tax
    clearCart();                    // empty the cart in Zustand
    toast.success("Order placed!"); // show success message
    navigate('/dashboard');         // redirect to see the new order
  };

  // If cart is empty, show a friendly empty state
  if (cart.length === 0) {
    return (
      <div className="text-center py-32">
        <ShoppingBag size={40} />
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/products')}>Start Shopping</button>
      </div>
    );
  }

  return (
    <div className="flex gap-10">
      {/* Cart items list */}
      <div className="flex-1">
        {cart.map(item => (
          <div key={item.id} className="flex items-center p-4 border rounded-lg">
            <img src={`${SERVER_URL}${item.image_url}`} className="w-24 h-24 object-cover rounded" />
            <div className="flex-1 ml-4">
              <h3>{item.name}</h3>
              <p>Rs {parseFloat(item.price).toFixed(2)} × Qty: {item.quantity}</p>
            </div>
            <button onClick={() => removeFromCart(item.id)}><Trash2 /></button>
          </div>
        ))}
      </div>
      {/* Order Summary sidebar */}
      <div className="w-80">
        <div className="bg-card p-6 rounded-lg border sticky top-24">
          <p>Subtotal: Rs {totalAmount.toFixed(2)}</p>
          <p>Tax (8%): Rs {(totalAmount * 0.08).toFixed(2)}</p>
          <p className="font-black text-2xl">Total: Rs {(totalAmount * 1.08).toFixed(2)}</p>
          <button onClick={triggerCheckout} className="w-full bg-primary text-white py-3 rounded-xl mt-4">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
```

🗣️ **Say this:**
> "The Cart page reads all items directly from Zustand — no API call needed because cart data lives in global state. The total is calculated with `.reduce()` which multiplies price by quantity for each item and sums them all up. On checkout, we POST all cart items to `/api/orders`, which saves them to the PostgreSQL database. Then `clearCart()` empties the Zustand state and the user is redirected to the dashboard."

---

## 📅 WEEK 7 — User Dashboard & Admin Panel Start

### Feb 23-24 — Dashboard Layout + Tab Navigation

📖 **Dashboard explained — like a profile page with sections:**
The Dashboard has 3 tabs: Orders, Favorites, Profile. Clicking a tab doesn't navigate to a new page — it just changes which component is visible using `activeTab` state.

🖥️ **Show in app:** Log in → click your avatar → Dashboard. Click each tab to switch between Order History, Favorites, and Profile.

💻 **File: `src/pages/Dashboard.jsx`**
```jsx
export default function Dashboard() {
  const { user, favorites } = useStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders'); // default tab

  useEffect(() => {
    if (!user) { navigate('/login'); return; } // kick out if not logged in
    api.get('/orders').then(res => {
      setOrders(res.data);
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* User Banner */}
      <div className="bg-card rounded-2xl p-8 border mb-8 flex items-center gap-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-3xl font-bold uppercase">
          {user?.name.charAt(0)}  {/* First letter of name as avatar */}
        </div>
        <div>
          <h1>Welcome, {user?.name}</h1>
          <p>{user?.email}</p>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-4 border-b mb-8">
        <button onClick={() => setActiveTab('orders')}
          className={activeTab === 'orders' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}>
          📦 Order History
        </button>
        <button onClick={() => setActiveTab('favorites')} ...>
          ❤️ Favorites ({favorites.length})
        </button>
        <button onClick={() => setActiveTab('profile')} ...>
          👤 Profile
        </button>
      </div>

      {/* Only render the active tab's component */}
      {activeTab === 'orders'    && <OrdersTab orders={orders} setOrders={setOrders} />}
      {activeTab === 'favorites' && <FavoritesTab favorites={favorites} />}
      {activeTab === 'profile'   && <ProfileTab />}
    </div>
  );
}
```

🗣️ **Say this:**
> "The Dashboard uses `activeTab` state to control which section is visible. When you click a tab button, `setActiveTab('favorites')` is called, React re-renders, and the `&&` conditional rendering shows the `FavoritesTab` component while hiding the others. This is efficient because unused components don't get rendered at all. The Dashboard also acts as a protected route — if no user is logged in, `useEffect` immediately redirects to `/login`."

---

### Feb 25 — Orders Tab + Accessibility

💻 **File: `src/components/dashboard/OrdersTab.jsx`**
```jsx
export default function OrdersTab({ orders }) {
  if (orders.length === 0) {
    return <div className="text-center py-20">No orders yet. Start shopping!</div>;
  }
  return (
    <div className="space-y-4">
      {orders.map(order => (
        <div key={order.id} className="bg-card rounded-xl p-6 border">
          <div className="flex justify-between mb-4">
            <h3 className="font-bold">Order #{order.id}</h3>
            {/* Color-coded status badge */}
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase
              ${order.status === 'delivered' ? 'bg-green-100 text-green-600' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-500' :
                                               'bg-yellow-100 text-yellow-600'}`}>
              {order.status}
            </span>
          </div>
          <p>Total: Rs {parseFloat(order.total_amount).toFixed(2)}</p>
          <p>Date: {new Date(order.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}
```

📖 **Accessibility Basics:**
```jsx
// aria-label helps screen readers describe icon buttons
<button aria-label="Remove item from cart"><Trash2 /></button>

// All buttons and links are keyboard-focusable by default in HTML
// Use logical tab order — don't skip around with tab index
```

🗣️ **Say this:**
> "Accessibility means the app can be used by everyone, including people using screen readers or keyboard navigation. I added `aria-label` attributes to icon-only buttons so screen readers can announce them. I also ensured color contrast — text is dark enough on its background to be readable. These are things I learned on this specific day and then applied throughout the project."

---

### Feb 26 — Favorites Tab

💻 **File: `src/components/dashboard/FavoritesTab.jsx`**
```jsx
export default function FavoritesTab({ favorites }) {
  if (favorites.length === 0) {
    return <div className="text-center py-20">No favorites yet. Heart some products!</div>;
  }
  return (
    // Reuses the exact same ProductCard component used on the product pages!
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map(product => <ProductCard key={product.id} product={product} />)}
    </div>
  );
}
```

🗣️ **Say this:**
> "The Favorites tab receives the `favorites` array as a prop from `Dashboard.jsx`. The favorites data actually lives in the Zustand global store and is synced with the backend — when you heart a product anywhere in the app, it saves to the database AND updates Zustand, so the Favorites tab instantly shows it. I reused the same `ProductCard` component here too."

---

### Feb 27 — Profile Tab

💻 **File: `src/components/dashboard/ProfileTab.jsx`**
```jsx
export default function ProfileTab() {
  const { user, setAuth, token } = useStore();
  const [address, setAddress] = useState(user?.shipping_address || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Send updated address to backend
      const res = await api.put(`/users/${user.id}`, { shipping_address: address });
      // Update the Zustand user object with the new data
      setAuth(res.data, token);
      toast.success('Profile updated!');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <label>Full Name</label>
      <input value={user?.name} readOnly />    {/* Can't edit name */}
      <label>Email</label>
      <input value={user?.email} readOnly />   {/* Can't edit email */}
      <label>Shipping Address</label>
      <textarea value={address} onChange={e => setAddress(e.target.value)} rows={3} />
      <button onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  );
}
```

---

### Feb 28 — Admin Panel Start + Sidebar + Role Protection

📖 **Role-Based Protection — like a keycard system:**
In an office building, different employees have different keycards. The cleaning staff can't access the server room. In PawMart, regular users can't access the Admin Panel — we check the user's `role` property.

🖥️ **Show in app:** Log in with an admin account → you're redirected to `/admin`. You see a full sidebar with Dashboard, Users, Orders, Products, Analytics, Settings.

💻 **File: `src/pages/AdminPanel.jsx`**
```jsx
export default function AdminPanel() {
  const { user, logout } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  // 🔒 PROTECTION: If not admin, show login screen instead of dashboard
  if (!user || user.role !== 'admin') return <AdminAuth />;

  // The TABS array drives the sidebar — easy to add/remove tabs
  const TABS = [
    { id: 'dashboard', icon: Home,       label: 'Dashboard' },
    { id: 'users',     icon: Users,      label: 'Users' },
    { id: 'orders',    icon: ShoppingBag,label: 'Orders' },
    { id: 'products',  icon: Box,        label: 'Products' },
    { id: 'analytics', icon: BarChart,   label: 'Analytics' },
    { id: 'settings',  icon: Settings,   label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fc]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="h-16 flex items-center px-6 border-b font-extrabold text-xl">
          PawMart
        </div>
        <div className="flex-1 py-6 px-4 space-y-1.5">
          {/* .map() renders one button per tab — no repetition */}
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm
                ${activeTab === tab.id ? 'bg-[#3b4252] text-white' : 'text-slate-500 hover:bg-slate-50'}`}>
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t">
          <button onClick={() => { logout(); navigate('/'); }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dashboard' && <DashboardTab orders={orders} users={usersList} products={products} />}
        {activeTab === 'users'     && <UsersTab users={usersList} fetchData={fetchData} />}
        {activeTab === 'products'  && <ProductsTab products={products} fetchData={fetchData} />}
        {activeTab === 'orders'    && <OrdersTab orders={orders} fetchData={fetchData} />}
        {activeTab === 'analytics' && <AnalyticsTab orders={orders} products={products} />}
      </main>
    </div>
  );
}
```

🗣️ **Say this:**
> "The Admin Panel uses role-based protection — the very first check is `if (!user || user.role !== 'admin') return <AdminAuth />`. If this fails, the entire admin dashboard is replaced with a login screen. Regular users can never see the admin content even if they manually type `/admin` in the URL. The sidebar is dynamic — I store all tabs in a `TABS` array and use `.map()` to render the buttons, so adding a new tab is just adding one line to the array."

---

## 📅 WEEK 8 — Admin CRUD, Modals & Loading States

### Mar 3 — Products Table with Sorting

📖 **Why `Promise.all`? — doing 3 things at the same time:**
```javascript
// Sequential (slow) — waits for each to finish before starting the next
const products = await api.get('/products');   // wait 300ms
const orders   = await api.get('/orders/all'); // wait another 300ms
const users    = await api.get('/users');      // wait another 300ms
// Total: 900ms

// Parallel (fast) — all 3 start at the same time
const [prodRes, ordRes, usersRes] = await Promise.all([
  api.get('/products'),    // ↗ all 3 fire at once
  api.get('/orders/all'),  // → 
  api.get('/users')        // ↘
]);
// Total: ~300ms (just the slowest one)
```

💻 **File: `src/pages/AdminPanel.jsx`**
```javascript
const fetchData = async () => {
  setLoading(true);
  const [prodRes, ordRes, usersRes] = await Promise.all([
    api.get('/products'),
    api.get('/orders/all'),
    api.get('/users')
  ]);
  setProducts(prodRes.data);
  setOrders(ordRes.data);
  setUsersList(usersRes.data);
  setLoading(false);
};
```

🗣️ **Say this:**
> "`Promise.all` fires multiple API calls at the same time and waits for ALL of them to finish before continuing. Without it, 3 sequential calls would take 3× longer. The Admin Panel needs products, orders, and users all at once, so `Promise.all` was the right choice."

---

### Mar 4-5 — CRUD: Add, Edit, Delete Products

📖 **CRUD = the 4 basic database operations:**
| Operation | HTTP Method | What it does |
|---|---|---|
| **C**reate | `POST` | Add a new product |
| **R**ead | `GET` | Get products list |
| **U**pdate | `PUT` | Edit a product |
| **D**elete | `DELETE` | Remove a product |

🖥️ **Show in app:** `/admin` → Products tab. Click "Add Product" → modal opens with empty form. Click pencil icon → modal opens with pre-filled data. Click trash icon → confirmation dialog appears before deleting.

💻 **Delete confirmation in `src/pages/AdminPanel.jsx`:**
```jsx
const [deleteConfirm, setDeleteConfirm] = useState({ type: null, id: null });

// When admin confirms — actually sends the DELETE request
const executeDelete = async () => {
  if (deleteConfirm.type === 'product') {
    await api.delete(`/products/${deleteConfirm.id}`);
    toast.success('Product deleted');
  } else if (deleteConfirm.type === 'user') {
    await api.delete(`/users/${deleteConfirm.id}`);
    toast.success('User deleted');
  }
  setDeleteConfirm({ type: null, id: null }); // close modal
  fetchData(); // refresh the list from database
};

// Delete Modal — shown when deleteConfirm.id has a value
{deleteConfirm.id && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
    <div className="bg-white rounded-3xl p-8 max-w-sm w-full">
      <h3>Delete {deleteConfirm.type}?</h3>
      <p>This action cannot be undone.</p>
      <div className="flex gap-4">
        <button onClick={() => setDeleteConfirm({ type: null, id: null })}>Go Back</button>
        <button onClick={executeDelete} className="bg-red-500 text-white">Erase</button>
      </div>
    </div>
  </div>
)}
```

🗣️ **Say this:**
> "The Admin Panel implements full CRUD functionality. For Add and Edit, I reuse the same modal component — for Add, the form starts empty; for Edit, I pre-fill it with the existing product data. For Delete, I show a confirmation dialog before sending the request — this prevents accidental data loss. After any Create, Update, or Delete operation, `fetchData()` is called again to refresh the UI with the latest data from the database."

---

### Mar 6 — Orders + Users + Loading States

📖 **Loading states — prevent the user from clicking twice:**
```jsx
const [loading, setLoading] = useState(false);

const handleAddProduct = async () => {
  setLoading(true); // disable the button BEFORE the request
  try {
    await api.post('/products', formData);
    toast.success('Product added!');
  } finally {
    setLoading(false); // re-enable after request finishes
  }
};

// Button is disabled while loading — physically can't be clicked twice
<button disabled={loading} onClick={handleAddProduct}>
  {loading ? 'Saving...' : 'Save Product'}
</button>
```

🗣️ **Say this:**
> "Loading states are important to prevent duplicate API requests. If someone clicks 'Save' and it takes 2 seconds, they might click again. With `disabled={loading}`, the button becomes unclickable the moment the first request starts. The text changes to 'Saving...' so the user knows to wait. The button re-enables in the `finally` block — which runs whether the request succeeded or failed."

---
# 🐾 PawMart Viva Prep — Part 3 (Weeks 9 to 11 + Quick Reference)

---

## 📅 WEEK 9 — Testing, Responsiveness & Code Quality

### Mar 9 — Creating a Test Checklist + Mobile Testing Start

📖 **Why test? — because the app LOOKS good in development but might break for real users:**
When you build the app yourself, you always test the happy path — you know exactly what to do. A real user might refresh on the cart page, type nothing in a search box, or have a slow internet connection. Testing finds those problems.

📖 **What I tested:**
```
✅ Home page loads with Best Sellers and New Arrivals
✅ Category icons navigate to correct filtered products
✅ Product filters work (Pet Type + Category)
✅ Search bar returns correct results
✅ Pagination works (next page, previous page)
✅ Product Detail page shows correct product
✅ Add to Cart shows confirmation, then shows in cart
✅ Cart total calculates correctly with tax
✅ Login redirects to correct place (admin vs. user)
✅ Signup creates account and logs in immediately
✅ Dashboard shows orders, favorites, editable profile
✅ Admin only accessible with admin account
✅ Admin CRUD: add, edit, delete products all work
✅ App looks correct on mobile, tablet, and desktop
✅ Empty cart, no orders, no favorites — all show nice messages
```

---

### Mar 10 — Cross-Device Testing

📖 **What issues were found and why:**
| Problem | Cause | Example |
|---|---|---|
| Grid collapsed weirdly | `grid-cols-3` had no mobile override | Product grid showed 3 tiny columns on phone |
| Table scrolled off screen | Admin tables don't wrap on small screens | Had to scroll sideways on mobile |
| Text too large on phone | Used fixed `text-5xl` with no mobile size | Heading took up whole screen |
| Navbar too crowded | Too many items visible on small screen | Links overlapping |

🗣️ **Say this:**
> "Testing on actual small screen sizes revealed issues that aren't visible when you resize the browser on a large monitor. I used Chrome DevTools device emulator to simulate different phones and tablets. The main issues were the product grid not collapsing properly and the admin table overflowing horizontally. Both were fixed with Tailwind's responsive classes."

---

### Mar 11 — Fixing Responsive Issues

💻 **Fixed product grid in `Products.jsx`:**
```jsx
{/* Before: always shows 3 columns — breaks on mobile */}
<div className="grid grid-cols-3 gap-5">

{/* After: 1 col phone → 2 col tablet → 3 col desktop */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
```

💻 **Fixed Navbar for mobile in `Navbar.jsx`:**
```jsx
{/* Desktop links: hide on small screens */}
<div className="hidden md:flex items-center gap-1">
  {/* Animals, Categories dropdowns */}
</div>

{/* Hamburger button: only shows on small screens */}
<button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden">
  {mobileOpen ? <X size={22}/> : <Menu size={22}/>}
</button>

{/* Mobile menu: slides down when mobileOpen is true */}
{mobileOpen && (
  <div className="md:hidden py-4 border-t space-y-1">
    <Link to="/products?pet_type=Dog" onClick={() => setMobileOpen(false)}>🐕 Dogs</Link>
    <Link to="/products?category=Food" onClick={() => setMobileOpen(false)}>🥩 Food</Link>
  </div>
)}
```

---

### Mar 12 — Edge Cases & Error Handling

📖 **What is an edge case? — the "what if" scenarios:**
Edge cases are unusual situations your code might not handle properly. Good developers think about them before users encounter them.

💻 **Empty Cart (`Cart.jsx`):**
```jsx
// Instead of showing a broken empty table, show a friendly message
if (cart.length === 0) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <ShoppingBag size={40} className="text-muted-foreground mb-6" />
      <h2 className="text-3xl font-bold mb-3">Your cart is empty</h2>
      <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
      <button onClick={() => navigate('/products')} className="bg-primary text-white px-8 py-3 rounded-full font-bold">
        Start Shopping
      </button>
    </div>
  );
}
// The rest of the Cart code only runs if cart has items
```

💻 **Loading State (`Dashboard.jsx`):**
```jsx
// Show a spinning circle while waiting for API response
if (loading) {
  return (
    <div className="flex justify-center py-32">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );
}
// Render actual content only after loading = false
```

💻 **API Error Handling (used everywhere):**
```jsx
try {
  const res = await api.get('/orders');
  setOrders(res.data); // success — use the data
} catch (err) {
  // Failure — show user-friendly message, log technical details
  toast.error('Failed to load your orders. Please try again.');
  console.error(err); // developers can see the full error in browser console
}
```

🗣️ **Say this:**
> "Edge cases are the situations most developers forget — what happens when the cart is empty? What if the API server is down? What if the user has no orders yet? I handled all of these: empty states show friendly messages with a redirect button, failed API calls show toast error messages, and loading states show spinners. This prevents blank white screens that confuse users."

---

### Mar 13 — Code Quality Fixes

📖 **The 3 most common React quality issues I fixed:**

**1. Missing `key` prop in lists:**
```jsx
// ❌ Wrong — React shows a warning in console
{products.map(product => <ProductCard product={product} />)}

// ✅ Correct — React uses 'key' to track which item is which
{products.map(product => <ProductCard key={product.id} product={product} />)}
```
Why it matters: Without `key`, React can't efficiently update only the changed items. It might re-render the whole list unnecessarily.

**2. Missing `alt` text on images:**
```jsx
// ❌ Bad — screen readers say "image" and nothing else
<img src={product.image_url} />

// ✅ Good — screen readers say "Premium Dog Food" 
<img src={product.image_url} alt={product.name} />
```

**3. Environment Variables (never hardcode URLs):**
```javascript
// ❌ Bad — when you deploy, this localhost URL breaks everything
const API_URL = 'http://localhost:5000/api';

// ✅ Good — reads from .env file, changes per environment
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

```bash
# .env.local file (for development — never commit to Git!)
VITE_API_URL=http://localhost:5000/api

# Vercel dashboard (for production)
VITE_API_URL=https://your-backend.onrender.com/api
```

🗣️ **Say this:**
> "Code quality means the code not only works but is maintainable and follows best practices. I fixed three main issues: missing `key` props in lists which can cause React rendering bugs, missing `alt` attributes on images which breaks accessibility, and hardcoded URLs replaced with environment variables so the API URL can be different in development vs production without changing the code."

---

### Mar 14 — Final Presentation + Deployment Approval

🗣️ **Say this:**
> "I presented all the improvements and the complete working application to my mentor. After receiving final feedback and applying small adjustments, I got approval to move to the production deployment phase in Week 10."

---

## 📅 WEEK 10 — Deploying to Vercel

### Mar 16-17 — Studying Vercel + Production Cleanup

📖 **What is Vercel? — think of it like GitHub but for running websites:**
GitHub stores your code. Vercel takes that code and actually runs it live on the internet, giving it a real URL that anyone can access. It connects to your GitHub repo and automatically redeploys whenever you push new code.

📖 **Things to do before deployment:**
- Remove all `console.log()` statements (they slow things down and expose data)
- Delete unused imports
- Make sure all images load correctly
- Set environment variables on Vercel (not in the code!)

---

### Mar 18 — Fixing SPA Routing + Successful Deployment

📖 **The biggest deployment challenge — page refresh breaks the app:**

Here's the problem: React handles routing in the BROWSER. But Vercel handles the server. When someone visits `pawmart.vercel.app/products` directly (or refreshes the page), Vercel looks for a file called `products.html` — which doesn't exist! Result: **404 Not Found error**.

The fix: tell Vercel "for EVERY URL, just serve `index.html` and let React Router handle it."

💻 **File: `client/vercel.json`** (this tiny file fixes the whole problem):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```
What this says: "No matter what URL someone visits (`/(.*)`), send back `index.html`. React Router will then read the URL and show the right page."

🗣️ **Say this:**
> "The biggest challenge in deployment was SPA routing. React Router works in development because Vite handles unknown routes, but on Vercel there's no such fallback. If a user refreshes on `/products`, Vercel returns a 404 because no `products.html` file exists. The fix is a `vercel.json` file with a rewrite rule that sends ALL URLs to `index.html`. React Router in `App.jsx` then reads the URL and renders the correct component. After adding this file, all routes worked correctly."

---

### Mar 19 — Live Testing + Env Variable Fix

📖 **Common production issues and fixes:**
| Issue | Cause | Fix |
|---|---|---|
| API calls fail on live site | `VITE_API_URL` not set in Vercel | Add env var in Vercel dashboard |
| Login works locally but not live | Backend CORS doesn't allow live URL | Add frontend production URL to backend CORS config |
| 404 on page refresh | SPA routing not set up | Add `vercel.json` (done above) |

🗣️ **Say this:**
> "After deploying I tested on a real phone and found that API calls were failing. The problem was that the `VITE_API_URL` environment variable wasn't set on Vercel — it was only in my local `.env` file. I added the production backend URL in the Vercel dashboard environment settings and redeployed. After that, all API calls worked correctly on the live site."

---

### Mar 20-21 — Final Presentation + Demo

📖 **Tech Stack Summary (know this for your viva!):**
| What | Technology | Purpose |
|---|---|---|
| Frontend Framework | **React 18** | Building UI with components |
| Build Tool | **Vite** | Fast development server |
| Styling | **Tailwind CSS** | Utility CSS classes |
| Global State | **Zustand** | Cart, user, favorites storage |
| API Calls | **Axios** | HTTP requests to backend |
| Navigation | **React Router DOM** | Client-side page routing |
| Icons | **Lucide React** | SVG icon components |
| Notifications | **React Hot Toast** | Popup messages |
| Backend | **Node.js + Express** | REST API server |
| Database | **PostgreSQL** | Storing products, users, orders |
| Deployment | **Vercel** | Hosting the live frontend |

---

## 📅 WEEK 11 — Final Cleanup & Submission

### Mar 23 — Final Improvements

🗣️ **Say this:**
> "In the final week I addressed all remaining feedback from my mentor, applying the last round of improvements to the UI and code."

---

### Mar 24 — Code Review + Repository Cleanup

📖 **Final cleanup checklist:**
```
✅ All console.log() removed
✅ All unused imports removed (reduces bundle size)
✅ All images have alt text
✅ All list renders have key props
✅ .env file in .gitignore (never pushed to GitHub)
✅ README.md updated with setup instructions
✅ Git history has meaningful commit messages
✅ Functions have comments explaining what they do
```

---

### Mar 25 — Documentation & Handover

🗣️ **Say this:**
> "I submitted all documentation including the project report and codebase. The handover included a README with setup instructions so the next developer can run the project. The internship gave me a complete picture of real-world development — from requirements gathering and component design all the way to production deployment and testing."

---

# 🚀 QUICK REFERENCE GUIDE (Keep This Open in Viva!)

## All Pages — Where to Show Them

| What to demo | URL to open | What to point out |
|---|---|---|
| **Home/Landing** | `/` | Hero, pet category icons, Best Sellers, New Arrivals |
| **All Products** | `/products` | Sidebar filters, search bar, grid, pagination |
| **Filter by pet** | `/products?pet_type=Dog` | URL changes, products filter automatically |
| **Product Detail** | Click any card | Image, name, price, stock, quantity picker, Add to Cart |
| **Login** | `/login` | Controlled form, loading state, redirects |
| **Signup** | `/signup` | Form validation, auto login after signup |
| **Cart** | `/cart` (or cart icon) | Items, total calculation, checkout flow |
| **Dashboard** | `/dashboard` (must be logged in) | 3 tabs: Orders, Favorites, Profile |
| **Admin Panel** | `/admin` (must be admin) | Sidebar, CRUD for products, users, orders |

---

## File Map — What's in Where

```
src/
├── App.jsx          ← All route definitions (the GPS map)
├── store/
│   └── useStore.js  ← Zustand: user, token, cart, favorites + all actions
├── lib/
│   └── api.js       ← Axios instance + JWT interceptor (auto token)
├── components/
│   ├── Navbar.jsx       ← Top bar, cart badge, mobile menu, user dropdown
│   ├── Footer.jsx       ← Bottom section with links
│   ├── ProductCard.jsx  ← Reusable card (Landing + Products + Favorites all use this!)
│   ├── dashboard/
│   │   ├── OrdersTab.jsx    ← Dashboard: order history list
│   │   ├── FavoritesTab.jsx ← Dashboard: favorited products grid
│   │   └── ProfileTab.jsx   ← Dashboard: editable shipping address form
│   └── admin/
│       └── tabs/
│           ├── ProductsTab.jsx ← Admin CRUD for products
│           ├── OrdersTab.jsx   ← Admin: view + update all orders
│           └── UsersTab.jsx    ← Admin: view + delete users
└── pages/
    ├── Landing.jsx       ← Home page (Week 3)
    ├── Products.jsx      ← Products + filter + search + pagination (Week 4)
    ├── ProductDetail.jsx ← Single product (Week 5)
    ├── Login.jsx         ← Login form + JWT (Week 6)
    ├── Signup.jsx        ← Registration (Week 6)
    ├── Cart.jsx          ← Shopping cart + checkout (Week 6)
    ├── Dashboard.jsx     ← User portal (Week 7)
    └── AdminPanel.jsx    ← Admin portal (Week 7-8)
```

---

## 🗣️ Top 10 Viva Q&A — Simple But Solid Answers

**Q: What is the difference between props and state?**
> "Props are data that come FROM OUTSIDE the component — the parent passes them in and the component can only READ them, not change them. State is data that LIVES INSIDE the component — the component owns it and can update it with a setter function. When either changes, React re-renders the component."

---

**Q: Why use Zustand instead of just passing props?**
> "When you need to share data between components that are far apart in the tree — like the cart being needed in the Navbar, the Cart page, and the ProductCard — passing props through every component in between is messy. Zustand is a global store that any component can read from or write to directly with one line: `const { cart } = useStore()`."

---

**Q: What's the difference between useEffect with `[]` and `[id]`?**
> "`[]` is an empty array — it means 'run this code once when the page loads and never again.' `[id]` means 'run this code whenever `id` changes.' On the home page I use `[]` to load products once. On the Product Detail page I use `[id]` so the page re-fetches data when you navigate from one product to another."

---

**Q: Why `<Link>` instead of `<a>` in React?**
> "A regular `<a href>` tag tells the browser to load a completely new HTML page — that restarts the whole React app and loses all state. `<Link>` from React Router just swaps the visible component for the new route instantly — no reload, no state loss, feels instant like a native app."

---

**Q: What is a JWT and how does authentication work in this app?**
> "JWT stands for JSON Web Token. When you log in, the backend checks your email and password, and if they match, it sends back a token — like a digital wristband for an event. Every subsequent API request includes this token in the `Authorization` header. The backend sees the token and knows who you are without you having to log in again. In this app the token is stored in Zustand and localStorage, and the Axios interceptor automatically attaches it to every request."

---

**Q: How does the Axios interceptor work?**
> "An interceptor is code that runs before every HTTP request automatically. In `src/lib/api.js` I added `api.interceptors.request.use(...)` which grabs the token from Zustand and adds it to the request header before it's sent. This means I never have to manually add the auth header to any API call in any component — it just happens automatically every time."

---

**Q: What is `useSearchParams` and why did you use it for filters?**
> "`useSearchParams` is like `useState` but for the URL query string. When I click 'Dog' in the filter sidebar, instead of just storing the filter in component state, I update the URL to `/products?pet_type=Dog`. This is better because: the filter is bookmarkable, shareable, and if you press the browser back button it works correctly. The `useEffect` watches the URL parameters and re-fetches filtered products whenever they change."

---

**Q: How does role-based protection work in the Admin Panel?**
> "At the very top of `AdminPanel.jsx`, the first thing is `if (!user || user.role !== 'admin') return <AdminAuth />;`. If there's no user or the user isn't an admin, the entire dashboard is replaced with a login screen. Regular users can type `/admin` in the URL and will just see the login screen, never the actual dashboard. The backend also validates the JWT on every admin API call for a second layer of security."

---

**Q: Why did you need `vercel.json` for deployment?**
> "React is a Single Page Application — there's only one real HTML file (`index.html`). React Router handles navigation in the browser. But when someone visits `mysite.com/products` directly or refreshes the page, Vercel looks for a `products.html` file which doesn't exist. So it returns a 404. The `vercel.json` file with a rewrite rule tells Vercel: 'for any URL, just serve `index.html`'. Then React Router reads the URL and shows the correct page."

---

**Q: How does the cart total calculation work?**
> "I used the JavaScript `.reduce()` method: `cart.reduce((acc, item) => acc + item.price * item.quantity, 0)`. This loops through every item in the cart, multiplies price by quantity, and adds it to a running total that starts at 0. Then I add 8% tax on top for the final amount. The cart data lives in Zustand so the total is always in sync with whatever is in the cart."

---

---

# 🔍 EXTRA DETAILS — Things Not To Miss In The Viva

---

## How the App Starts — `main.jsx`

📖 **`main.jsx` is the entry point — the very first file that runs:**
```jsx
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'   // loads global CSS (fonts, body styles)

// This finds the <div id="root"> in index.html and injects the entire React app into it
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />   {/* App.jsx is the root component — contains all routes */}
  </React.StrictMode>,
)
```

📖 **The chain:**
```
index.html  →  main.jsx  →  App.jsx  →  Routes  →  Landing / Products / etc.
```

🗣️ **Say this:**
> "`main.jsx` is the JavaScript entry point. It finds the single `<div id='root'>` in `index.html` and uses `ReactDOM.createRoot().render()` to inject the entire React app into it. `React.StrictMode` is a development wrapper that highlights potential problems in the code by running checks twice. Everything flows from here — `App.jsx` loads next, which defines all the routes."

---

## Helper — `lib/imageUrl.js`

📖 **Why we need this — products can have two types of image URLs:**
- **Local image** (uploaded by admin): `/uploads/dog-food.jpg` → needs backend URL prepended → `http://localhost:5000/uploads/dog-food.jpg`
- **External image** (URL from the internet): `https://images.unsplash.com/...` → use as-is

💻 **File: `src/lib/imageUrl.js`**
```javascript
import { SERVER_URL } from './api';

export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;                    // no image at all → return null

  if (imageUrl.startsWith('http')) {
    return imageUrl;                             // already a full URL → use as-is
  }

  return `${SERVER_URL}${imageUrl}`;             // local file → add backend URL prefix
};
```

📖 **Used in ProductCard, ProductDetail, and Cart:**
```jsx
// Instead of: <img src={product.image_url} />
// We use:
const imgSrc = getImageUrl(product.image_url);
<img src={imgSrc} alt={product.name} />
```

🗣️ **Say this:**
> "`getImageUrl` is a utility helper in `src/lib/imageUrl.js`. It handles two cases: if the image URL starts with `http`, it's an external URL and we use it directly. If it's a local path like `/uploads/dog-food.jpg`, we prepend the backend server URL to make it a full URL. This means the same ProductCard component works correctly whether the admin uploaded a local image or pasted an external link."

---

## Admin Login Guard — `AdminAuth.jsx` (Week 7-8)

📖 **What is AdminAuth? — it's the bouncer at the admin door:**
When someone visits `/admin` but isn't an admin, instead of crashing or showing a blank page, we show a proper admin login screen. This is the `AdminAuth` component.

🖥️ **Show in app:** Open `/admin` in a private/incognito window (no login) — instead of the dashboard, you see a clean admin login form.

💻 **File: `src/components/admin/AdminAuth.jsx`** — key parts:
```jsx
export default function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true); // toggle between Login and Create Admin
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const res = await api.post('/auth/login', { email: formData.email, password: formData.password });
        // Extra check: even if login succeeds, reject if not admin
        if (res.data.user.role !== 'admin') {
          setError('Access denied. Admin only.');  // regular user trying to access admin
        } else {
          setAuth(res.data.user, res.data.token);  // finally accepted!
        }
      } else {
        // Create new admin account
        await api.post('/auth/create-admin', formData);
        setIsLogin(true); // switch back to login mode
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-3xl shadow-lg max-w-md w-full">
        <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
          <ShieldCheck size={24} className="text-white" />  {/* Shield icon = security */}
        </div>
        <h2>{isLogin ? 'Admin Portal' : 'Create Admin'}</h2>

        {/* Error box — only shows if error state has text */}
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Name field only shown when creating admin (not on login) */}
          {!isLogin && (
            <input type="text" value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                   placeholder="Full Name" required />
          )}
          <input type="email" value={formData.email}
                 onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input type="password" value={formData.password}
                 onChange={e => setFormData({...formData, password: e.target.value})} required />
          <button disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        {/* Toggle between login and create-admin mode */}
        <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
          {isLogin ? 'Need an admin account? Create one' : 'Already have an account? Sign in'}
        </button>
      </div>
    </div>
  );
}
```

🗣️ **Say this:**
> "`AdminAuth` is the component shown when someone tries to access `/admin` without being an admin. It has two modes controlled by `isLogin` state — Login mode and Create Admin mode. A key security feature is the double check: even if the login API call succeeds, we check `res.data.user.role !== 'admin'` and show an error if it's a regular user. This prevents regular users from using their valid login credentials to sneak into the admin panel."

---

## Sortable Table Columns — `SortHeader.jsx` (Week 8)

📖 **What it is — the clickable column headers in the Admin table:**
In the Admin Panel product table, you can click column headers like "Name" or "Price" to sort the data. The `SortHeader` component is a reusable table header that handles this.

💻 **File: `src/components/admin/SortHeader.jsx`**
```jsx
// Props: label (text), sortKey (what to sort by), currentSort, setSort
export default function SortHeader({ label, sortKey, currentSort, setSort }) {

  const handleSortClick = () => {
    setSort(prev => ({
      key: sortKey,
      // If already sorting by this column ascending → switch to descending, else ascending
      dir: prev.key === sortKey && prev.dir === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <th onClick={handleSortClick}
        className="py-4 px-3 font-bold cursor-pointer hover:text-slate-700 group">
      <div className="flex items-center gap-1.5 uppercase">
        {label}
        {/* Arrow icon is bold if THIS column is the active sort column */}
        <ArrowUpDown size={12}
          className={currentSort.key === sortKey ? 'opacity-100 text-slate-900' : 'opacity-30'} />
      </div>
    </th>
  );
}
```

📖 **How sorting works in the parent component:**
```jsx
// In ProductsTab.jsx: sort state tracks column and direction
const [sort, setSort] = useState({ key: 'name', dir: 'asc' });

// Sort the products array before rendering
const sortedProducts = [...products].sort((a, b) => {
  if (sort.dir === 'asc') return a[sort.key] > b[sort.key] ? 1 : -1;
  return a[sort.key] < b[sort.key] ? 1 : -1;
});

// In the table header:
<SortHeader label="Name"  sortKey="name"  currentSort={sort} setSort={setSort} />
<SortHeader label="Price" sortKey="price" currentSort={sort} setSort={setSort} />
```

🗣️ **Say this:**
> "`SortHeader` is a reusable table header component. When clicked, it calls `setSort` to update the sort state in the parent component with a `key` (which column) and `dir` (asc or desc). The parent then re-sorts the data array using JavaScript's `.sort()` method. I made it reusable so I can use it for Name, Price, Category columns just by passing a different `sortKey` prop — no duplicate code."

---

## Studying Shadcn UI Library (Week 8 — Mar 2)

📖 **What is Shadcn UI?**
Shadcn UI is a component library — it gives you pre-built UI components like buttons, dialogs, inputs, and tables that look very professional. Unlike normal libraries, Shadcn copies the component code INTO your project so you can customize it fully.

📖 **In this project:**
Shadcn was studied as a reference for design patterns, but the final implementation uses **custom modals** built from scratch rather than Shadcn components. The reason is that custom modals are smaller in bundle size and give full control over styling.

```jsx
// What a Shadcn Dialog would look like (NOT used in this project)
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>Delete Product?</DialogHeader>
  </DialogContent>
</Dialog>

// What we built instead (custom modal — used in our project)
{deleteConfirm.id && (
  <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
    <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl">
      <h3>Delete?</h3>
      <button onClick={executeDelete}>Confirm</button>
    </div>
  </div>
)}
```

🗣️ **Say this:**
> "I studied the Shadcn UI library on March 2nd as planned. Shadcn provides beautifully designed, accessible components that you copy directly into your project. After exploring it, I decided to build custom modals instead because we had very specific styling requirements and building them ourselves kept the project lighter and gave full control. The `components.json` file in the project is a Shadcn configuration file showing it was integrated into the project setup."

---

## Spread Operator — `{...formData, name: e.target.value}` Explained

📖 **The spread operator `...` — copy everything, change one thing:**
You see this in AdminAuth when updating form fields:
```jsx
// State holds ALL form fields together
const [formData, setFormData] = useState({ name: '', email: '', password: '' });

// When the email input changes, we want to update ONLY email, keep name and password
onChange={e => setFormData({...formData, email: e.target.value})}

// What {...formData, email: e.target.value} does:
// Step 1: Copy all existing formData: { name: 'John', email: 'old@email.com', password: '123' }
// Step 2: Override just email: { name: 'John', email: 'NEW@email.com', password: '123' }
// Result: { name: 'John', email: 'NEW@email.com', password: '123' }
```

🗣️ **Say this:**
> "The spread operator `...` copies all properties of an object into a new object. When I write `{...formData, email: e.target.value}`, it means 'take everything in formData, but replace the email property with the new value'. This is an immutable update — we don't mutate the original state, we create a fresh copy with the change. This is the React-correct way to update an object in state."

---

## Ternary Operator — Used Everywhere in JSX

📖 **The ternary operator — a one-liner if/else:**
```javascript
// Normal if/else (can't use inside JSX)
if (loading) { return 'Saving...'; } else { return 'Save'; }

// Ternary operator — works inside JSX {}
loading ? 'Saving...' : 'Save'
// Read as: "if loading is true → 'Saving...' else → 'Save'"
```

📖 **Real examples from the project:**
```jsx
// Login button text
<button>{loading ? 'Signing in...' : 'Login'}</button>

// Stock status in ProductDetail
{parseInt(product.stock) > 0
  ? <span className="text-green-600">✓ In Stock</span>
  : <span className="text-red-500">✗ Out of Stock</span>
}

// AdminAuth title
<h2>{isLogin ? 'Admin Portal' : 'Create Admin'}</h2>

// Order status color in Dashboard
className={order.status === 'delivered' ? 'bg-green-100 text-green-600' :
           order.status === 'cancelled' ? 'bg-red-100 text-red-500' :
                                          'bg-yellow-100 text-yellow-600'}
```

🗣️ **Say this:**
> "The ternary operator `condition ? valueIfTrue : valueIfFalse` is used heavily in JSX because you can't put regular if/else inside curly braces. I use it for dynamic button text, conditional CSS classes, and showing different UI based on state. It's one of the most important patterns in React code."

---

## `&&` Conditional Rendering — Show or Hide Components

📖 **The `&&` trick — only render if condition is true:**
```jsx
// If cartCount > 0 is true → show the badge. If false → show nothing.
{cartCount > 0 && (
  <span className="cart-badge">{cartCount}</span>
)}

// If no user logged in → show Sign up button. If user exists → show nothing.
{!user && (
  <Link to="/signup">Sign up</Link>
)}

// If best sellers array has items → show the section. If empty → hide it.
{bestSelling.length > 0 && (
  <section>Best Sellers...</section>
)}
```

📖 **Why `&&` works in JavaScript:**
- `true && <Component />` → renders `<Component />`
- `false && <Component />` → renders nothing (false is ignored by React)
- `0 && <Component />` → ⚠️ renders `0` on screen! Always use boolean: `{count > 0 && ...}`

🗣️ **Say this:**
> "In JSX, `{condition && <Component />}` is shorthand for 'only render this if condition is true.' If the condition is false, React renders nothing. I use this pattern throughout the project: the cart badge only shows when there are items, the 'Create Account' button only shows when no user is logged in, and product sections only render after the API data loads. One important gotcha: avoid using `{0 && ...}` because React renders the number 0 — always use `{count > 0 && ...}` instead."

---

## Object Destructuring — `const { user, cart } = useStore()`

📖 **Destructuring — unpacking objects in one line:**
```javascript
// Without destructuring (repetitive)
const user    = useStore().user;
const cart    = useStore().cart;
const logout  = useStore().logout;

// With destructuring (clean, one line)
const { user, cart, logout } = useStore();

// Same for props:
// Without:
export default function ProductCard(props) {
  return <h3>{props.product.name}</h3>;
}
// With:
export default function ProductCard({ product }) {
  return <h3>{product.name}</h3>;
}

// Same for useState:
const [activeTab, setActiveTab] = useState('orders');
//     ↑ value    ↑ setter       ↑ array destructuring
```

🗣️ **Say this:**
> "Object destructuring is an ES6 feature used everywhere in the project. Instead of writing `useStore().user`, `useStore().cart` separately, I write `const { user, cart } = useStore()` to extract multiple values at once. It's also used for component props — `{ product }` instead of `props.product`, and for `useState` returns — `const [value, setValue]` is array destructuring."

---

## `object-cover` vs `object-contain` — Image Fitting

📖 **Two ways to fit an image in its container:**
```
object-cover  → fills the box completely, CROPS the image if needed (used in ProductCard)
               → image never stretches, never shows empty space
               → like zooming in until the box is fully filled

object-contain → fits the WHOLE image inside the box, shows empty space around it  
               → image never gets cropped
               → like fitting a photo into a frame without cutting it
```

```jsx
// ProductCard — uses object-cover so all cards look uniform
<img className="w-full h-56 object-cover group-hover:scale-105 transition-transform" />

// If product detail needs full image visible, might use object-contain
<img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
```

🗣️ **Say this:**
> "`object-cover` tells CSS to scale the image so it fills its container completely, cropping any overflow. This is crucial for the product grid — every card is the same height, so the image needs to fill it regardless of the original photo dimensions. Without `object-cover`, tall images would stretch the card layout."

---

## `sticky top-0 z-50` — Sticky Navbar

📖 **How the Navbar stays at the top when you scroll:**
```jsx
<nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
```

| Class | What it does |
|---|---|
| `sticky` | Sticks to its nearest scrolling ancestor while in view |
| `top-0` | Sticks 0px from the top of the viewport |
| `z-50` | Sets z-index to 50 — appears ABOVE other content (50 > 1) |
| `shadow-sm` | Subtle shadow to visually separate from page content |

🗣️ **Say this:**
> "The Navbar uses `position: sticky` via Tailwind's `sticky top-0` classes. This means it scrolls with the page normally, but once it reaches the top of the viewport, it 'sticks' there and stays visible as you continue scrolling. `z-50` gives it a high z-index so it appears above all other page content — otherwise product cards would overlap it while scrolling."

---

## `async/await` vs `.then()` — Two Styles of Async Code

📖 **Both do the same thing — async/await is just cleaner:**
```javascript
// Style 1: .then() chains (hard to read when nested)
api.get('/products')
  .then(res => {
    setProducts(res.data);
    return api.get('/categories');
  })
  .then(res => setCategories(res.data))
  .catch(err => console.error(err));

// Style 2: async/await (reads like normal code — used in this project)
const fetchData = async () => {
  try {
    const prodRes = await api.get('/products');
    setProducts(prodRes.data);
    const catRes = await api.get('/categories');
    setCategories(catRes.data);
  } catch (err) {
    console.error(err);
  }
};
```

📖 **try/catch/finally pattern (used in every API call):**
```javascript
try {
  setLoading(true);
  const res = await api.post('/auth/login', { email, password });
  setAuth(res.data.user, res.data.token);
  toast.success('Welcome!');
} catch (err) {
  // Runs if ANYTHING inside try fails
  toast.error(err.response?.data?.error || 'Something went wrong');
} finally {
  // Runs ALWAYS — whether success or error
  setLoading(false); // always remove spinner
}
```

🗣️ **Say this:**
> "Throughout the project I use `async/await` with `try/catch/finally`. `try` contains the code that might fail, `catch` handles the error gracefully and shows a toast, and `finally` runs regardless of success or failure — I use it to always turn off the loading spinner. The `finally` block is important because without it, if the API fails, the loading spinner would spin forever."

---

## `navigate(-1)` — Go Back Button

📖 **`useNavigate` for programmatic navigation:**
```jsx
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

navigate('/');           // go to home
navigate('/dashboard');  // go to dashboard
navigate(-1);            // go BACK (like browser back button)
```

🖥️ **Show in app:** Open any product detail page → click the "← Back" button at the top.

💻 **File: `src/pages/ProductDetail.jsx`**
```jsx
<button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground mb-8">
  <ArrowLeft size={20} className="mr-2" /> Back
</button>
```

🗣️ **Say this:**
> "`useNavigate()` returns a function that lets you change routes programmatically — from inside event handlers, not just via `<Link>` components. `navigate(-1)` tells the browser to go back one step in its history, exactly like clicking the browser's back button. This is used for the 'Back' button on the Product Detail page so users return to wherever they came from — whether that was the Products page, the home page, or the Dashboard favorites."

---

## `useNavigate` vs `<Link>` — When to Use Each

| Use `<Link>` | Use `navigate()` |
|---|---|
| Button/anchor tag visible in JSX | After an async action completes |
| Simple navigation on click | Conditional redirect |
| Example: Navbar links | Example: After login → go to home |
| Example: "Shop Now" button | Example: After checkout → go to dashboard |

```jsx
// Link — visible navigation button
<Link to="/products">Shop Now</Link>

// navigate — programmatic, after something happens
const handleLogin = async () => {
  await api.post('/auth/login', ...);
  navigate('/'); // redirect after login succeeds
};
```

---

## How `key` Prop Works in `.map()` — Deep Explanation

📖 **Why React needs `key` — think of it as a name tag:**
When React sees a list of components, it needs a way to track each one. Without a `key`, if you remove item #2 from a list of 5, React doesn't know which one disappeared — it might re-render all 5. With a `key`, React knows exactly which item was removed and only updates that one.

```jsx
// ❌ No key — React warning, possible bugs with re-ordering
{products.map(product => <ProductCard product={product} />)}

// ✅ Unique key — React tracks each card by its database ID
{products.map(product => <ProductCard key={product.id} product={product} />)}

// ⚠️ Using index as key — ok for static lists, bad for dynamic ones
{products.map((product, i) => <ProductCard key={i} product={product} />)}
// If you remove the first item, index 0 now refers to a different product
// React gets confused → use actual product.id always
```

🗣️ **Say this:**
> "The `key` prop is React's way of identifying each item in a list. When you add, remove, or reorder items, React uses keys to know what changed and update only those specific DOM elements rather than re-rendering everything. I use `product.id` as the key because it's unique and stable in the database. Using array indices as keys causes bugs when items are added or removed from the middle of the list, because the indices shift."

---

## Summary — ALL Packages Installed and Why

```bash
# Core
npm create vite@latest client -- --template react   # React + Vite project

# Styling
npm install -D tailwindcss postcss autoprefixer      # Tailwind CSS

# Routing (Week 4)
npm install react-router-dom                         # Client-side routing and navigation

# HTTP client (Week 4)
npm install axios                                    # API calls to Express backend

# Global state (Week 6)
npm install zustand                                  # Cart, user, favorites global state

# Notifications (Week 5)
npm install react-hot-toast                          # Success/error popup notifications

# Icons (Week 3)
npm install lucide-react                             # SVG icon components
```

📖 **`package.json` in the project:**
```json
{
  "dependencies": {
    "axios": "^1.x",
    "lucide-react": "^0.x",
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-hot-toast": "^2.x",
    "react-router-dom": "^6.x",
    "zustand": "^4.x"
  }
}
```

🗣️ **Say this:**
> "The project has 6 main npm packages beyond React itself: `react-router-dom` for navigation, `axios` for API calls, `zustand` for global state, `react-hot-toast` for notifications, and `lucide-react` for icons. Each was installed in the week we needed it — React Router and Axios in Week 4, Zustand and Hot Toast in Weeks 5-6. Tailwind was installed as a dev dependency in Week 2 during project setup."
