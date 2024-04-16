import { fakeUser } from '../fake/data';
import { fetchClient } from './../src/apis/mergedContract';
import { expect, test, describe, it } from 'vitest'



describe("auth flow", () => {
  it("will create a buyer", async () => {
    const {username} = fakeUser()
    const { body, status } = await fetchClient.auth.register({ body: { type: "BUYER", username } })
    console.log({body})
    expect(status).toBe(201)
    expect(body).toHaveProperty("id")
  })
})