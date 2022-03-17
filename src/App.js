import React, { useEffect, useMemo, useState } from "react";
import PostList from "./components/PostList";
import "./styles/App.css"
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostsFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/buttons/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostServise from "./API/PostServise";
import Loader from "./components/UI/Loader/Loader";
import { useFetching } from "./hooks/useFetching";
import { getPageCount, getPagesArray } from "./utils/pages";
import Pagination from "./components/UI/pagination/Pagination";



function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState( {sort: '', query: ''} )
    const [modal, setModal] = useState(false);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    

    const [fetchPosts, isPostsLoading, postError] = useFetching( async() => {
        const response = await PostServise.getAll(limit, page);
        const totalCount = response.headers['x-total-count']
        setPosts(response.data)
        setTotalPages(getPageCount(totalCount, limit));
    }) 

    

    useEffect( () => {
      fetchPosts()
    }, [page])


    function createPost(newPost) {
      setPosts( [...posts, newPost])
      setModal(false)
    }

    function removePost (post) {
      setPosts(posts.filter(p => p.id !== post.id))
    }

    function changePage(page) {
      setPage(page)
    }
 
  
    return (
      <div className="App">
        
        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
          Create post
        </MyButton>

        <MyModal visible={modal} setVisible={setModal}>
              <PostForm create={createPost}/>
        </MyModal>
        
        
        <hr style={{margin: '15px 0'}}/>

        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        {postError &&
            <h1>Error type : ${postError}</h1>
        }

        {isPostsLoading
            ? <div className="loaderInApp">
                  <Loader/>
                  {/* <div className="txt_loader"><h1>Loading...</h1></div> */}
              </div>

            : <PostList remove={removePost} 
            posts={sortedAndSearchedPosts} title='Posts of Js'/>
        }
        
        <Pagination 
          page={page} 
          changePage={changePage}
          totalPages={totalPages}
        />
      </div>        
    );
}

export default App;