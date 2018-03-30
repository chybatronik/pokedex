import React, { Component } from 'react'
import Table from '../containers/pokemons/table'
import Panel from '../containers/pokemons/panel'
import { Container, Row } from 'reactstrap'

class App extends Component {
  render () {
    return (
      <Container>
        <Panel />
        <Row style={{ marginTop: 0 }} >
          <Table />
        </Row>
      </Container>
    )
  }
}

export default App
