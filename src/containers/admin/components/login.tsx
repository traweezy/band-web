import React, { useState, FormEvent, JSXElementConstructor, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { writeStorage } from '@rehooks/local-storage';

import AdminApi from '../../../services/admin-api';

const AdminApiClient = AdminApi.getInstance();

const LoginDialog = styled(Dialog)`
  .MuiDialog-paper {
    max-width: 360px;
  }
`;

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown, string | JSXElementConstructor<unknown>>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const enum LoginState {
  READY,
  PENDING,
  ERROR,
  SUCCESS,
}

interface LoginProps {
  show: boolean;
}

const Login: React.FC<LoginProps> = ({ show }) => {
  const navigate = useNavigate();
  const [loginState, setLoginState] = useState<LoginState>(LoginState.READY);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    if (email && password) {
      try {
        const res = await AdminApiClient.postLogin({ email, password });
        writeStorage('jwt_token', res.token);
        setLoginState(LoginState.SUCCESS);
        navigate('/admin/recordings');
      } catch (error) {
        setLoginState(LoginState.ERROR);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        handleSubmit();
      }
    });

    return () =>
      document.removeEventListener('keydown', (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          handleSubmit();
        }
      });
  }, [loginState, email, password]);

  return (
    <LoginDialog open={show} fullWidth={true} maxWidth="sm" TransitionComponent={Transition} keepMounted={true}>
      <DialogTitle sx={{ fontSize: 36 }}>Login</DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          noValidate={true}
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            required={true}
            autoFocus={true}
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth={true}
            variant="standard"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            error={loginState === LoginState.ERROR}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            required={true}
            autoFocus={true}
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth={true}
            variant="standard"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            error={loginState === LoginState.ERROR}
          />
          {loginState === LoginState.ERROR && (
            <Alert severity="error" sx={{ mt: 3 }}>
              Invalid email or password. Please try again. If you have not yet created an account, please contact your
              administrator.
            </Alert>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </DialogActions>
    </LoginDialog>
  );
};

export default Login;
