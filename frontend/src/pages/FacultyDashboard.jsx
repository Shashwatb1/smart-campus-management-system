import React, { useState } from "react";
import API from "../api/axios.js";
import PageHeader from "../components/PageHeader.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import usePolling from "../hooks/usePolling.js";

// Faculty share the same underlying permissions as students on the backend
// (view notices, raise complaints, track only their own) — but this page
// gives them their own dedicated space and framing rather than reusing the
// student view verbatim.
const FacultyDashboard = () => {
  const { user } = useAuth();
  const [notices, setNotices] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState({ category: "Infrastructure", description: "" });
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const [noticesRes, complaintsRes] = await Promise.all([
        API.get("/notices"),
        API.get("/complaints"),
      ]);
      setNotices(noticesRes.data);
      setComplaints(complaintsRes.data);
    } catch (err) {
      console.error("Failed to load faculty dashboard data", err);
    }
  };

  usePolling(fetchData, 15000);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.post("/complaints", form);
      setForm({ category: "Infrastructure", description: "" });
      setMessage("Issue reported successfully");
      fetchData();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to submit issue");
    }
  };

  const openCount = complaints.filter((c) => c.status !== "Resolved").length;
  const status = openCount === 0
    ? "You're all caught up. No open complaints."
    : `You have ${openCount} open issue${openCount > 1 ? "s" : ""} being tracked.`;

  return (
    <div className="dashboard">
      <PageHeader
        name={user?.name}
        tagline="Share updates with the campus and raise issues that need attention."
        status={status}
        tone={openCount === 0 ? "ok" : "info"}
      />

      <div className="dashboard-grid">
        <div className="dashboard-col">
          <section className="list-card accent-navy">
            <div className="list-card-header">
              <h2>Notice Board</h2>
              <span className="count-badge">{notices.length}</span>
            </div>
            <div className="list-card-body">
              {notices.length === 0 ? (
                <div className="empty-state">
                  <strong>No notices yet</strong>
                  <p>New announcements from faculty and admin will appear here.</p>
                </div>
              ) : (
                <ul className="notice-list">
                  {notices.map((n) => (
                    <li key={n._id}>
                      <strong>{n.title}</strong>
                      <p>{n.content}</p>
                      <span className="meta">
                        by {n.postedBy?.name} · {new Date(n.createdAt).toLocaleDateString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="list-card accent-rust">
            <div className="list-card-header">
              <h2>My Complaints</h2>
              <span className="count-badge">{complaints.length}</span>
            </div>
            <div className="list-card-body">
              {complaints.length === 0 ? (
                <div className="empty-state">
                  <strong>Nothing raised yet</strong>
                  <p>If something needs attention, use the form to tell us.</p>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Raised On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((c) => (
                      <tr key={c._id}>
                        <td>{c.category}</td>
                        <td>{c.description}</td>
                        <td>
                          <span className={`status-badge status-${c.status.replace(" ", "-").toLowerCase()}`}>
                            {c.status}
                          </span>
                        </td>
                        <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>

        <div className="dashboard-col">
          <section className="action-card accent-rust-border">
            <h2>Raise a Complaint</h2>
            <p className="action-desc">Tell us what's wrong and the admin team will pick it up.</p>
            {message && <p className="info-text">{message}</p>}
            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={handleChange}>
                  <option>Infrastructure</option>
                  <option>Academics</option>
                  <option>Hostel</option>
                  <option>Faculty</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="field-group">
                <label>What happened?</label>
                <textarea
                  name="description"
                  placeholder="Describe the issue in a few sentences"
                  value={form.description}
                  onChange={handleChange}
                  maxLength={500}
                  required
                />
                <div className="char-counter">{form.description.length}/500</div>
              </div>
              <button type="submit" className="btn btn-rust btn-block">Submit Complaint</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
