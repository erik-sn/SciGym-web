import React, { Component } from "react";

import { Button, Card } from "@blueprintjs/core";

// not implemented yet -- convert to material
class Profile extends Component {
  render() {
    return (
      <Card>
        <Button icon="refresh" intent="danger" text="Find gym repos" />
      </Card>
    );
  }
}

Profile.propTypes = {};

export default Profile;
