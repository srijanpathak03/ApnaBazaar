// Mock user data
const mockUsers = [
  {
    _id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    phone: '123-456-7890',
    role: 'user'
  },
  {
    _id: 'vendor1',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    phone: '987-654-3210',
    shopName: 'Jane\'s Organic Shop',
    businessType: 'food',
    address: '123 Market St, New York, NY',
    role: 'vendor',
    isVerified: true
  }
];

// Helper to generate a token
const generateToken = (user) => {
  return 'mock-jwt-token-' + user._id;
};

// Mock login
export const mockLogin = async (email, password, isVendor) => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Find user with matching email and role
      const user = mockUsers.find(u => 
        u.email === email && u.role === (isVendor ? 'vendor' : 'user')
      );

      if (!user) {
        reject({ message: 'User not found' });
        return;
      }

      if (user.password !== password) {
        reject({ message: 'Invalid password' });
        return;
      }

      // Create response without password
      const { password: pwd, ...userWithoutPassword } = user;
      const response = {
        ...userWithoutPassword,
        token: generateToken(user)
      };

      resolve(response);
    }, 800); // Simulate network delay
  });
};

// Mock signup
export const mockSignup = async (userData, isVendor) => {
  return new Promise((resolve, reject) => {
    // Simulate network delay
    setTimeout(() => {
      // Check if user already exists
      const userExists = mockUsers.some(u => 
        u.email === userData.email && u.role === (isVendor ? 'vendor' : 'user')
      );

      if (userExists) {
        reject({ message: 'User already exists' });
        return;
      }

      // Create new user
      const newUser = {
        _id: 'user' + (mockUsers.length + 1),
        ...userData,
        role: isVendor ? 'vendor' : 'user',
        isVerified: false
      };

      // Add to mock database
      mockUsers.push(newUser);

      // Create response without password
      const { password: pwd, ...userWithoutPassword } = newUser;
      const response = {
        ...userWithoutPassword,
        token: generateToken(newUser)
      };

      resolve(response);
    }, 800); // Simulate network delay
  });
}; 