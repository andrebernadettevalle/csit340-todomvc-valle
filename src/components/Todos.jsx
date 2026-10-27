import { useState } from 'react'

function Todos() {
  const [text, setText] = useState('')
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn the spread operator', completed: false },
    { id: 2, text: 'Set up Tailwind', completed: true },
    { id: 3, text: 'Push to GitHub', completed: false },
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmedText = text.trim()
    if (!trimmedText) return

    const newTodo = {
      id: Date.now(),
      text: trimmedText,
      completed: false,
    }

    setTodos([...todos, newTodo])
    setText('')
  }

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  return (
    <section className="mx-auto max-w-[558px]">
      <h1 className="text-center text-[88px] font-extralight text-[#b83f45]">
        todos
      </h1>
      <div className="relative bg-white shadow-[0_2px_4px_rgba(0,0,0,0.2),0_25px_50px_0_rgba(0,0,0,0.1)]">
        <form onSubmit={handleSubmit}>
          <input
            className="h-[65px] w-full py-4 pr-4 pl-[60px] text-2xl shadow-[inset_0_-2px_1px_rgba(0,0,0,0.03)] placeholder:text-[#e6e6e6] focus:outline-none"
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </form>
        <main className="relative border-t border-[#e6e6e6]">
          <input id="toggle-all" type="checkbox" className="peer sr-only" />
          <label
            htmlFor="toggle-all"
            className="absolute -top-[66px] left-8 flex h-[65px] w-[68px] cursor-pointer items-center justify-center text-2xl text-[#949494] peer-checked:text-[#484848]"
          >
            <span className="rotate-90">&gt;</span>
          </label>

          <ul className="divide-y divide-[#e6e6e6]">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center px-4 py-4 text-2xl">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="mr-4 h-6 w-6 cursor-pointer accent-[#666]"
                />
                <span
                  className={
                    todo.completed
                      ? 'line-through text-[#949494]'
                      : 'text-[#484848]'
                  }
                >
                  {todo.text}
                </span>
              </li>
            ))}
          </ul>
        </main>
      </div>
    </section>
  )
}

export default Todos