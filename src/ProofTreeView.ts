import { html } from 'lit-html'

export interface ProofTree {
    conclusion: string
    premiseProofTrees: ProofTree[]
}

export const ProofTreeView = (tree: ProofTree) => html`
    <hr class="inference_line">
    ${tree.conclusion}
`
