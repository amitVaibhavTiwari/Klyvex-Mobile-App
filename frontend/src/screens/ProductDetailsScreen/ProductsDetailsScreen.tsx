import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import BackButtonHeader from '../../components/BackButtonHeader/BackButtonHeader';

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
      style={[
        styles.imageThumbnail,
        selectedImageIndex === index
          ? styles.selectedThumbnail
          : styles.unselectedThumbnail
      ]}>
      <Image
        source={{ uri: image.uri }}
        style={styles.thumbnailImage}
        resizeMode="cover"
      />
      {index === 2 && (
        <View style={styles.moreImagesOverlay}>
          <Text style={styles.moreImagesText}>+2</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderSizeOption = (size: Size) => (
    <TouchableOpacity
      key={size.id}
      onPress={() => size.available && setSelectedSize(size.name)}
      disabled={!size.available}
      style={[
        styles.sizeOption,
        selectedSize === size.name
          ? styles.selectedSizeOption
          : size.available
            ? styles.availableSizeOption
            : styles.unavailableSizeOption
      ]}>
      <Text
        style={[
          styles.sizeText,
          selectedSize === size.name
            ? styles.selectedSizeText
            : size.available
              ? styles.availableSizeText
              : styles.unavailableSizeText
        ]}>
        {size.name}
      </Text>
    </TouchableOpacity>
  );

  const renderColorOption = (color: Color) => (
    <TouchableOpacity
      key={color.id}
      onPress={() => setSelectedColor(color.id)}
      style={[
        styles.colorOption,
        { backgroundColor: color.hex },
        selectedColor === color.id
          ? styles.selectedColorOption
          : styles.unselectedColorOption
      ]}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <BackButtonHeader title='Back' />
        {/* Main Product Image */}
        <View style={styles.mainImageContainer}>
          <Image
            source={{ uri: productImages[selectedImageIndex].uri }}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.thumbnailsContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {productImages.map(renderImageThumbnail)}
          </ScrollView>
        </View>

        <View style={styles.productInfo}>
          <View style={styles.productHeader}>
            <Text style={styles.productTitle}>
              Blend Bomber Jacket
            </Text>
            <TouchableOpacity
              onPress={() => setIsFavorite(!isFavorite)}
              style={styles.favoriteButton}>
              <Icon
                name={isFavorite ? 'favorite' : 'favorite-border'}
                size={24}
                color={isFavorite ? '#EF4444' : '#666'}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingContainer}>
            <Text style={styles.soldText}>745 Sold</Text>
            <View style={styles.ratingRow}>
              <Icon name="star" size={16} color="#FFC107" />
              <Text style={styles.ratingText}>
                4.7 ( 3242 Review )
              </Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>
              Description
            </Text>
            <Text style={styles.descriptionText}>
              This Product house plant is a structural variegation within you
              home or office since it is a house plant and it house plant of all
              dark green to lighter greenish-gray horizontal bands with light
              yellow margins. <Text style={styles.readMoreText}>Read More</Text>
            </Text>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>
              Select Size
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {sizes.map(renderSizeOption)}
            </ScrollView>
          </View>

          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Color</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {colors.map(renderColorOption)}
            </ScrollView>
          </View>

          <View style={styles.quantityContainer}>
            <Text style={styles.sectionTitle}>
              Quantity
            </Text>
            <View style={styles.quantityRow}>
              <TouchableOpacity
                onPress={decrementQuantity}
                style={styles.quantityButton}>
                <Icon name="remove" size={20} color="#666" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={incrementQuantity}
                style={styles.quantityButton}>
                <Icon name="add" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomSection}>
        <View style={styles.bottomRow}>
          <View>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>$20.00</Text>
          </View>
          <TouchableOpacity style={styles.addToCartButton}>
            <Icon name="shopping-cart" size={20} color="white" />
            <Text style={styles.addToCartText}>
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  mainImageContainer: {
    backgroundColor: '#f3f4f6',
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    height: 350,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  thumbnailsContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  imageThumbnail: {
    width: 64,
    height: 80,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 8,
  },
  selectedThumbnail: {
    borderWidth: 2,
    borderColor: '#000',
  },
  unselectedThumbnail: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  moreImagesOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreImagesText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productInfo: {
    paddingHorizontal: 16,
  },
  productHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
  },
  favoriteButton: {
    padding: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  soldText: {
    fontSize: 14,
    color: '#6b7280',
    marginRight: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#1f2937',
    marginLeft: 4,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  descriptionText: {
    color: '#6b7280',
    lineHeight: 24,
  },
  readMoreText: {
    color: '#3b82f6',
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sizeOption: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedSizeOption: {
    // backgroundColor: '#000',
    borderColor: '#000',
  },
  availableSizeOption: {
    borderColor: '#d1d5db',
  },
  unavailableSizeOption: {
    borderColor: '#e5e7eb',
    backgroundColor: '#f3f4f6',
  },
  sizeText: {
    fontWeight: '500',
  },
  selectedSizeText: {
    color: '#000',
  },
  availableSizeText: {
    color: '#000',
  },
  unavailableSizeText: {
    color: '#9ca3af',
  },
  colorOption: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  selectedColorOption: {
    borderWidth: 2,
    borderColor: '#374151',
  },
  unselectedColorOption: {
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  quantityContainer: {
    marginBottom: 32,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  quantityText: {
    marginHorizontal: 24,
    fontSize: 18,
    fontWeight: '500',
  },
  bottomSection: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  priceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  addToCartButton: {
    backgroundColor: '#000',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 8,
  },
});

export default ProductDetailsScreen;