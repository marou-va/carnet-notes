import { TasksService } from './tasks.service';
import { Request } from 'express';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(req: Request, body: {
        title: string;
        status: string;
        dueDate: Date;
    }): Promise<{
        message: string;
    }>;
    findAll(req: Request): Promise<import("mysql2").QueryResult>;
    update(id: string, req: Request, body: {
        title?: string;
        completed?: boolean;
    }): Promise<{
        message: string;
    }>;
    updateStatus(id: string, req: Request, body: {
        status: string;
    }): Promise<any>;
    delete(id: string, req: Request): Promise<{
        message: string;
        task?: undefined;
    } | {
        message: string;
        task: import("mysql2").OkPacket | import("mysql2").ResultSetHeader | import("mysql2").RowDataPacket | import("mysql2").RowDataPacket[];
    }>;
}
