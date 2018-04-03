// @flow
import React, { PureComponent } from 'react'
import { Table, Row, Alert } from 'reactstrap'
import InfiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-spinkit'
import TableRow from './row'

type Props = {
  isError: bool,
  loadFunc: Function,
  hasMore: bool,
  array: Array<Object>
}
export default class TableComponent extends PureComponent<Props> {
  renderRow (item: Object) {
    return (
      <TableRow {...item} key={'row_' + item.name} />
    )
  }

  renderRows (array: Array<Object>) {
    // if (array && array.length) {
    return array.map((item, index) => {
      item.index = index + 1
      return this.renderRow(item)
      // if (item.name) {
      // }
    })
    // }
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
