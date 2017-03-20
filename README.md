# React-rater-plus

Improved ReactJS star rater based on NdYAG's [react-rater](https://github.com/NdYAG/react-rater/)

See the [Live demo](https://rawgit.com/jorosz/react-rater-plus/master/example/index.html)

Improvements included:
* state management now compatible with Flux architecture (uses props rather than events)
* uses CSS modules and supports theming via react-css-themr, no global CSS namespace
* supports custom icons
* better performance due to removal of `.bind()` calls in `render()`

## install

```
npm install react-rater-plus
```

```js
import Rater from 'react-rater-plus'

// ...
render() {
  return (<Rater total={5} rating={2} />)
}
```

## API

`<Rater />` accepts custom properties (all optional):

* `total`: default 5
* `rating`: default 0
* `onRate`: `function()`. Callback which is invoked when the user clicks on a new rating
* `item`: a string or React object that is rendered for each 'star' (by default, a star ★)

### Read-only mode
If `onRate` prop is omitted the rater will be read-only and displays the rating value
provided in the `rating` property. Just like `react-rater` fractional values (e.g 3.6 stars) are supported too and are displayed as half stars.

### Interactive mode
When the `onRate` property is passed and contains a valid function the rater will be interactive, using this function as a callback to set new values.

`react-rater-plus` is redesigned with Flux architecture in mind so the value of the rating is supposed to be externalized in an application reducer or parent state component, and passed to the `Rater` as a property.

So, unlike `react-rater`, the `onRate` function is only called when the user clicks on a new rating value and its argument is the new rating value. The containing component is responsible for managing the state and update the value of the `rating` property. Note that this component will always display the value of the `rating` property regardless of any selection.

When using flux/redux this function call would trigger an action callback to update the application state which would then map back into the `rating` property. In a 'traditional' React architecture the parent component would update its state's rating and pass it down back to the rater by updating it's `rating` prop.

## Theming & Styling

### Styling via themes
`react-rater-plus` relies on Webpack and CSS modules so it uses react-css-themr to manage themes. See [react-css-themr](https://github.com/javivelasco/react-css-themr) for usage of the theming component.

The `Rater` component imported by default from `react-rater-plus` is a themed component and comes with its default theme. This default theme can be overridden and customized by creating another CSS module which would be imported. Because react-css-themr will merge the themes it's possible to only override specific settings, for example:

mytheme.css
```scss
:root {
    --react-rater-hover: #600;
    --react-rater-active: #000;
}

.rater a {
        &.willBeActive {
            color: var(--react-rater-hover);
        }
        &.active, &.halfActive span {
            color: var(--react-rater-active);
        }
}
```
mytheme.js
```javascript
import theme from './mytheme.css'
import Rater from 'react-rater-plus'

class Example extends React.Component {
  render() {
    return (<Rater theme={theme} />)
  }
}
```

*Note 1:*  It is still possible to do CSS customization the 'old-way' and assign a `className` property to the rater and use CSS navigation based on this class in the application's CSS. It's rather recommended to use the method above since by adopting react-css-themr themes the entire application can be themed more easily.

*Note 2:* In extreme cases it may be necessary/more simple to import the so-called raw `Rater` component which does not contain ANY default theming or CSS. In this case the entire theme has to be provided to the component via a `theme` property.

```javascript
import theme from './entire-rating-styling.css'
import {Rater} from 'react-rater-plus'

class Example extends React.Component {
  render() {
    return (<Rater theme={theme} />)
  }
}
```

If the raw component is imported and used without a proper CSS theme it will be not working properly.

### Customizing the 'star' items
If you want to change the the rater to use items other than stars, you can either specify them as the `item` property or use children which accept properties.

Using the `item` property is simpler in case you want to only change the appearance of the item. Using children enables total control.

The mechanism is the same as `react-rater`. You can define your own 'star' component and pass it as a child to the `<Rater />`. If you pass more children they will be repeated.

```
<Rater total={5}>
  <Heart />
</Rater>
```

Each child item receives custom properties from the `Rater` which then it can use to style itself. Because `react-rater-plus` support CSS modules they can have their own CSS module or even theme provided via `react-css-themr`

```
{
  active: PropTypes.bool,
  halfActive: PropTypes.bool,
  willBeActive: PropTypes.bool,
  disabled: PropTypes.bool
}
```

## License

BSD.
