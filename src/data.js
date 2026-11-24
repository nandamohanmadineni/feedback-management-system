export const products = [

  {
    id: "P101",
    name: "Performance Laptop",
    category: "Computers",
    description: "A lightweight laptop designed for productivity and everyday work.",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900",
    details: "Slim design, clear display and reliable performance."
  },

  {
    id: "P102",
    name: "Smartphone Pro",
    category: "Mobiles",
    description: "A modern smartphone with a vivid display and versatile camera.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900",
    details: "Built for communication, photography and entertainment."
  },

  {
    id: "P103",
    name: "Wireless Headphones",
    category: "Audio",
    description: "Comfortable headphones for music and calls.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
    details: "Padded ear cups and balanced sound."
  },

  {
    id: "P104",
    name: "Smart Watch",
    category: "Wearables",
    description: "A wearable device for notifications and activity tracking.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900",
    details: "Simple interface with useful tracking features."
  },

  {
    id: "P105",
    name: "Mechanical Keyboard",
    category: "Accessories",
    description: "A responsive keyboard for comfortable typing.",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=900",
    details: "Designed for dependable everyday typing."
  },

  {
    id: "P106",
    name: "Full HD Monitor",
    category: "Computers",
    description: "A clear display for work and entertainment.",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=900",
    details: "A practical display for multitasking."
  },

  {
    id: "P107",
    name: "Bluetooth Speaker",
    category: "Audio",
    description: "A compact speaker for listening anywhere.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=900",
    details: "Portable audio with wireless connectivity."
  },

  {
    id: "P108",
    name: "Wireless Mouse",
    category: "Accessories",
    description: "An ergonomic mouse for smooth navigation.",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=900",
    details: "Comfortable design for everyday use."
  }

];

export function createDemoOrders(email) {

  const chosen = [
    products[0],
    products[2],
    products[3],
    products[7]
  ];

  return chosen.map((product, index) => ({

    id: `ORD-${index + 1}-${email.slice(0, 2).toUpperCase()}`,

    productId: product.id,

    productName: product.name,

    purchaseDate: new Date(
      Date.now() - (index + 2) * 86400000
    ).toISOString().slice(0, 10),

    deliveryStatus: index === 3
      ? "In Transit"
      : "Delivered"

  }));

}