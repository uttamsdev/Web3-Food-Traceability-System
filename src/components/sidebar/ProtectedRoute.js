// components/ProtectedRoute.js
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Web3Context } from '@/context/Web3Context';

const ProtectedRoute = ({ role, children }) => {
    const { userRole } = useContext(Web3Context);
    const router = useRouter();

    useEffect(() => {
        // If the user's role does not match the required role, redirect to a different page (e.g., 403 error or login)
        if (userRole !== role) {
            router.push('/403'); // Redirect to a "Forbidden" page
        }
    }, [userRole, role, router]);

    // Only render children if the userRole matches the required role
    return userRole === role ? children : null;
};

export default ProtectedRoute;
