import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Profile, User, Logout } from './styles';

function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src="../../assets/fastfeet-logo.png" alt="FastFeet"/>
          <a href="/encomenda">ENCOMENDAS</a>
          <a href="/encomenda">ENTREGADORES</a>
          <a href="/encomenda">DESTINATÁRIOS</a>
          <a href="/encomenda">PROBLEMAS</a>
        </nav>
        <aside>
          <Profile>
            <User>Gustavo Roberto</User>
            <Logout>Sair do sistema</Logout>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}

export default Header;