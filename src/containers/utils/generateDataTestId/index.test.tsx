import React from 'react';
import { render, screen } from '@testing-library/react';
import { generateDataTestId } from '.';
import '@testing-library/jest-dom';

const TestComponent = () => {
  const data = [{ name: 'Alex' }, { name: 'John' }, { name: 'Peter' }];

  return (
    <div>
      {data.map((user) => (
        <ul
          key={data.indexOf(user)}
          data-testid={generateDataTestId('component', 'user', `${data.indexOf(user)}`)}>
          {user.name}
        </ul>
      ))}
    </div>
  );
};

describe('generateTestId', () => {
  test('should find element with unique test id', () => {
    render(<TestComponent />);
    const uniqueTestId: string[] = [
      'testId_component_user_0',
      'testId_component_user_1',
      'testId_component_user_2',
    ];
    const element1 = screen.queryByTestId(uniqueTestId[0]);
    const element2 = screen.queryByTestId(uniqueTestId[1]);
    const element3 = screen.queryByTestId(uniqueTestId[2]);
    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
    expect(element3).toBeInTheDocument();
  });
});
