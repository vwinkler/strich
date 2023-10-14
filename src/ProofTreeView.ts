import { html } from 'lit-html'

export interface ProofTree {
    conclusion: string
    premiseProofTrees: ProofTree[]
}

export const ProofTreeView = (tree: ProofTree) => {
    const premises = tree.premiseProofTrees.map(
        (premiseTree) => html`
        <div class="tree_container">
        <hr class="inference_line">
        <div class="formula">${premiseTree.conclusion}</div>
        </div>`
    )
    return html`
    <div class="tree_container">
    <div class="premise_trees">${premises}</div>
    <hr class="inference_line">
    <div class="formula">${tree.conclusion}</div>
    </div>
    `
}
