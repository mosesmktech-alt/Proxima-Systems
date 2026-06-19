import { useEffect, useState } from "react";
import api from "../api/api";

function Faults() {
  const [faults, setFaults] = useState([]);

  useEffect(() => {
    fetchFaults();
  }, []);

  const fetchFaults = async () => {
    try {
      const res = await api.get("/faults");
      setFaults(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page">
      <h1>Fault Management</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Equipment</th>
            <th>Fault Type</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {faults.map((fault) => (
            <tr key={fault.fault_id}>
              <td>{fault.fault_id}</td>
              <td>{fault.equipment_name}</td>
              <td>{fault.fault_type}</td>
              <td>{fault.location}</td>
              <td>{fault.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Faults;