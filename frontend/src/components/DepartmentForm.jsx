import { useState } from "react";
import api from "../api/api";

function DepartmentForm() {
  const [department_name, setDepartmentName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/departments", {
        department_name,
        description,
      });

      alert("Department created successfully");

      setDepartmentName("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Failed to create department");
    }
  };

  return (
    <div className="page">
      <h2>Create Department</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Department Name"
          value={department_name}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Save Department
        </button>
      </form>
    </div>
  );
}

export default DepartmentForm;