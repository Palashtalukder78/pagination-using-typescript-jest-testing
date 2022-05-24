import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import DataTable from './components/DataTable';
import RowDetails from './components/RowDetails';
import { ContextType, PostType } from './model/model';

function App() {
  const rowsPerPage = 20;
  const [posts,setPosts] = useState<PostType[]>([]);
  const [pageNumber,setPageNumber] = useState<number>(0);
  const [page,setPage] = useState<number>(1);
  const [currentPage,setCurrentPahe] = useState<number>(1);

  const [handleError,setHandleError] = useState<boolean>(false);


  const postData = useCallback(async()=>{
    try{
      const res = await axios.get(
          `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageNumber}`
        );

        posts.length === 0 ? setHandleError(true)
        :
        setHandleError(false);
        setPosts((posts)=> [...posts, ...res.data.hits])
    }
    catch(err){
      setHandleError(true)
    }
    //eslint-disable-next-line
  },[pageNumber])

  //handle page change/update
  const handlePageChange = (
    _event : React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
  }

  useEffect(()=>{
    postData();
    const interval = setInterval(()=>{
      setPageNumber((pageNumber)=>pageNumber+1)
    },10000)
    return ()=> clearInterval(interval)
  },[postData])

  useEffect(()=>{
    setCurrentPahe(parseInt((posts.length/rowsPerPage).toString()))
  },[posts])

  const contextValue:ContextType = {
    posts,handlePageChange,page,currentPage,rowsPerPage,handleError
  }
  return (
    <div className="App" data-testid="app-component-testid">
      <Routes>
        <Route path='/' element={<DataTable data={contextValue}/>}/>
        <Route path="/post-details/:id" element={<RowDetails />}/>
        <Route path="*" element={<p>404 Not Found</p>}/>
      </Routes>
    </div>
  );
}

export default App;
