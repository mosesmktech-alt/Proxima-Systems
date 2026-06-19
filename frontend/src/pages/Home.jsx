import { useEffect } from "react";

function Home() {
useEffect(() => {
const user = JSON.parse(localStorage.getItem("user"));


if (!user) {
  window.location.href = "/";
  return;
}

if (user.role === "Admin") {
  window.location.href = "/admin";
} else {
  window.location.href = "/dashboard";
}


}, []);

return ( <div> <h1>Homepage</h1> <p>Redirecting based on user role...</p> </div>
);
}

export default Home;
