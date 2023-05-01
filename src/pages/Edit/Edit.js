import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom';

import Header from "../../components/Header/Header"
import { useEffect } from 'react';

//Defino quais validações vão ser feitas
const validationPost =  yup.object().shape({
    title:  yup.string().required("O título é obrigatório").max(40, "Máximo 40 caracteres."),
    description: yup.string().required("A descrição é obrigatória").max(150, "Máximo 150 caracteres"),
    content: yup.string().required("O contúdo é obrigatório").max(500, "Máximo 500 caracteres")
})

const API_URL = process.env.REACT_APP_API_BASE_URL

function Edit() {

    const {id} = useParams()

    let navigate = useNavigate()

    //Register: Avisa quais são os inputs do formulario que vamos registrar
    //handleSubmit: Lida com o envio das informações
    //errors: Serve para dar avisos de erro durante a validação
    const {register, handleSubmit, formState: {errors}, reset } = useForm({
        resolver: yupResolver(validationPost)
    })

    useEffect(() => {
        axios.get(`${API_URL}/show_post/${id}`)
        .then(({data}) => {
            reset(data.post)
        })
        .catch((e) =>  {
            console.log(e)
        })
    }, [])

    const updatePost = data => axios.patch(`${API_URL}/update_post/${id}`, data)
    .then(() => {
        navigate("/")
    })
    .catch((e) => {
        console.log(e)
    })

    return (
        <div>
            <Header />
            <main>
                <div className='card-post'>
                    <h1>Editar postagem</h1>
                    <div className='line-post'></div>

                    <div className='card-body-post'>
                        <form onSubmit={handleSubmit(updatePost)}>
                            <div className='fields'>
                                <label>Título</label>
                                <input type="text" name="title" {...register("title")} />
                                <small className='error-message'>{errors.title?.message}</small >
                            </div>

                            <div className='fields'>
                                <label>Descrição</label>
                                <input type="text" name="description" {...register("description")} />
                                <small className='error-message'>{errors.description?.message}</small >
                            </div>

                            <div className='fields'>
                                <label>Conteúdo</label>
                                <textarea type="text" name="content" {...register("content")}></textarea>
                                <small className='error-message'>{errors.content?.message}</small >
                            </div>

                            <div className='btn-post'>
                                <button type='submit'>Editar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Edit
