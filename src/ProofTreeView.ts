import { html } from 'lit-html'

export interface ProofTree {
    conclusion: string
    premiseProofTrees: ProofTree[]
}

export const ProofTreeView = (tree: ProofTree) => {
    const premise = tree.premiseProofTrees.length ?
        html`<div>${tree.premiseProofTrees[0].conclusion}</div>` :
        ""
    return html`
    ${premise}
    <hr class="inference_line">
    ${tree.conclusion}
    `
}
