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
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
let TasksService = class TasksService {
    connection;
    constructor(connection) {
        this.connection = connection;
    }
    async createTask(userId, task) {
        await this.connection.execute('INSERT INTO tasks (user_id, title) VALUES (?, ?)', [userId, task.title]);
        return { message: 'Tâche créée' };
    }
    async updateTaskStatus(id, userId, status) {
        await this.connection.execute(`UPDATE tasks 
        SET status = ?
        WHERE id = ? AND user_id = ?`, [status, id, userId]);
        const [tasks] = await this.connection.execute(`SELECT *
      FROM tasks
      WHERE id = ?`, [id]);
        if (!tasks || tasks.length === 0) {
            throw new Error('Task not found');
        }
        return tasks[0];
    }
    async readAllTasks(userId) {
        const [rows] = await this.connection.execute('SELECT * FROM tasks WHERE user_id = ?', [userId]);
        return rows;
    }
    async updateTask(taskId, userId, data) {
        await this.connection.execute('UPDATE tasks SET title = ?, completed = ? WHERE id = ? AND user_id = ?', [data.title, data.completed, taskId, userId]);
        return { message: 'Tâche mise à jour' };
    }
    async deleteTask(taskId, userId) {
        const [rows] = await this.connection.execute('SELECT * FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
        const task = Array.isArray(rows) ? rows[0] : null;
        if (!task)
            return { message: 'Tâche introuvable ou non autorisée' };
        await this.connection.execute('DELETE FROM tasks WHERE id = ? AND user_id = ?', [taskId, userId]);
        return { message: 'Tâche supprimée', task };
    }
};
exports.TasksService = TasksService;
exports.TasksService = TasksService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('MYSQL_CONNECTION')),
    __metadata("design:paramtypes", [Object])
], TasksService);
//# sourceMappingURL=tasks.service.js.map