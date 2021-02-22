import React from 'react';
import { CoursePart } from '../App';

const Part: React.FC<CoursePart> = (props) => {
    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };

    switch (props.name) {
        case 'Fundamentals':
            return (
                <p>
                    {props.name} {props.exerciseCount} {props.description}
                </p>
            );
        case 'Using props to pass data':
            return (
                <p>
                    {props.name} {props.exerciseCount} {props.groupProjectCount}
                </p>
            );
        case 'Deeper type usage':
            return (
                <p>
                    {props.name} {props.exerciseSubmissionLink}
                </p>
            );
        case 'Part five':
            return (
                <p>
                    {props.name} {props.exerciseCount} {props.description}
                </p>
            );
        default:
            return assertNever(props);
    }
};

export default Part;
