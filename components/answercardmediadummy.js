<AnswerCardMleImg
    key={'card'+key}
    onClick={() => answerHandle(key)}
    className={ respuestasObj.indexOf(key) !== -1 ?  'active': 'inactive' }
    >
    <div className='imgcontent'>
    <img src={image}/>
    </div>
    <div>
    <div className='circle' />
    <div className='text'>{text}</div>
    </div>
</AnswerCardMleImg>



export const AnswerCardMleImg = styled.div `
    /* background: ${(props) => props.theme.acbg}; */
    padding: 10px;
    text-align: left;
    /* font-weight: bold; */
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
     width: 158.8px;
     height: 158.8px;
      margin-left: auto;
      margin-right: auto;
      overflow: hidden;
     img{
       width: 100%;
     }
    }
    .circle{ 
      width: 13px;
      height: 13px;
      border: 1px solid black ;
      border-radius: 50%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .text{
      font-size: 1.1rem;
      width: 100%;
    }
    &.active {
      color: white;
      background-color: #0f65ef;
      .text{
     }
      .circle{
        background: black;
      }
    }
    
    @media (max-width: 768px) {
      font-size: 1rem;
      .text{
      font-size: 1rem;
      width: 100%;
    }
    .imgcontent{
        width: 96.3px;
        height: 96.3px;
        img{
          width: 100%;
        }
      }
    }
`