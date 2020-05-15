import 'isomorphic-fetch'
import moment from 'moment'
import ReactGA from 'react-ga'

import Layout from '../components/Layout'
import HeaderApp from '../components/HeaderApp'
import QuizzGridSimple from '../components/QuizzGridSimple'
import ResultQuizzSimple from '../components/ResultQuizzSimple'
import {getCookie} from '../helpers/cookies'
import firebase from '../helpers/firebase'
import validateComunity from '../helpers/validateComunity'


export default class extends React.Component {
  
  static async getInitialProps({res, query, req}) {
    console.log('construyye cache index')
    const {themeComunity, favicon} = await validateComunity(req.headers.host)
    const idQuizz = query.id
    try {
      let responseData
      if(idQuizz !== undefined) {
         responseData = await fetch(`https://adbuzz.s3-us-west-2.amazonaws.com/${idQuizz}/data.json`)
      } else {
         responseData = await fetch(`https://adbuzz.s3-us-west-2.amazonaws.com/podrias-ser-un-influencer-famoso-26/data.json`)
      }
      let payloadJson = await responseData.json()
      const {title, logo, description, preguntas, respuestas} = payloadJson
     
      // console.log(description)
      return { idQuizz, title, logo, description, preguntas, respuestas, statusCode:  200, themeComunity, favicon }
      } catch (error) {
        res.statusCode = 500
        return { idQuizz: null, title: 'error', logo: 'error', description: 'error', preguntas: [], respuestas: {}, statusCode: 200, themeComunity, favicon}
      }
  }

  constructor(props) {
    super(props);
    this.state = { 
      showResp: false,
      respKey: '',
      fechaInicio: moment().format('MMMM Do YYYY, h:mm:ss a')
    };
  }
  componentDidMount () {
    ReactGA.initialize('UA-46508407-15')
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
   
  }
  resultSend = (results) => {
    const { idQuizz } = this.props
    const { fechaInicio } = this.state

    const fechaTermino = moment().format('MMMM Do YYYY, h:mm:ss a')
    const getCookieGA = (cb) => {
      const gaCookie = getCookie('_ga')
      if (gaCookie && gaCookie.length > 0) {
        cb(gaCookie)
      } else {
        setTimeout(() => {
          getCookieGA(cb)
        }, 500)
      }
    }
    const sendData = (gaCookie) => {
      const type = this.calculateResult(results)
      firebase.firestore().collection(idQuizz).doc(gaCookie).set({
        type,
        respuestas: results,
        fechaInicio,
        fechaTermino
      }).then((docRef) => {
        // this.props.history.push("/")
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      })
    }
      
    getCookieGA(sendData)
    this.calculateResult(results)
  }

  calculateResult = (results) => {
    let responseKey = ''
    const countAnswer = {}
    Object.keys(results).forEach((llaves) => {
      if( countAnswer[results[llaves]] === undefined ) {
        countAnswer[results[llaves]] = 1 
      } else {
        countAnswer[results[llaves]] += 1 
      }
    })

    Object.keys(countAnswer).forEach((llave, indexNum) => {
      if(indexNum === 0 ) {
        responseKey = llave
      }
      if(indexNum !== 0 && countAnswer[responseKey] < countAnswer[llave] ) {
          responseKey = llave
      }
    })
    this.setState({
      showResp: true,
      respKey: responseKey
    })
    return responseKey
  }
    render() {
      const { title, logo, description, statusCode, preguntas, respuestas, themeComunity, favicon } = this.props
      
      const { showResp, respKey } = this.state
      if( statusCode !== 200 ) {
        return <Error statusCode={statusCode} />
      }
      return (
        <Layout title={title} image={logo} description={description} themeComunity={themeComunity} favicon={favicon}>
          <HeaderApp title={title} image={logo} description={description}/>
          <QuizzGridSimple preguntas={preguntas} resultSend={this.resultSend} />
         {showResp?  <ResultQuizzSimple respuesta={respuestas[respKey] } />: ''}
        </Layout>)

    }
  } 