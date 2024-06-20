import React, { useState } from "react";
import { Container, Box, VStack, HStack, Text, Button, Input, Textarea, IconButton, Image } from "@chakra-ui/react";
import { FaThumbsUp, FaThumbsDown, FaComment, FaStore, FaStar } from "react-icons/fa";

const Product = ({ product, onLike, onDislike, onComment, onRate }) => {
  const [comment, setComment] = useState("");

  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} w="100%">
      <HStack spacing={4}>
        <Image src="https://images.unsplash.com/photo-1604935067269-27c7e8b36618?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwaW1hZ2V8ZW58MHx8fHwxNzE3NTY4NzA2fDA&ixlib=rb-4.0.3&q=80&w=1080" boxSize="100px" objectFit="cover" />
        <VStack align="start">
          <Text fontSize="xl" fontWeight="bold">
            {product.name}
          </Text>
          <Text>{product.description}</Text>
          <HStack spacing={2}>
            <IconButton aria-label="Like" icon={<FaThumbsUp />} onClick={() => onLike(product.id)} />
            <Text>{product.likes}</Text>
            <IconButton aria-label="Dislike" icon={<FaThumbsDown />} onClick={() => onDislike(product.id)} />
            <Text>{product.dislikes}</Text>
            <IconButton aria-label="Comment" icon={<FaComment />} />
          </HStack>
          <VStack align="start" spacing={1}>
            {product.comments.map((comment, index) => (
              <Text key={index} fontSize="sm">
                {comment}
              </Text>
            ))}
            <HStack>
              <Input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment" size="sm" />
              <Button
                size="sm"
                onClick={() => {
                  onComment(product.id, comment);
                  setComment("");
                }}
              >
                Comment
              </Button>
            </HStack>
          </VStack>
        </VStack>
      </HStack>
    </Box>
  );
};

const Store = ({ store, onLike, onDislike, onComment }) => {
  return (
    <VStack spacing={4} align="start" w="100%">
      <Text fontSize="2xl" fontWeight="bold">
        {store.name}
      </Text>
      {store.products.map((product) => (
        <Product key={product.id} product={product} onLike={onLike} onDislike={onDislike} onComment={onComment} />
      ))}
    </VStack>
  );
};

const Index = () => {
  const [stores, setStores] = useState([
    {
      id: 1,
      name: "My Store",
      products: [
        { id: 1, name: "Product 1", description: "Description 1", likes: 0, dislikes: 0, comments: [] },
        { id: 2, name: "Product 2", description: "Description 2", likes: 0, dislikes: 0, comments: [] },
      ],
    },
  ]);

  const handleLike = (productId) => {
    setStores(
      stores.map((store) => ({
        ...store,
        products: store.products.map((product) => (product.id === productId ? { ...product, likes: product.likes + 1 } : product)),
      })),
    );
  };

  const handleDislike = (productId) => {
    setStores(
      stores.map((store) => ({
        ...store,
        products: store.products.map((product) => (product.id === productId ? { ...product, dislikes: product.dislikes + 1 } : product)),
      })),
    );
  };

  const handleComment = (productId, comment) => {
    setStores(
      stores.map((store) => ({
        ...store,
        products: store.products.map((product) => (product.id === productId ? { ...product, comments: [...product.comments, comment] } : product)),
      })),
    );
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={8} w="100%">
        <HStack spacing={4}>
          <FaStore size="2em" />
          <Text fontSize="3xl" fontWeight="bold">
            My Store
          </Text>
        </HStack>
        {stores.map((store) => (
          <Store key={store.id} store={store} onLike={handleLike} onDislike={handleDislike} onComment={handleComment} />
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
