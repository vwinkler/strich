import { html, render } from 'lit-html'
import { ProofTree, ProofTreeView } from './ProofTreeView'
import './style.css'

const main = () => {
    const contentElement = document.querySelector<HTMLDivElement>('#app')
    if (!contentElement) {
        console.error("Could not find content element")
        return
    }
    const leftPremiseTree : ProofTree = { conclusion: "a", premiseProofTrees: [] }
    const rightPremiseTree : ProofTree = { conclusion: "a -> b", premiseProofTrees: [] }
    const tree : ProofTree = { conclusion: "b", premiseProofTrees: [leftPremiseTree, rightPremiseTree]}

    render(html`
           ${ProofTreeView(tree)}
           `, contentElement)
}

main()
