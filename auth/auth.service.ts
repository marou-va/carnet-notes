import { Inject, Injectable } from '@nestjs/common';
import { Connection } from 'mysql2/promise';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('MYSQL_CONNECTION') private readonly connection: Connection,
  ) {}

  async register(Nomuser: string, Prenomuser: string, email: string, password: string) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await this.connection.execute(
      'INSERT INTO users (Nomuser, Prenomuser, email, password) VALUES (?, ?, ?, ?)',
      [Nomuser, Prenomuser, email, hashedPassword], 
    );
    return result;
  }

  async findUserByEmail(email: string) {
    const [rows] = await this.connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email],
    );
    return (rows as any[])[0];
  }

  async validateUser(email: string, password: string): Promise<{ success: boolean; reason?: string; user?: any }> {
    const [rows] = await this.connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email],
    );

    const user = (rows as any[])[0];

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
}
