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
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
let NotesService = class NotesService {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async createNote(userId, note) {
        await this.connection.execute('INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)', [userId, note.title, note.content]);
        return { message: 'Note created' };
    }
    async readAllNotes(userId) {
        const [rows] = await this.connection.execute('SELECT * FROM notes WHERE user_id = ?', [userId]);
        return rows;
    }
    async readNote(noteId, userId) {
        const [rows] = await this.connection.execute('SELECT * FROM notes WHERE id = ? AND user_id = ?', [noteId, userId]);
        const result = Array.isArray(rows) ? rows[0] : null;
        return result || null;
    }
    async update(noteId, userId, updatedNote) {
        await this.connection.execute('UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?', [updatedNote.title, updatedNote.content, noteId, userId]);
        return { message: 'Note mise à jour' };
    }
    async delete(noteId, userId) {
        const [rows] = await this.connection.execute('SELECT * FROM notes WHERE id = ? AND user_id = ? LIMIT 1', [noteId, userId]);
        const note = Array.isArray(rows) ? rows[0] : null;
        if (!note)
            return { message: 'Note introuvable ou non autorisée' };
        await this.connection.execute('DELETE FROM notes WHERE id = ? AND user_id = ?', [noteId, userId]);
        return { message: 'Note supprimée', note };
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MYSQL_CONNECTION')),
    __metadata("design:paramtypes", [Object])
], NotesService);
//# sourceMappingURL=notes.service.js.map