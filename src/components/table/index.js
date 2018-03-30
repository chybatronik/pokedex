import React, { Component } from 'react'
import { Table, Row, Alert, Badge } from 'reactstrap'
import InfiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-spinkit'

export default class TableComponent extends Component {
  renderRow (item) {
    return (
      <tr key={item.name}>
        <th width='10%' scope='row'> { item.index } </th>
        {
          item.isFetch ? (
            <td width='10%'><Spinner name='circle' color='blue' /></td>
          ) : <td style={{padding:0}} width='10%'><img async src={item.sprites.front_default} height={52} /></td>

        }
        <td>{item.name}</td>
        <td>{item.types && item.types.map((type) => {return (<Badge color='light'>{type.type.name}</Badge>)})}</td>
        <td width='10%'>{item.weight}</td>
        <td width='10%'>{item.height}</td>

      </tr>
    )
  }

  renderRows (array) {
    if (array && array.length) {
      return array.map((item, index) => {
        item.index = index + 1
        if (item.name) {
          return this.renderRow(item)
        }
      })
    } else {
      return []
    }
  }

  renderError () {
    return (
      <Alert color='danger' style={{width: '100%'}}>
        { 'Ошибка подключения к серверу pokeapi.co' }
      </Alert>
    )
  }

  renderLoader () {
    return (
      <Row className='d-flex justify-content-center' key={'loader'}>
        <Spinner name='ball-scale-ripple' color='fuchsia' />
      </Row>
    )
  }

  render () {
    if (this.props.isError) {
      return this.renderError()
    }

    return (
      <InfiniteScroll
        element={'article'}
        pageStart={0}
        loadMore={this.props.loadFunc}
        hasMore={this.props.hasMore}
        loader={this.renderLoader()}
      >
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>@</th>
              <th>name</th>
              <th>types</th>
              <th>weight</th>
              <th>height</th>
            </tr>
          </thead>
          <tbody>
            { this.renderRows(this.props.array) }
          </tbody>
        </Table>
      </InfiniteScroll>
    )
  }
}
