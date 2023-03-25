const PatRecord = (props) => (
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.mail}</td>
            <td>
                <input type="button" value="View" onClick={() => view(props.data.mail)} />
            </td>
            <td>
                <input type="button" value="Treated" onClick={() => treated(props.data.mail)} />
            </td>
        </tr>
)

export default PatRecord;