/* eslint-disable testing-library/no-unnecessary-act */

import { act } from "@testing-library/react";
import axios from "axios"
import DataTable from "../components/DataTable";
import { mockData } from "../mockDataForTest/Mockdata"
import { ContextType } from "../model/model";
import { componentRenderByMemoryRouter, elementGetByTestId, elementGetBytext, toBeExpectByText } from "../utils/test";


describe('test the post Component', ()=>{
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

    test('should be post component', async()=>{
        await act(async()=>{
            componentRenderByMemoryRouter('/',<DataTable data={contextValue} />)
        });
        elementGetBytext('Data Table')
    });
    test('should render post list', async ()=>{
        await act(async()=>{
            componentRenderByMemoryRouter('/',<DataTable data={contextValue}/>)
        });
        elementGetByTestId('post-component-testid')
    });
    test('should render pagination', async()=>{
        await act(async()=>{
            componentRenderByMemoryRouter('/',<DataTable data={contextValue}/>)
        })
        elementGetByTestId('pagination')
    });  

    test('find post title', async()=>{
        await act(async()=>{
            componentRenderByMemoryRouter('/',<DataTable data={contextValue}/>)
        });
        toBeExpectByText('Can GPT-3 AI rite comedy')
    });
    test('find post url',async()=>{
        await act(async()=>{
            componentRenderByMemoryRouter('/',<DataTable data={contextValue}/>)
        })
        toBeExpectByText('https://robmanuelfuckyeah.substack.com/p/someone-needs-to-stop-me-playing')
    });
    test('find post Author',async()=>{
        await act(async()=>{
            componentRenderByMemoryRouter('/',<DataTable data={contextValue}/>)
        })
        toBeExpectByText('rossver')
    });
    test('find post created at',async()=>{
        await act(async()=>{
            componentRenderByMemoryRouter('/',<DataTable data={contextValue}/>)
        })
        toBeExpectByText('2022-02-12T12:10:12:000z')
    });
    test('Api test', async()=>{
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