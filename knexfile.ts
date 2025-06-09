import type { Knex } from 'knex';
import path from 'path';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'db', 'dev.sqlite3'),
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'db', 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'db', 'seeds'),
    },
  },
};

export default config; 