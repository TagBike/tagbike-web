import React, { useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Carousel from '@iso/components/uielements/carousel';
import IntlMessages from '@iso/components/utility/intlMessages';
import SignInStyleWrapper from './SignIn.styles';
import Button from '@iso/components/uielements/button';
import logoIcon from '@iso/assets/images/icons/icon-144x144.png';
import {ErrorMessage} from '../../../components/MainComponents';
import api  from '../../../helpers';


export default function() {
  const history = useHistory();  

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remeberPassword, setRememberPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState('');

  
  const contentStyle = {
    width: '100%',
    height: '100vh',
  };

  const handleSubmit = async (e) =>  {
    e.preventDefault();
    setDisabled(true);
    setError('');
    
    const json = await api.bike.login(email, password);
    
    if(json.error === "") {
      api.auth.login(json.token, remeberPassword);
        history.push('/customers');
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
            <img src={logoIcon}  />
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
                <Button type="submit" htmlType="submit" >Entrar</Button>
              </div>
            </form>
  
           {/* <div className="isoCenterComponent isoHelperWrapper">
              <Link to="/forgotpassword" className="isoForgotPass">
                <IntlMessages id="page.signInForgotPass" />
              </Link>
              </div>*/}
          </div>
        </div>
      </div>
    </SignInStyleWrapper>
  );
}
