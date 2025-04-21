import { Module } from '@nestjs/common';
import { createConnection } from 'mysql2/promise';

@Module({
  providers: [
    {
      provide: 'MYSQL_CONNECTION',
      useFactory: async () => {
        return await createConnection({
          host: 'localhost',
          user: 'root',
          password: '',
          database: 'carnet_notes',
        });
      },
    },
  ],
  exports: ['MYSQL_CONNECTION'],
})
export class DatabaseModule {}

