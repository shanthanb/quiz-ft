import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { uriDecodeHelper, shuffleArrayHelper, combineArrayHelper } from '../helpers'

const Question = styled.div`
    display: block;
    flex-basis: 200px;
    flex-grow: 1;
    padding: 10px 0;
`

const Content = styled.div`
        padding: 20px 0;
    `
const Answers = styled.div`
    padding: 20px 0;
`

const AnswerButton = styled.button(({ val, answer }) => (
    `${ val === answer ?
        'color: #FFFFFF; background-color: #2466b7;'
        : 'background-color: #EEEEEE;'
    }
        border: 1px solid #000000; 
        cursor: pointer;
        font-size: 14px;
        font-weight: 500;
        padding: 4px;
        border-radius: 6px;
        min-width: 150px;
        margin: 12px 0;
        width: 40%;
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;

        &:hover {
            background-color: #0c53ab;
        }
        &:nth-child(2n) {
            float: right;
        }
    `
))

const Message = styled.h3((props) => (
    `
     color: ${ props.isCorrect ? '#2466b7' : '#000000' };
     font-size: 30px;
     margin: 16px;
    `
))

const NextButton = styled.button`
    background-color: #2466b7;
    color: #FFFFFF;
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;
    padding: 10px 28px;
    border: none;
    border-radius: 6px;
    
    &:hover {
        background-color: #0c53ab;
        border: 1px solid #FFFFFF;
    }
`

export default function({ 
    type,
    question, 
    correct_answer, 
    incorrect_answers,
    nextQuestion,
    increaseScore,
}) {
    const [ correctAnswer, setCorrectAnswer ] = useState()
    const [ mixedAnswers, setMixedAnswers ] = useState([])
    const [ answer, setAnswer ] = useState()

    useEffect(() => {
        if( !correct_answer || !incorrect_answers ) return

        setCorrectAnswer( correct_answer )

        let mixedArray = shuffleArrayHelper(
            combineArrayHelper( incorrect_answers, correct_answer )
        )

        setMixedAnswers( mixedArray )
    }, [correct_answer, incorrect_answers])

    function handleAnswer( chooseAnswer ) {
        if( answer ) return

        setAnswer( chooseAnswer )        
    }

    function handleNext() {
        if ( correctAnswer === answer ) {
            increaseScore()
        }
        nextQuestion()
        setAnswer(null)
    }

    function displayResult() {
        let isCorrect = correctAnswer === answer
        return (
            answer && 
            <div style={{ textAlign: 'center' }}>
                <Message 
                    isCorrect={isCorrect} >
                    {
                        isCorrect ? "Correct" : "Sorry"
                    }
                </Message>
                <NextButton onClick={handleNext}>
                    Next Question
                </NextButton>
            </div>
        )
    }

    return (
        <Question>
            <Content>
                { uriDecodeHelper( question ) }
            </Content>
            <Answers>
                { 
                    mixedAnswers.map((val, key) => { 
                        let decodedVal = null
                        if( type === "boolean" ) {
                            decodedVal = val === "True" ? "Yes" : "No"
                        } else {                            
                            decodedVal = uriDecodeHelper( val )
                        }
                        return(
                        <AnswerButton
                            title={decodedVal}
                            key={ key }
                            val={ val}
                            answer={answer} 
                            onClick={() => { handleAnswer(val) }}>
                        { decodedVal }
                        </AnswerButton>
                        )
                    })
                }
            </Answers>
            {
                displayResult()
            }
        </Question>
    )
} 