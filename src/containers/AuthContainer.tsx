import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

type Props = {
  isNewUser?: boolean;
  setUser: (user: User) => void;
};

export default function AuthContainer({ isNewUser, setUser }: Props) {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  function showTermsOfService() {
    console.log('put a modal here');
  }

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e);
  }

  function showNewOrReturningUserPrompt() {
    return isNewUser ? (
      <Nav.Link href="/login">Returning User? Log in here</Nav.Link>
    ) : (
      <Nav.Link href="/register">New User? Register here</Nav.Link>
    );
  }

  function returnNewUserFields() {
    return (
      <>
        <Form.Group as={Form.Row}>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            size="lg"
            type="email"
            placeholder="Enter email"
            onChange={handleFormChange}
            value={email}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else. No promises on that.
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label={
              <p>
                Agree to{' '}
                <span
                  onClick={showTermsOfService}
                  style={{ color: 'DodgerBlue', textDecoration: 'underline' }}
                >
                  Terms of Service
                </span>{' '}
                blah blah blah who cares.
              </p>
            }
          />
        </Form.Group>
      </>
    );
  }

  return (
    <div
      style={{
        marginTop: '3%',
        marginLeft: '15%',
        marginRight: '15%',
        border: '2px solid gainsboro',
        padding: '2%',
        borderRadius: '30px',
      }}
    >
      <h1>{isNewUser ? 'Join us!' : 'Welcome back!'}</h1>
      <Form>
        <Form.Group as={Form.Row}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            size="lg"
            type="username"
            placeholder="Username"
            onChange={handleFormChange}
            value={username}
          />
          <Form.Text className="text-muted">
            {isNewUser
              ? 'Pick a cool looking username, you are going to be stuck with it for a while. :)'
              : 'Hope you picked that cool username I was talking about. ¯\\_(ツ)_/¯'}
          </Form.Text>
        </Form.Group>
        <Form.Group as={Form.Row}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            size="lg"
            type="password"
            placeholder="Password"
            onChange={handleFormChange}
            value={password}
          />
          <Form.Text className="text-muted">
            {isNewUser
              ? "Don't forget your password. I can't recover it. yet."
              : 'You did remember that password. Right? :D'}
          </Form.Text>
        </Form.Group>
        {isNewUser ? returnNewUserFields() : null}
        <Button variant="primary" type="submit">
          {isNewUser ? 'Register' : 'Log In'}
        </Button>
      </Form>
      {showNewOrReturningUserPrompt()}
    </div>
  );
}
