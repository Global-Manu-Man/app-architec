import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const BusinessSearch = () => {
    const [query, setQuery] = useState('');
    const [region, setRegion] = useState('us');
    const [results, setResults] = useState([]);
    const [page, setPage] = useState(1);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            setError(null); // Reset any previous errors
            const response = await axios.get('https://local-business-data.p.rapidapi.com/search', {
                params: {
                    query: `Hotels in ${query}`,
                    limit: 20,
                    lat: 37.359428,
                    lng: -121.925337,
                    zoom: 13,
                    language: 'en',
                    region: region
                },
                headers: {
                    'x-rapidapi-key': 'f72c667d2bmshb9f14cab3807a1bp1b0082jsn518a728d2bc5',
                    'x-rapidapi-host': 'local-business-data.p.rapidapi.com'
                }
            });
            console.log(response.data); // Log the response data for debugging
            if (response.data && response.data.data.length > 0) {
                setResults(response.data.data);
            } else {
                setError('No results found.');
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError('Error fetching data.');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            {item.photos_sample && item.photos_sample.length > 0 && (
                <Image source={{ uri: item.photos_sample[0].photo_url }} style={styles.image} />
            )}
            <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardAddress}>{item.full_address}</Text>
                <View style={styles.cardLinks}>
                    {item.website && (
                        <Text onPress={() => Linking.openURL(item.website)} style={styles.link}>
                            Website
                        </Text>
                    )}
                    {item.place_link && (
                        <Text onPress={() => Linking.openURL(item.place_link)} style={styles.link}>
                            Place Link
                        </Text>
                    )}
                </View>
                <Text style={styles.cardDetails}>City: {item.city}</Text>
                <Text style={styles.cardDetails}>Zipcode: {item.zipcode}</Text>
                <Text style={styles.cardDetails}>State: {item.state}</Text>
                <Text style={styles.cardDetails}>Country: {item.country}</Text>
            </View>
        </View>
    );

    const itemsPerPage = 5;
    const totalPages = Math.ceil(results.length / itemsPerPage);
    const displayedResults = results.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Business Search</Text>
            <TextInput
                style={styles.input}
                value={query}
                onChangeText={setQuery}
                placeholder="Enter location"
            />
            <Picker
                selectedValue={region}
                style={styles.picker}
                onValueChange={(itemValue) => setRegion(itemValue)}
            >
                <Picker.Item label="United States" value="us" />
                <Picker.Item label="Canada" value="ca" />
                <Picker.Item label="Mexico" value="mx" />
                {/* Agrega más regiones según sea necesario */}
            </Picker>
            <Button title="Search" onPress={handleSearch} />
            {error && <Text style={styles.error}>{error}</Text>}
            <FlatList
                data={displayedResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
            />
            <View style={styles.pagination}>
                <TouchableOpacity disabled={page === 1} onPress={() => setPage(page - 1)}>
                    <Text style={[styles.pageButton, page === 1 && styles.disabled]}>Previous</Text>
                </TouchableOpacity>
                <Text style={styles.pageNumber}>{page} / {totalPages}</Text>
                <TouchableOpacity disabled={page === totalPages} onPress={() => setPage(page + 1)}>
                    <Text style={[styles.pageButton, page === totalPages && styles.disabled]}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    picker: {
        height: 40,
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    cardContent: {
        padding: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardAddress: {
        fontSize: 14,
        color: '#777',
        marginBottom: 10,
    },
    cardDetails: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    cardLinks: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    link: {
        color: '#1e90ff',
        marginRight: 15,
        textDecorationLine: 'underline',
    },
    image: {
        width: '100%',
        height: 150,
    },
    error: {
        color: 'red',
        marginTop: 10,
        textAlign: 'center',
    },
    pagination: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    pageButton: {
        fontSize: 16,
        color: '#1e90ff',
    },
    disabled: {
        color: 'gray',
    },
    pageNumber: {
        fontSize: 16,
    }
});

export default BusinessSearch;
