import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type ProductImage = {
  id: string;
  uri: string;
};

interface Color {
  id: string;
  name: string;
  hex: string;
}

interface Size {
  id: string;
  name: string;
  available: boolean;
}

const ProductDetailsScreen: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const productImages: ProductImage[] = [
    {
      id: '1',
      uri: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop',
    },
    {
      id: '2',
      uri: 'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=400&h=500&fit=crop',
    },
    {
      id: '3',
      uri: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
    },
  ];

  const sizes: Size[] = [
    { id: 'xs', name: 'XS', available: true },
    { id: 's', name: 'S', available: true },
    { id: 'm', name: 'M', available: true },
    { id: 'l', name: 'L', available: true },
    { id: 'xl', name: 'XL', available: true },
    { id: 'xxl', name: 'XXL', available: false },
  ];

  const colors: Color[] = [
    { id: 'gray', name: 'Gray', hex: '#9CA3AF' },
    { id: 'orange', name: 'Orange', hex: '#F97316' },
    { id: 'red', name: 'Red', hex: '#EF4444' },
    { id: 'blue', name: 'Blue', hex: '#3B82F6' },
    { id: 'purple', name: 'Purple', hex: '#8B5CF6' },
    { id: 'black', name: 'Black', hex: '#1F2937' },
  ];

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const renderImageThumbnail = (image: ProductImage, index: number) => (
    <TouchableOpacity
      key={image.id}
      onPress={() => setSelectedImageIndex(index)}
      className={`w-16 h-20 rounded-lg overflow-hidden mr-2 ${selectedImageIndex === index
          ? 'border-2 border-black'
          : 'border border-gray-200'
        }`}>
      <Image
        source={{ uri: image.uri }}
        className="w-full h-full"
        style={{ resizeMode: 'cover' }}
      />
      {index === 2 && (
        <View className="absolute inset-0 bg-black bg-opacity-50 items-center justify-center">
          <Text className="text-white text-xs font-bold">+2</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderSizeOption = (size: Size) => (
    <TouchableOpacity
      key={size.id}
      onPress={() => size.available && setSelectedSize(size.name)}
      disabled={!size.available}
      className={`w-12 h-12 rounded-lg border-2 items-center justify-center mr-3 ${selectedSize === size.name
          ? 'bg-black border-black'
          : size.available
            ? 'border-gray-300'
            : 'border-gray-200 bg-gray-100'
        }`}>
      <Text
        className={`font-medium ${selectedSize === size.name
            ? 'text-black'
            : size.available
              ? 'text-black'
              : 'text-gray-400'
          }`}>
        {size.name}
      </Text>
    </TouchableOpacity>
  );

  const renderColorOption = (color: Color) => (
    <TouchableOpacity
      key={color.id}
      onPress={() => setSelectedColor(color.id)}
      className={`w-8 h-8 rounded-full mr-3 ${selectedColor === color.id
          ? 'border-2 border-gray-800'
          : 'border border-gray-300'
        }`}
      style={{ backgroundColor: color.hex }}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <TouchableOpacity className="p-2">
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity className="p-2">
          <Icon name="share" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Main Product Image */}
        <View
          className="bg-gray-100 mx-4 rounded-2xl overflow-hidden mb-4"
          style={{ height: 350 }}>
          <Image
            source={{ uri: productImages[selectedImageIndex].uri }}
            className="w-full h-full"
            style={{ resizeMode: 'cover' }}
          />
        </View>

        {/* Image Thumbnails */}
        <View className="px-4 mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {productImages.map(renderImageThumbnail)}
          </ScrollView>
        </View>

        {/* Product Info */}
        <View className="px-4">
          <View className="flex-row items-start justify-between mb-2">
            <Text className="text-2xl font-bold text-black flex-1">
              Blend Bomber Jacket
            </Text>
            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              className="p-2">
              <Icon
                name={isFavorite ? 'favorite' : 'favorite-border'}
                size={24}
                color={isFavorite ? '#EF4444' : '#666'}
              />
            </TouchableOpacity>
          </View>

          {/* Rating and Reviews */}
          <View className="flex-row items-center mb-4">
            <Text className="text-sm text-gray-600 mr-2">745 Sold</Text>
            <View className="flex-row items-center">
              <Icon name="star" size={16} color="#FFC107" />
              <Text className="text-sm text-gray-800 ml-1">
                4.7 ( 3242 Review )
              </Text>
            </View>
          </View>

          {/* Description */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-black mb-2">
              Description
            </Text>
            <Text className="text-gray-600 leading-6">
              This Product house plant is a structural variegation within you
              home or office since it is a house plant and it house plant of all
              dark green to lighter greenish-gray horizontal bands with light
              yellow margins. <Text className="text-blue-500">Read More</Text>
            </Text>
          </View>

          {/* Size Selection */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-black mb-3">
              Select Size
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {sizes.map(renderSizeOption)}
            </ScrollView>
          </View>

          {/* Color Selection */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-black mb-3">Color</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {colors.map(renderColorOption)}
            </ScrollView>
          </View>

          {/* Quantity */}
          <View className="mb-8">
            <Text className="text-lg font-semibold text-black mb-3">
              Quantity
            </Text>
            <View className="flex-row items-center">
              <TouchableOpacity
                onPress={decrementQuantity}
                className="w-10 h-10 border border-gray-300 items-center justify-center rounded-lg">
                <Icon name="remove" size={20} color="#666" />
              </TouchableOpacity>
              <Text className="mx-6 text-lg font-medium">{quantity}</Text>
              <TouchableOpacity
                onPress={incrementQuantity}
                className="w-10 h-10 border border-gray-300 items-center justify-center rounded-lg">
                <Icon name="add" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Section */}
      <View className="px-4 py-4 bg-white border-t border-gray-100">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm text-gray-600">Price</Text>
            <Text className="text-2xl font-bold text-black">$20.00</Text>
          </View>
          <TouchableOpacity className="bg-black-100 px-8 py-4 rounded-2xl flex-row items-center">
            <Icon name="shopping-cart" size={20} color="white" />
            <Text className="text-white font-semibold text-lg ml-2">
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;
