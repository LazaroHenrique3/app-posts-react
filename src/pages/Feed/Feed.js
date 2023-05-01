import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import HeaderMain from '../../components/HeaderMain/HeaderMain'

import './Feed.css'

const API_URL = process.env.REACT_APP_API_BASE_URL

function Feed() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        //A função só será realizada após a montagem do componente
        axios.get(`${API_URL}/list_posts`)
            .then(({ data }) => {
                setPosts(data.posts)
            })
            .catch((e) => console.log(e))
    }, [])

    function deletePost(id){
         axios.delete(`${API_URL}/delete_post/${id}`)
         .then(() => {
             setPosts(posts.filter(post => post._id !== id))
          })
         .catch((e) => console.log(e))
    }

    return (
        <div>
            <HeaderMain />

            <main>
                <div className='cards'>

                    {posts.map((post, key) => {
                        return (
                            <div className='card' key={key}>
                                <header>
                                    <h2>{post.title}</h2>
                                </header>
                                <div className='line'></div>
                                <p>{post.description}</p>
                                <div className='btns'>
                                    <div className='btn-edit'>
                                        <Link to={{pathname: `/edit/${post._id}`}}>
                                            <button>Editar</button>
                                        </Link>
                                    </div>
                                    <div className='btn-readmore'>
                                        <Link to={{pathname: `/readmore/${post._id}`}}>
                                            <button>Ler mais</button>
                                        </Link>
                                    </div>
                                    <div className='btn-delete'>
                                        <button onClick={() => deletePost(post._id)}>Excluir</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}

export default Feed
