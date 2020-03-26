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
        <div class="loader triangle">
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"> </polygon>
          </svg>
        </div>
      </ReactModal>
    );
  }
}
