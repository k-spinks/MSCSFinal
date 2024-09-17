# Wordle dupe

[Wordle dupe](https://wordledupe.netlify.app/)

![Wordle home screen](/img/WordleSplash.png)

## How its made
**Tech used:** HTML, CSS, JavaScript

This project was developed using HTML, CSS, and JavaScript to create a simple yet functional user interface and game logic. The HTML provides the structure for the game grid and input boxes, while CSS handles the layout and visual feedback for user guesses, including color changes based on the correctness of each letter in the word.

The core functionality relies on JavaScript. To efficiently validate words, a Directed Acyclic Word Graph (DAWG) was implemented, allowing for quick lookups of words from a predefined dictionary. This ensures that only valid words are accepted as guesses, making the game both fast and responsive.

![Wordle win](/img/WordleWin.png)

## Potential Optimizations
One optimization would be a visual indication to the user that a word entered is not found in the dictionary. As is the invalid indicator is placed as a `console.log`.

Another optimization is to implement a full game loop which would allow the user to replay instead of having to refresh to replay and generate a new word.

## What I learned

1. Directed Acyclic Word Graph
 - Implementing the DAWG structure taught me how it optimizes both memory usage and search speed, especially when dealing with large sets of words. It also helped me strengthen my skills in manipulating data structures with JavaScript, making the word-checking process seamless and responsive in the game.
2. CSS Animation
 - Implementing the flip animation deepened my understanding of how transformations like `scaleY` can be used to manipulate elements' dimensions dynamically. I also gained experience with timing functions like `ease`, which helped me control the animation's flow, making transitions smoother and more engaging.