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
    { id: 1, name: 'Release Date', value: 'release_date' },
    { id: 2, name: 'Title', value: 'title' },
  ]
};

export const WithInitialSelection = Template.bind({});
WithInitialSelection.args = {
  ...Default.args,
  selection: 'title'
};

export const WithCustomOptions = Template.bind({});
WithCustomOptions.args = {
  options: [
    { id: 1, name: 'Popularity', value: 'popularity' },
    { id: 2, name: 'Rating', value: 'rating' },
    { id: 3, name: 'Release Year', value: 'release_year' }
  ]
};