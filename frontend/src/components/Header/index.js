import React from 'react';
import { Link } from 'react-router-dom';
import logo from '~/assets/fastfeet-logo.png';
import { Container, Content, Logout, Profile, User } from './styles';

function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="FastFeet" />
          <Link to="/delivery">ENCOMENDAS</Link>
          <Link to="/deliveryman">ENTREGADORES</Link>
          <Link to="/recipient">DESTINATÁRIOS</Link>
          <Link to="/problem">PROBLEMAS</Link>
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
