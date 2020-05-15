
import React, {useEffect} from 'react'
import {ResultContainer} from '../styles/components'

const ResultQuizzSimple = ({respuesta}) => {
  useEffect(() => {
    window.scrollTo({top: 10000, left: 0, behavior: 'smooth' });
  }, [])
  return (
    <ResultContainer id='showresult' >
      <div className='resultadoTitle'>
        Tu resultado
      </div>
      <div className='resultContent'>
        <div className='resultSide'>
          <h2 className='resultTitle'>
            {respuesta.name}
          </h2>
          <div className='resultDescription'>
            <p>{respuesta.description}</p>
          </div>
        </div>
        <div className='resultSide imgagen'>
          <img src={respuesta.image} />
        </div>
      </div>
  </ResultContainer>
  )
}


export default ResultQuizzSimple