export const TASKS_LIST = [
    { id: "TASK-001", title: "Fix login page responsive issues", description: "The login form breaks on mobile devices", status: "todo", priority: "high", assignee: "SA", dueDate: "2026-01-14", labels: ["bug"] },
    { id: "TASK-002", title: "Fix notification sound bug", description: "Sound plays twice on some devices", status: "todo", priority: "low", assignee: "JD", dueDate: "2026-01-12", labels: ["bug"] },
    { id: "TASK-003", title: "Add forgot password", description: "Users cannot reset their password", status: "todo", priority: "medium", assignee: "AS", dueDate: null, labels: ["feature"] },
    { id: "TASK-004", title: "Improve login accessibility", description: "Keyboard navigation issues", status: "todo", priority: "medium", assignee: "SA", dueDate: null, labels: ["improvement"] },
    
    { id: "TASK-009", title: "Security audit fixes", description: "Address issues from security audit", status: "in-progress", priority: "high", assignee: "SA", dueDate: "2026-01-14", labels: ["bug", "urgent"] },
    
    { id: "TASK-013", title: "Database migration script", description: "Migrate user data to new schema", status: "done", priority: "high", assignee: "SA", dueDate: null, labels: ["feature"] },
    
    { id: "TASK-022", title: "Performance optimization", description: "Improve page load times", status: "backlog", priority: "low", assignee: "", dueDate: null, labels: ["improvement"] },
    { id: "TASK-012", title: "Update user profile API", description: "Add new fields for user preferences", status: "review", priority: "medium", assignee: "AS", dueDate: null, labels: ["improvement"] },
    { id: "TASK-034", title: "Refactor auth middleware", description: "Clean up the authentication logic for better readability", status: "review", priority: "high", assignee: "JD", dueDate: "2026-01-20", labels: ["improvement", "urgent"] },

];

export const TASK = [{
    id: "TASK-999",
    title: "Full Labels Testing",
    description: "Task containing every possible label for UI testing",
    status: "backlog",
    priority: "medium",
    assignee: "AS",
    dueDate: "2026-12-31",
    labels: ["bug", "feature", "improvement", "urgent"]
}];