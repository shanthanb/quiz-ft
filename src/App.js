import React, { useState, useEffect } from 'react'
import './App.css'
import styled from 'styled-components'

import ProgressBar from './components/ProgressBar'
import Title from './components/Title'
import Question from './components/Question'
import ScoreBar from './components/ScoreBar'

import { shuffleArrayHelper, calcPercentHelper } from './helpers'

const Container = styled.div`
  border: 5px solid #eeeeee;  
  display: flex;
  flex-direction: column;
  height: 600px;
  margin: 50px auto;
  min-width: 500px;
  width: 40%;  
`

const Content = styled.div`
  display: flex;
  flex-grow: 1;  
  flex-direction: column;
  padding: 40px; 60px;
  text-align: left;
`
const Finish = styled.div`
  color: #2466b7;
  flex-grow: 1;
  font-size: 24px;
  font-weight: 500;
  padding: 40px;
  text-align: center;
`

function App () {
  const [ questions, setQuestions ]             = useState([])
  const [ currentQuestion, setCurrentQuestion ] = useState({})
  const [ currentNumber, setCurrentNumber ]     = useState(0)
  const [ score, setScore ]                     = useState(0)
  const [ finieshed, setFinished ]              = useState(false)

  useEffect(() => {
    loadQuestions()
  }, [])

  useEffect(() => {
    if( questions.length ) {
      setCurrentQuestion(questions[currentNumber])
    }
  }, [
    questions, 
    currentNumber,
  ])

  function initialState() {
    setQuestions([])
    setCurrentQuestion({})
    setCurrentNumber(0)
    setScore(0)
    setFinished(false)
  }

  function handleStart() {
    // Initialize the states
    initialState()
    
    loadQuestions()
  }

  function loadQuestions() {
    // Load the Questions Data from Server
    fetch('/questions.json')
      .then(function( res ) {
        return res.json()
      }).then(function(questions) {
        let loadedQuestions = questions
        
        setQuestions( 
          shuffleArrayHelper( loadedQuestions )
        )
      }).catch(function(ex) {
        console.log('parsing failed', ex)
      })
  }

  function handleNextQuestion() {
    let nextNumber = currentNumber + 1
    if( nextNumber < questionCount ) {
      setCurrentNumber(nextNumber)
    } else {
      setFinished(true)
    }
  }

  function handleIncreaseScore() {
    setScore(( score + 1 ))
  }

  let { type, question, category, difficulty, correct_answer, incorrect_answers } = currentQuestion
  let questionCount = questions.length
  
  let titleProps = {
    questionNumber: currentNumber,
    questionCount,
    category,
    difficulty,
  }

  let questionProps = {
    type,
    question,
    correct_answer,
    incorrect_answers,
    nextQuestion:       handleNextQuestion,
    increaseScore:      handleIncreaseScore,
  }

  let progressBarProps = {
    questionNumber: currentNumber + 1,
    questionCount
  }

  let scoreBarProps = {
    score,
    questionNumber: currentNumber,
    questionCount,
  }

  return (
    <div className='App'>
      <Container>
        <ProgressBar {...progressBarProps} />
        { 
          finieshed ?
          <Finish onClick={handleStart}>
            { calcPercentHelper( score, questionCount ) }% Completed!
            <br/>
            Click to Start again!
          </Finish> :
          <Content>
            <Title {...titleProps} />
            <Question {...questionProps} />
            <ScoreBar {...scoreBarProps} />
          </Content>
        }
      </Container>
    </div>
  )
}

export default App
