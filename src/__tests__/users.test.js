import getData from '../utils/users';

it("Data is correct", () => {	
	const data = getData()
	expect(data).toBe("Hey I am a user");
})