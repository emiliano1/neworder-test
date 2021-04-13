import * as React from 'react'
import SearchIssueSuggestions from './searchIssueSuggestions'
import renderer from 'react-test-renderer'
import Issue from '../../models/issue'

it('renders correctly', () => {
  const issues: Issue[] = [{
    id: 1,
    title: 'test 1',
    user: {
        avatarUrl: 'http://example.com/avatar.png',
        url: "http://example.com/user1",
        login: "user1"
    },
    created_at: new Date().toISOString(),
    labels: [{
      title: "test label",
      color: "fff"
    }],
    body: "this is a test issue"
}]
  const tree = renderer.create(<SearchIssueSuggestions issues={issues}/>).toJSON();
  expect(tree).toMatchSnapshot();
})