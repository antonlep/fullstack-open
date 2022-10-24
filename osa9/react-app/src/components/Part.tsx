import React from 'react';
import { CoursePart } from '../types';

const Part = ({ course }: { course: CoursePart }) => {
    switch (course.type) {
        case "normal":
            return (
                <div>
                    <h2>{course.name} </h2>
                    <p>exercises: {course.exerciseCount}</p>
                    <p>{course.description}</p>
                </div>
            )
        case "groupProject":
            return (
                <div>
                    <h2>{course.name}</h2>
                    <p>exercises: {course.exerciseCount}</p>
                    <p>projects: {course.groupProjectCount}</p>
                </div>
            )
        case "submission":
            return (
                <div>
                    <h2>{course.name}</h2>
                    <p>exercises: {course.exerciseCount}</p>
                    <p>{course.description}</p>
                    <p>{course.exerciseSubmissionLink}</p>
                </div>
            )
        case "special":
            return (
                <div>
                    <h2>{course.name}</h2>
                    <p>exercises: {course.exerciseCount}</p>
                    <p>{course.description}</p>
                    <p>Requirements:</p>
                    {course.requirements.map(a =>
                        <p key={a}>
                            {a}
                        </p>
                    )}
                </div>
            )
        default:
            return (
                <div>
                    Undefined type
                </div>
            )
    }
}


export default Part;