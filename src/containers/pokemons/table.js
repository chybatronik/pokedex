import React, { Component } from 'react'
import { connect } from 'react-redux'
import Table from '../../components/table'
import { getPokemons } from '../../store/actions/pokemons'
import { selectIndexPokemons } from '../../store/selectors/pokemons'

class TableContainer extends Component {
  constructor (props) {
    super(props)
    this.loadFunc = this.loadFunc.bind(this)
  }
  loadFunc () {
    const { pokemons, dispatch } = this.props
    if (!pokemons.config.isFetch && !pokemons.config.isError) {
      console.log('MORE', pokemons.config)
      dispatch(getPokemons(
        pokemons.config.offset + pokemons.config.limit,
        pokemons.config.limit
      ))
    }
  }
  render () {
    const { index, config } = this.props.pokemons
    return (
      <Table
        array={index}
        loadFunc={this.loadFunc}
        hasMore={config.hasMore}
        isError={config.isError}
        error={config.error}
      />
    )
  }
}

const mapStateToProps = state => {
  // const { pokemons } = state
  return {
    pokemons: {
      index: selectIndexPokemons(state),
      config: state.pokemons.config
    },
    fullPokemons: state.fullPokemons
    // getPokemons
  }
}
export default connect(mapStateToProps)(TableContainer)
