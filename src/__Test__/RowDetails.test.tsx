/* eslint-disable testing-library/no-unnecessary-act */
import {RowDetails} from "../components/RowDetails"
import { componentRenderByMemoryRouter, toBeExpectByText } from "../utils/test"


describe('Test Row details Component',()=>{
    test('should Render row details component',()=>{
        componentRenderByMemoryRouter('/post-details/2/', <RowDetails />);
        toBeExpectByText('Row Details')
    })
})