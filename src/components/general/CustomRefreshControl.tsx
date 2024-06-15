import {useEffect, useState} from 'react';
import {
  RefreshControl as RefreshControlRN,
  RefreshControlProps,
} from 'react-native';

export default function CustomRefreshControl({
  refreshing,
  ...other
}: RefreshControlProps) {
  const [isRefreshing, setRefreshing] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRefreshing(refreshing);
    }, 10);
  }, [refreshing]);

  return <RefreshControlRN refreshing={isRefreshing} {...other} />;
}
