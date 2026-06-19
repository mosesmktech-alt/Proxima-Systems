import { useEffect, useState } from "react";
import api from "../api/api";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Analytics() {
  const [data, setData] = useState({});

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      const res = await api.get("/analytics/incidents");
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= PIE CHART DATA =================
  const statusData = [
    { name: "Pending", value: data.pending || 0 },
    { name: "Investigating", value: data.investigating || 0 },
    { name: "Resolved", value: data.resolved || 0 },
    { name: "Closed", value: data.closed || 0 }
  ];

  // ================= BAR CHART DATA =================
  const riskData = [
    {
      name: "High Risk",
      value: data.high_risk || 0
    },
    {
      name: "Normal",
      value: (data.total_incidents || 0) - (data.high_risk || 0)
    }
  ];

  const COLORS = ["#ff4d4f", "#faad14", "#52c41a", "#1890ff"];

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Analytics Dashboard</h1>

      {/* ================= STATS CARDS ================= */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <div>Total: {data.total_incidents}</div>
        <div>Pending: {data.pending}</div>
        <div>Investigating: {data.investigating}</div>
        <div>Resolved: {data.resolved}</div>
        <div>High Risk: {data.high_risk}</div>
      </div>

      {/* ================= CHARTS ================= */}
      <div style={{ display: "flex", marginTop: "40px", gap: "40px" }}>

        {/* PIE CHART */}
        <div style={{ width: "50%" }}>
          <h3>Incident Status Distribution</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR CHART */}
        <div style={{ width: "50%" }}>
          <h3>Risk Analysis</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={riskData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#1890ff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;