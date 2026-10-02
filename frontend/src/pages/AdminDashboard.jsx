import React, { useEffect, useState } from "react";
import API from "../api/axios.js";
import PageHeader from "../components/PageHeader.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [notices, setNotices] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [noticeForm, setNoticeForm] = useState({ title: "", content: "" });
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const [statsRes, noticesRes, complaintsRes] = await Promise.all([
        API.get("/complaints/stats"),
        API.get("/notices"),
        API.get("/complaints"),
      ]);
      setStats(statsRes.data);
      setNotices(noticesRes.data);
      setComplaints(complaintsRes.data);
    } catch (err) {
      console.error("Failed to load admin data", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleNoticeChange = (e) => {
    setNoticeForm({ ...noticeForm, [e.target.name]: e.target.value });
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await API.post("/notices", noticeForm);
      setNoticeForm({ title: "", content: "" });
      setMessage("Notice posted");
      fetchData();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to post notice");
    }
  };

  const handleDeleteNotice = async (id) => {
    try {
      await API.delete(`/notices/${id}`);
      fetchData();
    } catch (err) {
      console.error("Failed to delete notice", err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await API.patch(`/complaints/${id}/status`, { status });
      fetchData();
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const status = !stats
    ? ""
    : stats.pending > 0
      ? `${stats.pending} complaint${stats.pending > 1 ? "s" : ""} awaiting review.`
      : "No pending complaints — nice work.";

  return (
    <div className="dashboard">
      <PageHeader
        name={user?.name}
        tagline="Post notices and manage incoming complaints."
        status={status}
        tone={stats && stats.pending > 0 ? "warning" : "ok"}
      />

      {stats && (
        <section className="stats-grid">
          <div className="stat-box">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Complaints</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{stats.inProgress}</span>
            <span className="stat-label">In Progress</span>
          </div>
          <div className="stat-box">
            <span className="stat-number">{stats.resolved}</span>
            <span className="stat-label">Resolved</span>
          </div>
        </section>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-col">
          <section className="list-card accent-navy">
            <div className="list-card-header">
              <h2>All Notices</h2>
              <span className="count-badge">{notices.length}</span>
            </div>
            <div className="list-card-body">
              {notices.length === 0 ? (
                <div className="empty-state">
                  <strong>No notices yet</strong>
                  <p>Notices you post will show up here for everyone to see.</p>
                </div>
              ) : (
                <ul className="notice-list">
                  {notices.map((n) => (
                    <li key={n._id}>
                      <strong>{n.title}</strong>
                      <p>{n.content}</p>
                      <button className="btn btn-danger" onClick={() => handleDeleteNotice(n._id)}>
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="list-card accent-rust">
            <div className="list-card-header">
              <h2>All Complaints</h2>
              <span className="count-badge">{complaints.length}</span>
            </div>
            <div className="list-card-body">
              {complaints.length === 0 ? (
                <div className="empty-state">
                  <strong>Nothing reported yet</strong>
                  <p>Complaints raised by students and faculty will appear here.</p>
                </div>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>Raised By</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complaints.map((c) => (
                      <tr key={c._id}>
                        <td>{c.raisedBy?.name}</td>
                        <td>{c.category}</td>
                        <td>{c.description}</td>
                        <td>
                          <span className={`status-badge status-${c.status.replace(" ", "-").toLowerCase()}`}>
                            {c.status}
                          </span>
                        </td>
                        <td>
                          <select
                            value={c.status}
                            onChange={(e) => handleStatusChange(c._id, e.target.value)}
                          >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </div>

        <div className="dashboard-col">
          <section className="action-card">
            <h2>Post a Notice</h2>
            <p className="action-desc">Everyone on campus will see it on their dashboard.</p>
            {message && <p className="info-text">{message}</p>}
            <form onSubmit={handleNoticeSubmit}>
              <div className="field-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Library hours this weekend"
                  value={noticeForm.title}
                  onChange={handleNoticeChange}
                  required
                />
              </div>
              <div className="field-group">
                <label>Message</label>
                <textarea
                  name="content"
                  placeholder="Write the details here"
                  value={noticeForm.content}
                  onChange={handleNoticeChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-navy btn-block">Post Notice</button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
