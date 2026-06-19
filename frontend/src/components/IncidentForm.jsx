import { useState } from "react";
import api from "../api/api";

function IncidentForm() {
  const [form, setForm] = useState({
    reported_by: "",
    incident_type: "",
    description: "",
    location: "",
    incident_date: "",
    status: "Pending",
    severity_level: "Medium",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/incidents", form);

      alert("Incident saved successfully");

      setForm({
        reported_by: "",
        incident_type: "",
        description: "",
        location: "",
        incident_date: "",
        status: "Pending",
        severity_level: "Medium",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to save incident");
    }
  };

  return (
    <div className="page">
      <h1>Report Incident</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="reported_by"
          placeholder="Reported By (User ID)"
          value={form.reported_by}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="incident_type"
          placeholder="Incident Type"
          value={form.incident_type}
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
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="datetime-local"
          name="incident_date"
          value={form.incident_date}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="severity_level"
          value={form.severity_level}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>

        <br /><br />

        <button type="submit">
          Save Incident
        </button>
      </form>
    </div>
  );
}

export default IncidentForm;