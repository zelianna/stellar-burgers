import { FC } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { AppHeaderUI } from '@ui';

export const AppHeader: FC = () => {
  const userName = useSelector((state: RootState) => state.auth.user?.name);

  return <AppHeaderUI userName={userName || ''} />;
};
