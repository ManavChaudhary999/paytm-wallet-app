import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AxiosInstance from '../../axios';
import CardContainer from '../components/CardContainer';
import InputField from '../components/InputField';
import Button from '../components/Button';
import BottomWarning from '../components/BottomWarning';

const SendPage = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const receiver = state?.receiver;
  const [amount, setAmount] = React.useState(0);
  const [user, setUser] = React.useState(()=> {
    const data = window.localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  });

  React.useEffect(()=> {
    if(!user) {
      navigate('/signin');
      return;
    }
  },[]);

  function handleTransfer() {
    AxiosInstance.post('/account/transfer', {
      to: receiver._id,
      amount
    }, {
      headers: {
        Authorization: 'Bearer ' + user.token,
      }
    })
      .then(res=> {
        alert(res.data.message);
        navigate('/dashboard');
      })
      .catch(err => {
        const error = err.response?.data;
        if(error?.message) alert(error?.message);
      })
  }
  
  return (
    <CardContainer title='Send Money'>
      <div className="flex items-center mb-4">
        <img className="w-10 h-10 rounded-full mr-4" src="https://via.placeholder.com/50" alt="Sender Profile" />
        <span className="text-gray-700">{user?.firstName} To {receiver?.firstName}</span>
      </div>
      <div className="mb-4">
      </div>
      <InputField label="Amount in (rs)" type="number" name="amount" value={amount} setValue={setAmount} />
      {amount < 0 && <BottomWarning color="red">Amount can't be negative</BottomWarning>}
      <Button type="button" onClick={handleTransfer} disabled={amount < 0}>Initiate Transfer</Button>
    </ CardContainer>
  );
};

export default SendPage;
