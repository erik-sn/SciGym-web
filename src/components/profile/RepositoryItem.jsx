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
      <img
        className="repo-github-icon"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1024px-Octicons-mark-github.svg.png"
        alt="Link to repo"
      />
    </a>
    <div />
    {pypiName && <pre>pip install {pypiName}</pre>}
  </Card>
);

export default RepositoryItem;
