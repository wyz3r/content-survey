import styled from "styled-components";

export const Header = styled.header`
    background-color: ${(props) => props.theme.hbg};
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    -ms-flex-direction: column;
    flex-direction: column;
    padding: 30px 30px;
    color: #fff;
    -ms-flex-align: center;
    align-items: center;
    img {
      width: 90%;
      max-width: 450px;
      margin-bottom: 20px;
    }
    .headerTitle{
      font-size: 3em;
      text-align: center;
      margin-top: 0;
      margin-bottom: 0;
      
    }
    .headerDescription{
      max-width: 600px;
      font-size: 25px;
      text-align: center;
      margin-top: 15px;
    }
    @media (max-width: 768px) {
      padding: 29px 15px;

      .headerTitle{
          font-size: 2em;
        text-align: left;
      }
      .headerDescription{
        font-size: 1.2rem;
        text-align: left;
      }
      img {
        width: 100%;
        
      }
  }
`
export const QuizzContainer = styled.div `
    max-width: 700px;
    width: 96%;
    margin: auto;
    width: 96%;
    margin: 30px auto;
`
export const PreguntaQuizz = styled.div`
    margin: 40px 0;
    max-width: 700px;
`
export const HeaderPreguntas = styled.h2 `
    background-color: ${(props) => props.theme.hpbg};
    color: #fff;
    padding: 20px 20px;
    text-align: center;
    font-weight: 600;
    font-size: 41px;
    margin: 10px 0px;
    @media (max-width: 768px) {
    font-size: 29px;
    text-align: left;
    padding: 10px 10px;
  }
`
export const ContentAnswers = styled.div `
    display: grid;
    grid-template-columns: minmax(150px, 50%) minmax(150px, 50%);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-auto-rows: minmax(150px, auto);
    &.done{
      .inactive{
        -webkit-filter: opacity(.5);
        filter: opacity(.5);
      }
    }
    @media (max-width: 768px) {
      grid-auto-rows: minmax(150px, auto);
    }
`
export const ContentAnswersMultiple = styled.div `
    display: grid;
    grid-template-columns: minmax(150px, 100%) ;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-auto-rows: minmax(50px, auto);
    &.done{
      .inactive{
        -webkit-filter: opacity(.5);
        filter: opacity(.5);
      }
    }
    @media (max-width: 768px) {
      grid-auto-rows: minmax(50px, auto);
    }
`
export const ContentAnswersMImg = styled.div `
    display: grid;
    /* grid-template-columns: minmax(180px, 50%) minmax(180px, 50%) ; */
    grid-template-columns: minmax(180px, 100%) minmax(180px, 100%) minmax(180px, 100%) ;

    grid-column-gap: 10px;
    grid-row-gap: 10px;
    grid-auto-rows: minmax(50px, auto); 
    &.done{
      .inactive{
        -webkit-filter: opacity(.5);
        filter: opacity(.5);
      }
    }
    @media (max-width: 768px) {
      grid-auto-rows: minmax(50px, auto);
    /* grid-template-columns: minmax(114px, auto) minmax(114px, auto)  minmax(114px, auto) ; */
    grid-template-columns: minmax(114px, auto) minmax(114px, auto)  minmax(114px, auto) ;


    }
`
// export const AnswerCardMleImg = styled.div `
//     /* background: ${(props) => props.theme.acbg}; */
//     padding: 10px;
//     text-align: left;
//     /* font-weight: bold; */
//     color: black;
//     display: flex;
//     flex-direction: column;
//     align-items: left;
//     justify-content: left;
//     align-self: stretch;
//     align-items: left;
//     border: 1px solid #f0f0f0;
//     cursor: pointer;
    
//     .imgcontent{
//      width: 158.8px;
//      height: 158.8px;
//       margin-left: auto;
//       margin-right: auto;
//       overflow: hidden;
//      img{
//        width: 100%;
//      }
//     }
//     .circle{ 
//       width: 13px;
//       height: 13px;
//       border: 1px solid black ;
//       border-radius: 50%;
//       margin-top: 10px;
//       margin-bottom: 10px;
//     }
//     .text{
//       font-size: 1.1rem;
//       width: 100%;
//     }
//     &.active {
//       color: white;
//       background-color: #0f65ef;
//       .text{
//      }
//       .circle{
//         background: black;
//       }
//     }
    
//     @media (max-width: 768px) {
//       font-size: 1rem;
//       .text{
//       font-size: 1rem;
//       width: 100%;
//     }
//     .imgcontent{
//         width: 96.3px;
//         height: 96.3px;
//         img{
//           width: 100%;
//         }
//       }
//     }
// `
export const AnswerCardMleImg = styled.div `
    text-align: left;
    position: relative;
    padding-top: 0;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: left;
    align-self: stretch;
    align-items: left;
    border: 1px solid #f0f0f0;
    cursor: pointer;
    .imgcontent{
     width: 298.8px;
     height: 237.8px;
      width: 100%;
      overflow: hidden;
     img{
       width: 100%;
     }
    }
    .square{ 
      border: 2px solid white;
      width: 24px;
      height: 24px;
      position:absolute;
      top: 10px;
      left: 15px;
      background: transparent;
    }
    .text-content{
      padding: 10px;
      .text {
        font-size: 1rem;
        width: 100%;
        font-weight: bold;
        word-wrap: break-word;
        
        overflow: hidden;
      }
    }
    
    &.active {
      color: white;
      background-color: #0f65ef;
      .text{
      
     }
      .square{
        background: #0f65ef;
        &::after {
          content: "✔";
          margin-left: 5px;
          color: ${(props) => props.theme.rbg};
          color: white;
          font-size: 20px;
          @media (max-width: 768px) {
            font-size: 15px;
          }
        }
      }
    }
    
    @media (max-width: 768px) {
      .text-content{
        .text{
        font-size: 16px;
        width: 100%;
      }
    }
    .square{
      width: 20px;
      height: 20px;
      left: 10px;
      font-size: 10px;
      
    }
    .imgcontent{
        width: 96.3px;
        height: 96.3px;
        width:  100%;
        padding: 0;
        img{
          width: 100%;
        }
      }
    }
`
export const AnswerCardMultiple = styled.div `
    /* background: ${(props) => props.theme.acbg}; */
    padding: 10px;
    text-align: left;
    /* font-weight: bold; */
    color: black;
    display: flex;
    align-items: right;
    justify-content: right;
    align-self: stretch;
    border: 1px solid black;
    align-items: center;
    border: 1px solid #f0f0f0;
    font-size: 1.425rem;
    cursor: pointer;
    
    .square {
      border: 1px solid black;
      width: 30px;
      height: 30px;
      margin-right: 10px;
      border-radius: 7px;
      max-width: 30px;
      min-width: 30px;
      margin-top: auto;
      margin-bottom: auto;
      
    }
    &.active {
      color: ${(props) => props.theme.rbg};
      .square{
        &::after {
          content: "✔";
          margin-left: 5px;
          color: ${(props) => props.theme.rbg};
          font-size: 25px;
        }
      }
    }
    
    @media (max-width: 768px) {
    font-size: 1.225rem;
      
    }
`
export const RequestButtonMulti = styled.button `
  background-color: ${(props) => props.theme.hbg};
  width: 100%;
  font-size: 1em;
  padding: 20px;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  &.active{
    
  }
`
export const AnswerCard = styled.div `
    background: ${(props) => props.theme.acbg};
    padding: 10px;
    text-align: center;
    font-weight: bold;
    color: white;
    font-size: 33px;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    cursor: pointer;
    @media (max-width: 768px) {
      font-size: calc( 50px / 2.5);
    }
`


export const AnswerImgCard = styled.div `
    padding: 10px;
    background: white;
    text-align: center;
    font-weight: bold;
    font-size: 33px;
    display: flex;
    flex-direction: column;
    align-items: stat;
    justify-content: start;
    cursor: pointer;
    &.inactive{
      /* background: rgba(103, 188, 185, .5); */
    }
    .imgContent {
      height: 200px;
      width: 100%;
      margin: 10px auto;
      img{
        width: 100%;
        object-fit: contain;
        height: 100%;
      }
      
    }
    .textimg {
        color: black;
        font-size: 20px;
        font-weight:400;
      }

    @media (max-width: 768px) {
      font-size: calc( 50px / 2.5);
      .imgContent {
        width: 100%;
        height: 120px;
        margin: 10px auto;
      img{
        width: 100%;
        object-fit: contain;
        height: 100%;
      }
      
    }
    .textimg {
        color: black;
        font-size: 15px;
        font-weight:400;
      }
    }
`
export const ResultContainer = styled.div `
    width: 96%;
    max-width: 700px;
    margin: auto;
    background-color: ${(props) => props.theme.rbg};
    margin-bottom: 30px;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 60px auto;
    padding: 10px;
    .resultadoTitle{
      font-size: 30px;
      text-align: center;
      text-transform: uppercase;
      font-weight: bold;
      grid-column-start: span 2;
      justify-content: center;
      align-self: center;
    }
    .resultContent {
      grid-column-start: span 2;
      display: flex;
      width: 100%;
      .resultSide {
        background: white;
        width: 50%;
        padding: 10px;
        &.imgagen{
          padding: 0px;
        }
       img{
         width: 100%;
         max-width: 400px;
       }
      }
    }
    @media (max-width: 768px) {
      grid-template-columns: 100%;
      width: 86%;
      .resultContent {
        flex-direction: column;
        .resultSide {
          width: 100%;
          padding: 0px;
          .resultTitle{
            margin-left: 10px;
          }
          .resultDescription{
            margin-left: 10px;
            margin-right: 10px;
          }
        }
      }
  }
`