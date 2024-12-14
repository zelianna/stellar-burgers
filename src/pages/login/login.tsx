import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/reducers/authReducer';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../../services/store';
import { Console } from 'console';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const validateFields = (): boolean => {
    if (!email.includes('@') || !email.includes('.')) {
      setErrorText('Введите корректный email');
      console.log('>>>>>>', errorText);
      return false;
    }
    if (!password.trim()) {
      setErrorText('Пароль не может быть пустым');
      console.log('>>>>>>', errorText);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!validateFields()) return;

    dispatch(loginUser({ email, password }))
      .then((result: any) => {
        if (loginUser.fulfilled.match(result)) {
          console.log('>>>>>>Успех', errorText);
          navigate('/profile');
        } else {
          setErrorText(result.payload as string);
        }
      })
      .catch(() => {
        setErrorText('Произошла ошибка при авторизации');
      });
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
