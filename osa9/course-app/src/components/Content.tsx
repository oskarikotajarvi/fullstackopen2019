import React from 'react';
import Part from './Part';

import { CoursePart } from '../App';

interface IContentProps {
    content: Array<CoursePart>;
}

const Content: React.FC<IContentProps> = (props) => {
    return (
        <div>
            {props.content.map((course) => (
                <Part key={course.name} {...course} />
            ))}
        </div>
    );
};

export default Content;
