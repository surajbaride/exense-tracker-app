import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Alert, ImageBackground } from 'react-native';

type Expense = {
  id: string;
  description: string;
  amount: number;
  user: string;
};

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [randomUser] = useState(['Alice', 'Bob', 'Charlie', 'Dave']);

  const addExpense = () => {
    if (!description || !amount) {
      Alert.alert('Please enter all fields');
      return;
    }

    const newExpense: Expense = {
      id: Math.random().toString(),
      description,
      amount: parseFloat(amount),
      user: randomUser[Math.floor(Math.random() * randomUser.length)],
    };

    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    setDescription('');
    setAmount('');
  };

  const deleteExpense = (id: string) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  return (
    <ImageBackground
      source={{ uri: 'https://img.freepik.com/free-photo/autumn-leaf-falling-revealing-intricate-leaf-vein-generated-by-ai_188544-9869.jpg' }} // Replace with your background image URL
      style={styles.background}
      resizeMode="cover" // Ensures the image covers the screen
    >
      <View style={styles.container}>
        <Text style={styles.title}>Expense Tracker</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            value={amount}
            keyboardType="numeric"
            onChangeText={setAmount}
          />
          <Button title="Add Expense" onPress={addExpense} color="#007BFF" />
        </View>

        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.expenseItem}>
              <Text style={styles.expenseText}>{item.description} - ${item.amount.toFixed(2)} (User: {item.user})</Text>
              <Button title="Delete" onPress={() => deleteExpense(item.id)} color="#FF4136" />
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1, // Makes the image background take up the whole screen
    justifyContent: 'center', // Center items vertically
    alignItems: 'center', // Center items horizontally
  },
  container: {
    width: '90%', // Set width to 90% of the screen
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#F2F2F2',
  },
  expenseItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  expenseText: {
    fontSize: 16,
    color: '#333',
  },
});

export default App;
