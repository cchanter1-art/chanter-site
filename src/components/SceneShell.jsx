import React from 'react'
import '../styles/scene-shell.css'

/**
 * SceneShell
 * A fixed full-viewport container. Each child is layered absolutely inside.
 * The active child is revealed; others are hidden.
 * Direction ("up"/"down") is tracked to stagger the exit/enter transforms.
 */
export default function SceneShell({ children, currentScene }) {
  const childArray = React.Children.toArray(children)
  const prevScene  = React.useRef(currentScene)

  // Determine direction so we can animate accordingly
  const direction = currentScene > prevScene.current ? 'forward' : 'backward'
  React.useEffect(() => { prevScene.current = currentScene }, [currentScene])

  return (
    <main className="scene-shell" aria-live="polite">
      {childArray.map((child, i) => {
        let state = 'hidden'
        if (i === currentScene)                               state = 'active'
        else if (i < currentScene && direction === 'forward') state = 'past'
        else if (i > currentScene && direction === 'backward') state = 'future'
        else if (i < currentScene)                            state = 'past'
        else                                                  state = 'future'

        return (
          <div
            key={i}
            className={`scene-panel scene-panel--${state}`}
            aria-hidden={i !== currentScene}
          >
            {child}
          </div>
        )
      })}
    </main>
  )
}
