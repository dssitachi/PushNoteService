export class CreateTaskDto {
    readonly taskId: number;
    readonly title: string;
    readonly description: string;
    readonly priority: string;
    readonly dueTime: string;
    readonly dueDate: string;
    readonly assignee: string;
    readonly assigneeId: string;
    readonly assignedBy: string;
    readonly status: string;
}