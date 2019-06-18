import React from "react";

const Course = ({ courses }) => {
  const renderCourses = courses.map(course => (
    <div key={course.name}>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ));
  return (
    <>
      <h1>Web development curriculum</h1>
      {renderCourses}
    </>
  );
};

const Header = ({ name }) => {
  return (
    <>
      <h2>{name}</h2>
    </>
  );
};

const Part = ({ part, exercise }) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Content = ({ parts }) => {
  const parts_ = parts.map(part => (
    <Part key={part.id} part={part.name} exercise={part.exercises} />
  ));
  return <>{parts_}</>;
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0);
  return (
    <>
      <p style={{ fontWeight: "bold" }}>Total of {total} exercises</p>
    </>
  );
};

export default Course;
