import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    Dimensions,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SIDEBAR_WIDTH = SCREEN_WIDTH * 0.75;

interface NavbarProps {
    onNotificationPress?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNotificationPress }) => {
    const [sideMenuVisible, setSideMenuVisible] = useState(false);
    const slideAnimation = new Animated.Value(-SIDEBAR_WIDTH);

    const toggleSideMenu = () => {
        const toValue = sideMenuVisible ? -SIDEBAR_WIDTH : 0;

        Animated.timing(slideAnimation, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setSideMenuVisible(!sideMenuVisible);
    };

    const closeSideMenu = () => {
        Animated.timing(slideAnimation, {
            toValue: -SIDEBAR_WIDTH,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setSideMenuVisible(false);
    };

    return (
        <>
            {/* Navbar */}
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => toggleSideMenu()} style={styles.iconButton}>
                    <Icon name="menu" size={24} color="#333" />
                </TouchableOpacity>

                <Text style={styles.logo}>Klyvex</Text>

                <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
                    <Icon name="notifications" size={24} color="#333" />
                </TouchableOpacity>
            </View>

            {/* Overlay */}
            {sideMenuVisible && (
                <TouchableOpacity
                    style={styles.overlay}
                    activeOpacity={1}
                    onPress={closeSideMenu}
                />
            )}

            {/* Side Menu */}
            <Animated.View
                style={[
                    styles.sideMenu,
                    {
                        transform: [{ translateX: slideAnimation }],
                    },
                ]}
            >
                <View style={styles.sideMenuHeader}>
                    <Text style={styles.sideMenuTitle}>Menu</Text>
                    <TouchableOpacity onPress={() => closeSideMenu()}>
                        <Icon name="close" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.sideMenuContent}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="home" size={20} color="#666" />
                        <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="person" size={20} color="#666" />
                        <Text style={styles.menuText}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="settings" size={20} color="#666" />
                        <Text style={styles.menuText}>Settings</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="help" size={20} color="#666" />
                        <Text style={styles.menuText}>Help</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="logout" size={20} color="#666" />
                        <Text style={styles.menuText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 1,
        paddingVertical: 12,
        backgroundColor: '#fff',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        zIndex: 1000,
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
    },
    logo: {
        fontSize: 20,
        fontWeight: '900',
        color: '#333',
        fontStyle: 'italic',
        letterSpacing: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1001,
    },
    sideMenu: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: SIDEBAR_WIDTH,
        backgroundColor: '#fff',
        zIndex: 1002,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
    },
    sideMenuHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sideMenuTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    sideMenuContent: {
        flex: 1,
        paddingTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    menuText: {
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
    },
});

export default Navbar;