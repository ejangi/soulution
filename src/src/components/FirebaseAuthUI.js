import React, { useEffect, useRef } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

function FirebaseAuthUI({ uiConfig, firebaseAuth }) {
  const uiRef = useRef(null);

  useEffect(() => {
    // Initialize FirebaseUI
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebaseAuth);

    // Start the sign-in flow
    ui.start(uiRef.current, uiConfig);

    return () => {
      ui.reset();
    };
  }, [firebaseAuth, uiConfig]);

  return <div ref={uiRef} />;
}

export default FirebaseAuthUI;
