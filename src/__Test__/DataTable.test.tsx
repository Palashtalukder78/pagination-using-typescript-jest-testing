/* eslint-disable testing-library/no-unnecessary-act */

import { act, screen } from "@testing-library/react";
import axios from "axios"
import DataTable from "../components/DataTable";
import { mockData } from "../mockDataForTest/Mockdata"
import { ContextType } from "../model/model";
import { RenderingByMemoryRouter } from "./App.test";

describe('testing the Data Table Component', ()=>{
    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        value: number
    )=>{}

    beforeEach(()=>{
        jest.spyOn(axios,'get').mockResolvedValue({
            data:{
                hits: [mockData[0]]
            },
        });
    });

    const contextValue: ContextType = {
        posts: mockData,
        handlePageChange,
        page: 1,
        currentPage: 1,
        rowsPerPage: 20,
        handleError: false
    }

    test('Rendering data table component', async()=>{
        await act(async()=>{
            RenderingByMemoryRouter('/',<DataTable data={contextValue} />)
        });
        screen.getByText('Data Table');
    });
    test('Rendering list', async ()=>{
        await act(async()=>{
            RenderingByMemoryRouter('/',<DataTable data={contextValue}/>)
        });
        screen.getByTestId('post-component-testid')
    });
    test('Rendering pagination', async()=>{
        await act(async()=>{
            RenderingByMemoryRouter('/',<DataTable data={contextValue}/>)
        })
        screen.getByTestId('pagination')
    });  

    test('Finding data title', async()=>{
        await act(async()=>{
            RenderingByMemoryRouter('/',<DataTable data={contextValue}/>)
        });
        expect(screen.getByText('Can GPT-3 AI rite comedy')).toBeInTheDocument();
    });
    test('Finding data url',async()=>{
        await act(async()=>{
            RenderingByMemoryRouter('/',<DataTable data={contextValue}/>)
        })
        expect(screen.getByText('https://robmanuelfuckyeah.substack.com/p/someone-needs-to-stop-me-playing')).toBeInTheDocument();
    });
    test('Finding data Author',async()=>{
        await act(async()=>{
            RenderingByMemoryRouter('/',<DataTable data={contextValue}/>)
        })
        expect(screen.getByText('rossver')).toBeInTheDocument();
    });
    test('Finding data created at',async()=>{
        await act(async()=>{
            RenderingByMemoryRouter('/',<DataTable data={contextValue}/>)
        })
        expect(screen.getByText('2022-02-12T12:10:12:000z')).toBeInTheDocument();
    });
    test('Api testing', async()=>{
        const res = await axios.get(
            `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${0}`
        );
        expect(res.data).toBeDefined();
        expect(res.data).toBeDefined();
        expect(res.data.hits[0].title).toBe(mockData[0].title);
        expect(res.data.hits[0].url).toBe(mockData[0].url);
        expect(res.data.hits[0].author).toBe(mockData[0].author);
        expect(res.data.hits[0].created_at).toBe(mockData[0].created_at);
    })

})