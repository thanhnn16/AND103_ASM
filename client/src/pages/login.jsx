import { Helmet } from 'react-helmet-async';

import { LoginView } from 'src/sections/login';

// ----------------------------------------------------------------------

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title> Đăng nhập | Bông Tuyết Trắng </title>
      </Helmet>

      <LoginView />
    </>
  );
}
