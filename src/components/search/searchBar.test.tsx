import * as React from 'react'
import SearchBar from './searchBar'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<SearchBar />).toJSON();
  expect(tree).toMatchSnapshot()
})