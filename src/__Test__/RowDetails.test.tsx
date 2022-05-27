/* eslint-disable testing-library/no-unnecessary-act */
import { screen } from "@testing-library/react";
import {RowDetails} from "../components/RowDetails"
import { RenderingByMemoryRouter } from "./App.test";

describe('Testing Row details Component',()=>{
    test('should Render row details component',()=>{
        RenderingByMemoryRouter('/post-details/2/', <RowDetails />);
        expect(screen.getByText('Row Details')).toBeInTheDocument();
    })
})