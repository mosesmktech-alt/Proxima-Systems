import { useState } from "react";
import api from "../api/api";

function UserForm() {
  const [form, setForm] = useState({
    full_name: "",
    employee_number: "",
    role: "Worker",
    department: "",
    phone: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", form);

      alert("User created successfully");

      setForm({
        full_name: "",
        employee_number: "",
        role: "Worker",
        department: "",
        phone: "",
        email: "",
        password: ""
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create user");
    }
  };

  return (
    <div className="page">
      <h2>Create User</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="full_name"
          placeholder="Full Name"
          value={form.full_name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="employee_number"
          placeholder="Employee Number"
          value={form.employee_number}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option>Worker</option>
          <option>Safety Officer</option>
          <option>Supervisor</option>
          <option>Admin</option>
        </select>

        <br /><br />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Save User
        </button>
      </form>
    </div>
  );
}

export default UserForm;