export enum TaskStatus {
    Backlog = 'Backlog',
    Todo = 'To do',
    InProgress = 'In Progress',
    Review = 'Review',
    Done = 'Done'
}

export enum TaskPriority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High'
}

export enum TaskLabel {
    Bug = 'Bug',
    Feature = 'Feature',
    Improvement = 'Improvement',
    Urgent = 'Urgent'
}

export const USERS = {
    Saumyadip: {
        fullName: 'Saumyadip',
        shortName: 'SA'
    },
    JohnDoe: {
        fullName: 'John Doe',
        shortName: 'JD'
    },
    AliceSmith: {
        fullName: 'Alice Smith',
        shortName: 'AS'
    }
} as const


export enum ContextMenuAction {
    Edit = 'Edit',
    Duplicate = 'Duplicate',
    CopyLink = 'CopyLink',
    MoveToTodo = 'MoveToTodo',
    MoveToInProgress = 'MoveToInProgress',
    MoveToDone = 'MoveToDone',
    Delete = 'Delete'
}

//export type User = typeof USERS[keyof typeof USERS]