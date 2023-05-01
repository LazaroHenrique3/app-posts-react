import { Link } from "react-router-dom"
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'

import './Header.css'

function Header() {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <span className="btn-back">
                        <BsFillArrowLeftCircleFill/>
                    </span>
                </Link>
            </div>
        </header>
    )
}

export default Header