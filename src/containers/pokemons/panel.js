// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import {
  showWainting,
  showOnlyLoaded,
  showAll,
  SHOW_WAITING,
  SHOW_ONLY_LOADED,
  SHOW_ALL
} from '../../store/actions/filter'
import { countWaiting } from '../../store/selectors/pokemons'

type Props = {
  config: Object,
  waiting: number,
  showWainting: Function,
  showOnlyLoaded: Function,
  showAll: Function
}

export class Panel extends Component<Props> {
  showWainting = () => {
    this.props.showWainting()
  }

  showOnlyLoaded = () => {
    this.props.showOnlyLoaded()
  }

  showAll = () => {
    this.props.showAll()
  }

  render () {
    const { count, offset, filterActive } = this.props.config
    const waiting = this.props.waiting
    const isShowWaiting = filterActive === SHOW_WAITING
    const isShowOnlyLoaded = filterActive === SHOW_ONLY_LOADED
    const isShowAll = filterActive === SHOW_ALL
    return (
      <Navbar fixed='top' sticky='top' color='faded' expand='md'>
        <NavbarBrand href='/'>pokemons : { count }</NavbarBrand>
        <Nav className='ml-auto' navbar>
          <NavItem>
            <NavLink
              href='#'
              disabled={isShowAll}
              onClick={this.showAll}>all: {offset}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href='#'
              disabled={isShowOnlyLoaded}
              onClick={this.showOnlyLoaded}>loaded: {offset - waiting}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href='#'
              disabled={isShowWaiting}
              onClick={this.showWainting}>waiting : {waiting}
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}
const mapDispatchToProps = (dispatch: Function) => ({
  showWainting: () => dispatch(showWainting()),
  showOnlyLoaded: () => dispatch(showOnlyLoaded()),
  showAll: () => dispatch(showAll())
})

const mapStateToProps = state => {
  const { pokemons, filters } = state
  return {
    config: pokemons.config,
    waiting: countWaiting(state),
    filters
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Panel)
