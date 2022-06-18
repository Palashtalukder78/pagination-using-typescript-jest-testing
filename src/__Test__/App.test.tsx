/* eslint-disable testing-library/no-unnecessary-act */

import { act, render, screen } from "@testing-library/react";
import axios from "axios";
import {  Router } from "react-router-dom";
import App from "../App";
import {createMemoryHistory} from "history";
import { mockData } from "../mockDataForTest/Mockdata";

describe('Testing app component',()=>{
    beforeEach(()=>{
        jest.spyOn(axios,'get').mockResolvedValue({
            data:{
                hits:[mockData[0]]
            }
        })
    })
    test('Rendering App Component properly', async() => {
        // eslint-disable-next-line
        await act(async()=>{
            const history = createMemoryHistory();
            history.push("/");
            render(<Router location={history.location} navigator={history}>
                <App />
            </Router>);
        })
        const appId = screen.getByTestId("app-component-testid");
        expect(appId).toBeInTheDocument();
    }); 
    test('Rendering Home Component', async() => {
        // eslint-disable-next-line
        await act(async()=>{
            const history = createMemoryHistory();
            history.push("/");
            render(<Router location={history.location} navigator={history}>
                <App />
            </Router>);
        })
        const appText = screen.getByText("Data Table");
        expect(appText).toBeInTheDocument();
    }); 
    test('Rendering Post Details Component', async() => {
        // eslint-disable-next-line
       await act(async()=>{
            const history = createMemoryHistory();
            history.push("/post-details/2/");
            render(<Router location={history.location} navigator={history}>
                <App />
            </Router>);
       })
        const appText = screen.getByText("Row Details");
        expect(appText).toBeInTheDocument();
    }); 
    test('rendering 404 not Page', async() => {
        // eslint-disable-next-line
        await act(async()=>{
            const history = createMemoryHistory();
            history.push("/post-details/2/asfsdgsg");
            render(<Router location={history.location} navigator={history}>
                <App />
            </Router>);
        })
        expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    }); 
})