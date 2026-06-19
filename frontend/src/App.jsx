import Login from "./pages/Login";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import UserDashboard from "./pages/UserDashboard";

function App() {
const path = window.location.pathname;

// LOGIN PAGE
if (path === "/" || path === "/login") {
return <Login />;
}

// HOME (role router)
if (path === "/home") {
return <Home />;
}

// ADMIN DASHBOARD
if (path === "/admin") {
return <Admin />;
}

// USER DASHBOARD
if (path === "/user") {
return <UserDashboard />;
}

// fallback
return ( <div> <h1>404 - Page Not Found</h1> </div>
);
}

export default App;
