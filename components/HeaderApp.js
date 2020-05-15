import React from 'react'
import {Header} from '../styles/components'

const HeaderApp = ({description, title, image}) =>
  ( <Header dropo='red'>
          <picture>
            <img src={image} className="logo" alt="logo" />
          </picture>
          <h1 className="headerTitle">{title}</h1>
          <div className="headerDescription">{description}</div>
    </Header>
  )

export default HeaderApp

