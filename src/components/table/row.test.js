import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { shallowToJson } from 'enzyme-to-json'
import Row from './row'
import expect from 'expect'

Enzyme.configure({ adapter: new Adapter() })

it('Row component with isFetch: true', () => {
  const item = {name: 'test', index: 100, isFetch: true}
  const output = shallow(
    <Row
      {...item}
    />
  )
  expect(shallowToJson(output)).toMatchSnapshot()
})

it('Row component with isFetch: false', () => {
  const item = {
    name: 'test',
    index: 100,
    isFetch: false,
    sprites: {},
    types: [],
    weight: 1,
    height: 2
  }
  const output = shallow(
    <Row
      {...item}
    />
  )
  expect(shallowToJson(output)).toMatchSnapshot()
})
