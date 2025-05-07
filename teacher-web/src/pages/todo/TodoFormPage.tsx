import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { TodoItem } from '../../types';

// Mock data
const mockTodoItems: TodoItem[] = [
  {
    id: '1',
    title: '수학',
    description: '기본 수학 과제',
    parentId: null,
    children: [],
    createdAt: '2023-03-05T08:00:00Z',
    updatedAt: '2023-04-17T14:20:00Z',
  },
  {
    id: '2',
    title: '영어',
    description: '영어 학습 과제',
    parentId: null,
    children: [],
    createdAt: '2023-03-08T10:30:00Z',
    updatedAt: '2023-04-16T15:40:00Z',
  },
  {
    id: '3',
    title: '과학',
    description: '과학 실험 및 관찰',
    parentId: null,
    children: [],
    createdAt: '2023-03-10T09:00:00Z',
    updatedAt: '2023-04-15T16:50:00Z',
  },
];

// Helper function to flatten todo hierarchy for selection dropdown
const flattenTodos = (todos: TodoItem[], parentTitle = ''): { id: string; displayTitle: string }[] => {
  let result: { id: string; displayTitle: string }[] = [];
  
  for (const todo of todos) {
    const displayTitle = parentTitle ? `${parentTitle} > ${todo.title}` : todo.title;
    result.push({ id: todo.id, displayTitle });
    
    if (todo.children.length > 0) {
      result = [...result, ...flattenTodos(todo.children, displayTitle)];
    }
  }
  
  return result;
};

const TodoFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const parentIdFromQuery = queryParams.get('parentId');
  
  const isEditing = id !== 'new';
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState<string | null>(parentIdFromQuery);
  const [availableParents, setAvailableParents] = useState<{ id: string; displayTitle: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API call to fetch available parent todos
    setTimeout(() => {
      const flattened = flattenTodos(mockTodoItems);
      setAvailableParents(flattened);
      
      if (isEditing) {
        // Simulate API call to fetch todo details
        const todoItem = mockTodoItems.find(t => t.id === id);
        if (todoItem) {
          setTitle(todoItem.title);
          setDescription(todoItem.description);
          setParentId(todoItem.parentId);
        } else {
          setError('할일 정보를 찾을 수 없습니다.');
        }
      }
      
      setIsLoading(false);
    }, 1000);
  }, [id, isEditing, parentIdFromQuery]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to todo list
      navigate('/todos');
    } catch (err) {
      setError('할일 저장에 실패했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    navigate('/todos');
  };

  return (
    <AppLayout title={isEditing ? '할일 수정' : '새 할일 만들기'}>
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          leftIcon={<ArrowLeft size={16} />}
          onClick={handleCancel}
        >
          할일 목록으로 돌아가기
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                {isEditing ? '할일 정보 수정' : '새 할일 정보 입력'}
              </h3>
            </div>
            
            <div className="px-6 py-5 space-y-6">
              <div>
                <Input
                  id="title"
                  label="제목"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  fullWidth
                  placeholder="할일 제목"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  설명
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="할일에 대한 상세 설명을 입력하세요"
                />
              </div>
              
              <div>
                <label htmlFor="parentId" className="block text-sm font-medium text-gray-700 mb-1">
                  상위 할일 (선택사항)
                </label>
                <select
                  id="parentId"
                  value={parentId || ''}
                  onChange={(e) => setParentId(e.target.value || null)}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="">없음 (최상위 할일)</option>
                  {availableParents.map((parent) => (
                    <option key={parent.id} value={parent.id}>
                      {parent.displayTitle}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-sm text-gray-500">
                  이 할일이 다른 할일의 하위 항목이라면 상위 할일을 선택하세요.
                </p>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
              >
                취소
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                leftIcon={<Save size={16} />}
              >
                {isEditing ? '할일 저장' : '할일 만들기'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </AppLayout>
  );
};

export default TodoFormPage;