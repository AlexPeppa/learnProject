import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Cars } from '.';
import { generateDataTestId } from '../utils/generateDataTestId';

describe('Cars component', () => {
  test('cars Snapshot test', () => {
    const component = render(<Cars />);
    expect(component).toMatchSnapshot();
  });
  test('have elements after click', async () => {
    render(<Cars />);
    const carsCreateCarBtn = screen.queryByTestId(generateDataTestId('cars', 'createCarBtn'));
    const createCarCancelBtn = screen.queryByTestId(generateDataTestId('createCar', 'cancelBtn'));
    expect(carsCreateCarBtn).toBeInTheDocument();

    expect(createCarCancelBtn).toBeNull();
    expect(screen.queryByTestId(generateDataTestId('createCar', 'carName'))).toBeNull();
    expect(screen.queryByTestId(generateDataTestId('createCar', 'carFounded'))).toBeNull();
    expect(screen.queryByTestId(generateDataTestId('createCar', 'carState'))).toBeNull();
    expect(screen.queryByTestId(generateDataTestId('createCar', 'carText'))).toBeNull();
    expect(screen.queryByTestId(generateDataTestId('createCar', 'carModels'))).toBeNull();

    userEvent.click(carsCreateCarBtn);

    expect(
      await screen.findByTestId(generateDataTestId('createCar', 'cancelBtn')),
    ).toBeInTheDocument();
    expect(await screen.findByTestId(generateDataTestId('createCar', 'addCarBtn'))).toBeDisabled();
    expect(
      await screen.findByTestId(generateDataTestId('createCar', 'carName')),
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId(generateDataTestId('createCar', 'carFounded')),
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId(generateDataTestId('createCar', 'carState')),
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId(generateDataTestId('createCar', 'carText')),
    ).toBeInTheDocument();
    expect(
      await screen.findByTestId(generateDataTestId('createCar', 'carModels')),
    ).toBeInTheDocument();
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

    userEvent.click(selectCarDiv2);

    expect(await screen.findByTestId(generateDataTestId('cars', 'selectedCarLi', '1'))).toHaveClass(
      'li select ',
    );
    expect(await screen.findByTestId(generateDataTestId('cars', 'selectedCarLi', '2'))).toHaveClass(
      'li select',
    );
    expect(
      await screen.findByTestId(generateDataTestId('cars', 'selectedCarLi', '3')),
    ).not.toHaveClass('li select');
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
