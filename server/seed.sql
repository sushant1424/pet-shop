-- Clean up old data
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM favorites;
DELETE FROM products;

-- =====================
-- DOG PRODUCTS
-- =====================
INSERT INTO products (name, description, price, category, pet_type, image_url) VALUES
('Premium Dog Kibble', 'High-protein dry food with chicken & brown rice. Perfect for adult dogs of all sizes. Supports muscle growth and energy.', 28.99, 'Food', 'Dog', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80'),
('Grain-Free Puppy Food', 'Specially formulated for puppies with real salmon & sweet potato. Supports brain development and healthy growth.', 34.99, 'Food', 'Dog', 'https://images.unsplash.com/photo-1585559604104-18c728e6c4e0?w=600&q=80'),
('Squeaky Rope Chew Toy', 'Durable braided cotton rope toy with squeaker inside. Perfect for fetch and tug-of-war. Safe and non-toxic.', 12.99, 'Toys', 'Dog', 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80'),
('Interactive Ball Launcher', 'Automatic ball launcher for solo play. 3 distance settings, safe for all dog sizes. Includes 3 tennis balls.', 49.99, 'Toys', 'Dog', 'https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?w=600&q=80'),
('Cozy Dog Hoodie', 'Soft fleece hoodie in classic grey. Keeps your pup warm during cool walks. Machine washable. Sizes: XS-XL.', 24.99, 'Clothes', 'Dog', 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&q=80'),
('Dog Rain Jacket', 'Waterproof lightweight rain jacket. Reflective strips for night visibility. Easy on/off with velcro straps.', 32.99, 'Clothes', 'Dog', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80'),
('Dog Starter Pack', 'Everything you need for a new puppy: collar, leash, food bowl, chew toy, and training treats. Perfect gift.', 79.99, 'Packages', 'Dog', 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&q=80'),
('Leather Dog Collar', 'Genuine leather collar with stainless steel buckle and D-ring. Available in brown and black.', 18.99, 'Accessories', 'Dog', 'https://images.unsplash.com/photo-1601758124277-285b0665ba1d?w=600&q=80'),

-- =====================
-- CAT PRODUCTS
-- =====================
('Indoor Cat Kibble', 'Specially balanced for indoor cats. Supports hairball control and healthy digestion with real chicken.', 22.99, 'Food', 'Cat', 'https://images.unsplash.com/photo-1623387641177-33de83bedb74?w=600&q=80'),
('Salmon Pate Wet Food', 'Premium salmon pate in gravy. 100% natural ingredients. No artificial colors or preservatives. Pack of 12.', 19.99, 'Food', 'Cat', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80'),
('Feather Wand Toy', 'Retractable feather wand that mimics prey movement. Keeps cats active and mentally stimulated. 90cm reach.', 8.99, 'Toys', 'Cat', 'https://images.unsplash.com/photo-1545249390-6bdfa2860c9f?w=600&q=80'),
('Cat Tunnel & Ball Set', 'Collapsible 3-way tunnel with a crinkle ball. Hours of entertainment for curious cats. Easy storage.', 16.99, 'Toys', 'Cat', 'https://images.unsplash.com/photo-1545249390-6bdfa2860c9f?w=600&q=80'),
('Cat Bow-Tie Collar', 'Elegant breakaway safety collar with cute bow-tie attachment. Comes with bell. Adjustable 20-30cm.', 11.99, 'Accessories', 'Cat', 'https://images.unsplash.com/photo-1615789591457-74a63395c990?w=600&q=80'),
('Cat Sweater - Striped', 'Cozy knit sweater for cats. Fair Isle stripe pattern. Soft and stretchy for comfortable fit. Machine washable.', 18.99, 'Clothes', 'Cat', 'https://images.unsplash.com/photo-1513245543132-31f507417b26?w=600&q=80'),
('Cat Essentials Bundle', 'New cat starter kit: food bowl, water fountain, scratch post, feather toy, and 1kg cat food.', 69.99, 'Packages', 'Cat', 'https://images.unsplash.com/photo-1623387641177-33de83bedb74?w=600&q=80'),

-- =====================
-- BIRD PRODUCTS
-- =====================
('Parrot Pellets - Tropical', 'Colorful, nutritious pellets for parrots and cockatiels. Fortified with vitamins A, D, E. 1kg bag.', 16.99, 'Food', 'Bird', 'https://images.unsplash.com/photo-1444464666168-49b19e890f5c?w=600&q=80'),
('Canary Seed Mix', 'Premium blend of millet, rape seed, and hemp for canaries and finches. No artificial additives. 500g.', 9.99, 'Food', 'Bird', 'https://images.unsplash.com/photo-1444464666168-49b19e890f5c?w=600&q=80'),
('Hanging Bird Swing', 'Colorful wooden perch swing with bells and beads. Encourages natural climbing behavior. Universal cage fit.', 7.99, 'Toys', 'Bird', 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=600&q=80'),
('Bird Foraging Toy Set', 'Set of 4 foraging toys that hide treats. Stimulates natural food-finding instincts. Safe for all parrots.', 14.99, 'Toys', 'Bird', 'https://images.unsplash.com/photo-1559715541-5daf8a0296d0?w=600&q=80'),
('Bird Starter Kit', 'Complete setup: seed feeder, water dispenser, swing, mirror toy, and mineral block. Great for new bird owners.', 39.99, 'Packages', 'Bird', 'https://images.unsplash.com/photo-1444464666168-49b19e890f5c?w=600&q=80'),

-- =====================
-- FISH PRODUCTS
-- =====================
('Tropical Fish Flakes', 'Premium flake food for tropical fish. Color-enhancing formula with spirulina and krill. 100g.', 7.99, 'Food', 'Fish', 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&q=80'),
('Aquarium Decoration Set', 'Beautiful cave, plants, and sunken ship ornament set. Safe resin material. Suitable for all aquariums.', 22.99, 'Accessories', 'Fish', 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600&q=80'),
('Fish Starter Aquarium Pack', 'Complete 10-gallon tank setup: filter, heater, air pump, LED light, gravel, and 2 decorations.', 89.99, 'Packages', 'Fish', 'https://images.unsplash.com/photo-1521651201144-634f700b36ef?w=600&q=80'),

-- =====================
-- SMALL PET PRODUCTS
-- =====================
('Hamster Mixed Grain', 'Complete nutrition for hamsters, gerbils, and mice. Sunflower seeds, corn, peanuts blend. 500g.', 6.99, 'Food', 'Small Pet', 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&q=80'),
('Rabbit Hay Bale', 'Premium Timothy hay for rabbits and guinea pigs. High fiber for healthy digestion. 1.5kg compressed bale.', 12.99, 'Food', 'Small Pet', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80'),
('Hamster Wheel & Ball Set', 'Silent spinner exercise wheel 21cm + clear exercise ball 19cm. Perfect for hamsters and gerbils.', 15.99, 'Toys', 'Small Pet', 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&q=80'),
('Small Pet Starter Bundle', 'For hamsters or guinea pigs: cage bedding, food bowl, water bottle, hay rack, and chew sticks.', 44.99, 'Packages', 'Small Pet', 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80');
