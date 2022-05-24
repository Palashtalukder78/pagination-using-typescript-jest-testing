/* eslint-disable testing-library/no-unnecessary-act */
import { act } from "@testing-library/react"
import axios from "axios"
import App from "../App"
import { mockData } from "../mockDataForTest/Mockdata"
import { componentRenderByMemoryRouter, toBeExpectByTestId, toBeExpectByText} from "../utils/test"


describe('test for app component', ()=>{
    beforeEach(()=>{
        jest.spyOn(axios,'get').mockResolvedValue({
            data:{
                hits:[mockData[0]]
            }
        })
    })

    test('renders app component properly',async()=>{
        await act(async()=>{
            componentRenderByMemoryRouter('/',<App />)
        })
        toBeExpectByTestId('app-component-testid')
    });

    test('should render home component',async()=>{
        await act(async()=>{
            componentRenderByMemoryRouter('/',<App />)
        });
        toBeExpectByText('Data Table')
    });

    test('should render postDetails component', async()=>{
        await act(async()=>{
            componentRenderByMemoryRouter('/post-details/2/',<App />)
        })
        toBeExpectByText('Row Details')
    });
    test('should render 404 page', async()=>{
        await act(async()=>{
            componentRenderByMemoryRouter('/post-details/2/gsdsd',<App />);
        });
        toBeExpectByText('404 Not Found')
    });
})