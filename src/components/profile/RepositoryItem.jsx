import React from "react";

import { Card } from "@blueprintjs/core";

const RepositoryItem = ({
  name,
  description,
  owner,
  htmlUrl,
  sshUrl,
  gitUrl,
  pypiName
}) => (
  <Card>
    <h3>{name}</h3>
    <p>{description}</p>
    <div>Owner: {owner.username}</div>
    <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
      Github
    </a>
    <div />
    {pypiName && <pre>pip install {pypiName}</pre>}
  </Card>
);

export default RepositoryItem;
