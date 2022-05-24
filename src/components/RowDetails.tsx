import React from 'react';
import { useLocation } from 'react-router-dom';
import { PostType } from '../model/model';

export const RowDetails = () => {
    const {state} = useLocation();
    const post = state as PostType;
    return (
        <div data-testid="row-details-testid"> 
            <h1>Row Details</h1>
            <pre>{JSON.stringify(post,null,2)}</pre>
        </div>
    );
};

export default RowDetails;