// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Table from '../../components/table'
import { getPokemons } from '../../store/actions/pokemons'
import { selectIndexPokemons } from '../../store/selectors/pokemons'

type Props = {
  list_pokemons: Array<Object>,
  config: Object,
  getData: Function
}

export class TableContainer extends Component<Props> {
  loadFunc = () => {
    const { getData, config } = this.props
    if (!config.isFetch && !config.isError) {
      getData(
        config.offset + config.limit,
        config.limit
      )
    }
  }
  render () {
    const { list_pokemons, config } = this.props
    return (
      <Table
        array={list_pokemons}
        loadFunc={this.loadFunc}
        hasMore={config.hasMore}
        isError={config.isError}
        error={config.error}
      />
    )
  }
}
const mapDispatchToProps = ( dispatch: Function ) => ({
  getData: (offset, limit) => dispatch(getPokemons(offset, limit))
})

const mapStateToProps = state => {
  return {
    // pokemons: {
    //   index: selectIndexPokemons(state),
    //   config: state.pokemons.config
    // },
    list_pokemons: selectIndexPokemons(state),
    config: state.pokemons.config
    // fullPokemons: state.fullPokemons,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TableContainer)
