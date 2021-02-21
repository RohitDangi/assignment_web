import React, { Component } from 'react'
// import Lottie from 'react-lottie'
import animationData from './9811-loading.json'

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStopped: false,
      isPaused: false
    }
    // this.handleStop = this.handleStop.bind(this)
  }

  // handleStop(){
  //   this.setState({isStopped:!this.state.isStopped})
  // }

  render(){
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    return(
      <div className="controlled">
        {/*<Lottie options={defaultOptions}
              height={100}
              width={100}
              isStopped={this.state.isStopped}
              isPaused={this.state.isPaused}
        />*/}
         <img src="/25.gif"/>
      </div>
    )
  }
}

export default Loader