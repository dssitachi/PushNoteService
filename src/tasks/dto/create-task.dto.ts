export class CreateTaskDto {
    readonly id: number;
    readonly title: string;
    readonly description: string;
    readonly priority: string;
    readonly dueTime: string;
    readonly dueDate: string;
    readonly assignee: string;
    readonly assignedBy: string;
    readonly status: string;
}