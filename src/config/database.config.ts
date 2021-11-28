import { ConfigModule } from "@nestjs/config";
import config from "./orm.config";

export const databaseConfig = ConfigModule.forRoot(config)