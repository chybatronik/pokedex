import React, { PureComponent } from 'react'
import { Table, Row, Alert } from 'reactstrap'
import InfiniteScroll from 'react-infinite-scroller'
import Spinner from 'react-spinkit'
import PropTypes from 'prop-types'
import TableRow from './row'

export default class TableComponent extends PureComponent {
  renderRow (item) {
    return (
      <TableRow {...item} key={'row_' + item.name} />
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

TableComponent.propTypes = {
  isError: PropTypes.bool,
  loadFunc: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  array: PropTypes.array.isRequired
}
