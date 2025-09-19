'use client';

import dynamic from 'next/dynamic';

const VariableList = dynamic(
  () => import('@/components/variables/variables-list'),
  {
    ssr: false,
    loading: () => null,
  },
);

type Props = {
  userId: string;
};

export default function VariableListWrapper({ userId }: Props) {
  return <VariableList userId={userId} />;
}
