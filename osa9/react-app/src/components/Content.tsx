import React from 'react';

interface CourseProps {
    name: string;
    exerciseCount: number;
}

const Content = (props: { parts: Array<CourseProps> }) => {
    return (
        <div>
            {props.parts.map(a =>
                <p key={a.name}>
                    {a.name} {a.exerciseCount}
                </p>
            )}
        </div>
    )
}

export default Content;