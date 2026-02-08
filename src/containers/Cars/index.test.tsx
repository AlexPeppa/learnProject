import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { generateDataTestId } from '@utils/generateDataTestId';
import { Cars } from '.';

describe('Cars component', () => {
  test('have elements after click', async () => {
    render(<Cars />);
    const carsCreateCarBtn = screen.queryByTestId(generateDataTestId('cars', 'createCarBtn'));
    const createCarCancelBtn = screen.queryByTestId(generateDataTestId('createCar', 'cancelBtn'));
    expect(carsCreateCarBtn).toBeInTheDocument();

    expect(createCarCancelBtn).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(generateDataTestId('createCar', 'carName')),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(generateDataTestId('createCar', 'carFounded')),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(generateDataTestId('createCar', 'carState')),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(generateDataTestId('createCar', 'carText')),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId(generateDataTestId('createCar', 'carModels')),
    ).not.toBeInTheDocument();

    await userEvent.click(carsCreateCarBtn);

    expect(screen.queryByTestId(generateDataTestId('createCar', 'cancelBtn'))).toBeInTheDocument();
    expect(screen.queryByTestId(generateDataTestId('createCar', 'addCarBtn'))).toBeDisabled();
    expect(screen.queryByTestId(generateDataTestId('createCar', 'carName'))).toBeInTheDocument();
    expect(screen.queryByTestId(generateDataTestId('createCar', 'carFounded'))).toBeInTheDocument();
    expect(screen.queryByTestId(generateDataTestId('createCar', 'carState'))).toBeInTheDocument();
    expect(screen.queryByTestId(generateDataTestId('createCar', 'carText'))).toBeInTheDocument();
    expect(screen.queryByTestId(generateDataTestId('createCar', 'carModels'))).toBeInTheDocument();
  });

  test('to have class select after click', async () => {
    render(<Cars />);

    const selectCarDiv1 = screen.queryByTestId(generateDataTestId('cars', 'selectedCarDiv', '1'));
    const selectCarDiv2 = screen.queryByTestId(generateDataTestId('cars', 'selectedCarDiv', '2'));
    const selectCarDiv3 = screen.queryByTestId(generateDataTestId('cars', 'selectedCarDiv', '3'));
    const selectCarLi1 = screen.queryByTestId(generateDataTestId('cars', 'selectedCarLi', '1'));
    const selectCarLi2 = screen.queryByTestId(generateDataTestId('cars', 'selectedCarLi', '2'));
    const selectCarLi3 = screen.queryByTestId(generateDataTestId('cars', 'selectedCarLi', '3'));

    expect(selectCarDiv1).toBeInTheDocument();
    expect(selectCarDiv2).toBeInTheDocument();
    expect(selectCarDiv3).toBeInTheDocument();
    expect(selectCarLi1).toHaveClass('li select');
    expect(selectCarLi2).not.toHaveClass('li select');
    expect(selectCarLi3).not.toHaveClass('li select');

    await userEvent.click(selectCarDiv2);

    expect(screen.queryByTestId(generateDataTestId('cars', 'selectedCarLi', '1'))).not.toHaveClass(
      'li select ',
    );
    expect(screen.queryByTestId(generateDataTestId('cars', 'selectedCarLi', '2'))).toHaveClass(
      'li select',
    );
    expect(screen.queryByTestId(generateDataTestId('cars', 'selectedCarLi', '3'))).not.toHaveClass(
      'li select',
    );
  });

  test('input carName change value, addCarBtn work , cancelBtn work', async () => {
    render(<Cars />);
    const carsCreateCarBtn = screen.queryByTestId(generateDataTestId('cars', 'createCarBtn'));

    await userEvent.click(carsCreateCarBtn);
    const createCarNameInput = screen.getByLabelText('Car name');
    expect(createCarNameInput).toBeInTheDocument();

    await userEvent.type(createCarNameInput, 'Audi');

    const createCarAddCarBtn = screen.queryByTestId(generateDataTestId('createCar', 'addCarBtn'));
    expect(createCarNameInput).toHaveValue('Audi');
    expect(createCarAddCarBtn).not.toBeDisabled();

    await userEvent.click(createCarAddCarBtn);
    const carName = screen.queryByTestId(generateDataTestId('car', 'name'));
    expect(carName).toHaveTextContent('Audi');

    await userEvent.click(carsCreateCarBtn);

    const createCarCancelBtn = screen.queryByTestId(generateDataTestId('createCar', 'cancelBtn'));

    await userEvent.click(createCarCancelBtn);
    const carsComponentDiv = screen.queryByTestId(generateDataTestId('carsComponent', 'mainDiv'));
    expect(carsComponentDiv).toBeInTheDocument();
  });
});
