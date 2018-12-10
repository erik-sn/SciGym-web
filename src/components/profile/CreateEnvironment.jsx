import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  Checkbox,
  H3
} from "@blueprintjs/core";

// not implemented yet -- convert to material
class CreateEnvironment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      name: "",
      pypiName: "",
      public: true
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.togglePublic = this.togglePublic.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleForm(event) {
    event.preventDefault();
    this.setState({ showForm: !this.state.showForm });
  }

  togglePublic(event) {
    event.preventDefault();
    this.setState({ public: !this.state.public });
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    const { showForm } = this.state;
    if (!showForm) {
      return (
        <Button
          icon="add"
          intent="success"
          text="Create Environment"
          onClick={this.toggleForm}
        />
      );
    }
    return (
      <div id="create-environment-form">
        <H3>Create Environment</H3>
        <FormGroup
          inline
          intent={Intent.None}
          label="Name"
          labelFor="name"
          labelInfo="(required)"
        >
          <InputGroup
            id="name"
            placeholder="Environment name"
            intent={Intent.None}
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup
          inline
          intent={Intent.None}
          label="Pypi Name"
          labelFor="pypiName"
        >
          <InputGroup
            id="pypiName"
            placeholder="Pypi name"
            intent={Intent.None}
            value={this.state.pypiName}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Checkbox
          checked={this.state.public}
          onChange={this.togglePublic}
          label="Public"
        />
        <Button
          id="create-environment-btn"
          icon="add"
          intent="success"
          text="Create"
          onClick={this.toggleForm}
        />
        <Button
          icon="cross"
          intent="danger"
          text="Cancel"
          onClick={this.toggleForm}
        />
      </div>
    );
  }
}

CreateEnvironment.propTypes = {
  createEnvironment: PropTypes.func.isRequired
};

export default CreateEnvironment;
