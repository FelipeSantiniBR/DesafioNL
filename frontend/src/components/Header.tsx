import React from "react";

import NLlogo from '../assets/nl2.jpg'
import '../styles/Header.css'

const Header: React.FC = () => {
  return(
    <div className="header">
      <img src={NLlogo} alt='logo'/>
      <div className="headerTitle">
        Gerenciador de Tarefas
      </div>
    </div>
  )
}

export default Header