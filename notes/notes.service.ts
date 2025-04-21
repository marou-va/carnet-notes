import { Inject,Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';

@Injectable()
export class NotesService {
    constructor(
    @Inject('MYSQL_CONNECTION') private readonly connection: Connection,
  ) {}
    async createNote(userId:number,note:{ title:string, content:string }) {
    await this.connection.execute(
        'INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)',
        [userId, note.title, note.content]
    );
    return { message: 'Note created' };
    }
    async readAllNotes(userId: number) {
      const [rows] = await this.connection.execute(
        'SELECT * FROM notes WHERE user_id = ?',
        [userId],
      );
      return rows;
    }
    async readNote(noteId:number, userId:number){
      const [rows] = await this.connection.execute(
        'SELECT * FROM notes WHERE id = ? AND user_id = ?',
        [noteId, userId]
      );
    
      const result = Array.isArray(rows) ? rows[0] : null;
      return result || null;
    }
    async update(
      noteId: number,
      userId: number,
      updatedNote: { title?: string; content?: string }
    ) {
      await this.connection.execute(
        'UPDATE notes SET title = ?, content = ? WHERE id = ? AND user_id = ?',
        [updatedNote.title, updatedNote.content, noteId, userId]
      );
      return { message: 'Note mise à jour' };
    }
    
    async delete(noteId: number, userId: number) {
      const [rows] = await this.connection.execute(
        'SELECT * FROM notes WHERE id = ? AND user_id = ? LIMIT 1',
        [noteId, userId]
      );
    
      const note = Array.isArray(rows) ? rows[0] : null;
      if (!note) return { message: 'Note introuvable ou non autorisée' };
    
      await this.connection.execute(
        'DELETE FROM notes WHERE id = ? AND user_id = ?',
        [noteId, userId]
      );
    
      return { message: 'Note supprimée', note };
    }
    
}

