const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const { generateToken, protect, isVendor } = require('../middleware/auth');

// Register a vendor
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, phone, shopName, businessType, address } = req.body;
    
    // Check if vendor already exists
    const vendorExists = await Vendor.findOne({ email });
    
    if (vendorExists) {
      return res.status(400).json({ message: 'Vendor already exists with this email' });
    }
    
    // Create new vendor
    const vendor = await Vendor.create({
      name,
      email,
      password,
      phone,
      shopName,
      businessType,
      address,
      role: 'vendor'
    });
    
    if (vendor) {
      // Generate JWT token
      const token = generateToken(vendor._id, vendor.role);
      
      res.status(201).json({
        _id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        phone: vendor.phone,
        shopName: vendor.shopName,
        businessType: vendor.businessType,
        role: vendor.role,
        isVerified: vendor.isVerified,
        token
      });
    } else {
      res.status(400).json({ message: 'Invalid vendor data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login vendor
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find vendor by email
    const vendor = await Vendor.findOne({ email });
    
    if (!vendor) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check if password matches
    const isMatch = await vendor.comparePassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = generateToken(vendor._id, vendor.role);
    
    res.json({
      _id: vendor._id,
      name: vendor.name,
      email: vendor.email,
      phone: vendor.phone,
      shopName: vendor.shopName,
      businessType: vendor.businessType,
      role: vendor.role,
      isVerified: vendor.isVerified,
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get vendor profile
router.get('/profile', protect, isVendor, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.user._id).select('-password');
    
    if (vendor) {
      res.json(vendor);
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update vendor profile
router.put('/profile', protect, isVendor, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.user._id);
    
    if (vendor) {
      vendor.name = req.body.name || vendor.name;
      vendor.email = req.body.email || vendor.email;
      vendor.phone = req.body.phone || vendor.phone;
      vendor.shopName = req.body.shopName || vendor.shopName;
      vendor.businessType = req.body.businessType || vendor.businessType;
      vendor.address = req.body.address || vendor.address;
      
      if (req.body.password) {
        vendor.password = req.body.password;
      }
      
      const updatedVendor = await vendor.save();
      
      // Generate new token
      const token = generateToken(updatedVendor._id, updatedVendor.role);
      
      res.json({
        _id: updatedVendor._id,
        name: updatedVendor.name,
        email: updatedVendor.email,
        phone: updatedVendor.phone,
        shopName: updatedVendor.shopName,
        businessType: updatedVendor.businessType,
        role: updatedVendor.role,
        isVerified: updatedVendor.isVerified,
        token
      });
    } else {
      res.status(404).json({ message: 'Vendor not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router; 