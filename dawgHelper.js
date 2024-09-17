import { dictionary } from "./dictionary.js"

let root

function createNode() {
    const node = {transitions: new Map(), wordEnd: false }
    return node
}

function dawg(dictionary) {
    root = createNode()
    let reg = new Map()

    for(let word of dictionary) {
        let currentNode = root

        for(let i = 0; i < word.length; i++) {
            let char = word[i]
            if(currentNode.transitions.has(char)) {
                currentNode = currentNode.transitions.get(char)
            } else {
                let newNode = createNode()
                currentNode.transitions.set(char, newNode)
                currentNode = newNode
            }
        }
        currentNode.wordEnd = true
        reg.set(currentNode, currentNode)
     }
}


// ! Tests word
function testWord(root, word) {
    let currentNode = root

    for(let i = 0; i < word.length; i++) {
        let char = word[i].toLowerCase()
        console.log(`Searching for character "${char}"`)

        if(currentNode.transitions.has(char)) {
            console.log(`Transition found for character "${char}"`)
            currentNode = currentNode.transitions.get(char)
        } else {
            console.log(`No transition found for character "${char}"`);
            return false
        }
    }
    console.log(`End of word "${word}". Word end flag: ${currentNode.wordEnd}`);
    return currentNode.wordEnd
}

dawg(dictionary)

// let word = "zipper"
// console.log(`Is "${word}" in the DAWG?`, testWord(root, word))