import React, {useState, useEffect} from 'react'
import {AnswerCardMultiple,
  AnswerCardMultipleImagen,
    PreguntaQuizz,
    HeaderPreguntas,
    ContentAnswersMultiple,
    QuizzContainer,
    RequestButtonMulti
} from '../styles/components'

const QuizzGridMultiple = ({preguntas, resultSend}) => {
  const [respuestasObj, setRespuestasObj] = useState([])
  const [sendRequest, setSendRequest] = useState(false)

  const send = () => {
    setSendRequest(true)
    resultSend(respuestasObj)
  }
  const answerHandle = (clave) => {
    if(sendRequest) return
    if(respuestasObj.indexOf(clave) !== -1){ 
      respuestasObj.splice(respuestasObj.indexOf(clave), 1)
      setRespuestasObj(respuestasObj =>[...respuestasObj] )
      return
    }
    setRespuestasObj(respuestasObj => [...respuestasObj, clave]);
  }
  const typeQuestion = (type, respuestas, answerHandle, respuestasObj) => {
      return respuestas.map(({text, key }) => {
        return(
        <AnswerCardMultiple
          key={'card'+key}
          onClick={() => answerHandle(key)}
          className={ respuestasObj.indexOf(key) !== -1 ?  'active': 'inactive' }
          > 
          <div className='square' />
          <div className={''}> {text } </div>
        </AnswerCardMultiple>)
      })
  }
  
  return (
    <QuizzContainer>
      {preguntas.map(
        ({type,pregunta, respuestas }, index) => {
          return (
            <PreguntaQuizz key={pregunta} >
              <HeaderPreguntas>
                {pregunta}
              </HeaderPreguntas>
              <ContentAnswersMultiple className={respuestasObj['r'+ parseInt(1 + index)] === undefined ? '' : 'done'} >
                {typeQuestion(type, respuestas, answerHandle, respuestasObj)}
              </ContentAnswersMultiple>

            </PreguntaQuizz>
          )
        }
         ) 
        }
      <RequestButtonMulti onClick={() => {send()} }>
        Acabé de elegir 
      </RequestButtonMulti>
    </QuizzContainer>
  )
}

export default QuizzGridMultiple