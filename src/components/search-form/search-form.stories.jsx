import SearchForm from './search-form';

export default {
  title: 'Components/SearchForm',
  component: SearchForm,
  argTypes: {
    initialValue: {
      control: 'text',
      description: 'Initial search input value'
    },
    onSearch: {
      action: 'searched',
      description: 'Callback when search is submitted'
    }
  }
};

const Template = (args) => <SearchForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSearch: (searchTerm) => console.log('Search submitted:', searchTerm)
};

export const WithInitialValue = Template.bind({});
WithInitialValue.args = {
  initialValue: 'Action movies',
  onSearch: (searchTerm) => console.log('Search submitted:', searchTerm)
};



