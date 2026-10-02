import React from "react";

// Plain-text greeting header shown at the top of each dashboard —
// time-aware ("Good morning/afternoon/evening, Name.") plus a short
// status pill summarizing the page's current state.
const PageHeader = ({ name, tagline, status, tone = "ok" }) => {
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="greeting">
      <h1>{timeGreeting}{name ? `, ${name}` : ""}.</h1>
      {tagline && <p className="tagline">{tagline}</p>}
      {status && (
        <span className={`status-pill ${tone}`}>
          <span className="dot" />
          {status}
        </span>
      )}
    </div>
  );
};

export default PageHeader;
