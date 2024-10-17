import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true); // Default is true (loading)
  const authStatus = useSelector(state => state.auth.status);

  useEffect(() => {
    if (authStatus === undefined) {
      // Still loading, wait for the authStatus to update
      return;
    }

    if (authentication && authStatus !== authentication) {
      // Redirect to login if not authenticated
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      // Redirect to home if already authenticated (optional logic)
      navigate("/");
    }

    // Stop loader after the auth checks
    setLoader(false);
  }, [authStatus, navigate, authentication]);

  // Display loader or children based on the state
  if (loader) {
    return <h1>Loading...</h1>;
  }

  return <>{children}</>;
}