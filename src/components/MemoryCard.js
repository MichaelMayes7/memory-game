import React, { Component } from "react";
import '../MemoryCard.css'

export default class MemoryCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false
        };

        // this.clickHandler = this.clickHandler.bind(this);
    }

   clickHandler = () => {
       this.setState({isFlipped: !this.state.isFlipped});
        
    }

    render() {
        const memoryCardInnerClass = !this.state.isFlipped ? "MemoryCardInner" : "MemoryCardInner flipped";
        
            return (
            <>
            <div>
                <div className="MemoryCard" onClick={this.clickHandler}>
                    <div className={memoryCardInnerClass}>
                        <div className="MemoryCardBack">
                            <img src="https://www.digitalcrafts.com/img/digitalcrafts-logo-white-y.png"
                            alt="DigitalCrafts"></img>
                        </div>
                        <div className="MemoryCardFront">{this.props.symbol}</div>
                    </div>
                </div>
            </div>
            </>
        );
    }
}