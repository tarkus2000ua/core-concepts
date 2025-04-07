import SortControl from './sort-control';

export default {
  title: 'Components/SortControl',
  component: SortControl,
  tags: ['autodocs'],
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of sorting options'
    },
    selection: {
      control: 'text',
      description: 'Currently selected option'
    },
    onSelect: {
      action: 'selected',
      description: 'Callback when option is selected'
    }
  }
};

const Template = (args) => <SortControl {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    { id: 1, value: 'Release Date' },
    { id: 2, value: 'Title' }
  ]
};

export const WithInitialSelection = Template.bind({});
WithInitialSelection.args = {
  ...Default.args,
  selection: 'Title'
};

export const WithCustomOptions = Template.bind({});
WithCustomOptions.args = {
  options: [
    { id: 1, value: 'Popularity' },
    { id: 2, value: 'Rating' },
    { id: 3, value: 'Release Year' }
  ]
};