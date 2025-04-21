"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async register(Nomuser, Prenomuser, email, password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await this.connection.execute('INSERT INTO users (Nomuser, Prenomuser, email, password) VALUES (?, ?, ?, ?)', [Nomuser, Prenomuser, email, hashedPassword]);
        return result;
    }
    async findUserByEmail(email) {
        const [rows] = await this.connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        return rows[0];
    }
    async validateUser(email, password) {
        const [rows] = await this.connection.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];
        if (!user) {
            console.log('Utilisateur non trouvé');
            return { success: false, reason: 'user_not_found' };
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Mot de passe incorrect');
            return { success: false, reason: 'wrong_password' };
        }
        console.log('Utilisateur validé');
        return { success: true, user };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MYSQL_CONNECTION')),
    __metadata("design:paramtypes", [Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map