import { useState } from "react";
import api from "../api/api";

function FaultForm() {
  const [form, setForm] = useState({
    reported_by: "",
    equipment_name: "",
    fault_type: "",
    fault_description: "",
    location: "",
    fault_date: "",
    severity: "Medium",
    status: "Pending"
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
      await api.post("/faults", form);

      alert("Fault reported successfully");

      setForm({
        reported_by: "",
        equipment_name: "",
        fault_type: "",
        fault_description: "",
        location: "",
        fault_date: "",
        severity: "Medium",
        status: "Pending"
      });
    } catch (error) {
      console.error(error);
      alert("Failed to save fault");
    }
  };

  return (
    <div className="page">
      <h2>Report Fault</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="reported_by"
          placeholder="Reported By (User ID)"
          value={form.reported_by}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="equipment_name"
          placeholder="Equipment Name"
          value={form.equipment_name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="fault_type"
          placeholder="Fault Type"
          value={form.fault_type}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="fault_description"
          placeholder="Fault Description"
          value={form.fault_description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="datetime-local"
          name="fault_date"
          value={form.fault_date}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="severity"
          value={form.severity}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <br /><br />

        <button type="submit">
          Save Fault
        </button>
      </form>
    </div>
  );
}

export default FaultForm;