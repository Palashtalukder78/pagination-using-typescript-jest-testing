import { Container, Pagination, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataProps, PostType } from '../model/model';

const DataTable = ({data}: DataProps) => {
    const {posts,handlePageChange,page,currentPage,rowsPerPage,handleError} = data;
    const navigate = useNavigate();

    const rowDetails = (post: PostType)=>{
        navigate(`/post-details/${post.objectID}`, {state:post})
    }
    return (
       <Container maxWidth='xl' data-testid="post-component-testid">
           <h1>Data Table</h1>
           {
               posts.length > 0 ? (
                   <div>
                       <TableContainer component={Paper}>
                        <Table sx={{minWidth:680 }} aria-label="simple-table">
                            <TableHead>
                                <TableRow style={{background:"gray"}}>
                                    <TableCell align='center'>Title</TableCell>
                                    <TableCell align='center'>Url</TableCell>
                                    <TableCell align='center'>Author</TableCell>
                                    <TableCell align='center'>Created_at</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    posts.slice(rowsPerPage*(page-1), rowsPerPage*(page-1)+rowsPerPage).map((
                                        postData:PostType,
                                        i: React.Key | null | undefined
                                    )=>(
                                        <TableRow key={i} onClick={()=>rowDetails(postData)} data-testid="click-testid">
                                            <TableCell component="th" scope="row" data-testid="title-testid">
                                                {postData.title}
                                            </TableCell>
                                            <TableCell data-testid="url-testid">
                                                {postData.url}
                                            </TableCell>
                                            <TableCell data-testid="author-testid">
                                                {postData.author}
                                            </TableCell>
                                            <TableCell data-testid="created-at-testid">
                                                {postData.created_at}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                       </TableContainer>
                       <Stack spacing={2}>
                            <Pagination
                                count={currentPage}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                data-testid="pagination"
                                style={{margin:"15px auto"}}
                            />
                       </Stack>
                   </div>
               )
               :
               (
                   <h3>
                       {''}
                       {
                           handleError ? "Data Not Fount" : "Loading new Post Data"
                       }
                   </h3>
               )
           }
       </Container>
    );
};

export default DataTable;