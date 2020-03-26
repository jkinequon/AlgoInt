import React, { Component } from "react";
import ReactModal from "react-modal";

export default class Loader extends Component {
  render() {
    return (
      <ReactModal
        isOpen={true}
        className="loader-modal"
        overlayClassName="loader-modal-overlay"
      >
        <section className="loading-container">
          <div class="loading loading06">
            <span data-text="C">C</span>
            <span data-text="O">O</span>
            <span data-text="M">M</span>
            <span data-text="P">P</span>
            <span data-text="I">I</span>
            <span data-text="L">L</span>
            <span data-text="I">I</span>
            <span data-text="N">N</span>
            <span data-text="G">G</span>
            <span data-text=".">.</span>
            <span data-text=".">.</span>
            <span data-text=".">.</span>
          </div>
        </section>
        <div class="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"> </polygon>
          </svg>
        </div>
      </ReactModal>
    );
  }
}
