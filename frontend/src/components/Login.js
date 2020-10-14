import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { User } from 'react-feather';
import config from '../config';
import {
  FieldFactory,
  PrimaryButton,
  Label,
  H4,
} from './UI';

const StyledInput = FieldFactory(styled.input``);

const Icon = styled(User)`
  margin: auto
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.fill};
  padding: ${(props) => props.theme.padding.section};
  width: 90%;
  max-width: 26rem;
  border-radius: ${(props) => props.theme.size.corner};
  -webkit-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  -moz-box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
  box-shadow: -10px 10px 40px 0px rgba(10,10,10,0.75);
`;

const StyledTextRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => props.theme.spacing.subsection};
  &:nth-child(1) {
  margin: 0;
  }
`;

const StyledSelectRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing.subsection};
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  width: 100%;
  margin: ${(props) => props.theme.spacing.subsection};
  padding: ${(props) => props.theme.size.button};
  margin-top: ${(props) => props.theme.spacing.subsection};
`;

const StyledAnchor = styled(Link)`
  color: ${(props) => props.theme.colors.inactive};
  // Remove default underline on anchor elements
  text-decoration: none;
`;

const StyledH4 = styled(H4)`
  margin: ${(props) => props.theme.spacing.subsection};
  color: ${(props) => props.theme.colors.inactive};
  text-decoration: underline;

  transition: all .2s ease-in-out;
  &:hover {
    color: white;
  }
`;

const Login = ({ setLoggedInUser, showNotification }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${config.api.url}login/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then((response) => {
      if (response.status === 400) {
        showNotification('Incorrect username or password ! Please double check and try again later. ', '#CC354E', '5');
        console.error('Bad request');
        return;
      } else if (response.status === 201) {
        showNotification('Signed in sucessfully :)', '#8064f7', '7');
        return response.json();
      }
    })
    .then((data) => {
        setLoggedInUser({ ...data });
    });
  };

  return (
    <StyledForm aria-label="Signin form" onSubmit={handleSubmit}>
      <StyledTextRow>
        <Icon size={55} color="#8064f7" />
      </StyledTextRow>

      <StyledTextRow>
        <Label htmlFor="username">Email</Label>
        <StyledInput
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email.."
          data-testid="email"
        />
      </StyledTextRow>

      <StyledTextRow>
        <Label htmlFor="password">Password</Label>
        <StyledInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password..."
          data-testid="password"
        />
      </StyledTextRow>

      <StyledSelectRow>
        <StyledPrimaryButton type="submit">Sign In</StyledPrimaryButton>
      </StyledSelectRow>

      <StyledAnchor to="/register">
        <StyledH4>
          Do not have an account? Register here.
        </StyledH4>
      </StyledAnchor>

    </StyledForm>
  );
};

Login.propTypes = {
  setLoggedInUser: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
};

export default Login;
