import React from 'react';
import { MdAdd, MdSearch } from 'react-icons/md';
import TableHeader from '~/components/TableHeader';
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
      <TableHeader />
    </Container>
  );
}

export default Delivery;
