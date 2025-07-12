import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteStackParamList } from '../../../App';
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
      style={[
        styles.offerCard,
        {
          width: SCREEN_WIDTH * 0.85,
          height: 198,
          backgroundColor: bgColor
        }
      ]}
    >
      <View style={styles.limitedTimeBadge}>
        <Text style={styles.limitedTimeText}>Limited time!</Text>
      </View>
      <Text style={styles.offerTitle}>{title}</Text>
      <Text style={styles.offerDiscount}>{discount} off</Text>
      <Text style={styles.offerTerms}>All category available | T&C applied</Text>
      <TouchableOpacity style={styles.claimButton}>
        <Text style={styles.claimButtonText}>Claim</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCategoryItem = (item: CategoryItem) => (
    <TouchableOpacity key={item.id} style={styles.categoryItem}>
      <View style={styles.categoryIcon}>
        <Icon name={item.icon} size={24} color="#666" />
      </View>
      <Text style={styles.categoryText}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProductCard = (product: Product) => (
    <TouchableOpacity
      key={product.id}
      onPress={() => handleProductDetailPageRedirect(product)}
      style={styles.productCard}
    >
      <TouchableOpacity style={styles.favoriteButton}>
        <Icon name="favorite-border" size={20} color="#666" />
      </TouchableOpacity>
      <Image
        source={{ uri: product.image }}
        style={styles.productImage}
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productPrice}>{product.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Special Offers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Special Offers</Text>
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
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Category</Text>
          <View style={styles.categoriesContainer}>
            {categories.map(renderCategoryItem)}
          </View>
        </View>

        {/* Most Popular*/}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Most Popular</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Filters*/}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersContainer}
          >
            {filterTabs.map((tab, index) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.filterTab,
                  index === 0 ? styles.activeFilterTab : styles.inactiveFilterTab
                ]}
              >
                <Text style={[
                  styles.filterText,
                  index === 0 ? styles.activeFilterText : styles.inactiveFilterText
                ]}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  section: {
    paddingTop:10,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    color: '#6b7280',
  },
  offerCard: {
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    justifyContent: 'space-between',
  },
  limitedTimeBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  limitedTimeText: {
    color: '#ffff',
    fontSize: 12,
    fontWeight: '500',
  },
  offerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  offerDiscount: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  offerTerms: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  claimButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  claimButtonText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryItem: {
    width: '25%',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#1f2937',
    textAlign: 'center',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 12,
  },
  activeFilterTab: {
    backgroundColor: '#1f2937',
  },
  inactiveFilterTab: {
    backgroundColor: '#f3f4f6',
  },
  filterText: {
    fontSize: 14,
  },
  activeFilterText: {
    color: '#fff',
  },
  inactiveFilterText: {
    color: '#6b7280',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 10,
    backgroundColor: '#fff',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 176,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
});

export default HomeTab;