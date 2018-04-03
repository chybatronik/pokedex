import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { shallowToJson } from 'enzyme-to-json'
import { TableContainer } from './table'
import expect from 'expect'

Enzyme.configure({ adapter: new Adapter() })

it('renders table container', () => {
  const pokemons = { index: [], config: {hasMore: true, isError: false, isFetch: false} }
  const mockCallback = jest.fn()
  const output = shallow(
    <TableContainer
      list_pokemons={pokemons.index}
      config={pokemons.config}
      getData= {mockCallback}
    />
  )
  expect(shallowToJson(output)).toMatchSnapshot()
})

it('table change config is isFetch', () => {
  const pokemons = { index: [], config: {hasMore: true, isError: true, isFetch: false} }
  const mockCallback = jest.fn()
  const output = shallow(
    <TableContainer
      list_pokemons={pokemons.index}
      config={pokemons.config}
      getData= {mockCallback}
    />
  )
  expect(shallowToJson(output)).toMatchSnapshot()
})

it('table change config is isError', () => {
  const pokemons = { index: [], config: {hasMore: true, isError: false, isFetch: true} }
  const mockCallback = jest.fn()
  const output = shallow(
    <TableContainer
      list_pokemons={pokemons.index}
      config={pokemons.config}
      getData= {mockCallback}
    />
  )
  expect(shallowToJson(output)).toMatchSnapshot()
})
