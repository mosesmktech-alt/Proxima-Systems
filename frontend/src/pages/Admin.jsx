function Admin() {
const user = JSON.parse(localStorage.getItem("user"));

return ( <div> <h1>Proxima Admin Dashboard</h1>


  <p>Welcome, {user?.full_name}</p>

  <h3>Administration Panel</h3>

  <ul>
    <li>Manage Users</li>
    <li>Manage Incidents</li>
    <li>Manage Faults</li>
    <li>Manage PPE</li>
    <li>Manage Departments</li>
    <li>View Analytics</li>
  </ul>

  <button
    onClick={() => {
      localStorage.clear();
      window.location.href = "/";
    }}
  >
    Logout
  </button>
</div>


);
}

export default Admin;
