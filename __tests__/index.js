jest.autoMockOff()

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import {ThemedRater as Rater, css} from '../src/Rater'

describe('<Rater total={5} rating={2} />', () => {
  it('renders 5 stars (2 active)', () => {
    const rater = TestUtils.renderIntoDocument(
      <Rater total={5} rating={2} />
    )
    const stars = TestUtils.scryRenderedDOMComponentsWithTag(rater, 'a')
    const activeStars = TestUtils.scryRenderedDOMComponentsWithClass(rater, css['active'])
    expect(stars.length).toEqual(5)
    expect(activeStars.length).toEqual(2)
  })
})
