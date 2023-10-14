import { expect, test } from 'vitest'
import { getByText, getByRole } from '@testing-library/dom'
import '@testing-library/jest-dom/vitest'
import { render } from 'lit-html'
import { ProofTreeView } from './ProofTreeView'


test('show conclusion', () => {
    const tree = { conclusion: "-p-q--", premiseProofTrees: [] }
    render(ProofTreeView(tree), document.body)
    expect(getByText(document.body, "-p-q--")).toBeInTheDocument()
})

test('show inference line', () => {
    const tree = { conclusion: "-p-q--", premiseProofTrees: [] }
    render(ProofTreeView(tree), document.body)
    expect(getByRole(document.body, "separator")).toBeInTheDocument()
})

test('show premise', () => {
    const premiseTree = { conclusion: "premise", premiseProofTrees: [] }
    const tree = { conclusion: "conclusion", premiseProofTrees: [ premiseTree ] }
    
    render(ProofTreeView(tree), document.body)
    
    expect(getByText(document.body, "premise")).toBeInTheDocument()
})
