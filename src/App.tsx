import { useAppDispatch } from 'app/hooks/redux';
import { getUserThunk } from 'app/store/features/auth/authThunks';
import { resetLoginStatus } from 'app/store/features/auth/authSlice';
import Fallback from 'components/common/Fallback';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC, Suspense, useEffect } from 'react';
import Router from 'routes/Routes';

const App: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetLoginStatus());
    dispatch(getUserThunk());
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
