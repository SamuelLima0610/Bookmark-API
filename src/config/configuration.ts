export default () => ({
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        password: process.env.DATABASE_PASSWORD,
        database: 'bookmark',
        entities: [],
        synchronize: true,
    }
  });