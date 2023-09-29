import { render, screen } from '@testing-library/react';
import{it,describe, expect} from "vitest"
import App from './App';
import userEvent from "@testing-library/user-event"

describe('App', () => {
  it('shows header', () => {
    render(<App  />);
    expect(screen.getByText("Ord Bok"))

    // check if App components renders headline
  });
  it("user can search for a word", async () => {
    render(<App/>)
    const user = userEvent.setup()

    const input = screen.getByRole("textbox")
    await user.type(input, "cat")
    await user.click(screen.getByRole("button"))

    await user.click(await screen.findByText("Phonetics"))
    expect(screen.getByText("/kæt/")).toBeInTheDocument()
  })
    it('shows up when searching for a word',async()=> {
      render(<App/>)
      const user = userEvent.setup()

      const input = screen.getByRole("textbox")
      await user.type(input, "cat")
      await user.click(screen.getByRole("button"))
  
      await user.click(await screen.findByText("meanings"))
      expect(screen.getByText("noun")).toBeInTheDocument()

    })



});
// tester för andra kategorier
// testa för att texten dyker upp om du skriver fel ord
// testa för att texten dyker upp när du inte skriver något ord
describe('data', () => {
  it('returns data from api', async() => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/strong`
    const response = await fetch(url)
    const data = await response.json()
    expect(data[0].word).toBe('strong');


    
  });
});



describe('input', () => {
  it('returns error message on empty field',async () => {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/strongw`
    const response = await fetch(url)
    const data = await response.json()
    expect(data.message).toBe("Sorry pal, we couldn't find definitions for the word you were looking for.")


    // check if App components renders headline
  });
});

