import { ReactNode, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGlobalContext } from '../../lib/GlobalContext/GlobalContext';
import { View } from 'react-native';

interface ThemeWrapperProps {
    children: ReactNode;
}
const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
    const { state, setTheme } = useGlobalContext();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        loadThemeFromStorage();
    }, []);

    const loadThemeFromStorage = async () => {
        try {
            const savedTheme = await AsyncStorage.getItem('user_theme');

            if (savedTheme) {
                setTheme(savedTheme as 'light' | 'dark' | 'system');
            } else {
                setTheme('system');
            }
            setLoading(false);
        } catch (error) {
            console.error('Failed to load theme from storage:', error);
            setTheme('system');
        }
    };

    useEffect(() => {
        const saveThemeToStorage = async () => {
            try {
                await AsyncStorage.setItem('user_theme', state.theme);
            } catch (error) {
                console.error('Failed to save theme to storage:', error);
            }
        };

        saveThemeToStorage();
    }, [state.theme]);

    if (loading) return null;

    return (
        <>
            <View className={`flex-1 ${state.theme === 'dark' ? 'dark' : ''}`}>
                {children}
            </View>
        </>
    );
};

export default ThemeWrapper;
