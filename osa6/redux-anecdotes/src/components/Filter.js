import { connect } from 'react-redux'
import { newFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        props.newFilter(event.target.value)
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    newFilter
}

export default connect(
    null,
    mapDispatchToProps
)(Filter)