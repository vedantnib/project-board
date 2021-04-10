import { render } from '@testing-library/react';
import React, { Component } from 'react';
import styled from 'styled-components';
import Lane from '../components/Lane/Lane';
import withDataFetching from '../withDataFetching';

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

class Board extends React.Component {
  constructor() {
    super();
    this.state = {
      tickets: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState(
        {
          tickets: this.props.data
        }
      );
    }
  }

  onDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  };

  render() {
    const { lanes, loading, error } = this.props;
    return (
      <BoardWrapper>
        {lanes.map(
          lane => (
            <Lane key={lane.id}
              title={lane.title}
              loading={loading}
              error={error}
              onDragStart={this.onDragStart}
              tickets={
                this.state.tickets.filter(
                  ticket => ticket.lane === lane.id
                )
              } />
          ))}
      </BoardWrapper>
    );
  }
}



export default withDataFetching(Board);