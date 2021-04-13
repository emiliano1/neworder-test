import * as React from 'react'
import Search from './core'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<Search />).toJSON();
  expect(tree).toMatchSnapshot();
})