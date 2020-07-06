import React from 'react';
import { MdAdd, MdMoreHoriz, MdSearch } from 'react-icons/md';
import { Container, Title, Tools } from './styles';

function Delivery() {
  return (
    <Container>
      <Title>Gerenciando encomendas</Title>
      <Tools>
        <aside>
          <div>
            <MdSearch color="#666" size={20} />
          </div>
          <input placeholder="Buscar por encomendas" />
        </aside>
        <button type="button">
          <div>
            <MdAdd color="#fff" size={20} />
          </div>
          <span>CADASTRAR</span>
        </button>
      </Tools>
      <ul>
        <section>
          <h1>ID</h1>
          <h1>Destinatário</h1>
          <h1>Entregador</h1>
          <h1>Cidade</h1>
          <h1>Estado</h1>
          <h1>Status</h1>
          <h1>Ações</h1>
        </section>
        <li>
          <span>#01</span>
          <span>#Antonio Vivaldi</span>
          <span>Roseta Castro</span>
          <span>Rio do Sul</span>
          <span>Santa Catarina</span>
          <span>Entregue</span>
          <button type="button">
            <div>
              <MdMoreHoriz size={24} color="#666" />
            </div>
          </button>
        </li>
        <li>
          <span>#01</span>
          <span>Gustavo Roberto de SOuza</span>
          <span>Carlos da Silva Saurao</span>
          <span>Itapema</span>
          <span>Santa Catarina</span>
          <span>Entregue</span>
          <button type="button">
            <div>
              <MdMoreHoriz size={24} color="#666" />
            </div>
          </button>
        </li>
        <li>
          <span>#01</span>
          <span>#Antonio Vivaldi</span>
          <span>Roseta Castro</span>
          <span>Rio do Sul</span>
          <span>Santa Catarina</span>
          <span>Entregue</span>
          <button type="button">
            <div>
              <MdMoreHoriz size={24} color="#666" />
            </div>
          </button>
        </li>
      </ul>
    </Container>
  );
}

export default Delivery;
