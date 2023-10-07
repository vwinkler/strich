import { expect, test } from 'vitest'
import { getByText } from '@testing-library/dom'
import '@testing-library/jest-dom/vitest'
import { html, render } from 'lit-html';

let HelloMessage = ({name} : {name : string}) => html`Hello ${name}`

test('hello', () => {
    render(HelloMessage({ name: 'World' }), document.body)
    expect(getByText(document.body, "Hello World")).toBeInTheDocument()
})
