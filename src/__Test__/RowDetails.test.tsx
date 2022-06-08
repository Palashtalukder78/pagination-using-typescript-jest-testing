import { act, render, screen } from "@testing-library/react";
import RowDetails from "../components/RowDetails"
import {createMemoryHistory} from "history";
import { Router } from "react-router-dom";

describe('Testing Row Details Comp[onent',()=>{
    test('should Render row details compomnent', async() => {
        // eslint-disable-next-line
        await act(async()=>{
            const history = createMemoryHistory();
            history.push("/post-details/2");
            render(<Router location={history.location} navigator={history}>
                <RowDetails />
            </Router>);
        })
        expect(screen.getByText('Row Details')).toBeInTheDocument();
    }); 
})