/* eslint-disable testing-library/no-unnecessary-act */

import { act, render, screen } from "@testing-library/react"
import axios from "axios"
import DataTable from "../components/DataTable"
import { ContextType } from "../model/model"
import {createMemoryHistory} from "history";
import { Router } from "react-router-dom"
import { mockData } from "../mockDataForTest/Mockdata";


describe('Testing the Data Table Component',()=>{
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value:number
    )=>{}

    beforeEach(()=>{
        jest.spyOn(axios, 'get').mockResolvedValue({
            data:{
                hits:[mockData[0]]
            }
        })
    })

    const contextValue: ContextType = {
        posts: mockData,
        handlePageChange,
        page: 1,
        currentPage: 1,
        rowsPerPage: 20,
        handleError: false
    }

    test('Rendering Data Table component', async() => {
        // eslint-disable-next-line
        await act(async()=>{
            const history = createMemoryHistory();
            history.push("/");

            render(<Router location={history.location} navigator={history}>
                <DataTable data={contextValue} />
            </Router>);
        })
        screen.getByText('Data Table')
    }); 
    test('Rendering list', async() => {
        // eslint-disable-next-line
        await act(async()=>{
            const history = createMemoryHistory();
            history.push("/");

            render(<Router location={history.location} navigator={history}>
                <DataTable data={contextValue} />
            </Router>);
        })
        screen.getByTestId('post-component-testid')
    }); 
    test('Rendering Pagination', async() => {
        // eslint-disable-next-line
        await act(async()=>{
            const history = createMemoryHistory();
            history.push("/");

            render(<Router location={history.location} navigator={history}>
                <DataTable data={contextValue} />
            </Router>);
        })
        screen.getByTestId('pagination')
    }); 
    test('finding Data Table', async() => {
        // eslint-disable-next-line
        await act(async()=>{
            const history = createMemoryHistory();
            history.push("/");

            render(<Router location={history.location} navigator={history}>
                <DataTable data={contextValue} />
            </Router>);
        })
        expect(screen.getByText('Can GPT-3 AI rite comedy')).toBeInTheDocument();
    }); 
    test('finding Data url', async() => {
        // eslint-disable-next-line
        await act(async()=>{
            const history = createMemoryHistory();
            history.push("/");
            render(<Router location={history.location} navigator={history}>
                <DataTable data={contextValue} />
            </Router>);
        })
        expect(screen.getByText('https://robmanuelfuckyeah.substack.com/p/someone-needs-to-stop-me-playing')).toBeInTheDocument();
    }); 
    test('finding Data Author', async() => {
        // eslint-disable-next-line
        await act(async()=>{
            const history = createMemoryHistory();
            history.push("/");
            render(<Router location={history.location} navigator={history}>
                <DataTable data={contextValue} />
            </Router>);
        })
        expect(screen.getByText('rossver')).toBeInTheDocument();
    }); 
    test('finding Data created at', async() => {
        // eslint-disable-next-line
        await act(async()=>{
            const history = createMemoryHistory();
            history.push("/");
            render(<Router location={history.location} navigator={history}>
                <DataTable data={contextValue} />
            </Router>);
        })
        expect(screen.getByText('2022-02-12T12:10:12:000Z')).toBeInTheDocument();
    }); 
    test('api testing', async()=>{
        const res = await axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${0}`);
        expect(res.data).toBeDefined();
        expect(res.data).toBeDefined();
        expect(res.data.hits[0].title).toBe(mockData[0].title);
        expect(res.data.hits[0].url).toBe(mockData[0].url);
        expect(res.data.hits[0].author).toBe(mockData[0].author);
        expect(res.data.hits[0].created_at).toBe(mockData[0].created_at);
    })
})
