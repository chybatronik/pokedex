import React, { PureComponent } from 'react'
import Spinner from 'react-spinkit'
import { Badge } from 'reactstrap'
import PropTypes from 'prop-types'

export default class RowComponent extends PureComponent {
  render () {
    const { name, index, sprites, types, weight, height, isFetch } = this.props
    return (
      <tr key={name}>
        <th width='10%' scope='row'> { index } </th>
        {
          isFetch ? (
            <td width='10%'><Spinner name='circle' color='blue' /></td>
          ) : <td style={{padding: 0}} width='10%'><img async src={sprites.front_default} alt={name} height={52} /></td>
        }
        <td>{name}</td>
        <td>{types && types.map((type) => { return (<Badge color='light'>{type.type.name}</Badge>) }) }</td>
        <td width='10%'>{weight}</td>
        <td width='10%'>{height}</td>
      </tr>
    )
  }
}

RowComponent.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  sprites: PropTypes.object,
  types: PropTypes.array,
  weight: PropTypes.number,
  height: PropTypes.number,
  isFetch: PropTypes.bool.isRequired
}
