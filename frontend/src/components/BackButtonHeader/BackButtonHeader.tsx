import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type BackButtonHeaderProps = {
    title?: string;
    showTitle?: boolean;
    style?: ViewStyle;
    titleStyle?: TextStyle;
};

const BackButtonHeader: React.FC<BackButtonHeaderProps> = ({
    title = '',
    showTitle = true,
    style = {},
    titleStyle = {},
}) => {
    const navigation = useNavigation<NativeStackNavigationProp<any>>();

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
                accessibilityLabel="Go back"
            >
                <Ionicons name="arrow-back" size={18} color="black" />
                {showTitle && <Text style={[styles.title, titleStyle]}>{title}</Text>}
            </TouchableOpacity>
        </View>
    );
};

export default BackButtonHeader;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4
    },
    title: {
        fontSize: 14,
        fontWeight: '400',
    },
});
