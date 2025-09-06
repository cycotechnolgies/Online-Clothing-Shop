// Extended Dummy product data

import tshirt from "../assets/tshirt.jpg";
import denimJacket from "../assets/denim-jacket.jpeg";
import frock from "../assets/frock.jpg";
import summerDress from "../assets/summer-dress.jpg";
import blouse from "../assets/blouse.jpg";
import saree from "../assets/saree.jpg";
import bra from "../assets/bra.jpeg";
import nighty from "../assets/nighty.jpg";
import formalShirt from "../assets/formalShirt.jpg"
import poloTshirt from "../assets/poloTshirt.jpg"
import hoodie from "../assets/hoodie.jpg"
import kurti from "../assets/kurti.jpg"
import jeans from "../assets/jeans.jpg"

const dummyProducts = [
  { 
    id: 1, 
    name: "Classic White T-Shirt", 
    price: 2000.0, 
    oldPrice: 2500.0, 
    inStock: true, 
    image: tshirt, 
    sizes: ["S", "M", "L", "XL"],
    fitType: "Regular Fit",
    washCare: "Machine Wash",
    color: "White",
    stretch: "No Stretch"
  },
  { 
    id: 2, 
    name: "Washed Denim Double Pocket Jacket", 
    price: 4500.0, 
    oldPrice: null, 
    inStock: true, 
    image: denimJacket, 
    sizes: ["S", "M", "L"],
    fitType: "Relaxed Fit",
    washCare: "Dry Clean Only",
    color: "Blue",
    stretch: "No Stretch"
  },
  { 
    id: 3, 
    name: "Summer Dress", 
    price: 3000.0, 
    oldPrice: 3500.0, 
    inStock: false, 
    image: summerDress, 
    sizes: ["S", "M", "L"],
    fitType: "Slim Fit",
    washCare: "Hand Wash",
    color: "Yellow",
    stretch: "Light Stretch"
  },
  { 
    id: 4, 
    name: "Frock", 
    price: 2800.0, 
    oldPrice: null, 
    inStock: true, 
    image: frock, 
    sizes: ["S", "M", "L"],
    fitType: "Regular Fit",
    washCare: "Machine Wash",
    color: "Pink",
    stretch: "No Stretch"
  },
  { 
    id: 5, 
    name: "Saree Blouse", 
    price: 1000.0, 
    oldPrice: null, 
    inStock: true, 
    image: blouse, 
    sizes: ["S", "M", "L", "XL"],
    fitType: "Slim Fit",
    washCare: "Hand Wash",
    color: "Black",
    stretch: "Stretchable"
  },
  { 
    id: 6, 
    name: "Women's Bra", 
    price: 800.0, 
    oldPrice: 1000.0, 
    inStock: true, 
    image: bra, 
    sizes: ["S", "M", "L"],
    fitType: "Body Fit",
    washCare: "Hand Wash",
    color: "Red",
    stretch: "High Stretch"
  },
  { 
    id: 7, 
    name: "Saree", 
    price: 4800.0, 
    oldPrice: null, 
    inStock: false, 
    image: saree, 
    sizes: ["S", "M", "L"],
    fitType: "Free Size",
    washCare: "Dry Clean Only",
    color: "Green",
    stretch: "No Stretch"
  },
  { 
    id: 8, 
    name: "Women's Night Dress", 
    price: 2800.0, 
    oldPrice: 3100.0, 
    inStock: true, 
    image: nighty, 
    sizes: ["S", "M", "L"],
    fitType: "Loose Fit",
    washCare: "Machine Wash",
    color: "Lavender",
    stretch: "Light Stretch"
  },

{ 
    id: 9, 
    name: "Men's Formal Shirt", 
    price: 3200.0, 
    oldPrice: 3800.0, 
    inStock: true, 
    image: formalShirt, 
    sizes: ["S", "M", "L", "XL"], 
    fitType: "Slim Fit", 
    washCare: "Machine Wash", 
    color: "Light Blue", 
    stretch: "No Stretch"
  },
  { 
    id: 10, 
    name: "Casual Polo T-Shirt", 
    price: 2200.0, 
    oldPrice: null, 
    inStock: true, 
    image: poloTshirt, 
    sizes: ["S", "M", "L", "XL"], 
    fitType: "Regular Fit", 
    washCare: "Hand Wash", 
    color: "Navy Blue", 
    stretch: "Light Stretch"
  },
  { 
    id: 11, 
    name: "Men's Hoodie", 
    price: 4000.0, 
    oldPrice: 4500.0, 
    inStock: true, 
    image: hoodie, 
    sizes: ["M", "L", "XL"], 
    fitType: "Relaxed Fit", 
    washCare: "Machine Wash", 
    color: "Gray", 
    stretch: "Medium Stretch"
  },
  { 
    id: 12, 
    name: "Women's Kurti", 
    price: 2600.0, 
    oldPrice: 3000.0, 
    inStock: true, 
    image: kurti, 
    sizes: ["S", "M", "L", "XL"], 
    fitType: "Straight Fit", 
    washCare: "Hand Wash", 
    color: "Maroon", 
    stretch: "No Stretch"
  },
  { 
    id: 13, 
    name: "Men's Jeans", 
    price: 3500.0, 
    oldPrice: null, 
    inStock: false, 
    image: jeans, 
    sizes: ["30", "32", "34", "36"], 
    fitType: "Slim Fit", 
    washCare: "Machine Wash", 
    color: "Dark Blue", 
    stretch: "Stretchable"
  },


];
export default dummyProducts