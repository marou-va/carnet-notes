import { Connection } from 'mysql2/promise';
export declare class TasksService {
    private readonly connection;
    constructor(connection: Connection);
    createTask(userId: number, task: {
        title: string;
    }): Promise<{
        message: string;
    }>;
    updateTaskStatus(id: number, userId: number, status: string): Promise<any>;
    readAllTasks(userId: number): Promise<import("mysql2/promise").QueryResult>;
    updateTask(taskId: number, userId: number, data: {
        title?: string;
        completed?: boolean;
    }): Promise<{
        message: string;
    }>;
    deleteTask(taskId: number, userId: number): Promise<{
        message: string;
        task?: undefined;
    } | {
        message: string;
        task: import("mysql2/promise").OkPacket | import("mysql2/promise").ResultSetHeader | import("mysql2/promise").RowDataPacket | import("mysql2/promise").RowDataPacket[];
    }>;
}
