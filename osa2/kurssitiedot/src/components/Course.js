const Course = (props) => (
    <>
        <Header course={props.name} />
        <Content parts={props.parts} />
        <Total parts={props.parts} />
    </>
)

const Header = (props) => (
    <h2>{props.course}</h2>
)

const Content = ({ parts }) => (
    <ul>
        {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
    </ul>
)

const Part = (props) => (
    <li>{props.name} {props.exercises}</li>
)


const Total = ({ parts }) => {
    const tot = parts.reduce((prev, curr) => prev + curr.exercises, 0)

    return (
        <p><b>
            total of {tot} exercises
        </b></p>
    )
}

export default Course