import { expect, test } from 'vitest'
import { getByText, getByRole, getAllByRole } from '@testing-library/dom'
import '@testing-library/jest-dom/vitest'
import { render, html } from 'lit-html'
import { ProofTreeView, defaultCustomViews } from './ProofTreeView'


test('show conclusion', () => {
    const tree = { conclusion: "-p-q--", premiseProofTrees: [], rule: "" }
    render(ProofTreeView(tree, defaultCustomViews), document.body)
    expect(getByText(document.body, "-p-q--")).toBeInTheDocument()
})

test('show inference line', () => {
    const tree = { conclusion: "-p-q--", premiseProofTrees: [], rule: "" }
    render(ProofTreeView(tree, defaultCustomViews), document.body)
    expect(getByRole(document.body, "separator")).toBeInTheDocument()
})

test('show premise', () => {
    const premiseTree = { conclusion: "premise", premiseProofTrees: [], rule: "" }
    const tree = { conclusion: "conclusion", premiseProofTrees: [ premiseTree ], rule: "" }
    
    render(ProofTreeView(tree, defaultCustomViews), document.body)
    
    expect(getByText(document.body, "premise")).toBeInTheDocument()
})

test('show inference line of premise', () => {
    const premiseTree = { conclusion: "premise", premiseProofTrees: [], rule: "" }
    const tree = { conclusion: "conclusion", premiseProofTrees: [ premiseTree ], rule: "" }
    
    render(ProofTreeView(tree, defaultCustomViews), document.body)
    
    expect(getAllByRole(document.body, "separator")).toHaveLength(2)
})

test('show other premise', () => {
    const leftPremiseTree = { conclusion: "pre", premiseProofTrees: [], rule: "" }
    const rightPremiseTree = { conclusion: "pre -> post", premiseProofTrees: [], rule: "" }
    const tree = { conclusion: "post", premiseProofTrees: [ leftPremiseTree, rightPremiseTree ],
        rule: "" }
    
    render(ProofTreeView(tree, defaultCustomViews), document.body)
    
    expect(getByText(document.body, "pre -> post")).toBeInTheDocument()
})

test('show premise of premise', () => {
    const innerPremiseTree = { conclusion: "-p-q--", premiseProofTrees: [], rule: "" }
    const directPremiseTree = { conclusion: "-p--q---", premiseProofTrees: [ innerPremiseTree ],
        rule: "" }
    const tree = { conclusion: "-p---q----", premiseProofTrees: [ directPremiseTree ], rule: "" }
    
    render(ProofTreeView(tree, defaultCustomViews), document.body)
    
    expect(getByText(document.body, "-p-q--")).toBeInTheDocument()
})

test('show name of rule', () => {
    const tree = { conclusion: "-p-q--", premiseProofTrees: [], rule: "Ax" }
    
    render(ProofTreeView(tree, defaultCustomViews), document.body)
    
    expect(getByText(document.body, "Ax")).toBeInTheDocument()
})

test('show custom FormulaView', () => {
    const tree = { conclusion: "-p-q--", premiseProofTrees: [], rule: "Ax" }
    const customViews = {
        ...defaultCustomViews,
        FormulaView: () => html`<div>Test FormulaView</div>`
    }
    
    render(ProofTreeView(tree, customViews), document.body)
    
    expect(getByText(document.body, "Test FormulaView")).toBeInTheDocument()
})

test('show custom InferenceLineView', () => {
    const tree = { conclusion: "-p-q--", premiseProofTrees: [], rule: "Ax" }
    const customViews = {
        ...defaultCustomViews,
        InferenceLineView: () => html`<div>Test InferenceLineView</div>`
    }
    
    render(ProofTreeView(tree, customViews), document.body)
    
    expect(getByText(document.body, "Test InferenceLineView")).toBeInTheDocument()
})

test('show custom RuleNameView', () => {
    const tree = { conclusion: "-p-q--", premiseProofTrees: [], rule: "Ax" }    
    const customViews = {
        ...defaultCustomViews,
        RuleNameView: () => html`<div>Test RuleNameView</div>`            
    }
    
    render(ProofTreeView(tree, customViews), document.body)
    
    expect(getByText(document.body, "Test RuleNameView")).toBeInTheDocument()
})
