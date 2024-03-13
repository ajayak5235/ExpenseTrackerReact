import { render , screen} from "@testing-library/react";

import Greeting from "./Greeting";

test('render Hello World as a text' , ()=>{
    <Greeting></Greeting>

    const helloworldElement = screen.getByText('Hello world')
    expect(helloworldElement).toBeInTheDocument()
})
test('renders component and shows loading spinner initially', () => {
    render(
      <Provider store={store}>
        <ShowExpense />
      </Provider>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
  await waitFor(() => screen.getByText('Expense 1'));

  expect(screen.getByText('Expense 1')).toBeInTheDocument();

  
