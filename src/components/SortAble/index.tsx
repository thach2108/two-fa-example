import cx from "classnames";
import type { Identifier, XYCoord } from "dnd-core";
import { cloneElement, useRef } from "react";
import TwoFAStore from "store/TwoFAStore";
import { useDrag, useDrop } from "react-dnd/dist/hooks";

export type Props = {
  id: number;
  index: number;
  children: React.ReactElement;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
};

interface DragItem {
  id: number;
  index: number;
  type: TwoFAStore;
}

enum ItemTypes {
  CARD = "card",
}

const SortAble = ({ id, index, children, moveCard }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: ItemTypes.CARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const clonedElement = cloneElement(children, {
    ...children.props,
    className: cx([children.props.className, isDragging && "opacity-0"]),
  });

  drag(drop(ref));
  return (
    <div ref={ref} data-handler-id={handlerId}>
      {clonedElement}
    </div>
  );
};

export default SortAble;
