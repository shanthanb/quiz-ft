import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { MAX_LEVEL, LEVELS } from '../constants'

import { uriDecodeHelper } from '../helpers'

const Title = styled.h1`
    color: #494949;
    margin: 0;
`
const Subtitle = styled.h2`
    color: #a2a2a2;
    font-weight: 400;
    font-size: 18px;
    padding: 4px 2px;
    margin: 0;
` 
const Rating = styled.span((props) => ({
    color: `${ props.isValid ? '#2466b7' : '#EEEEEE' }`,
    fontSize: '12px',
    margin: '2px 2px',
}));

const star = <FontAwesomeIcon icon={faStar} />

const createRatingBar = (difficulty) => {
    let ratings = []
    // Outer loop to create parent
    for (let i = 0; i < MAX_LEVEL; i++) {
        //Create the parent and add the children
        let index = LEVELS.indexOf( difficulty );
        if ( i <= index ) {
            ratings.push( <Rating 
                key={i}
                isValid={true}
                >
                { star }
            </Rating> )
        } else {
            ratings.push( <Rating 
                key={i} 
                isValid={false}
                >
                { star }
            </Rating> )
        } 
    }
    return ratings
}

const TitleBar = ({
    questionCount,
    questionNumber,
    difficulty,
    category,
}) => (
    <div>
        <Title>
            Question { questionNumber + 1 } of { questionCount } 
        </Title>
        <Subtitle>
        { uriDecodeHelper( category ) }
        </Subtitle>
        <div>
        {
            createRatingBar(difficulty)
        }
        </div>
    </div>
)
export default TitleBar