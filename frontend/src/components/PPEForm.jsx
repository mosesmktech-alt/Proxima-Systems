import { useState } from "react";
import api from "../api/api";

function PPEForm() {
  const [form, setForm] = useState({
    ppe_name: "",
    category: "",
    quantity_available: "",
    expiry_date: ""
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
      await api.post("/ppe", form);

      alert("PPE saved successfully");

      setForm({
        ppe_name: "",
        category: "",
        quantity_available: "",
        expiry_date: ""
      });
    } catch (error) {
      console.error(error);
      alert("Failed to save PPE");
    }
  };

  return (
    <div className="page">
      <h2>Add PPE</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="ppe_name"
          placeholder="PPE Name"
          value={form.ppe_name}
          onChange={handleChange}
        />

        <br /><br />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="number"
          name="quantity_available"
          placeholder="Quantity"
          value={form.quantity_available}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="date"
          name="expiry_date"
          value={form.expiry_date}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Save PPE
        </button>
      </form>
    </div>
  );
}

export default PPEForm;