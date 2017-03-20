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
    this.interactive = false;

    for (let i = this.props.total - 1; i >= 0; i--) {
      if (typeof(this.props.onRate) === 'function') {
        this.interactive = true; // Enable interactivity
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
    const {
      theme,
      total,
      rating,
      item,
      ...restProps
    } = this.props

    delete restProps.onRate;
    delete restProps.children;

    let newRating = this.state && this.state.newRating;
    let children = this.props.children
      ? this.props.children.filter(Boolean)
      : [];

    let nodes = Array(total).fill(1).map((_, i) => {
      const tags = {
        active: !newRating && rating - i >= 1,
        willBeActive: !!newRating && i < newRating,
        halfActive: !newRating && rating - i >= 0.5 && rating - i < 1,
        disabled: !this.interactive
      }

      const props = {
        // sets key
        key: i,
        // maps tags to classnames from theme
        className: Object.keys(tags).map(tag => (tags[tag] && theme[tag])).filter(Boolean).join(" "),
        // callback for willRate
        onMouseEnter: this.interactive && typeof(this.willRate[i]) === 'function' ? this.willRate[i] : null,
        // callback for onClick
        onClick: this.interactive && typeof(this.onRate[i]) === 'function' ? this.onRate[i] : null
      };

      if (children.length) {
        return React.cloneElement(children[i % children.length],{
          ...props,
          ...tags
        })
      } else if (tags.halfActive) {
        // Render extra item to display half item
        return (
          <a {...props}><span>{item}</span>{item}</a>
        )
      } else {
        return (
          <a {...props}>{item}</a>
        )
      }
    })

    // Set onMouseLeave for props on div when interactive
    if (this.interactive) restProps.onMouseLeave=this.onCancelRate;

    return (
      <div className={theme['rater']} {...restProps}>{nodes}</div>
    )
  }
}

Rater.propTypes = {
  theme: PropTypes.object,
  total: PropTypes.number,
  rating: PropTypes.number,
  children: PropTypes.any,
  onRate: PropTypes.func,
  item: PropTypes.any
}

Rater.defaultProps = {
  total: 5,
  rating: 0,
  theme: {},
  item: "★"
}

export const ThemedRater = themr('Rater', css)(Rater);
export {css};
