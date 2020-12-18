import React from 'react'
import styled from 'styled-components'

const ProgressBar = styled.div`
    width: 100%;
    height: 15px;
    background: #f9f9f9
`
const ProgressBarSlide = styled.div(props => ({
    display: 'block',
    background: '#2466b7',
    height: '100%',
    width: props.score && props.questions ? `${ props.score / props.questions * 100 }%` : 0 
}));

export default function({
    questionNumber,
    questionCount
}) {
    return (
        <ProgressBar>
            <ProgressBarSlide score={questionNumber} questions={questionCount} />
        </ProgressBar>
    )
}
