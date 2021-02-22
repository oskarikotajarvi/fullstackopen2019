import React from 'react';

interface ITotalProps {
    totalExercises: number;
}

const Total: React.FC<ITotalProps> = (props) => {
    return <p>Total number of exercises: {props.totalExercises}</p>;
};

export default Total;
