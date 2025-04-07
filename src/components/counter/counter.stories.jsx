import React from 'react';
import {Counter} from './counter';

export default {
  title: 'Components/Counter',
  component: Counter,
  tags: ['autodocs'],
  argTypes: {
    initialValue: {
      control: { type: 'number' },
      description: 'Initial value for the counter',
      defaultValue: 0,
    },
  },
  parameters: {
    layout: 'centered',
  },
};

const Template = (args) => <Counter {...args} />;

export const Default = Template.bind({});
Default.args = {
  initialValue: 0,
};

export const StartingAtFive = Template.bind({});
StartingAtFive.args = {
  initialValue: 5,
};

export const StartingAtNegative = Template.bind({});
StartingAtNegative.args = {
  initialValue: -10,
};
