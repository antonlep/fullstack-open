import React from 'react';

interface CourseProps {
    name: string;
    exerciseCount: number;
}

const Total = (props: { parts: Array<CourseProps> }) => {
    return (
        <p>
            Number of exercises{" "}
            {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    )
}

export default Total;