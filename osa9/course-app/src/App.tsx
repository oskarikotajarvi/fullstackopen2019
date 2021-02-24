import React from 'react';

import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

interface ICoursePartBase {
    name: string;
    exerciseCount: number;
}

interface ICoursePartOne extends ICoursePartFour {
    name: 'Fundamentals';
}

interface ICoursePartTwo extends ICoursePartBase {
    name: 'Using props to pass data';
    groupProjectCount: number;
}

interface ICoursePartThree extends ICoursePartFour {
    name: 'Deeper type usage';
    exerciseSubmissionLink: string;
}

interface ICoursePartFour extends ICoursePartBase {
    description: string;
}

interface ICoursePartFive extends ICoursePartBase {
    name: 'Part five';
    exerciseCount: number;
    description: string;
}

export type CoursePart = ICoursePartOne | ICoursePartTwo | ICoursePartThree | ICoursePartFive;

const App: React.FC = () => {
    const courseParts: Array<CoursePart> = [
        {
            name: 'Fundamentals',
            exerciseCount: 10,
            description: 'This is an awesome course part',
        },
        {
            name: 'Using props to pass data',
            exerciseCount: 7,
            groupProjectCount: 3,
        },
        {
            name: 'Deeper type usage',
            exerciseCount: 14,
            description: 'Confusing description',
            exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
        },
        {
            name: 'Part five',
            exerciseCount: 55,
            description: 'The description for number 555',
        },
    ];
    const courseName = 'Half Stack application development';
    const totalExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);

    return (
        <div>
            <Header name={courseName} />
            <Content content={courseParts} />
            <Total totalExercises={totalExercises} />
        </div>
    );
};

export default App;
