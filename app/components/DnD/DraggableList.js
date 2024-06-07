import { useState } from 'react'
import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'

import Draggable from './draggable'
import Droppable from './droppable'

// Function to fix collision detecting algorithm since I am using snapCenterToCursor modifier.
const fixCursorSnapOffset = (args) => {
  if (!args.pointerCoordinates) {
    return rectIntersection(args)
  }
  const { x, y } = args.pointerCoordinates
  const { width, height } = args.collisionRect
  const updated = {
    ...args,
    collisionRect: {
      width,
      height,
      bottom: y + height / 2,
      left: x - width / 2,
      right: x + width / 2,
      top: y - height / 2,
    },
  }
  return rectIntersection(updated)
}

const DraggableList = ({
  normalRender, // element for normal item
  dragRender, // element for dragging item
  activeRender, // element for original item of dragging item
  items: originalItems,
}) => {
  const [items, setItems] = useState(originalItems)
  const [activeItem, setActiveItem] = useState(null)
  const [collisionId, setCollisionId] = useState(null)

  function handleDragStart(event) {
    setActiveItem(items.find((item) => item.id === event.active.id))
  }

  function handleDragEnd(event) {
    const { active, over } = event

    // Swap source(active) and target(over) item.
    if (active?.id && over?.id && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      const newItems = [...items]
      newItems[oldIndex] = items[newIndex]
      newItems[newIndex] = items[oldIndex]
      setItems(newItems)
    }

    setActiveItem(null)
    setCollisionId(null)
  }

  function handleDragMove(event) {
    const { collisions } = event

    // This code part is for getting the first item among two collision items.
    if (collisions.length == 2) {
      const index1 = items.findIndex((item) => item.id === collisions[0].id)
      const index2 = items.findIndex((item) => item.id === collisions[1].id)
      if (index1 >= index2) {
        setCollisionId(collisions[0].id)
      } else {
        setCollisionId(collisions[1].id)
      }
    } else {
      setCollisionId(null)
    }
  }

  // Function to highlight a line between collision items.
  function handleCollisionLine(id) {
    if (collisionId === id) {
      return <div className="h-[3px] bg-[#1E9BF0]"></div>
    }
  }

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragMove={handleDragMove}
      collisionDetection={fixCursorSnapOffset} // Apply the new collision detecting algorithm
    >
      <div className="bg-white py-5">
        {items.map((item) => (
          <Droppable key={item.id} id={item.id}>
            <Draggable key={item.id} id={item.id}>
              {handleCollisionLine(item.id)}
              {activeItem?.id === item.id
                ? activeRender(item)
                : normalRender(item)}
            </Draggable>
          </Droppable>
        ))}
      </div>

      <DragOverlay modifiers={[snapCenterToCursor]}>
        {activeItem ? dragRender(activeItem) : null}
      </DragOverlay>
    </DndContext>
  )
}

export default DraggableList
