import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeTab, WishlistTab, CartTab, SearchTab, SettingTab } from '../tabs';
import { ItemDetails } from '../constants/types';

export type RouteTabsParamList = {
  Home: undefined;
  Wishlist: undefined;
  Cart: { itemDetails: ItemDetails } | undefined;
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
    <View className={`items-center justify-center ${isCart ? '-mt-10 shadow-xl shadow-black-100 bg-white rounded-full' : 'mt-4'}`}>
      <View
        className={`items-center p-2 justify-center ${isCart
          ? 'w-16 h-16 rounded-full shadow-lg bg-gray-900'
          : 'w-auto h-auto -mt-4'
          } ${focused
            ? isCart
              ? ''
              : 'bg-gray-800 rounded-full'
            : 'bg-transparent'
          }`}
      >
        <Icon
          name={iconName}
          size={28}
          color={focused ? 'white' : '#666'}
        />
      </View>
      {!isCart && (
        <Text
          className={`text-xs ${focused ? ' font-medium' : 'font-medium text-gray-900'
            }`}
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

export default HomeScreen;