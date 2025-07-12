import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeTab, WishlistTab, CartTab, SearchTab, SettingTab } from '../../tabs';

export type RouteTabsParamList = {
  Home: undefined;
  Wishlist: undefined;
  Cart: undefined;
  Search: { query: string } | undefined;
  Setting: undefined;
};

interface TabIconProps {
  iconName: string;
  focused: boolean;
  isCart?: boolean;
  label: string;
}

const TabIcon: React.FC<TabIconProps> = ({ iconName, focused, isCart, label }) => {
  return (
    <View style={[
      styles.tabIconContainer,
      isCart ? styles.cartIconContainer : styles.regularIconContainer
    ]}>
      <View
        style={[
          styles.iconWrapper,
          isCart ? styles.cartIconWrapper : styles.regularIconWrapper,
          focused ? (isCart ? styles.cartIconFocused : styles.regularIconFocused) : styles.iconUnfocused
        ]}
      >
        <Icon
          name={iconName}
          size={28}
          color={focused ? 'white' : '#666'}
        />
      </View>
      {!isCart && (
        <Text
          style={[
            styles.tabLabel,
            focused ? styles.tabLabelFocused : styles.tabLabelUnfocused
          ]}
        >
          {label}
        </Text>
      )}
    </View>
  );
};

const HomeScreen: React.FC = () => {
  const Tab = createBottomTabNavigator<RouteTabsParamList>();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopColor: '#e5e5e5',
          height: 80,
          borderTopWidth: 0.5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 8,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName="home"
              focused={focused}
              label="Home"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Wishlist"
        component={WishlistTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName="favorite-border"
              focused={focused}
              label="Wishlist"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={CartTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName="shopping-cart"
              focused={focused}
              isCart
              label="Cart"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName="search"
              focused={focused}
              label="Search"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={SettingTab}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName="settings"
              focused={focused}
              label="Setting"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIconContainer: {
    width: 64,
    height: 64,
    marginTop: -40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  regularIconContainer: {
    marginTop: 16,
  },
  iconWrapper: {
    alignItems: 'center',
    padding: 8,
    justifyContent: 'center',
  },
  cartIconWrapper: {
  },
  regularIconWrapper: {
    width: 'auto',
    height: 'auto',
    marginTop: -16,
  },
  cartIconFocused: {
    backgroundColor: "black",
    borderRadius: 100,
    width: 64,
    height: 64,
  },
  regularIconFocused: {
    backgroundColor: '#1f2937',
    borderRadius: 50,
  },
  iconUnfocused: {
    backgroundColor: 'transparent',
  },
  tabLabel: {
    fontSize: 12,
  },
  tabLabelFocused: {
    fontWeight: '500',
  },
  tabLabelUnfocused: {
    fontWeight: '500',
    color: '#111827',
  },
});

export default HomeScreen;