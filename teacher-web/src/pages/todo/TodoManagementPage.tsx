import React, { useState, useEffect } from 'react';
import { Plus, ChevronRight, ChevronDown, Edit, Trash2 } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { TodoItem } from '../../types';
import { colors } from '../../styles/colors';

const mockTodoItems: TodoItem[] = [
  {
    id: '1',
    title: '수학',
    description: '기본 수학 과제',
    type: 'category',
    parentId: null,
    children: [
      {
        id: '101',
        title: '기초 연산',
        description: '덧셈, 뺄셈, 곱셈, 나눗셈 연습',
        type: 'todo',
        parentId: '1',
        children: [],
        createdAt: '2023-03-10T09:15:00Z',
        updatedAt: '2023-04-18T11:45:00Z',
      }
    ],
    createdAt: '2023-03-05T08:00:00Z',
    updatedAt: '2023-04-17T14:20:00Z',
  }
];

interface TodoNodeProps {
  todo: TodoItem;
  level: number;
  onEdit: (todo: TodoItem) => void;
  onDelete: (todo: TodoItem) => void;
  onAdd: (parentId: string | null) => void;
}

const TodoNode: React.FC<TodoNodeProps> = ({ todo, level, onEdit, onDelete, onAdd }) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState<'category' | 'todo'>('todo');
  
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    setIsExpanded(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(todo.id);
    setIsAdding(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <div 
        className={`
          flex items-center p-3 hover:bg-gray-50 cursor-pointer
          ${level === 0 ? 'bg-gray-50' : ''}
        `}
        style={{ paddingLeft: `${level * 20 + 12}px` }}
      >
        {todo.children.length > 0 ? (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4 text-gray-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-gray-500" />
            )}
          </button>
        ) : (
          <div className="w-6"></div>
        )}
        
        <div className="flex-grow ml-2">
          <div className="font-medium text-gray-900">{todo.title}</div>
          {todo.description && (
            <div className="text-sm text-gray-500">{todo.description}</div>
          )}
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={handleAdd}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            <Plus size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(todo);
            }}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(todo);
            }}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      
      {isExpanded && (
        <div>
          {isAdding && (
            <div className="p-4" style={{ paddingLeft: `${(level + 1) * 20 + 12}px` }}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="category"
                      checked={newType === 'category'}
                      onChange={(e) => setNewType('category')}
                      className="mr-2"
                    />
                    <span className="text-sm">카테고리</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="todo"
                      checked={newType === 'todo'}
                      onChange={(e) => setNewType('todo')}
                      className="mr-2"
                    />
                    <span className="text-sm">할일</span>
                  </label>
                </div>
                
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="제목"
                  required
                />
                
                <Input
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="설명 (선택사항)"
                />
                
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAdding(false)}
                  >
                    취소
                  </Button>
                  <Button type="submit" size="sm">
                    추가
                  </Button>
                </div>
              </form>
            </div>
          )}
          
          {todo.children.map((child) => (
            <TodoNode
              key={child.id}
              todo={child}
              level={level + 1}
              onEdit={onEdit}
              onDelete={onDelete}
              onAdd={onAdd}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TodoManagementPage: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newType, setNewType] = useState<'category' | 'todo'>('category');
  
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setTodos(mockTodoItems);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTodos();
  }, []);
  
  const handleEdit = (todo: TodoItem) => {
    // Implement edit functionality
    console.log('Edit todo:', todo);
  };
  
  const handleDelete = (todo: TodoItem) => {
    if (window.confirm(`'${todo.title}'을(를) 삭제하시겠습니까? 하위 항목이 있다면 함께 삭제됩니다.`)) {
      const filterTodo = (items: TodoItem[]): TodoItem[] => {
        return items.filter(item => item.id !== todo.id).map(item => ({
          ...item,
          children: filterTodo(item.children)
        }));
      };
      
      setTodos(filterTodo(todos));
    }
  };
  
  const handleAdd = (parentId: string | null) => {
    const newTodo: TodoItem = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTitle,
      description: newDescription,
      type: newType,
      parentId,
      children: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (!parentId) {
      setTodos([...todos, newTodo]);
    } else {
      const addToChildren = (items: TodoItem[]): TodoItem[] => {
        return items.map(item => {
          if (item.id === parentId) {
            return {
              ...item,
              children: [...item.children, newTodo]
            };
          }
          return {
            ...item,
            children: addToChildren(item.children)
          };
        });
      };
      
      setTodos(addToChildren(todos));
    }

    setNewTitle('');
    setNewDescription('');
    setIsAdding(false);
  };

  return (
    <AppLayout title="할일 DB 관리">
      <div className="mb-6 flex justify-end">
        <Button
          onClick={() => setIsAdding(true)}
          leftIcon={<Plus size={16} />}
        >
          새 할일 카테고리 만들기
        </Button>
      </div>
      
      <div className={`bg-${colors.background2} shadow-sm rounded-lg overflow-hidden`}>
        {isLoading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div>
            {isAdding && (
              <div className="p-6 border-b border-gray-200">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  handleAdd(null);
                }} className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="category"
                        checked={newType === 'category'}
                        onChange={(e) => setNewType('category')}
                        className="mr-2"
                      />
                      <span className="text-sm">카테고리</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="todo"
                        checked={newType === 'todo'}
                        onChange={(e) => setNewType('todo')}
                        className="mr-2"
                      />
                      <span className="text-sm">할일</span>
                    </label>
                  </div>
                  
                  <Input
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="제목"
                    required
                  />
                  
                  <Input
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="설명 (선택사항)"
                  />
                  
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAdding(false)}
                    >
                      취소
                    </Button>
                    <Button type="submit">
                      추가
                    </Button>
                  </div>
                </form>
              </div>
            )}
            
            {todos.length === 0 && !isAdding ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium text-gray-900 mb-2">등록된 할일이 없습니다</h3>
                <p className="text-gray-600 mb-6">새 할일 카테고리를 만들어보세요.</p>
                <Button
                  onClick={() => setIsAdding(true)}
                  leftIcon={<Plus size={16} />}
                >
                  새 할일 카테고리 만들기
                </Button>
              </div>
            ) : (
              todos.map((todo) => (
                <TodoNode
                  key={todo.id}
                  todo={todo}
                  level={0}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAdd={handleAdd}
                />
              ))
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default TodoManagementPage;