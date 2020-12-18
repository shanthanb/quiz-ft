import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { calcPercentHelper } from '../helpers'

const Status = styled.div(({ float }) => (`
    color: #494949;
    font-size: 18px;
    padding: 8px;
    float: ${ float || 'left' };
`))

const ScoreBar = styled.div`
    display: flex;
    width: 100%;
    height: 28px;
    border: 2px solid #06428c;
    border-radius: 4px;
`

const ScoreBarCorrect = styled.div(({width}) => `
    width: ${width}%;
    height: 100%;
    background-color: #06428c;
    float: left;
`)

const ScoreBarFinished = styled.div(({width}) => `
    width: ${width}%;
    height: 100%;
    background-color: #358bf5;
    float: left;
`)
    

const ScoreBarExpect = styled.div(({width}) => `
    width: ${width}%;
    height: 100%;
    background-color: #d0d0d0;
    float: left;
`)

function Score ({
    score,
    questionCount,
    questionNumber,
}) {

    const [correctBarVal, setCorrectBarVal] = useState(0)
    const [finishedBarVal, setFinishedBarVal] = useState(0)
    const [expect, setExpect] = useState(0)
    const [expectBarVal, setExpectBarVal] = useState(0)

    useEffect(() => {
        if( typeof score !== "undefined" ) {
            let correct = calcPercentHelper( score, questionCount )
                , finish = calcPercentHelper( score, questionNumber )
                , expect = calcPercentHelper(( questionCount - questionNumber + score ), questionCount )
            
            setCorrectBarVal( correct )
            setFinishedBarVal( finish - correct )
            setExpect( expect )
            setExpectBarVal( expect - finish )
        }
    }, [
        score,
        questionCount,
        questionNumber,
    ])    

    return (
        <div>
            <div style={{ height: '32px' }}>
                <Status key={0} float='left'>Score:{ correctBarVal }%</Status>
                <Status key={1} float='right'>Max:{ expect }%</Status>
            </div>
            <ScoreBar>
                <ScoreBarCorrect width={correctBarVal} />
                <ScoreBarFinished width={finishedBarVal} />
                <ScoreBarExpect width={expectBarVal} />
            </ScoreBar>
        </div>
    )
}

export default Score