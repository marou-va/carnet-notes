import { Connection } from 'mysql2/promise';
export declare class NotesService {
    private readonly connection;
    constructor(connection: Connection);
    createNote(userId: number, note: {
        title: string;
        content: string;
    }): Promise<{
        message: string;
    }>;
    readAllNotes(userId: number): Promise<import("mysql2/promise").QueryResult>;
    readNote(noteId: number, userId: number): Promise<import("mysql2/promise").OkPacket | import("mysql2/promise").ResultSetHeader | import("mysql2/promise").RowDataPacket | import("mysql2/promise").RowDataPacket[] | null>;
    update(noteId: number, userId: number, updatedNote: {
        title?: string;
        content?: string;
    }): Promise<{
        message: string;
    }>;
    delete(noteId: number, userId: number): Promise<{
        message: string;
        note?: undefined;
    } | {
        message: string;
        note: import("mysql2/promise").OkPacket | import("mysql2/promise").ResultSetHeader | import("mysql2/promise").RowDataPacket | import("mysql2/promise").RowDataPacket[];
    }>;
}
