import type { Meta, StoryObj } from '@storybook/react';
import { AnimateButton } from './AnimateButton';

const meta = {
  title: 'SidePanel/RunSpellCheck/AnimateButton',
  component: AnimateButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    isLoading: {
      control: 'boolean',
      description: '로딩 상태를 나타냅니다',
    },
    children: {
      control: 'text',
      description: '버튼에 표시될 텍스트',
    },
  },
} satisfies Meta<typeof AnimateButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '맞춤법 검사 시작',
    isLoading: false,
    onClick: () => {},
  },
};

export const Loading: Story = {
  args: {
    children: '검사 중...',
    isLoading: true,
    onClick: () => {},
  },
};
