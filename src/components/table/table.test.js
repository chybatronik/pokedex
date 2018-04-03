import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import { shallowToJson } from 'enzyme-to-json'
import Table from './table'
import expect from 'expect'

Enzyme.configure({ adapter: new Adapter() })

const array = [
  { name: '1', isFetch: false, weight: 1, height: 2, sprites: {} },
  { name: '2', isFetch: false, weight: 21, height: 42, sprites: {} }
]

describe('table component', () => {
  it('renders call fun Table', () => {
    const mockCallback = jest.fn()
    const output = mount(
      <Table
        array={array}
        loadFunc={mockCallback}
        hasMore={true}
        isError={false}
      />
    )
    expect(mockCallback.mock.calls.length).toBe(1)
  })

  it('renders Table', () => {
    const mockCallback = jest.fn()
    const output = shallow(
      <Table
        array={array}
        loadFunc={mockCallback}
        hasMore={true}
        isError={false}
      />
    )
    expect(shallowToJson(output)).toMatchSnapshot()
  })

  it('renders Table with error', () => {
    const mockCallback = jest.fn()
    const output = shallow(
      <Table
        array={array}
        loadFunc={mockCallback}
        hasMore={true}
        isError={true}
      />
    )
    expect(shallowToJson(output)).toMatchSnapshot()
  })
})
