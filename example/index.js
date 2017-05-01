import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'
import {ThemedRater as Rater} from '../src/Rater'
import theme from './rater.css'

class Face extends Component {
  render() {
    let icons = {
      bad: '🙁',
      normal: '😐',
      good: '😍'
    }
    let { active, willBeActive, icon, onMouseEnter, onClick } = this.props
    let faceicon = (active || willBeActive)? icons[icon] : '😶'
    return (<span onMouseEnter={onMouseEnter} onClick={onClick}>{faceicon}</span>)
  }
}

Face.propTypes = {
  active: PropTypes.bool,
  willBeActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  icon: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func
}

class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rating: 0
    }
  }
  handleRate(newRate) {
    this.setState({
      rating: newRate
    })
  }
  render() {
    return (
      <div>
        <h1>React Rater Plus - Examples</h1>
        <dl>
          <dt>Plain tag (read-only)</dt>
          <dd>
            <pre>
              <code>
                {'<Rater rating={3} />'}
              </code>
            </pre>
            <Rater rating={3} />
          </dd>
          <dt>Make it interactive by setting a callback in the <code>onRate</code> property, which will be invoked with a new rating value. Note that the callback function needs to update the <code>rating</code> prop in line with Flux architecture concepts, otherwise the value does not change</dt>
          <dd>
            <pre>
              <code>
                {'<Rater rating={'}{this.state.rating}{'} onRate={this.handleRate.bind(this)} />'}
              </code>
            </pre>
            <Rater rating={this.state.rating} onRate={this.handleRate.bind(this)} />
            <span>{ 'Rating value: ' + this.state.rating}</span>
          </dd>

          <dt>Display fractional value</dt>
          <dd>
            <pre>
              <code>
                {'<Rater rating={3.6} />'}
              </code>
            </pre>
            <Rater rating={3.6} />
          </dd>
          <dt>Customize theme with react-css-themr using <code>theme</code> attribute</dt>
          <dd>
            <pre>
              <code>
                {`
import theme from './custom-theme.css'
<Rater theme={theme} rating=2.6 onRate=function() />
`}
              </code>
            </pre>
            <Rater theme={theme} rating={2.6} onRate={()=>true}/>
          </dd>
          <dt>Customize 'star' with custom string (without using child elements)</dt>
          <dd>
            <pre>
              <code>
                {'<Rater item="♥︎" rating=2.6 onRate=function() />'}
              </code>
            </pre>
            <Rater item="♥︎" rating={2.6} onRate={()=>true}/>
          </dd>
          <dt>Customize star with child items - both classes and properties passed to children</dt>
          <dd>
            <pre>
              <code>
                {`
<Rater total={3} onRate=function()>
  <Face icon="bad" />
  <Face icon="normal" />
  <Face icon="good" />
</Rater>`.trim()}
              </code>
            </pre>
            <Rater total={3} className="face-rater" onRate={()=>(true)}>
              <Face icon="bad" />
              <Face icon="normal" />
              <Face icon="good" />
            </Rater>
          </dd>
        </dl>
      </div>
    )
  }
}


function render() {
  ReactDOM.render(<Example />, document.getElementById('app'))
}

render()
