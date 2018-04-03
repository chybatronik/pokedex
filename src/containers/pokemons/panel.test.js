import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { shallowToJson } from 'enzyme-to-json'
import { Panel } from './panel'
import { NavLink } from 'reactstrap'
import expect from 'expect'

Enzyme.configure({ adapter: new Adapter() })

it('renders panel', () => {
  const output = shallow(
    <Panel
      config={{count: 11, offset: 77}}
      waiting={12}
    />
  )
  expect(shallowToJson(output)).toMatchSnapshot()
})

it('panel click waiting', () => {
  const mockCallback = jest.fn()
  const output = mount(
    <Panel
      config={{count: 11, offset: 77}}
      waiting={12}
      showWainting={mockCallback}
    />
  )
  output.find(NavLink).last().simulate('click')
  expect(mockCallback.mock.calls.length).toBe(1)
})

it('panel click all', () => {
  const mockCallback = jest.fn()
  const output = mount(
    <Panel
      config={{count: 11, offset: 77}}
      waiting={12}
      showAll={mockCallback}
    />
  )
  output.find(NavLink).first().simulate('click')
  expect(mockCallback.mock.calls.length).toBe(1)
})

it('panel click loaded', () => {
  const mockCallback = jest.fn()
  const output = mount(
    <Panel
      config={{count: 11, offset: 77}}
      waiting={12}
      showOnlyLoaded={mockCallback}
    />
  )
  output.find(NavLink).at(1).simulate('click')
  expect(mockCallback.mock.calls.length).toBe(1)
})
