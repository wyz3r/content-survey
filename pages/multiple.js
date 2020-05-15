import 'isomorphic-fetch'
import moment from 'moment'
import ReactGA from 'react-ga'

import Layout from '../components/Layout'
import HeaderApp from '../components/HeaderApp'
import QuizzGridMultiple from '../components/QuizzGridMultiple'
import ResultQuizzSimple from '../components/ResultQuizzSimple'
import {getCookie} from '../helpers/cookies'
import firebase from '../helpers/firebase'
import validateComunity from '../helpers/validateComunity'


export default class extends React.Component {
  
  static async getInitialProps({res, query, req}) {
    const {themeComunity, favicon} = await validateComunity(req.headers.host)
    const idQuizz = query.id
    try {
      let responseData
      if(idQuizz !== undefined) {
         responseData = await fetch(`https://adbuzz.s3-us-west-2.amazonaws.com/${idQuizz}/data.json`)
      } else {
         responseData = await fetch(`https://adbuzz.s3-us-west-2.amazonaws.com/podrias-ser-un-influencer-famoso-26/data.json`)
      }
      let {title, logo, description, preguntas, respuestas, logica} = await responseData.json()
      // const {title, logo, description, preguntas, respuestas} = payloadJson
      return { idQuizz, title, logo, description, preguntas, respuestas, statusCode:  200, themeComunity, logica, favicon }
      } catch (error) {
        res.statusCode = 500
        return { idQuizz: null, title: 'error', logo: 'error', description: 'error', logica: [], preguntas: [], respuestas: {}, statusCode: 200, themeComunity, favicon}
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
    // console.log(results)
    const resultado = {r1:results}
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
        respuestas: resultado,
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
    const { logica } = this.props
    for (let index = 0; index < logica.length; index++) {
      if( results.length >= logica[index].minvalue &&  results.length <= logica[index].maxvalue ) {
        responseKey = logica[index].responseKey
      }
    }
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
           <QuizzGridMultiple preguntas={preguntas} resultSend={this.resultSend} />
          {showResp?  <ResultQuizzSimple respuesta={respuestas[respKey] } />: ''} 
        </Layout>)

    }
  } 