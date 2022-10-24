import React from 'react';
import { CourseProps } from '../types';

const Total = (props: { parts: Array<CourseProps> }) => {
    return (
        <h2>
            Number of exercises{" "}
            {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </h2>
    )
}

export default Total;