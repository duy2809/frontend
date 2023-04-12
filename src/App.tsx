import { useAppDispatch } from 'app/hooks/redux';
import { getUserThunk } from 'app/store/features/auth/authThunks';
import Fallback from 'components/common/Fallback';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC, Suspense, useEffect } from 'react';
import Router from 'routes/Routes';
import { getAccessToken } from 'utils/auth';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      dispatch(getUserThunk());
    }
  }, [dispatch]);

  return (
    <>
      <HelmetMeta />
      <Suspense fallback={<Fallback />}>
        <Router />
      </Suspense>
    </>
  );
};

export default App;
