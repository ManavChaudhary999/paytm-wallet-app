import React from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../../axios';
import CardContainer from '../components/CardContainer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';

const SigninPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSubmit(e){
    e.preventDefault();

    AxiosInstance.post('/user/signin', {
      email,
      password
    })
      .then((res)=> {
        const data = res.data;
        alert(data.message);
        window.localStorage.setItem("user", JSON.stringify({
          token: data.token,
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
        }));
        navigate('/dashboard');
      })
      .catch((err)=> {
        const error = err.response?.data;
        if(error?.message) alert(error?.message);
      });
  }
  
  return (
    <CardContainer title='Login to your account'>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField label="Email" type="email" name="email" value={email} setValue={setEmail} />
        <InputField label="Password" type="password" name="password" value={password} setValue={setPassword} />
        <Button>Sign In</Button>
      </form>
      <BottomWarning label="Sign Up" href="/signup">Don't have an account?{" "}
      </BottomWarning>
    </CardContainer>
  );
};

export default SigninPage;
