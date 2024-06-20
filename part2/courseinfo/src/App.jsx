const Header = ({ course }) => <h2>{course.name}</h2>

const Note = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ course }) => {
  const sum = course.parts.reduce((acc, part) =>
    acc += part.exercises, 0)
  return (
    <div>
      <b>total of {sum} exercises</b>
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      {course.parts.map(part =>
        <Note
        key={part.id}
        name={part.name}
        exercises={part.exercises}
        />
      )}
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    courses.map(course =>
      <Course
      key={course.id}
      course={course}
      />
    )
  )
}

export default App
