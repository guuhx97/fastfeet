import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Profile, User, Logout } from './styles';
import logo from '../../assets/fastfeet-logo.png'
function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet"/>
          <a href="/encomenda">ENCOMENDAS</a>
          <a href="/encomenda">ENTREGADORES</a>
          <a href="/encomenda">DESTINATÁRIOS</a>
          <a href="/encomenda">PROBLEMAS</a>
        </nav>
        <aside>
          <Profile>
            <User>Admin FastFeet</User>
            <Logout>sair do sistema</Logout>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default Header;