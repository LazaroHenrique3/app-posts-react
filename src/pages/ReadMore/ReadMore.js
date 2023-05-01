import {useParams} from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react';

import Header from "../../components/Header/Header"

const API_URL = process.env.REACT_APP_API_BASE_URL

function ReadMore(){

    const {id} = useParams()

    const [post, setPost] = useState([])

    useEffect(() => {
        axios.get(`${API_URL}/show_post/${id}`)
        .then(({data}) => {
            setPost(data.post)
        })
        .catch((e) =>  {
            console.log(e)
        })
    }, [])


    return (
        <div>
            <Header/>

            <main>
                <div className='cards'>

                    <div className='card'>
                        <header>
                            <h2>{post.title}</h2>
                        </header>
                        <div className='line'></div>
                        <p>{post.content}</p>
                    </div>

                </div>
            </main>
        </div>
    )
}

export default ReadMore