import { useEffect, useState } from "react";
import api from "../api/api";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadIncidents();
    loadUsers();
  }, []);

  // ================= LOAD INCIDENTS =================
  const loadIncidents = async () => {
    try {
      const response = await api.get("/incidents");
      setIncidents(response.data);
    } catch (error) {
      console.error("Error loading incidents:", error);
    }
  };

  // ================= LOAD USERS (FOR ASSIGNMENT) =================
  const loadUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/incidents/${id}/status`, { status });
      loadIncidents();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // ================= ASSIGN INCIDENT =================
  const assignIncident = async (id, userId) => {
    try {
      await api.put(`/incidents/${id}/assign`, {
        assigned_to: userId,
      });

      loadIncidents();
    } catch (error) {
      console.error("Error assigning incident:", error);
    }
  };

  return (
    <div>
      <h1>Proxima Incident Management</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Location</th>
            <th>Status</th>
            <th>Severity</th>
            <th>Assigned To</th>
            <th>Workflow</th>
            <th>Assign</th>
          </tr>
        </thead>

        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.incident_id}>
              <td>{incident.incident_id}</td>
              <td>{incident.incident_type}</td>
              <td>{incident.location}</td>
              <td>{incident.status}</td>
              <td>{incident.severity_level}</td>

              {/* Assigned User Display */}
              <td>
                {incident.assigned_user || "Unassigned"}
              </td>

              {/* STATUS WORKFLOW */}
              <td>
                <button
                  onClick={() =>
                    updateStatus(incident.incident_id, "Pending")
                  }
                >
                  Pending
                </button>

                <button
                  onClick={() =>
                    updateStatus(incident.incident_id, "Investigating")
                  }
                >
                  Investigating
                </button>

                <button
                  onClick={() =>
                    updateStatus(incident.incident_id, "Resolved")
                  }
                >
                  Resolved
                </button>
              </td>

              {/* ASSIGNMENT DROPDOWN */}
              <td>
                <select
                  onChange={(e) =>
                    assignIncident(
                      incident.incident_id,
                      e.target.value
                    )
                  }
                  defaultValue=""
                >
                  <option value="" disabled>
                    Assign User
                  </option>

                  {users.map((u) => (
                    <option key={u.user_id} value={u.user_id}>
                      {u.full_name} ({u.role})
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Incidents;