import React, { useState, FormEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
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
    children: React.ReactElement<unknown, unknown>;
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
  const [loginState, setLoginState] = useState<LoginState>(LoginState.READY);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await AdminApiClient.postLogin({ email, password });
      writeStorage('jwt_token', res.token);
      setLoginState(LoginState.SUCCESS);
    } catch (error) {
      setLoginState(LoginState.ERROR);
    }
  };

  return (
    <LoginDialog
      open={show}
      fullWidth
      maxWidth="sm"
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>
        <Typography variant="h4">Login</Typography>
      </DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            error={loginState === LoginState.ERROR}
          />
          <TextField
            required
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            error={loginState === LoginState.ERROR}
          />
          {loginState === LoginState.ERROR && (
            <Alert severity="error" sx={{ mt: 3 }}>
              Invalid email or password. Please try again. If you have not yet
              created an account, please contact your administrator.
            </Alert>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </DialogActions>
    </LoginDialog>
  );
};

export default Login;
