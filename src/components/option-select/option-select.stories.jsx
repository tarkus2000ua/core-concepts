import OptionSelect from './option-select';

export default {
  title: 'Components/OptionSelect',
  component: OptionSelect,
};

const Template = (args) => <OptionSelect {...args} />;

export const Default = Template.bind({});
Default.args = {
  options: [
    { id: '1', value: 'Option 1' },
    { id: '2', value: 'Option 2' },
    { id: '3', value: 'Option 3' },
  ],
  onSelect: (value) => console.log('Selected:', value),
};

export const WithInitialSelection = Template.bind({});
WithInitialSelection.args = {
  options: [
    { id: '1', value: 'Red' },
    { id: '2', value: 'Green' },
    { id: '3', value: 'Blue' },
  ],
  selection: 'Green',
  onSelect: (value) => console.log('Selected:', value),
};

export const SingleOption = Template.bind({});
SingleOption.args = {
  options: [
    { id: '1', value: 'Only Option' },
  ],
  onSelect: (value) => console.log('Selected:', value),
};

