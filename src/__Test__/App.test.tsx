/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react"
import axios from "axios"
import { ReactChild, ReactElement } from "react"
import { MemoryRouter } from "react-router-dom"
import App from "../App"
import { mockData } from "../mockDataForTest/Mockdata"

export const RenderingByMemoryRouter = async (
    routingPath : string | '',
    componentName: ReactElement | ReactChild
)=>{
    render(
        <MemoryRouter initialEntries={[routingPath]}>
            {componentName}
        </MemoryRouter>
    );
};

describe('Testing app component', ()=>{
    beforeEach(()=>{
        jest.spyOn(axios,'get').mockResolvedValue({
            data:{
                hits:[mockData[0]]
            }
        })
    })

    test('Rendering app component properly',async()=>{
        await act(async()=>{
            RenderingByMemoryRouter('/',<App />)
        })
        expect(screen.getByTestId('app-component-testid')).toBeInTheDocument();
    });

    test('Rendering home component',async()=>{
        await act(async()=>{
            RenderingByMemoryRouter('/',<App />)
        });
        expect(screen.getByText('Data Table')).toBeInTheDocument();
    });

    test('Rendering postDetails component', async()=>{
        await act(async()=>{
            RenderingByMemoryRouter('/post-details/2/',<App />)
        })
        expect(screen.getByText('Row Details')).toBeInTheDocument();

    });
    test('Rendering 404 page', async()=>{
        await act(async()=>{
            RenderingByMemoryRouter('/post-details/2/gsdsd',<App />);
        });
        expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    });
})