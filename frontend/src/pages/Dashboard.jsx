import { useEffect, useState } from "react";
import api from "../api/api";

function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/incidents");
      const data = res.data;

      const total = data.length;
      const pending = data.filter(i => i.status === "Pending").length;
      const resolved = data.filter(i => i.status === "Resolved").length;

      setStats({ total, pending, resolved });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: "20px" }}>
        <div style={card}>
          <h3>Total Incidents</h3>
          <p>{stats.total}</p>
        </div>

        <div style={card}>
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>

        <div style={card}>
          <h3>Resolved</h3>
          <p>{stats.resolved}</p>
        </div>
      </div>
    </div>
  );
}

const card = {
  padding: "20px",
  background: "#f4f4f4",
  borderRadius: "8px",
  width: "150px",
  textAlign: "center",
};

export default Dashboard;