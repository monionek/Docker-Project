import { Sequelize } from 'sequelize';
import config from '../config/config';

export const sequelize = new Sequelize(
  config.dbName,
  config.dbUser,
  config.dbPass,
  {
    host: config.dbHost, // contener name from docker-compose
    dialect: 'postgres',
  }
);
export const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected");
    await sequelize.sync({ alter: true });
    console.log("🛠️ Models synced");
  } catch (err) {
    console.error("❌ PostgreSQL connection error:", err);
  }
};