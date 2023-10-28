export class CreateMessageDto {
    readonly message: string;
    readonly sender: string;
    readonly receiver: string;
    readonly timestamp: Date;
    readonly taskId: string;
}
