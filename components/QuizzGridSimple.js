import React, {useState, useEffect} from 'react'
import {AnswerCard, AnswerImgCard, PreguntaQuizz, HeaderPreguntas, ContentAnswers, QuizzContainer} from '../styles/components'

const QuizzGridSimple = ({preguntas, resultSend}) => {
  const [respuestasObj, setRespuestasObj] = useState({})

  useEffect(() => {
    if(Object.keys(respuestasObj).length === preguntas.length && preguntas.length !== 0) {
      resultSend(respuestasObj)
    }
  }, [respuestasObj])

  const answerHandle = (numRespuesta, clave) => {
    if(Object.keys(respuestasObj).length !== preguntas.length){
        respuestasObj[numRespuesta] = clave
        setRespuestasObj(prevState => {
          return { ...prevState}
        })
    }
  }
  const typeQuestion = (type, respuestas, numberR, answerHandle, respuestasObj) => {
    const identificador = 'r'+ parseInt(1 + numberR)
    if (type === 'text') {
      return respuestas.map(({text, key }) => {
        return(
        <AnswerCard
          key={'card'+key}
          className={(respuestasObj[identificador] === key)  ? 'active' : 'inactive'}
          onClick={() => answerHandle(identificador, key)}
          > 
          {text}
        </AnswerCard>)
      })
    } 
    else if (type === 'image') {
      return respuestas.map(({text, key, image }) => {
        return(
        <AnswerImgCard
          key={key}
          className={(respuestasObj[identificador] === key)  ? 'active' : 'inactive'} 
          onClick={() => answerHandle(identificador, key)}
          > 
          <div className='imgContent'>
            <img alt='meme' src={image} />
          </div>
          <div className='textimg'>
            {text}
          </div>
        </AnswerImgCard>)
      })
    }
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
              <ContentAnswers className={respuestasObj['r'+ parseInt(1 + index)] === undefined ? '' : 'done'} >
                {typeQuestion(type, respuestas, index, answerHandle, respuestasObj)}
              </ContentAnswers>
            </PreguntaQuizz>
          )
        }
         ) 
        }
    </QuizzContainer>
  )
}

export default QuizzGridSimple