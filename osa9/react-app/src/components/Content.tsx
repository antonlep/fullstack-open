import React from 'react';
import Part from './Part'
import { CoursePart } from '../types';

const Content = (props: { parts: Array<CoursePart> }) => {
    return (
        <div>
            {props.parts.map(a =>
                <div key={a.name}>
                    <Part course={a} />
                </div>
            )}
        </div>
    )
}

export default Content;