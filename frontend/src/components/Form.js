import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { H2 } from './UI/Typography';
import FieldFactory from './UI/Field';
import config from '../config';
import { PrimaryButton } from './UI';

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const F = styled.form`
    box-sizing: border-box;
    font-family: Kufam, sans-serif;
    width: 99%;
    border-radius: 5px;
    background: ${(props) => props.theme.colors.fill};
    box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
    text-align: center;
    background-size: cover;
    font-size: medium;
    padding: ${(props) => props.theme.padding.section};
    `;

const H1 = styled(H2)`
    font-size: 38px;
    text-align:center;
    color: ${(props) => props.theme.colors.primary};
    `;

const Table = styled.table`
    margin-left: auto;
    margin-right: auto;
    `;

const InputText = FieldFactory(styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    background: ${(props) => props.theme.colors.alternateFill};
    box-sizing: border-box;
    border: none;
    border-radius: 15px;
    font-family: Kufam;
    `);

const InputPassword = FieldFactory(styled.input`
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    background: ${(props) => props.theme.colors.alternateFill};
    box-sizing: border-box;
    border: none;
    border-radius: 15px;
    font-family: Kufam;
    `);

const Button = styled(PrimaryButton)`
  padding: 10px;
  width: 60%;
  cursor: pointer;
  `;

const Form = ({ loggedInUser, setLoggedInUser }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch(`${config.api.url}users/`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email,
        password,
        token: loggedInUser.token,
        loggedInEmail: loggedInUser.email,
      }),
    }).then((response) => response.json())
      .then((data) => {
        setLoggedInUser({ ...data });
      })
      .catch((error) => console.log(error));
  };

  return (
    <Wrapper>
      <F onSubmit={handleSubmit}>
        <H1>Register</H1>
        <Table className="center">
          <tbody>
            <tr>
              <td>
                <InputText type="text" alt="firstName" name={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="First name" />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <InputText type="text" alt="lastName" name={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="Last name" />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <InputText type="text" alt="email" name={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <InputPassword type="password" alt="password" name={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <InputPassword type="password" alt="confirmPassword" name={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirm password" />
              </td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td>
                <Button type="submit" data-testid="submit" className="button">Submit</Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </F>
    </Wrapper>
  );
};

Form.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default Form;
