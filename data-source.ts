import "reflect-metadata";
import { DataSource } from "typeorm";
import { Transaction } from "./src/entities/Transaction";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,  // Puerto por defecto de PostgreSQL
  username: "postgres",
  password: "postgres",
  database: "dbantifraude",
  synchronize: true, // Sincroniza las entidades con la base de datos
  logging: false,
  entities: [Transaction],
  migrations: [],
  subscribers: [],
});
