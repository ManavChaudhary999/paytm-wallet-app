import React from 'react';
import {useNavigate} from 'react-router-dom';
import AxiosInstance from '../../axios';
import CardContainer from '../components/CardContainer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';


const SignupPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  function handleSubmit(e){
    e.preventDefault();

    if(password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    AxiosInstance.post('/user/signup', {
      firstName,
      lastName,
      email,
      password
    })
      .then((res)=> {
        const data = res.data;
        console.log(data);
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
    <CardContainer title='Create an Account'>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField type="text" label="Firstname" name="firstName" value={firstName} setValue={setFirstName} />
        <InputField type="text" label="Lastname" name="lastName" value={lastName} setValue={setLastName} />
        <InputField type="email" label="Email" name="email" value={email} setValue={setEmail} />
        <InputField type="password" label="Password" name="password" value={password} setValue={setPassword} />
        <InputField type="password" label="Confirm Password" name="confirmPassword" value={confirmPassword} setValue={setConfirmPassword} />
        <Button>Sign Up</Button>
      </form>
      <BottomWarning href="/signin" label="Sign In">
        Already have an account?{" "}
      </BottomWarning>
    </CardContainer>
  );
};

export default SignupPage;
