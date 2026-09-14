import React from "react";

function TaskCard({ task, onComplete, onDelete }) {
  const isCompleted = task.status === "completed";

  return (
    <div className={`task-card card border-0 shadow-sm mb-3 ${isCompleted ? "task-done" : ""}`}>
      <div className="card-body d-flex justify-content-between align-items-start gap-3">
        <div>
          <h6 className="mb-1 task-title">{task.title}</h6>
          {task.description && (
            <p className="mb-2 text-secondary small task-desc">{task.description}</p>
          )}
          <span className={`badge status-badge ${isCompleted ? "bg-success" : "bg-warning-subtle text-warning-emphasis"}`}>
            {isCompleted ? "Completed" : "Pending"}
          </span>
        </div>

        <div className="d-flex flex-column gap-2">
          {!isCompleted && (
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => onComplete(task._id)}
            >
              Mark Completed
            </button>
          )}
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;