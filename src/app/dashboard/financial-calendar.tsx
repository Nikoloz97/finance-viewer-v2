"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Todo {
  id: string;
  text: string;
  date: Date;
  completed: boolean;
}

export default function FinancialCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [todos, setTodos] = React.useState<Todo[]>([
    {
      id: "1",
      text: "Team meeting",
      date: new Date(),
      completed: false,
    },
    {
      id: "2",
      text: "Complete project proposal",
      date: new Date(),
      completed: true,
    },
    {
      id: "3",
      text: "Send weekly report",
      date: new Date(),
      completed: false,
    },
  ]);
  const [newTodoText, setNewTodoText] = React.useState("");

  const todosForSelectedDate = React.useMemo(() => {
    if (!date) return [];

    return todos.filter(
      (todo) =>
        todo.date.getDate() === date.getDate() &&
        todo.date.getMonth() === date.getMonth() &&
        todo.date.getFullYear() === date.getFullYear()
    );
  }, [todos, date]);

  const addTodo = () => {
    if (!newTodoText.trim() || !date) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      text: newTodoText,
      date: new Date(date),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoText("");
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  const hasTodos = React.useCallback(
    (day: Date) => {
      return todos.some(
        (todo) =>
          todo.date.getDate() === day.getDate() &&
          todo.date.getMonth() === day.getMonth() &&
          todo.date.getFullYear() === day.getFullYear()
      );
    },
    [todos]
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full h-full  mx-auto p-4">
      <div className="flex items-center h-full">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border shadow overflow-y-auto h-full"
          modifiers={{ hasEvent: hasTodos }}
          modifiersStyles={{
            hasEvent: {
              color: "teal",
              fontWeight: "bold",
            },
          }}
        />
      </div>

      <Card className="p-4 shadow-md bg-transparent w-full">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {date
                ? date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })
                : "Select a date"}
            </h2>
          </div>

          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Add a new task..."
              value={newTodoText}
              onChange={(e) => setNewTodoText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button
              onClick={addTodo}
              size="icon"
              disabled={newTodoText.length <= 0}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto">
            {todosForSelectedDate.length === 0 ? (
              <p className="text-muted-foreground text-center py-6">
                No tasks for this day
              </p>
            ) : (
              <ul className="space-y-2">
                {todosForSelectedDate.map((todo) => (
                  <li
                    key={todo.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-md border transition-all",
                      todo.completed
                        ? "bg-muted/50 text-muted-foreground"
                        : "hover:bg-accent/10"
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className={cn(
                          "h-6 w-6 rounded-full p-0 border",
                          todo.completed && "bg-primary border-primary"
                        )}
                        onClick={() => toggleTodo(todo.id)}
                      >
                        {todo.completed && (
                          <Check className="h-3 w-3 text-primary-foreground" />
                        )}
                      </Button>
                      <span
                        className={cn(
                          "flex-1",
                          todo.completed && "line-through"
                        )}
                      >
                        {todo.text}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTodo(todo.id)}
                      className="h-7 w-7 opacity-50 hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
