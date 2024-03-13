import { render , screen} from "@testing-library/react";

import Greeting from "./Greeting";

test('render Hello World as a text' , ()=>{
    <Greeting></Greeting>

    const helloworldElement = screen.getByText('Hello world')
    expect(helloworldElement).toBeInTheDocument()
})