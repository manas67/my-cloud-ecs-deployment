import React, { useState, useEffect } from "react";

// -----------------------------------------------------------
// Cloud ECS Deployment — React Frontend
// Author: Manish Kumar
// Description: Simple React dashboard deployed to AWS ECS
// -----------------------------------------------------------

const styles = {
  app: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#0f1117",
    color: "#e0e0e0",
    minHeight: "100vh",
    padding: "40px 20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "40px",
  },
  title: {
    fontSize: "2.2rem",
    color: "#4fc3f7",
    marginBottom: "8px",
  },
  subtitle: {
    fontSize: "1rem",
    color: "#90a4ae",
  },
  badge: {
    display: "inline-block",
    backgroundColor: "#1b5e20",
    color: "#a5d6a7",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    marginTop: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
    maxWidth: "900px",
    margin: "0 auto 40px auto",
  },
  card: {
    backgroundColor: "#1c1f2e",
    borderRadius: "12px",
    padding: "24px",
    borderLeft: "4px solid #4fc3f7",
  },
  cardTitle: {
    fontSize: "0.85rem",
    color: "#90a4ae",
    marginBottom: "8px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  cardValue: {
    fontSize: "1.3rem",
    color: "#ffffff",
    fontWeight: "bold",
  },
  taskList: {
    maxWidth: "900px",
    margin: "0 auto",
    backgroundColor: "#1c1f2e",
    borderRadius: "12px",
    padding: "24px",
  },
  taskItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #2a2d3e",
  },
  taskDone: {
    backgroundColor: "#1b5e20",
    color: "#a5d6a7",
    padding: "3px 10px",
    borderRadius: "12px",
    fontSize: "0.75rem",
  },
  sectionTitle: {
    fontSize: "1.1rem",
    color: "#4fc3f7",
    marginBottom: "16px",
  },
  footer: {
    textAlign: "center",
    marginTop: "50px",
    color: "#546e7a",
    fontSize: "0.85rem",
  },
};

function App() {
  const [health, setHealth] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    fetch("/api/health")
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => setHealth({ status: "unreachable" }));

    fetch("/api/tasks")
      .then((r) => r.json())
      .then((d) => setTasks(d.tasks || []))
      .catch(() => {});

    fetch("/api/info")
      .then((r) => r.json())
      .then(setInfo)
      .catch(() => {});
  }, []);

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.title}>☁️ Cloud ECS Deployment</h1>
        <p style={styles.subtitle}>
          AWS ECS · Terraform · GitHub Actions · Docker · CloudWatch
        </p>
        <span style={styles.badge}>
          ● {health ? health.status?.toUpperCase() : "LOADING..."}
        </span>
      </div>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Author</div>
          <div style={styles.cardValue}>[YOUR NAME]</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>AWS Region</div>
          <div style={styles.cardValue}>eu-west-1</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Orchestration</div>
          <div style={styles.cardValue}>AWS ECS Fargate</div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>IaC Tool</div>
          <div style={styles.cardValue}>Terraform + Terragrunt</div>
        </div>
      </div>

      <div style={styles.taskList}>
        <div style={styles.sectionTitle}>✅ Infrastructure Tasks</div>
        {tasks.length === 0 ? (
          <p style={{ color: "#546e7a" }}>Loading tasks from API...</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} style={styles.taskItem}>
              <div>
                <div style={{ color: "#e0e0e0" }}>{task.title}</div>
                <div style={{ fontSize: "0.8rem", color: "#546e7a" }}>
                  {task.service}
                </div>
              </div>
              <span style={styles.taskDone}>{task.status}</span>
            </div>
          ))
        )}
      </div>

      <div style={styles.footer}>
        <p>
          Built by [YOUR NAME] · Deployed on AWS ECS ·{" "}
          {info ? `v${info.version || "1.0.0"}` : ""}
        </p>
      </div>
    </div>
  );
}

export default App;
