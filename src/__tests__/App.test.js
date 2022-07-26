import App from "../App";
import React, { useEffect, useState } from 'react';
import { shallow } from "enzyme"
import { rest } from "msw" 
import { setupServer } from "msw/node"
import { createWaitForElement } from "enzyme-wait"

const server = setupServer()
describe("Testing .....", () => {
    
    beforeAll(() => {
        server.listen()
    })

    afterEach(() => {
        server.resetHandlers()
    })

    beforeEach(() => {
        shallow(<App />)
    })

    afterAll(() => {
        server.close()
    })

    const mocksetState = jest.fn();
    const useStateSpy = jest.spyOn(React, "useState");
    useStateSpy.mockImplementation((initialState) => [initialState, mocksetState]);

    it("component rendering", () => {
        const component = shallow(<App />)
        const listExist = component.find("h1").exists()
        expect(listExist).toBe(true)
        expect(component).toMatchSnapshot()
    });
    
    test("When state data is changed ", () => {
        const component = shallow(<App />)
        expect(mocksetState).not.toHaveBeenCalled();
    })
    
    test("Api working properly", (done) => {
        const waitForData = createWaitForElement("div")
        server.use(rest.get(`https://jsonplaceholder.typicode.com/users/1`, (req, res, ctx) => {
            return res(ctx.json([{ id : 1 , name: "MOck"}])) 
        }))
        const component = shallow(<App />)
        waitForData(component).then((component) => {
            console.log("IN");
            expect(component).toMatchSnapshot()
            done()
        })
    })

})