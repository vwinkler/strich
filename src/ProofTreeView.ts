import { html } from 'lit-html'

export interface ProofTree {
    conclusion: string
    premiseProofTrees: ProofTree[]
}

export const ProofTreeView = (tree: ProofTree) => html`
    <hr>
    ${tree.conclusion}
`
