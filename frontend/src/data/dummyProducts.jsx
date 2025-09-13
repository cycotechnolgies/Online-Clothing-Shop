// Extended Dummy product data with product-specific details

import tshirt from "../assets/tshirt.jpg";
import denimJacket from "../assets/denim-jacket.jpeg";
import frock from "../assets/frock.jpg";
import summerDress from "../assets/summer-dress.jpg";
import blouse from "../assets/blouse.jpg";
import saree from "../assets/saree.jpg";
import bra from "../assets/bra.jpeg";
import nighty from "../assets/nighty.jpg";
import formalShirt from "../assets/formalShirt.jpg";
import poloTshirt from "../assets/poloTshirt.jpg";
import hoodie from "../assets/hoodie.jpg";
import kurti from "../assets/kurti.jpg";
import jeans from "../assets/jeans.jpg";

const dummyProducts = [
  { 
    id: 1, 
    name: "Classic White T-Shirt", 
    price: 2000.0, 
    oldPrice: 2500.0,
    stock: 8, 
    inStock: true, 
    image: tshirt, 
    sizes: ["S", "M", "L", "XL"],
    fitType: "Regular Fit",
    washCare: "Machine Wash",
    color: "White",
    stretch: "No Stretch",

    measurements: {
      chest: { S: 36, M: 38, L: 40, XL: 42 },
      length: { S: 26, M: 27, L: 28, XL: 29 }
    },
    material: "100% Cotton",
    style: "Crew Neck, Short Sleeve",
    accessories: "None",
    modelSize: "M",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  },
  { 
    id: 2, 
    name: "Washed Denim Double Pocket Jacket", 
    price: 4500.0, 
    oldPrice: null,
    stock: 2,  
    inStock: true, 
    image: denimJacket, 
    sizes: ["S", "M", "L"],
    fitType: "Relaxed Fit",
    washCare: "Dry Clean Only",
    color: "Blue",
    stretch: "No Stretch",

    measurements: {
      chest: { S: 38, M: 40, L: 42 },
      length: { S: 25, M: 26, L: 27 }
    },
    material: "Denim",
    style: "Button-Front, Double Pocket",
    accessories: "Metal Buttons",
    modelSize: "M",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  },
  { 
    id: 3, 
    name: "Summer Dress", 
    price: 3000.0, 
    oldPrice: 3500.0,
    stock: 0,  
    inStock: false, 
    image: summerDress, 
    sizes: ["S", "M", "L"],
    fitType: "Slim Fit",
    washCare: "Hand Wash",
    color: "Yellow",
    stretch: "Light Stretch",

    measurements: {
      chest: { S: 32, M: 34, L: 36 },
      waist: { S: 26, M: 28, L: 30 },
      length: { S: 40, M: 41, L: 42 }
    },
    material: "Rayon Blend",
    style: "Sleeveless, A-line",
    accessories: "Concealed Zipper",
    modelSize: "S",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  },
  { 
    id: 4, 
    name: "Frock", 
    price: 2800.0, 
    oldPrice: null,
    stock: 4,  
    inStock: true, 
    image: frock, 
    sizes: ["S", "M", "L"],
    fitType: "Regular Fit",
    washCare: "Machine Wash",
    color: "Pink",
    stretch: "No Stretch",

    measurements: {
      chest: { S: 33, M: 35, L: 37 },
      waist: { S: 27, M: 29, L: 31 },
      length: { S: 38, M: 39, L: 40 }
    },
    material: "Polyester-Cotton Blend",
    style: "Knee-Length, Round Neck",
    accessories: "Back Zipper",
    modelSize: "M",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  },
  { 
    id: 5, 
    name: "Saree Blouse", 
    price: 1000.0, 
    oldPrice: null,
    stock: 5, 
    inStock: true,  
    image: blouse, 
    sizes: ["S", "M", "L", "XL"],
    fitType: "Slim Fit",
    washCare: "Hand Wash",
    color: "Black",
    stretch: "Stretchable",

    measurements: {
      chest: { S: 32, M: 34, L: 36, XL: 38 },
      length: { S: 15, M: 16, L: 17, XL: 18 }
    },
    material: "Silk Blend",
    style: "Short Sleeve, Back Hook",
    accessories: "Hooks",
    modelSize: "M",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  },
  { 
    id: 6, 
    name: "Women's Bra", 
    price: 800.0, 
    oldPrice: 1000.0, 
    inStock: true,
    stock: 8, 
    image: bra, 
    sizes: ["S", "M", "L"],
    fitType: "Body Fit",
    washCare: "Hand Wash",
    color: "Red",
    stretch: "High Stretch",

    measurements: {
      chest: { S: 30, M: 32, L: 34 },
      underbust: { S: 28, M: 30, L: 32 }
    },
    material: "Nylon-Spandex",
    style: "Padded, Wire-Free",
    accessories: "Adjustable Straps",
    modelSize: "S",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  },
  { 
    id: 7, 
    name: "Saree", 
    price: 4800.0, 
    oldPrice: null,
    stock: 0, 
    inStock: false, 
    image: saree, 
    sizes: ["Free Size"],
    fitType: "Free Size",
    washCare: "Dry Clean Only",
    color: "Green",
    stretch: "No Stretch",

    measurements: {
      length: "5.5 meters",
      blousePiece: "0.8 meters"
    },
    material: "Pure Silk",
    style: "Traditional Drape",
    accessories: "Unstitched Blouse Piece",
    modelSize: "Free",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  },
  { 
    id: 8, 
    name: "Women's Night Dress", 
    price: 2800.0, 
    oldPrice: 3100.0,
    stock: 4, 
    inStock: true, 
    image: nighty, 
    sizes: ["S", "M", "L"],
    fitType: "Loose Fit",
    washCare: "Machine Wash",
    color: "Lavender",
    stretch: "Light Stretch",

    measurements: {
      chest: { S: 34, M: 36, L: 38 },
      length: { S: 48, M: 49, L: 50 }
    },
    material: "Satin Blend",
    style: "Maxi Length, Sleeveless",
    accessories: "Lace Trim",
    modelSize: "M",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  },
  { 
    id: 9, 
    name: "Men's Formal Shirt", 
    price: 3200.0, 
    oldPrice: 3800.0,
    stock: 5, 
    inStock: true, 
    image: formalShirt, 
    sizes: ["S", "M", "L", "XL"], 
    fitType: "Slim Fit", 
    washCare: "Machine Wash", 
    color: "Light Blue", 
    stretch: "No Stretch",

    measurements: {
      chest: { S: 38, M: 40, L: 42, XL: 44 },
      length: { S: 28, M: 29, L: 30, XL: 31 },
      sleeve: { S: 24, M: 25, L: 25.5, XL: 26 }
    },
    material: "Cotton-Polyester Blend",
    style: "Full Sleeve, Spread Collar",
    accessories: "Buttons",
    modelSize: "M",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  },
  { 
    id: 10, 
    name: "Casual Polo T-Shirt", 
    price: 2200.0, 
    oldPrice: null,
    stock: 7, 
    inStock: true, 
    image: poloTshirt, 
    sizes: ["S", "M", "L", "XL"], 
    fitType: "Regular Fit", 
    washCare: "Hand Wash", 
    color: "Navy Blue", 
    stretch: "Light Stretch",

    measurements: {
      chest: { S: 36, M: 38, L: 40, XL: 42 },
      length: { S: 27, M: 28, L: 29, XL: 30 }
    },
    material: "Pique Cotton",
    style: "Short Sleeve, Polo Collar",
    accessories: "2-Button Placket",
    modelSize: "L",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  },
  { 
    id: 11, 
    name: "Men's Hoodie", 
    price: 4000.0, 
    oldPrice: 4500.0,
    stock: 6, 
    inStock: true, 
    image: hoodie, 
    sizes: ["M", "L", "XL"], 
    fitType: "Relaxed Fit", 
    washCare: "Machine Wash", 
    color: "Gray", 
    stretch: "Medium Stretch",

    measurements: {
      chest: { M: 40, L: 42, XL: 44 },
      length: { M: 27, L: 28, XL: 29 },
      sleeve: { M: 25, L: 25.5, XL: 26 }
    },
    material: "Cotton-Fleece",
    style: "Pullover, Kangaroo Pocket",
    accessories: "Drawstring Hood",
    modelSize: "L",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  },
  { 
    id: 12, 
    name: "Women's Kurti", 
    price: 2600.0, 
    oldPrice: 3000.0,
    stock: 4, 
    inStock: true, 
    image: kurti, 
    sizes: ["S", "M", "L", "XL"], 
    fitType: "Straight Fit", 
    washCare: "Hand Wash", 
    color: "Maroon", 
    stretch: "No Stretch",

    measurements: {
      chest: { S: 34, M: 36, L: 38, XL: 40 },
      length: { S: 40, M: 41, L: 42, XL: 43 }
    },
    material: "Cotton Linen",
    style: "3/4 Sleeve, Embroidered Neck",
    accessories: "Side Slits",
    modelSize: "M",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  },
  { 
    id: 13, 
    name: "Men's Jeans", 
    price: 3500.0, 
    oldPrice: null,
    stock: 0, 
    inStock: false, 
    image: jeans, 
    sizes: ["30", "32", "34", "36"], 
    fitType: "Slim Fit", 
    washCare: "Machine Wash", 
    color: "Dark Blue", 
    stretch: "Stretchable",

    measurements: {
      waist: { 30: 30, 32: 32, 34: 34, 36: 36 },
      inseam: { 30: 30, 32: 31, 34: 32, 36: 33 }
    },
    material: "Denim (98% Cotton, 2% Elastane)",
    style: "5-Pocket, Mid-Rise",
    accessories: "Metal Zip & Button",
    modelSize: "32",
    note: "Product colour may slightly vary due to photographic lighting sources or your monitor setting."
  }
];

export default dummyProducts;





// import tshirt from "../assets/tshirt.jpg";
// import denimJacket from "../assets/denim-jacket.jpeg";
// import frock from "../assets/frock.jpg";
// import summerDress from "../assets/summer-dress.jpg";
// import blouse from "../assets/blouse.jpg";
// import saree from "../assets/saree.jpg";
// import bra from "../assets/bra.jpeg";
// import nighty from "../assets/nighty.jpg";
// import formalShirt from "../assets/formalShirt.jpg"
// import poloTshirt from "../assets/poloTshirt.jpg"
// import hoodie from "../assets/hoodie.jpg"
// import kurti from "../assets/kurti.jpg"
// import jeans from "../assets/jeans.jpg"

// const dummyProducts = [
//   { 
//     id: 1, 
//     name: "Classic White T-Shirt", 
//     price: 2000.0, 
//     oldPrice: 2500.0, 
//     inStock: true, 
//     image: tshirt, 
//     sizes: ["S", "M", "L", "XL"],
//     fitType: "Regular Fit",
//     washCare: "Machine Wash",
//     color: "White",
//     stretch: "No Stretch"
//   },
//   { 
//     id: 2, 
//     name: "Washed Denim Double Pocket Jacket", 
//     price: 4500.0, 
//     oldPrice: null, 
//     inStock: true, 
//     image: denimJacket, 
//     sizes: ["S", "M", "L"],
//     fitType: "Relaxed Fit",
//     washCare: "Dry Clean Only",
//     color: "Blue",
//     stretch: "No Stretch"
//   },
//   { 
//     id: 3, 
//     name: "Summer Dress", 
//     price: 3000.0, 
//     oldPrice: 3500.0, 
//     inStock: false, 
//     image: summerDress, 
//     sizes: ["S", "M", "L"],
//     fitType: "Slim Fit",
//     washCare: "Hand Wash",
//     color: "Yellow",
//     stretch: "Light Stretch"
//   },
//   { 
//     id: 4, 
//     name: "Frock", 
//     price: 2800.0, 
//     oldPrice: null, 
//     inStock: true, 
//     image: frock, 
//     sizes: ["S", "M", "L"],
//     fitType: "Regular Fit",
//     washCare: "Machine Wash",
//     color: "Pink",
//     stretch: "No Stretch"
//   },
//   { 
//     id: 5, 
//     name: "Saree Blouse", 
//     price: 1000.0, 
//     oldPrice: null, 
//     inStock: true, 
//     image: blouse, 
//     sizes: ["S", "M", "L", "XL"],
//     fitType: "Slim Fit",
//     washCare: "Hand Wash",
//     color: "Black",
//     stretch: "Stretchable"
//   },
//   { 
//     id: 6, 
//     name: "Women's Bra", 
//     price: 800.0, 
//     oldPrice: 1000.0, 
//     inStock: true, 
//     image: bra, 
//     sizes: ["S", "M", "L"],
//     fitType: "Body Fit",
//     washCare: "Hand Wash",
//     color: "Red",
//     stretch: "High Stretch"
//   },
//   { 
//     id: 7, 
//     name: "Saree", 
//     price: 4800.0, 
//     oldPrice: null, 
//     inStock: false, 
//     image: saree, 
//     sizes: ["S", "M", "L"],
//     fitType: "Free Size",
//     washCare: "Dry Clean Only",
//     color: "Green",
//     stretch: "No Stretch"
//   },
//   { 
//     id: 8, 
//     name: "Women's Night Dress", 
//     price: 2800.0, 
//     oldPrice: 3100.0, 
//     inStock: true, 
//     image: nighty, 
//     sizes: ["S", "M", "L"],
//     fitType: "Loose Fit",
//     washCare: "Machine Wash",
//     color: "Lavender",
//     stretch: "Light Stretch"
//   },

// { 
//     id: 9, 
//     name: "Men's Formal Shirt", 
//     price: 3200.0, 
//     oldPrice: 3800.0, 
//     inStock: true, 
//     image: formalShirt, 
//     sizes: ["S", "M", "L", "XL"], 
//     fitType: "Slim Fit", 
//     washCare: "Machine Wash", 
//     color: "Light Blue", 
//     stretch: "No Stretch"
//   },
//   { 
//     id: 10, 
//     name: "Casual Polo T-Shirt", 
//     price: 2200.0, 
//     oldPrice: null, 
//     inStock: true, 
//     image: poloTshirt, 
//     sizes: ["S", "M", "L", "XL"], 
//     fitType: "Regular Fit", 
//     washCare: "Hand Wash", 
//     color: "Navy Blue", 
//     stretch: "Light Stretch"
//   },
//   { 
//     id: 11, 
//     name: "Men's Hoodie", 
//     price: 4000.0, 
//     oldPrice: 4500.0, 
//     inStock: true, 
//     image: hoodie, 
//     sizes: ["M", "L", "XL"], 
//     fitType: "Relaxed Fit", 
//     washCare: "Machine Wash", 
//     color: "Gray", 
//     stretch: "Medium Stretch"
//   },
//   { 
//     id: 12, 
//     name: "Women's Kurti", 
//     price: 2600.0, 
//     oldPrice: 3000.0, 
//     inStock: true, 
//     image: kurti, 
//     sizes: ["S", "M", "L", "XL"], 
//     fitType: "Straight Fit", 
//     washCare: "Hand Wash", 
//     color: "Maroon", 
//     stretch: "No Stretch"
//   },
//   { 
//     id: 13, 
//     name: "Men's Jeans", 
//     price: 3500.0, 
//     oldPrice: null, 
//     inStock: false, 
//     image: jeans, 
//     sizes: ["30", "32", "34", "36"], 
//     fitType: "Slim Fit", 
//     washCare: "Machine Wash", 
//     color: "Dark Blue", 
//     stretch: "Stretchable"
//   },


// ];
// export default dummyProducts