import React, {Component, PropTypes} from 'react'
import css from './rater.css'
import {themr} from 'react-css-themr'

export class Rater extends Component {

  setRate(rating) {
    this.setState({newRating: rating})
  }

  bindFunctions() {
    this.onCancelRate = this.setRate.bind(this, null);
    this.onRate = []
    this.willRate = []
    for (let i = this.props.total - 1; i >= 0; i--) {
      if (typeof(this.props.onRate) === 'function') {
        this.onRate[i] = () => {
          this.props.onRate(i + 1)
        }
      }
      this.willRate[i] = this.setRate.bind(this, i + 1)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.total > this.props.total || !this.props.onRate === nextProps.onRate)
      this.bindFunctions()
  }

  componentWillMount() {
    this.bindFunctions()
  }

  render() {
    let {
      theme,
      total,
      interactive,
      rating,
      ...restProps
    } = this.props

    delete restProps.onRate;
    delete restProps.children;

    let newRating = this.state && this.state.newRating;
    let children = this.props.children ? this.props.children.filter(Boolean) : [];

    let nodes = Array(total).fill(1).map((_, i) => {
      let props = {
        key: i
      };

      props.className = [
        !newRating && rating - i >= 1 && theme.active,
        !!newRating && i < newRating && theme.willBeActive,
        !newRating && rating - i >= 0.5 && rating - i < 1 && theme.halfActive,
        !interactive && theme.disabled
      ].filter(Boolean).join(" ");

      if (interactive) {
        if (typeof(this.willRate[i]) === 'function')
          props.onMouseEnter = this.willRate[i];
        if (typeof(this.onRate[i]) === 'function')
          props.onClick = this.onRate[i];
        }

      if (children.length) {
        return React.cloneElement(children[i % children.length], props)
      } else {
        return (<a {...props}>★</a>)
      }
    })

    if (interactive) {
      return (
        <div className={theme['rater']} onMouseLeave={this.onCancelRate} {...restProps}>
          {nodes}
        </div>
      )
    } else {
      return (
        <div className={theme['rater']} {...restProps}>{nodes}</div>
      )
    }
  }
}

Rater.propTypes = {
  theme: PropTypes.object,
  total: PropTypes.number,
  rating: PropTypes.number,
  interactive: PropTypes.bool,
  children: PropTypes.any,
  onRate: PropTypes.func
}

Rater.defaultProps = {
  total: 5,
  rating: 0,
  interactive: true,
  theme: {}
}

export const ThemedRater = themr('Rater',css)(Rater)
