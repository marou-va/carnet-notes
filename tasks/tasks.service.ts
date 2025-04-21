import { Injectable, Inject } from '@nestjs/common';
import { Connection } from 'mysql2/promise';

@Injectable()
export class TasksService {
  constructor(
    @Inject('MYSQL_CONNECTION') private readonly connection: Connection,
  ) {}

  async createTask(userId: number, task: { title: string }) {
    await this.connection.execute(
      'INSERT INTO tasks (user_id, title, dueDate) VALUES (?, ?, Now())',
      [userId, task.title],
    );
    return { message: 'Tâche créée' };
  }
  async updateTaskStatus(id: number, userId: number, status: string) {
    // Mise à jour de la tâche avec vérification de l'utilisateur
    await this.connection.execute(
        `UPDATE tasks 
        SET status = ?
        WHERE id = ? AND user_id = ?`,
        [status, id, userId]
    );

    // Récupération de la tâche mise à jour
    const [tasks] = await this.connection.execute<any[]>(
      `SELECT *
      FROM tasks
      WHERE id = ?`,
      [id]
  );

  if (!tasks || tasks.length === 0) {
      throw new Error('Task not found');
  }
    return tasks[0];
}
  async readAllTasks(userId: number) {
    const [rows] = await this.connection.execute(
      'SELECT * FROM tasks WHERE user_id = ?',
      [userId],
    );
    return rows;
  }

  async updateTask(
    taskId: number,
    userId: number,
    data: { title?: string; completed?: boolean },
  ) {
    await this.connection.execute(
      'UPDATE tasks SET title = ?, completed = ? WHERE id = ? AND user_id = ?',
      [data.title, data.completed, taskId, userId],
    );
    return { message: 'Tâche mise à jour' };
  }

  async deleteTask(taskId: number, userId: number) {
    const [rows] = await this.connection.execute(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [taskId, userId],
    );

    const task = Array.isArray(rows) ? rows[0] : null;
    if (!task) return { message: 'Tâche introuvable ou non autorisée' };

    await this.connection.execute(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [taskId, userId],
    );

    return { message: 'Tâche supprimée', task };
  }
}
