import { html, render } from 'lit-html'
import { ProofTree, ProofTreeView } from './ProofTreeView'
import './style.css'

const main = () => {
    const contentElement = document.querySelector<HTMLDivElement>('#app')
    if (!contentElement) {
        console.error("Could not find content element")
        return
    }
    const leftTopPremiseTree : ProofTree = { conclusion: "a", premiseProofTrees: [] }
    const rightTopPremiseTree : ProofTree = { conclusion: "a -> b", premiseProofTrees: [] }
    const topPremiseTrees = [leftTopPremiseTree, rightTopPremiseTree]
    const leftPremiseTree : ProofTree = { conclusion: "b", premiseProofTrees: topPremiseTrees}
    const rightPremiseTree : ProofTree = { conclusion: "b -> c", premiseProofTrees: [] }
    const premiseTrees = [leftPremiseTree, rightPremiseTree]
    const tree : ProofTree = { conclusion: "c", premiseProofTrees: premiseTrees}

    render(html`
           ${ProofTreeView(tree)}
           `, contentElement)
}

main()
