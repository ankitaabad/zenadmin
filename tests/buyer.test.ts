import { fakeUser } from '../fake/data';
import { fetchClient } from './../src/apis/mergedContract';
import { expect, test, describe, it } from 'vitest'



describe("buyers flow", () => {
  it("get all sellers", async () => {
    const { body, status } = await fetchClient.buyer.getSellers()
    console.log({body})
    expect(status).toBe(200)
    
  })
})