import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LocalStorage } from '@/utils/localStorage';

function useAuth () {
    const router = useRouter();

    useEffect(() => {
        const token = LocalStorage.getUSerToken()

        if (!token) {
            router.push('/');
        }
    }, [router]);

    return {
        isAuthenticated: LocalStorage.getUSerToken() != null
    };
}

export default useAuth;
