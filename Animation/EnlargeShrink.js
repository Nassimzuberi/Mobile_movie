import React from 'react'
import { View, Animated } from 'react-native'


class EnlargeShrink extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      size: new Animated.Value(this._getSize())
    }
  }

  _getSize () {
    if (this.props.shouldEnlarge) {
      return 80
    }
    return 40
  }

  componentDidUpdate () {
    Animated.spring(
      this.state.size,
      {
        toValue: this._getSize()
      }
    ).start()
  }

  render () {
    return (
      <Animated.View style={{ width: this.state.size, height: this.state.size }}>
        {this.props.children}
      </Animated.View>
    )
  }
}

export default EnlargeShrink
