import React from 'react'
import { useDraggable } from '@dnd-kit/core'

function Draggable(props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  })

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} className="touch-none">
      {props.children}
    </div>
  )
}

export default Draggable
