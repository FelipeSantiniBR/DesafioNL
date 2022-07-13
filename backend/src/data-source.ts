import "reflect-metadata"
import { DataSource } from "typeorm"
import { Tasks } from "./entity/tasks"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "123456789a",
    database: "db_todolist",
    synchronize: true,
    logging: false,
    entities: [Tasks],
    migrations: [],
    subscribers: [],
})
