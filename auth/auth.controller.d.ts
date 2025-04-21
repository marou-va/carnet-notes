import { AuthService } from './auth.service';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(body: {
        Nomuser: string;
        Prenomuser: string;
        email: string;
        password: string;
    }): Promise<[import("mysql2").QueryResult, import("mysql2").FieldPacket[]]>;
    login(body: {
        email: string;
        password: string;
    }, req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    getProfile(req: Request, res: Response): Response<any, Record<string, any>>;
    logout(req: Request, res: Response): void;
}
