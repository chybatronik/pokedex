import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { shallow } from 'enzyme'
import React from 'react'
import { shallowToJson } from 'enzyme-to-json'
import { Panel } from './panel'

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
