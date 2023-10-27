import { render, screen } from '@testing-library/react';
import{it,describe, expect} from "vitest"
import App from './App';
import userEvent from "@testing-library/user-event"

describe('App', () => {
  it('shows header', () => {
    render(<App  />);
    expect(screen.getByText("Ord Bok"))
    

  });
  it("should show the word the use searches for,user searches 'cat' ", async () => {
    render(<App/>)
    const user = userEvent.setup()

    const input = screen.getByRole("textbox")
    await user.type(input, "cat")
    
    const button = screen.getByRole("button");
    await user.click(button);

    await user.click(await screen.findByText("Phonetics"))
    expect(screen.getByText("/kæt/")).toBeInTheDocument()
    
  })

    it('should show meanings,synonyms and definitions up when searching for a cat',async()=> {
      render(<App/>)
      const user = userEvent.setup()

      const input = screen.getByRole("textbox")
      await user.type(input, "cat")
      await user.click(screen.getByRole("button"))
  
      await user.click(await screen.findByText("meanings"))
      expect(screen.getByText("noun")).toBeInTheDocument()

      await user.click(await screen.findByText("Synonyms"))
      await user.click(await screen.findByText("definitions"))

    })

});

describe('data', () => {
  it('returns data from api', async() => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/strong`
    const response = await fetch(url)
    const data = await response.json()
    expect(data[0].word).toBe('strong');


    
  });
});





describe('input', () => {
  it('returns error message when a word is not foud in the dictionary',async () => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/strongw`
    const response = await fetch(url)
    const data = await response.json()
    expect(data.message).toBe("Sorry pal, we couldn't find definitions for the word you were looking for.")


  });
});

it("Should show error message on an empty field", async () => {
  render(<App />);
  const user = userEvent.setup();
  const button = screen.getByRole("button");
  await user.click(button);
  expect( await screen.findByText("Skriv ett ord för att få ett svar")).toBeInTheDocument();
});


it("Should show audio button", async () => {
  render(<App />);
  const user = userEvent.setup();
  const input = screen.getByRole("textbox");
  await user.type(input, "food");
  const button = screen.getByRole("button");
  await user.click(button);
  expect(await screen.findByTestId("audio-button")).toBeInTheDocument();
});
