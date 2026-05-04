import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { askAI } from '../../src/services/aiChat';
import { useRoute } from '@react-navigation/native';
const ChatBotScreen = () => {
  const route = useRoute();

  const language = route?.params?.language || 'German';
  const flatListRef = useRef();

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: '1',
      text: `Hallo 👋\nI am your AI tutor for ${language}. Let's practice together!`,
      sender: 'bot',
    },
  ]);

  const scrollToBottom = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 150);
  };

  const sendMessage = async () => {
    if (!message.trim() || loading) {
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
    };

    const userInput = message;

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setLoading(true);
    scrollToBottom();

    const history = messages.map(item => ({
      role: item.sender === 'user' ? 'user' : 'assistant',
      content: item.text,
    }));

    const reply = await askAI({
      message: userInput,
      learningLanguage: language, // later dynamic kar lena
      nativeLanguage: 'Urdu',
      level: 'A1',
      history,
    });

    const botMessage = {
      id: (Date.now() + 1).toString(),
      text: reply,
      sender: 'bot',
    };

    setMessages(prev => [...prev, botMessage]);
    setLoading(false);
    scrollToBottom();
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';

    return (
      <View
        style={[
          styles.messageRow,
          {
            justifyContent: isUser ? 'flex-end' : 'flex-start',
          },
        ]}
      >
        {!isUser && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AI</Text>
          </View>
        )}

        <View
          style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}
        >
          <Text
            style={[
              styles.messageText,
              {
                color: isUser ? '#fff' : '#222',
              },
            ]}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // keyboardVerticalOffset={10}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>AI</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Spraxis Tutor</Text>
            <Text style={styles.headerSubtitle}>Practice your {language}</Text>
          </View>

          <View style={styles.languageBadge}>
            <Text style={styles.languageBadgeText}>{language}</Text>
          </View>
        </View>
      </View>
      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        contentContainerStyle={styles.chatContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Typing */}
      {loading && (
        <View style={styles.typingContainer}>
          <ActivityIndicator size="small" color="#5B67F1" />
          <Text style={styles.typingText}> AI is typing...</Text>
        </View>
      )}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type your message..."
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          multiline
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatBotScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  header: {
    backgroundColor: '#4B16B5',
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 28,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  headerAvatarText: {
    color: '#4B16B5',
    fontSize: 16,
    fontWeight: '700',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  headerSubtitle: {
    color: '#D7CBFF',
    marginTop: 4,
    fontSize: 13,
  },

  languageBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  languageBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },

  chatContainer: {
    padding: 18,
    paddingBottom: 30,
    paddingTop: 22,
  },

  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 18,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#5D7BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  avatarText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
  },

  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 22,
  },

  botBubble: {
    backgroundColor: '#F4ECE2',
    borderBottomLeftRadius: 6,
  },

  userBubble: {
    backgroundColor: '#5D7BFF',
    borderBottomRightRadius: 6,
  },

  messageText: {
    fontSize: 15,
    lineHeight: 24,
  },

  typingContainer: {
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  typingText: {
    marginLeft: 8,
    color: '#777',
    fontSize: 13,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    marginBottom: 18,
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 28,
    elevation: 2,
  },

  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#111',
    maxHeight: 120,
  },

  sendBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5D7BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
