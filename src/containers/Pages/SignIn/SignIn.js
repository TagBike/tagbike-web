import React, { useState } from 'react';
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import IntlMessages from '@iso/components/utility/intlMessages';
import SignInStyleWrapper from './SignIn.styles';
import UseApi from '../../../helpers/BikeApi';
import {doLogin} from '../../../helpers/AuthHandler';
import {Button} from '@iso/components/utility/Buttons';
import {ErrorMessage} from '../../../components/MainComponents';

export default function() {
  const history = useHistory();

  const api = UseApi();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remeberPassword, setRememberPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    setDisabled(true);
    setError('');

    const json = await api.login(email, password);

    console.log(json);

    if(json.error === "") {
      doLogin(json.token, remeberPassword);
        history.push('/dashboard');
        
    } else {
      setError(json.error);
    }

    setDisabled(false);
}

  return (
    <SignInStyleWrapper className="isoSignInPage">
      <div className="isoLoginContentWrapper">
        <div className="isoLoginContent">
          <div className="isoLogoWrapper">
            <IntlMessages id="Bike Portal" />
          </div>
          <div className="isoSignInForm">
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
            <form onSubmit={handleSubmit}>
              <div className="isoInputWrapper">
                <Input
                  size="large"
                  placeholder="Login"
                  type="text" 
                  required 
                  value={email} 
                  onChange={e=>setEmail(e.target.value)} 
                  disabled={disabled}
                />
              </div>

              <div className="isoInputWrapper">
                <Input
                  size="large"
                  type="password"
                  placeholder="Senha"
                  autoComplete="false" 
                  required 
                  value={password} 
                  onChange={e=>setPassword(e.target.value)} 
                  disabled={disabled}
                />
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox 
                checked={remeberPassword} 
                onChange={()=>setRememberPassword(!remeberPassword)} 
                disabled={disabled}
                >
                  <IntlMessages id="Lembrar Senha" />
                </Checkbox >
                <Button type="submit" primary>Entrar</Button>
              </div>
            </form>
  
            <div className="isoCenterComponent isoHelperWrapper">
              <Link to="/forgotpassword" className="isoForgotPass">
                <IntlMessages id="page.signInForgotPass" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
