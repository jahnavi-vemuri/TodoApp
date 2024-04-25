import React from 'react';
import renderer from 'react-test-renderer';
import TaskItem from '../components/TaskItem';

describe('<TaskItem />', () => {
  const item = {
    id: 1,
    title: 'Sample Task',
    date: '2024-04-01',
    time: '13:30',
    isImportant: true,
  };

  const onDelete = jest.fn();
  const onEdit = jest.fn();
  const onToggleImportant = jest.fn();

  test('renders correctly', () => {
    const tree = renderer
      .create(
        <TaskItem
          item={item}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleImportant={onToggleImportant}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('calls onDelete when delete button is pressed', () => {
    const component = renderer.create(
      <TaskItem
        item={item}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggleImportant={onToggleImportant}
      />
    );
    const deleteButton = component.root.findByProps({ icon: 'trash-can' });
    deleteButton.props.onPress();
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  test('calls onEdit when edit button is pressed', () => {
    const component = renderer.create(
      <TaskItem
        item={item}
        onDelete={onDelete}
        onEdit={onEdit}
        onToggleImportant={onToggleImportant}
      />
    );
    const editButton = component.root.findByProps({ icon: 'pencil' });
    editButton.props.onPress();
    expect(onEdit).toHaveBeenCalledWith(item);
  });

//   test('calls onToggleImportant when important button is pressed', () => {
//     const component = renderer.create(
//       <TaskItem
//         item={item}
//         onDelete={onDelete}
//         onEdit={onEdit}
//         onToggleImportant={onToggleImportant}
//       />
//     );
//     const importantButton = component.root.findByProps({ icon: 'heart-outline' });
//     importantButton.props.onPress();
//     expect(onToggleImportant).toHaveBeenCalledWith(1);
//   });
});
