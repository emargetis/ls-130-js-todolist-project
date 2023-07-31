const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe('TodoList', () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo('Buy milk');
    todo2 = new Todo('Clean room');
    todo3 = new Todo('Go to the gym');

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });

  // your tests go here/
  
  //size
  test('todolist has a size of 3', () => {
    expect(list.size()).toBe(3);
  });
  
  //toArray
  test('copy of array is retruned', () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  })
  
  //first
  test('returns the first item in the array', () => {
    expect(list.first()).toEqual(todo1);
  })
  
  //last
  test('returns the last item in the array', () => {
    expect(list.last()).toEqual(todo3);
  })
  
  //shift
  test('returns the first item in list and removes it', () => {
    let todo = list.shift();
    expect(todo).toEqual(todo1);
    expect(list.size()).toBe(2);
    expect(list.toArray()).toEqual([todo2, todo3])
  })
  
  //pop
  test('returns the last item in list and removes it', () => {
    let todo = list.pop();
    expect(todo).toEqual(todo3);
    expect(list.size()).toBe(2);
    expect(list.toArray()).toEqual([todo1, todo2])
  })
  
  //isDone
  test('returns true when all items are done', () => {
    expect(list.isDone()).toBe(false);
    
    list.forEach(item => item.markDone());
    
    expect(list.isDone()).toBe(true);
  })
  
  //add
  test('verifies a typeError occurs when you add a non-todo object', () => {
    let newItem = {phrase: 'hello'};
    
    expect(() => list.add(newItem)).toThrow(TypeError);
  })
  
  //itemAt
  test('verifies a ReferenceError when you reference an object out of range', () => {
    expect(() => list.itemAt(4)).toThrow(ReferenceError);
    expect(() => list.itemAt(-1)).toThrow(ReferenceError);
  })
  
  //markDoneAt
  test('raise ReferenceError if we specify index with no element', () => {
    expect(() => list.markDoneAt(4)).toThrow(ReferenceError);
    expect(() => list.markDoneAt(-1)).toThrow(ReferenceError);
    
    list.markDoneAt(2);
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  })
  
  //markUndoneAt
  test('raise ReferenceError if we specify index with no element', () => {
    expect(() => list.markUndoneAt(4)).toThrow(ReferenceError);
    expect(() => list.markUndoneAt(-1)).toThrow(ReferenceError);
    
    todo1.markDone();
    todo2.markDone();
    todo3.markDone();
    
    list.markUndoneAt(1);
    
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(true);
  })
  
  //markAllDone
  test('marks all todos as done', () => {
    expect(todo1.isDone()).toBe(false);
    expect(todo2.isDone()).toBe(false);
    expect(todo3.isDone()).toBe(false);
    
    list.markAllDone();
    
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
    expect(list.isDone()).toBe(true);
  })
  
  //removeAt
  test('raise ReferenceError if we specify index with no element and removes element at given index', () => {
    expect(() => list.markUndoneAt(4)).toThrow(ReferenceError);
    expect(() => list.markUndoneAt(-1)).toThrow(ReferenceError);
    
    expect(list.removeAt(1)).toEqual([todo2]);
    expect(list.toArray()).toEqual([todo1, todo3]);
  })
  
  //toString
  test('toString returns string representation of the list', () => {
    let string = `---- Today's Todos ----\n[ ] Buy milk\n[ ] Clean room\n[ ] Go to the gym\n`;
  
    expect(list.toString()).toBe(string);
  });
  
  //toString, one done
  test('toString returns string representation of the list with one done', () => {
    list.markDoneAt(1);
    
    let string = `---- Today's Todos ----\n[ ] Buy milk\n[X] Clean room\n[ ] Go to the gym\n`;
  
    expect(list.toString()).toBe(string);
  });
  
  //toString, all done
  test('toString returns string representation of the list with all done', () => {
    list.markAllDone();
    
    let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;
  
    expect(list.toString()).toBe(string);
  });
  
  //forEach
  test('forEach iterates through each todo in the list', () => {
    let str = '';
    
    list.forEach(item => str += '1');
    expect(str).toBe('111');
    
    list.forEach(item => item.markDone());
    expect(todo1.isDone()).toBe(true);
    expect(todo2.isDone()).toBe(true);
    expect(todo3.isDone()).toBe(true);
  });
  
  //filter
  test('returns new array that meets callback criteria', () => {
    list.markDoneAt(0);
    
    let toDoList = new TodoList("Today's Todos");
    let toDoItem = new Todo('Buy milk');
    toDoList.add(toDoItem);
    toDoItem.markDone();
    
    
    expect(list.filter(item => item.isDone())).toEqual(toDoList);

  });
});