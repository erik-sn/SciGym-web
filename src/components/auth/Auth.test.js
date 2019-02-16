import React from 'react';
import ReactDOM from 'react-dom';
import { Auth } from './Auth';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const loginMock = (c, s) => null;
  ReactDOM.render(<Auth loginUserWithGithub={loginMock} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
