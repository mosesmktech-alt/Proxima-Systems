function UserDashboard() {
const user = JSON.parse(localStorage.getItem("user"));

return ( <div> <h1>Proxima User Dashboard</h1>


  <p>Welcome, {user?.full_name}</p>

  <h3>User Functions</h3>

  <ul>
    <li>Report Incident</li>
    <li>Report Fault</li>
    <li>View Assigned PPE</li>
    <li>View Safety Notices</li>
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

export default UserDashboard;
