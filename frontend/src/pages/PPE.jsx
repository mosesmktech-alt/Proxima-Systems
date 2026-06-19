import { useEffect, useState } from "react";
import api from "../api/api";

function PPE() {
  const [ppe, setPpe] = useState([]);

  useEffect(() => {
    fetchPPE();
  }, []);

  const fetchPPE = async () => {
    try {
      const res = await api.get("/ppe");
      setPpe(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="page">
      <h1>PPE Management</h1>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>PPE Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Expiry Date</th>
          </tr>
        </thead>

        <tbody>
          {ppe.map((item) => (
            <tr key={item.ppe_id}>
              <td>{item.ppe_id}</td>
              <td>{item.ppe_name}</td>
              <td>{item.category}</td>
              <td>{item.quantity_available}</td>
              <td>{item.expiry_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PPE;