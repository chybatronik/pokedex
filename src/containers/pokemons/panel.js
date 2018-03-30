import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import { showWainting, showOnlyLoaded, showAll, SHOW_WAITING, SHOW_ONLY_LOADED } from '../../store/actions/filter'

class Panel extends Component {
  showWainting () {
    this.props.dispatch(showWainting())
  }

  showOnlyLoaded () {
    this.props.dispatch(showOnlyLoaded())
  }

  showAll () {
    this.props.dispatch(showAll())
  }

  render () {
    const { count, offset, filterActive } = this.props.pokemons.config
    const waiting = this.props.pokemons.waiting
    const isShowWaiting = filterActive === SHOW_WAITING
    const isShowOnlyLoaded = filterActive === SHOW_ONLY_LOADED
    const isShowAll = filterActive === null
    return (
      <Navbar fixed='top' sticky='top' color='faded' expand='md'>
        <NavbarBrand href='/'>pokemons : { count }</NavbarBrand>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink href='#' disabled={isShowAll}  onClick={this.showAll.bind(this)}>all: {offset}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='#' disabled={isShowOnlyLoaded} onClick={this.showOnlyLoaded.bind(this)}>loaded: {offset - waiting}</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='#' disabled={isShowWaiting} onClick={this.showWainting.bind(this)}>waiting : {waiting}</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  const { pokemons } = state
  return {
    pokemons: {
      config: pokemons.config,
      waiting: Object.keys(state.fullPokemons).filter((item) => {return state.fullPokemons[item].isFetch}).length
    }
  }
}
export default connect(mapStateToProps)(Panel)
