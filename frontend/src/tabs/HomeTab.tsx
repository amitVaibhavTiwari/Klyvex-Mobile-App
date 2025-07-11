import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../../App';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

type ProductDetailsNavProp = NativeStackNavigationProp<RouteStackParamList, 'ProductDetails'>;

interface CategoryItem {
  id: string;
  name: string;
  icon: string;
}

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
}

const categories: CategoryItem[] = [
  { id: '1', name: 'Bag', icon: 'shopping-bag' },
  { id: '2', name: 'Shoes', icon: 'sports-gymnastics' },
  { id: '3', name: 'Electronic', icon: 'phone-android' },
  { id: '4', name: 'Clothes', icon: 'checkroom' },
  { id: '5', name: 'Watch', icon: 'watch' },
  { id: '6', name: 'Furniture', icon: 'weekend' },
  { id: '7', name: 'Kitchen', icon: 'kitchen' },
  { id: '8', name: 'Toys', icon: 'toys' },
];

const filterTabs = ['All', 'Clothes', 'Shoe', 'Bags'];

const products: Product[] = [
  {
    id: '1',
    name: 'Black Jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop',
    price: '$89.99',
  },
  {
    id: '2',
    name: 'Grey Shirt',
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=300&h=400&fit=crop',
    price: '$45.99',
  },
  {
    id: '3',
    name: 'Black Jacket',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=400&fit=crop',
    price: '$89.99',
  },
  {
    id: '4',
    name: 'Grey Shirt',
    image: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=300&h=400&fit=crop',
    price: '$45.99',
  },
];

const HomeTab: React.FC = () => {
  const navigation = useNavigation<ProductDetailsNavProp>();
  const handleProductDetailPageRedirect = (product: Product) => {
    navigation.navigate('ProductDetails', {
      productId: product.id,
    });
  };



  const renderOfferCard = (title: string, discount: string, bgColor: string) => (
    <View
      className="rounded-xl p-4 mr-3 justify-between"
      style={{
        width: SCREEN_WIDTH * 0.85,
        height: 190,
        backgroundColor: bgColor
      }}
    >
      <View className="bg-white bg-opacity-20 px-2 py-1 rounded-xl self-start">
        <Text className="text-black text-xs font-medium">Limited time!</Text>
      </View>
      <Text className="text-white text-xl font-bold mt-2">{title}</Text>
      <Text className="text-white text-4xl font-bold">{discount} off</Text>
      <Text className="text-white text-xs opacity-80">All category available | T&C applied</Text>
      <TouchableOpacity className="bg-white px-4 py-2 rounded-2xl self-start mt-2">
        <Text className="text-gray-800 text-sm font-semibold">Claim</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategoryItem = (item: CategoryItem) => (
    <TouchableOpacity key={item.id} className="w-1/4 items-center mb-5">
      <View className="w-12 h-12 rounded-full bg-gray-100 justify-center items-center mb-2">
        <Icon name={item.icon} size={24} color="#666" />
      </View>
      <Text className="text-xs text-gray-800 text-center">{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductCard = (product: Product) => (
    <TouchableOpacity
      key={product.id}
      onPress={() => handleProductDetailPageRedirect(product)}
      className="w-[48%] bg-white rounded-xl overflow-hidden shadow-sm"
    >
      <TouchableOpacity className="absolute top-3 right-3 z-10 bg-white rounded-2xl w-8 h-8 justify-center items-center shadow-sm">
        <Icon name="favorite-border" size={20} color="#666" />
      </TouchableOpacity>
      <Image
        source={{ uri: product.image }}
        className="w-full h-44"
        style={{ resizeMode: 'cover' }}
      />
      <View className="p-3">
        <Text className="text-sm text-gray-800 mb-1">{product.name}</Text>
        <Text className="text-base font-bold text-gray-800">{product.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
        {/* Special Offers */}
        <View className="mb-6 px-4">
          <Text className="text-lg font-bold text-gray-800 mb-4">Special Offers</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: 16 }}
          >
            {renderOfferCard('Get Special Discount', '40%', '#8B4513')}
            {renderOfferCard('Get Special Discount', '45%', '#8B0000')}
          </ScrollView>
        </View>

        {/* Categories */}
        <View className="mb-6 px-4">
          <Text className="text-lg font-bold text-gray-800 mb-4">Category</Text>
          <View className="flex-row flex-wrap justify-between">
            {categories.map(renderCategoryItem)}
          </View>
        </View>

        {/* Most Popular*/}
        <View className="mb-6 px-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-800">Most Popular</Text>
            <TouchableOpacity>
              <Text className="text-sm text-gray-600">See All</Text>
            </TouchableOpacity>
          </View>

          {/* Filters*/}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4"
          >
            {filterTabs.map((tab, index) => (
              <TouchableOpacity
                key={tab}
                className={`px-5 py-2 rounded-2xl mr-3 ${index === 0 ? 'bg-gray-800' : 'bg-gray-100'
                  }`}
              >
                <Text className={`text-sm ${index === 0 ? 'text-white' : 'text-gray-600'
                  }`}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* grid of products */}
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={({ item }) => renderProductCard(item)}
            contentContainerStyle={{ padding: 8 }}
            scrollEnabled={false} // this is done to prevent a warning of using flastlist inside scrollview
            columnWrapperStyle={{ justifyContent: 'space-between', gap: 8 }}
            ItemSeparatorComponent={() => <View style={{ marginBottom: 14 }} />} // for spacing between rows
          />
        </View>
      </ScrollView>
    </>
  );
};

export default HomeTab;