import { NotesService } from './notes.service';
import { Request } from 'express';
export declare class NotesController {
    private readonly notesService;
    constructor(notesService: NotesService);
    getAllNotes(req: Request): Promise<import("mysql2").QueryResult>;
    getNote(id: string, req: Request): Promise<import("mysql2").OkPacket | import("mysql2").ResultSetHeader | import("mysql2").RowDataPacket | import("mysql2").RowDataPacket[] | null>;
    createNote(req: Request, body: {
        title: string;
        content: string;
    }): Promise<{
        message: string;
    }>;
    updateNote(id: string, req: Request, body: {
        title?: string;
        content?: string;
    }): Promise<{
        message: string;
    }>;
    deleteNote(id: string, req: Request): Promise<{
        message: string;
        note?: undefined;
    } | {
        message: string;
        note: import("mysql2").OkPacket | import("mysql2").ResultSetHeader | import("mysql2").RowDataPacket | import("mysql2").RowDataPacket[];
    }>;
}
