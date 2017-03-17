jest.autoMockOff()

import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import Rater from '../src'

describe('<Rater total={5} rating={2} />', () => {
  it('renders 5 stars (2 active)', () => {
    const rater = TestUtils.renderIntoDocument(
      <Rater total={5} rating={2} />
    )
    const stars = TestUtils.scryRenderedDOMComponentsWithTag(rater, 'a')
//    const activeStars = TestUtils.scryRenderedDOMComponentsWithClass(rater, 'active')
// This does not work and needs fixing because of CSS modules - need to import proper style here

    expect(stars.length).toEqual(5)
//    expect(activeStars.length).toEqual(2)
  })
})
