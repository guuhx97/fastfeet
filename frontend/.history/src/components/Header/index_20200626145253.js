import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Profile, User, Logout } from './styles';

function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fgithub.com%2Fhelderavila%2Ffastfeet&psig=AOvVaw2OGsdW4bbPH9HKvp0Qsjb9&ust=1593279904947000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjIs6CEoOoCFQAAAAAdAAAAABAD" alt="FastFeet"/>
          <Link to="/encomenda">ENCOMENDAS</Link>
          <Link to="/encomenda">ENTREGADORES</Link>
          <Link to="/encomenda">DESTINATÁRIOS</Link>
          <Link to="/encomenda">PROBLEMAS</Link>
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