import { Connection } from 'mysql2/promise';
export declare class AuthService {
    private readonly connection;
    constructor(connection: Connection);
    register(Nomuser: string, Prenomuser: string, email: string, password: string): Promise<[import("mysql2/promise").QueryResult, import("mysql2/promise").FieldPacket[]]>;
    findUserByEmail(email: string): Promise<any>;
    validateUser(email: string, password: string): Promise<{
        success: boolean;
        reason?: string;
        user?: any;
    }>;
}
