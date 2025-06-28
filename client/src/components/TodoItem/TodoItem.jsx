import { useState, useRef, useEffect } from "react";
import { CheckCircle, Circle, Trash2, Edit3, Save } from "lucide-react";

export default function TodoItem({ item, onToggle, onDelete, onUpdate }) {
  const { id, description, done } = item;

  const [isPressed, setIsPressed] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);

  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.currentTarget === e.target) setIsPressed(true);
  };
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  const handleSaveEdit = () => {
    const text = editedDescription.trim();
    if (text && text !== description) onUpdate(id, text);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isEditing &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        setEditedDescription(description);
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isEditing, description]);

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`relative w-[70vw] max-w-[100vw] sm:w-[50vw] lg:w-[35vw] px-5 py-4 rounded-2xl text-[#333]
        flex items-center gap-4 transition-all duration-200 bg-[#dce4ef]
        ${done ? "opacity-60 line-through" : ""}
        ${
          isPressed
            ? "shadow-[inset_2px_2px_6px_#c8d0e7,_inset_-2px_-2px_6px_#ffffff]"
            : "shadow-[4px_4px_12px_#c8d0e7,_-4px_-4px_12px_#ffffff]"
        }`}
    >
      <button
        onClick={() => onToggle(id)}
        aria-label="Toggle Todo Completion"
        className="flex-shrink-0 transition duration-200 focus:outline-none"
      >
        {done ? (
          <CheckCircle className="text-sky-600" />
        ) : (
          <Circle className="text-gray-400 hover:text-sky-500" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit()}
            className="w-full px-4 py-2 text-base rounded-xl bg-[#dce4ef] text-[#333]
              shadow-[inset_3px_3px_8px_#c8d0e7,inset_-3px_-3px_8px_#ffffff]
              focus:outline-none focus:shadow-[inset_2px_2px_6px_#c8d0e7,inset_-2px_-2px_6px_#ffffff]
              transition-shadow duration-200"
          />
        ) : (
          <p className="text-base sm:text-lg font-medium break-words">
            {description}
          </p>
        )}
      </div>

      <button
        onClick={() => (isEditing ? handleSaveEdit() : setIsEditing(true))}
        aria-label={isEditing ? "Save Todo" : "Edit Todo"}
        className="text-blue-500 hover:text-blue-700 transition focus:outline-none"
      >
        {isEditing ? <Save size={18} /> : <Edit3 size={18} />}
      </button>

      <button
        onClick={() => onDelete(id)}
        aria-label="Delete Todo"
        className="text-red-500 hover:text-red-700 transition-all duration-200 focus:outline-none"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}
