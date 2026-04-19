import * as zod from "zod";
import { registerSchema } from "./register.scehma";
export type registerObjectType = zod.infer<typeof registerSchema>;
