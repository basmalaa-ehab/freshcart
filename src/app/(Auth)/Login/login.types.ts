import * as zod from "zod";
import { loginScehma } from "./login.scehma";
export type loginObjectType = zod.infer<typeof loginScehma>;
