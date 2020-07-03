import { Form, Input } from '@rocketseat/unform';
import React, { useState } from 'react';
import * as Yup from 'yup';
import logo from '~/assets/fastfeet-logo.png';
import { Content, Span } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: Yup.string().required('O e-mail é obrigatório'),
});

export default function Delivery() {
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setTimeout(setLoading(true), 3000);
    console.log('Logouuuu!!');
    setLoading(false);
  }

  return (
    <Content>
      <img src={logo} alt="FastFeet" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Span>SEU E-MAIL</Span>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <Span>SUA SENHA</Span>
        <Input name="password" type="password" placeholder="**************" />
        <button type="submit">
          {loading ? 'Carregando...' : 'Entrar no sistema'}
        </button>
      </Form>
    </Content>
  );
}
