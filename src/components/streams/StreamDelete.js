import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "../../Modal";
import { Link } from "react-router-dom/cjs/react-router-dom";
import history from "../../history";
import _ from "lodash";
import { fetchStream, deleteStream } from "../../actions";
class StreamDelete extends Component {


  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderAction() {
  
    
    const id = this.props.match.params.id
    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() => {
            this.props.deleteStream(id);
          }}
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure to delete it?";
    }
    return `Are you sure to delete ${this.props.stream.title}? `;
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderAction()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
