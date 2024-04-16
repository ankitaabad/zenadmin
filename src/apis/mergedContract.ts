import { initClient, initContract } from "@ts-rest/core";
import { authContract } from "./auth/contract";
const c = initContract()
export const mergedContract = c.router({
  "auth": authContract
})

export const fetchClient = initClient(mergedContract,{baseUrl:"http://localhost:3000"})
