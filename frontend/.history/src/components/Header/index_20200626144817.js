import React from 'react';

// import { Container } from './styles';

function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fgithub.com%2Fhelderavila%2Ffastfeet&psig=AOvVaw2OGsdW4bbPH9HKvp0Qsjb9&ust=1593279904947000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCNjIs6CEoOoCFQAAAAAdAAAAABAD" alt="FastFeet"/>
          <Link>ENCOMENDAS</Link>
          <Link>ENTREGADORES</Link>
          <Link>DESTINATÁRIOS</Link>
          <Link>PROBLEMAS</Link>
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