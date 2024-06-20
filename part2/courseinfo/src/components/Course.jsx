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

export default Course
