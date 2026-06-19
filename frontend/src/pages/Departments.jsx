import { useEffect, useState } from "react";
import api from "../api/api";

function Departments() {
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      const response = await api.get("/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error loading departments:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Departments</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Department Name</th>
            <th>Description</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dept) => (
            <tr key={dept.id}>
              <td>{dept.id}</td>
              <td>{dept.department_name}</td>
              <td>{dept.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Departments;