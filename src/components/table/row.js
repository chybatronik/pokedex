// @flow
import React, { PureComponent } from 'react'
import Spinner from 'react-spinkit'
import { Badge } from 'reactstrap'

type Props = {
  name: string,
  index: number,
  sprites: ?Object,
  types: ?Array<Object>,
  weight: ?number,
  height: ?number,
  isFetch: bool
}

export default class RowComponent extends PureComponent<Props> {
  render () {
    const { name, index, sprites, types, weight, height, isFetch } = this.props
    return (
      <tr key={name}>
        <th width='10%' scope='row' > { index } </th>
        {
          isFetch ? (
            <td width='10%'><Spinner name='circle' color='blue' /></td>
          ) :
          (
            <td style={{padding: 0}} width='10%'>
              <img async src={sprites ? sprites.front_default : null} alt={name} height={52} />
            </td>
          )
        }
        <td>{name}</td>
        <td><TagsComponent types={types}/></td>
        <td width='10%'>{weight}</td>
        <td width='10%'>{height}</td>
      </tr>
    )
  }
}

type PropsTags = {
  types: ?Array<Object>
}

class TagsComponent extends PureComponent<PropsTags> {
  render () {
    const { types } = this.props
    let render_array = []
    if( types && types.length && types.length > 0 ) {
      render_array = types.map((type) => {
        return (<Badge color='light' key={type.type.name}>{type.type.name}</Badge>)
      })
    }
    return render_array
  }
}
