import React from "react";
import nivaranLogo from "../assets/nivaran-logo-navy.png";

const TEAM_NAME = "Runtime Terrors";
const MEMBERS = [
  { name: "Shreya Tiwari" },
  { name: "Shashwat Bajpai" },
  { name: "Harshita Sahu" },
  { name: "Aditya Vishwakarma" },
];

const initialsOf = (fullName) =>
  fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const About = () => {
  return (
    <div className="dashboard">
      <div className="greeting about-greeting">
        <img src={nivaranLogo} alt="Nivaran" className="about-logo" />
        <p className="tagline">
          A centralized platform for campus notices and complaint tracking — built for students, faculty and admins alike.
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-col">
          <section className="list-card accent-navy">
            <div className="list-card-header">
              <h2>About the Project</h2>
            </div>
            <div className="list-card-body">
              <p className="about-text">
                Nivaran replaces scattered WhatsApp groups and physical notice boards with one
                role-based web app. Students and faculty can view live notices and raise
                complaints that are tracked from submission to resolution, while admins get a
                single dashboard to post updates and manage every complaint in one place.
              </p>
            </div>
          </section>
        </div>

        <div className="dashboard-col">
          <section className="list-card accent-rust">
            <div className="list-card-header">
              <h2>Meet the Team</h2>
              <span className="count-badge">{MEMBERS.length}</span>
            </div>
            <div className="list-card-body">
              <p className="team-name-label">{TEAM_NAME}</p>
              <div className="team-grid">
                {MEMBERS.map((member) => (
                  <div className="team-member" key={member.name}>
                    <div className="team-avatar">{initialsOf(member.name)}</div>
                    <div>
                      <div className="team-member-name">{member.name}</div>
                      <div className="team-member-role">Team {TEAM_NAME}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
